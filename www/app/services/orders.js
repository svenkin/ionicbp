angular.module('app').factory('Orders', function ($log, $q, BaseUrl,RequestFactory) {
    var baseUrl = BaseUrl;
    var service = {};
    service.getOrdersByMbid = function (id) {
        var q = $q.defer();
        RequestFactory.get(baseUrl+'api/Order',{reqParams : {params : {fieldWorkerID : id}}}).then(function(suc){
            q.resolve({
                    data: suc.data,
                    status: suc.response.status
                });
        },function(err){
            q.reject(err);
        })
        return q.promise;
    }
    return service;
});
angular.module('app').factory('OrderMapping', function ($log, $q) {

});