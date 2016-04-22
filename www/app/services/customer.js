angular.module('app').factory('Customer',function($log,$q, RequestFactory,BaseUrl){
    var service = {};
    
    service.getCustomerById = function(id){
        var q = $q.defer();
        
        RequestFactory.get(BaseUrl+'',{reqParams : {params : {customerID : id}}}).then(function(customer){
            $log.log('cust',customer);
        },function(err){
            q.reject(err);
        })
        
        return q.promise;
    }
        
    return service;
});
angular.module('app').factory('CustomerMapping',function(){
   var service = {};
    service.mapCustomer = function(){
        
    }
    
    return service;
});