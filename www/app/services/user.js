angular.module('app').factory('UserData', function ($log, $q, UserMapping, RequestFactory) {
    var service = {};
    var baseUrl = 'http://zakitchallenge.azurewebsites.net/';

    //Try to get mitarbeiterlist by last name, if succesfull get mitarbeiter by id, if succesfull compare if object by id is in list by         last name -> if true successfully logged in
    service.login = function (id, name) {
        var q = $q.defer();
        service.getMbByLastName(name).then(function (mbsByName) {
            service.getMbById(id).then(function (mbById) {
                var successLogin = false;
                angular.forEach(mbsByName.data, function (value) {
                    if (angular.equals(value, mbById.data[0])) {
                        successLogin = true;
                    } else {
                        $log.log(value, mbById.data[0])
                    }
                })
                successLogin ? q.resolve({
                    data: mbById
                }) : q.reject('couldnt login');
            }, function (err) {
                q.reject({
                    data: 'Error'
                })
            });
        }, function (err) {
            q.reject({
                data: 'Last Name not found'
            })
        });
        return q.promise;
    }
    //Get Außendienstmitarbeiter by id 
    service.getMbById = function (id) {
        var q = $q.defer();
        RequestFactory.get(baseUrl + 'api/FieldWorker', {
                reqParams: {
                    params: {
                        fieldWorkerID: id
                    }
                }
            })
            .then(function (suc) {
                q.resolve({
                    data: UserMapping.mapMb(suc.data),
                    status: suc.response.status
                })
            }, function (err) {
                q.reject(err);
            })
        return q.promise;
    }

    service.getMbByLastName = function (lName) {
        var q = $q.defer();
        RequestFactory.get(baseUrl + 'api/FieldWorker', {
                reqParams: {
                    params: {
                        fieldWorkerLastName: lName
                    }
                }
            })
            .then(function (suc) {
                    q.resolve({
                        data: UserMapping.mapMb(suc.data),
                        status: suc.response.status
                    });
                },
                function (err) {
                    q.reject(err);
                })
        return q.promise;
    }
    return service;
});
angular.module('app').factory('UserMapping', function ($log) {
    var service = {};

    service.mapMb = function (array) {
        var mappedObj = [];
        angular.forEach(array, function (value, key) {
            var tmpObj = {
                comission: value.Commission,
                fieldWorkerId: value.FieldWorkerID,
                firstName: value.FirstName,
                lastName: value.LastName,
                place: value.Place,
                postCode: value.PostCode,
                saleReserve: value.SaleReserve,
                street: value.Street
            }
            mappedObj.push(tmpObj);
        })
        return mappedObj;
    }
    return service;
})