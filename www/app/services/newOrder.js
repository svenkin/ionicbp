angular.modul('app').factory('newOrder', function ($q,BaseUrl RequestFactory) {
    var service = {};
    var baseUrl = BaseUrl;
    serice.send = function () {
        var q = $q.defer();
        var order = localStorageService.get('shopping-cart') || 'fail';
        if (order === 'fail') {
            q.reject('Keine Items im Einkaufswagen');
            return q.promise;
        } else {
            RequestFactory.get(baseUrl+'api/CreateOrder',{reqParams : {params : {
                
            }}}).then(function(suc){
                
            },function(err){
                
            })
        }

    }

    return service;
});