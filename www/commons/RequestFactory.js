angular.module('Requestfactory', [])
  .factory('RequestFactory', function ($http, $q, $cacheFactory) {
    var rootUrl = "";
    var cache = $cacheFactory('RequestFactoryCache');
    var promises = {};

    function sendRequest(req, config) {
      var defer = $q.defer();
      var returnData = {};
      if (angular.isDefined(req.url)) {
        if (angular.isDefined(config)) {
          if (config.catchMultipleRequests === true) {
            if (angular.isDefined(promises[req.url])) {
              return promises[req.url];
            } else {
              promises[req.url] = defer.promise;
            }
          }
          if (config.caching === true) {
            var cachedData = cache.get(req.url);
            if (config.force === true || cachedData === undefined || cachedData.data === undefined || cachedData.data == {} || angular.equals(cachedData.data, {})) {
              sendRequestWithCache(req, returnData, defer, cachedData, config.parseFunction);
            } else {//Load from cache
              cachedData.cached = true;
              cachedData.error = false;
              cache.put(req.url, cachedData);
              defer.resolve(cachedData);
            }
          } else {//no caching
            sendSimpleRequest(req, returnData, defer, config.parseFunction);
          }
        } else {//config not set
          sendSimpleRequest(req, returnData, defer);
        }
        defer.promise.then(function () {
          delete promises[req.url];
        }, function () {
          delete promises[req.url];
        });
      } else {//req.urls not set
        defer.reject("Url not set.")
      }
      return defer.promise;
    }

    function sendSimpleRequest(req, returnData, defer, parseFunction) {
      $http(req).
        then(function (response) {
          returnData.data = {};
          returnData.timeStamp = new Date();
          returnData.cached = false;
          returnData.error = false;
          returnData.response = response;
          if (angular.isDefined(parseFunction)) {
            returnData.data = parseFunction(response.data);
          } else {
            returnData.data = response.data;
          }
          defer.resolve(returnData)
        },
        function (response) {
          returnData = {};
          returnData.cached = false;
          returnData.error = true;
          returnData.response = response;
          defer.reject(returnData)
        });
    }

    function sendRequestWithCache(req, returnData, defer, cachedData, parseFunction) {
      $http(req).
        then(function (response) {
          cache.remove(req.url);
          returnData.data = {};
          returnData.timeStamp = new Date();
          returnData.cached = false;
          returnData.error = false;
          returnData.response = response;
          if (angular.isDefined(parseFunction)) {
            returnData.data = parseFunction(response.data);
          } else {
            returnData.data = response.data;
          }
          cache.put(req.url, returnData);
          defer.resolve(returnData)
        },
        function (response) {
          if (cachedData === undefined) {
            returnData = {};
            returnData.cached = false;
          } else {
            if (cachedData.data === undefined || cachedData.data === {}) {
              returnData.cached = false;
            } else {
              returnData = cachedData;
              returnData.cached = true;
            }
          }
          returnData.error = true;
          returnData.response = response;
          cache.put(req.url, returnData);
          defer.reject(returnData)
        });
    }

    return {
      get : function (url, config) {
        var req = {
          method : 'GET',
          url : rootUrl + url
        };
        if (angular.isDefined(config) && angular.isDefined(config.headers)) {
          req.headers = config.headers;
        }
        if (angular.isDefined(config) && angular.isDefined(config.reqParams)) {
          angular.merge(req, config.reqParams);
        }
        return sendRequest(req, config);
      },
      post : function (url, postData, config) {

        var req = {
          method : 'POST',
          url : rootUrl + url,
          data : postData
        };
        if (angular.isDefined(config) && angular.isDefined(config.headers)) {
          req.headers = config.headers;
        }
        if (angular.isDefined(config) && angular.isDefined(config.reqParams)) {
          angular.merge(req, config.reqParams);
        }
        return sendRequest(req, config);
      },
      setRootUrl : function (newRootUrl) {
        rootUrl = newRootUrl;
      }
    }
  });
