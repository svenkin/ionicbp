angular.module('app').factory('Customer', function ($log, $q, RequestFactory, BaseUrl, CustomerMapping) {
    var service = {};

    service.getCustomerById = function (id) {
        var q = $q.defer();

        RequestFactory.get(BaseUrl + 'api/Customer', {
            reqParams: {
                params: {
                    customerID: id
                }
            }
        }).then(function (customer) {
            if(customer.data.length > 0){
                q.resolve(CustomerMapping.mapCustomer(customer.data[0]));
            }else{
                q.reject('empty array')
            }
        }, function (err) {
            q.reject(err);
        })
        return q.promise;
    }

    return service;
});
angular.module('app').factory('CustomerMapping', function () {
    var service = {};
    service.mapCustomer = function (customer) {
        return {
            companyName: customer.CompanyName,
            customerDiscount: customer.CustomerDiscount,
            customerId: customer.CustomerID,
            keyCustomer: customer.KeyCustomer,
            place: customer.Place,
            postCode: customer.PostCode,
            saleReserve: customer.SaleReserve,
            street: customer.Street
        }
    }

    return service;
});
