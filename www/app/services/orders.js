angular.module('app').factory('Orders', function ($log, $q, BaseUrl,RequestFactory,OrderMapping,localStorageService) {
    var baseUrl = BaseUrl;
    var service = {};
    var itemList = [];
    service.getOrdersByMbid = function (id) {
        var q = $q.defer();
        RequestFactory.get(baseUrl+'api/Order',{reqParams : {params : {fieldWorkerID : id}}}).then(function(suc){
           
            q.resolve({
                    data: OrderMapping.mapOrders(suc.data),
                    status: suc.response.status
                });
        },function(err){
            q.reject(err);
        });
        return q.promise;
    }
    
    service.getAllItems = function(){
          var q = $q.defer();
        RequestFactory.get(baseUrl+'api/Item').then(function(suc){
            $log.log(suc);
            itemList = OrderMapping.mapItems(suc.data)
            q.resolve({
                    data: itemList,
                    status: suc.response.status
                });
        },function(err){
            q.reject(err);
        });
        return q.promise;
    }
    
    service.mergeOrderAndItems = function(orders){
        var q = $q.defer();
        
       angular.forEach(orders,function(order){
           angular.forEach(order.items,function(item){
               
           })
       })
        
        return q.promise;
    }
    
    service.getItemsById = function(id){
        var q = $q.defer();
        RequestFactory.get(baseUrl + 'api/item',{reqParams : {params : {
            itemID : id
        }}}).then(function(suc){
            q.resolve({data : OrderMapping.mapItems(suc.data)})
        },function(err){
            q.reject(err);
        });
        return q.promise;
    };
    
    return service;
});
angular.module('app').factory('OrderMapping', function ($log, $q) {
    var service = {}
    service.mapOrders = function(orders){
        var mappedOrders = [];
        $log.log(orders)
        angular.forEach(orders,function(value){
            var mappedOrder = {
                customerId : value.CustomerID,
                fieldWorkerId : value.FieldWorkerID,
                orderDate : value.OrderDate,
                orderId : value.OrderID
            };
            var items = {};
            angular.forEach(value.OrderingData,function(item){
                items.push[item.ItemID] = {
                    itemId : item.ItemID,
                    price : item.Price_Euro,
                    quantity : item.Quantity
                };
            });
            mappedOrder.items = items;
            mappedOrders.push(mappedOrder);
        })
        return mappedOrders;
    };
    
    
    
    service.mapItems = function(items){
        var mappedItems = {};
        angular.forEach(items,function(item){
            var mapItem = {
                coating : item.Coating,
                diameter : item.Diameter,
                internalCooling : item.InternalCooling,
                itemId : item.ItemID,
                material : item.Material,
                pictureId : item.PictureID,
                productGroup : item.ProductGroup
            }
            mappedItems[mapItem.itemId] = mapItem;
        })
        return mappedItems;
    }
    return service;
});