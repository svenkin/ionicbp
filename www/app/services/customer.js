angular.module('app').factory('Customer',function($q, RequestFactory,BaseUrl){
    var service = {};
    
    service.getAllCustomer = function(){
        var q = $q.defer();
        
        RequestFactory.get(BaseUrl+'')
        
        return q.promise;
    }
        
    return service;
});