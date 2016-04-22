angular.module('app').factory('newOrder', function ($q,$log,BaseUrl, RequestFactory,$filter,localStorageService) {
    var service = {};
    var baseUrl = BaseUrl;
    service.send = function (customerId) {
        var q = $q.defer();
        var order = localStorageService.get('shopping-cart') || 'fail';
        var mbId = localStorageService.get('user').fieldWorkerId || 'fail';
        if (order === 'fail' || mbId === 'fail') {
            q.reject('Keine Items im Einkaufswagen');
            return q.promise;
        } else {
            
            var orderDate = $filter('date')(new Date(),'yyyy-MM-dd');
            var orderData = "";
            angular.forEach(order,function(value){
                orderData += value.itemId+":"+value.quantity+";"
            });
            $log.log('Orderdata',orderData);
            RequestFactory.get(baseUrl+'api/CreateOrder',{reqParams : {params : {
                customerID : customerId,
                fieldWorkerID : mbId,
                orderDate : orderDate,
                orderData : orderData
                
            }}}).then(function(suc){
                $log.log('erstellt' , suc);
                q.resolve(suc);
            },function(err){
                q.reject(err);
            })
        }
        return q.promise;
    }

    return service;
});