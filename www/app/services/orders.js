angular.module('app').factory('Orders', function ($log, $q, BaseUrl, RequestFactory, OrderMapping, localStorageService, $timeout,$filter) {
    var baseUrl = BaseUrl;
    var service = {};
    var itemList = [];

    service.getAllOrders = function (id) {
        var q = $q.defer()
        service.getOrdersByMbid(id).then(function (ord) {
            $log.log(ord);
            service.getAllItems().then(function (suc) {
                var merged = service.mergeOrderAndItems(ord.data);
                localStorageService.set('orders', merged);
                q.resolve(merged);
            }, function (err) {
                q.reject(err);
            });

        }, function (err) {
            q.reject(err);
        })
        return q.promise;
    }
    
    service.getAllOrdersCustomer = function(id){
          var q = $q.defer()
        service.getOrdersByCust(id).then(function (ord) {
            $log.log(ord);
            service.getAllItems().then(function (suc) {
                var merged = service.mergeOrderAndItems(ord.data);
                localStorageService.set('orders', merged);
                q.resolve(merged);
            }, function (err) {
                q.reject(err);
            });

        }, function (err) {
            q.reject(err);
        })
        return q.promise;
    }
    
    service.getOrdersByCust = function(id){
         var q = $q.defer();
        RequestFactory.get(baseUrl + '/api/Order', {
            reqParams: {
                params: {
                    customerID: id
                }
            }
        }).then(function (suc) {
            $log.log('item',suc);
            OrderMapping.mapOrders(suc.data).then(function (items) {
                
                q.resolve({
                    data: items.data,
                    status: suc.response.status
                });
            }, function (err) {
                q.reject(err)
            });;
        }, function (err) {
            q.reject(err);
        });
        return q.promise;
    }
    
    

    service.getOrdersByMbid = function (id) {
        var q = $q.defer();
        RequestFactory.get(baseUrl + 'api/Order', {
            reqParams: {
                params: {
                    fieldWorkerID: id
                }
            }
        }).then(function (suc) {
            $log.log('item',suc);
            OrderMapping.mapOrders(suc.data).then(function (items) {
                
                q.resolve({
                    data: items.data,
                    status: suc.response.status
                });
            }, function (err) {
                q.reject(err)
            });;
        }, function (err) {
            q.reject(err);
        });
        return q.promise;
    }

    service.getAllItems = function () {
        var q = $q.defer();
        RequestFactory.get(baseUrl + 'api/Item').then(function (suc) {
            itemList = OrderMapping.mapItems(suc.data);
            $log.log('list', itemList);
            localStorageService.add('Items', itemList);
            q.resolve({
                data: itemList,
                status: suc.response.status
            });
        }, function (err) {
            q.reject(err);
        });
        return q.promise;
    }

    service.mergeOrderAndItems = function (orders) {
        var q = $q.defer();
        var newOrders = [];
        angular.forEach(orders, function (order) {
            var newOrder = order;
            var ges = 0;
            angular.forEach(order.items, function (item) {
                newOrder.items[item.itemId] = localStorageService.get('Items')[item.itemId];
                newOrder.items[item.itemId].price = item.price;
                newOrder.items[item.itemId].quantity = item.quantity;
                newOrder.items[item.itemId].networth = item.price * item.quantity;
                ges += item.price * item.quantity;
            })
            newOrder.networth = ges;
            newOrders.push(newOrder);
        })
        return $filter('orderBy')(newOrders, 'orderDateRaw', false);
    }

    service.getItemsById = function (id) {
        var q = $q.defer();
        RequestFactory.get(baseUrl + 'api/item', {
            reqParams: {
                params: {
                    itemID: id
                }
            }
        }).then(function (suc) {
            $log.log(OrderMapping.mapItems(suc.data));
            q.resolve({
                data: OrderMapping.mapItems(suc.data)
            })
        }, function (err) {
            q.reject(err);
        });
        return q.promise;
    };

    return service;
});
angular.module('app').factory('OrderMapping', function ($log, $q, Customer, $moment) {
    var service = {}
    service.mapOrders = function (orders) {
        var q = $q.defer();
        var mappedOrders = [];
        angular.forEach(orders, function (value) {
            var mappedOrder = {
                customerId: value.CustomerID,
                fieldWorkerId: value.FieldWorkerID,
                orderDate: $moment(value.OrderDate, 'YYYYMMDD').fromNow(),
                orderDateRaw : new Date(value.OrderDate),
                orderId: value.OrderID
            };
            Customer.getCustomerById(mappedOrder.customerId).then(function (suc) {
                mappedOrder.customer = suc;
            }, function (err) {
                q.reject(err);
            })
            var items = {};
            angular.forEach(value.OrderingData, function (item) {
                items[item.ItemID] = {
                    itemId: item.ItemID,
                    price: item.Price_Euro,
                    quantity: item.Quantity
                };
            });
            mappedOrder.items = items;
            mappedOrders.push(mappedOrder);
        })
        q.resolve({
            data: mappedOrders
        });
        return q.promise;
    };

    service.mapItems = function (items) {
        var mappedItems = {};
        angular.forEach(items, function (item) {
            var mapItem = {
                coating: item.Coating,
                diameter: item.Diameter,
                internalCooling: item.InternalCooling,
                itemId: item.ItemID,
                material: item.Material,
                pictureId: item.PictureID,
                productGroup: item.ProductGroup,
                price: item.Price
            }
            mappedItems[mapItem.itemId] = mapItem;
        })
        return mappedItems;
    }
    return service;
});