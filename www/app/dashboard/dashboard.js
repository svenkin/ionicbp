angular.module('app.dashboard', []).config(function ($stateProvider) {
        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            views: {
                'menuContent': {
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'DashboardCtrl'
                }
            }
        })
    })
    .controller('DashboardCtrl', function ($scope, $log, UserData, Orders, Customer, $filter, $ionicLoading, $timeout, newOrder, localStorageService, $state, $rootScope) {
        var stateBefore = '';
        var rawData = localStorageService.get("orders") || [];
       
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
             var userRole = localStorageService.get('role');
            if (from.name === 'login' && userRole === 'fieldWorker') {
                stateBefore = from.name;
                loadData();
                chartDataArray.data = [];
            } else {
                stateBefore = '';
            }
            if (from.name === 'app.shoppingCart' && userRole === 'fieldWorker') {
                stateBefore = from.name;
                loadData();
                chartDataArray.data = [];
            }
        });
        $scope.data = {};
        //        $log.log(Orders.getAllOrdersCustomer(20001))
        function loadData() {
            $scope.$on('$ionicView.beforeEnter', function () {
                if (stateBefore === 'login') {
                    $ionicLoading.show({
                        template: '<div style="text-align:center">Lade Daten...<br/><ion-spinner icon="spiral"></ion-spinner></div>'
                    });
                }
            })
            var id = localStorageService.get('user').fieldWorkerId || 'fail';
            Orders.getAllOrders(id).then(function (ord) {
                var ordered = $filter('orderBy')(ord, 'orderId', true);
                $scope.data.orders = ordered.splice(0, 5);
                $scope.data.user = localStorageService.get('user');
                rawData = localStorageService.get("orders");
                chart(rawData);
                $timeout(function () {
                    $scope.$apply();
                    $ionicLoading.hide();
                }, 500)

            }, function (err) {
                $ionicLoading.hide();
                $log.log(err);
            })
        };
        loadData();

        $scope.refresh = function () {
            var id = localStorageService.get('user') || 'fail';
            id = id.fieldWorkerId;
            $scope.data.orders = [];
            Orders.getAllOrders(id).then(function (ord) {
                var ordered = $filter('orderBy')(ord, 'orderId', true);
                rawData = localStorageService.get("orders");
                $scope.data.user = localStorageService.get('user');
                $scope.data.orders = ordered.splice(0, 5);
                chart(rawData);
                $timeout(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.$apply();
                }, 500)

            }, function (err) {
                $log.log(err);
            })
        }

        function chart(ordData) {
            chartDataArray = {
                type: 'areaspline',
                showInLegend: false,
                id: "1",
                color: "#ffcd00",
                fillColor: "#ffffff",
                data: []
            }
            dataInMs = 0;
            lastDate;
            //Sort orders to display
            rawData = $filter('orderBy')(ordData, 'orderDateRaw', false);
            for (var i = 0; i < rawData.length; i++) {
                date = rawData[i].orderDateRaw;
                if (date == lastDate) {
                    chartDataArray.data[chartDataArray.data.length - 1][1] += rawData[i].networth;
                } else {
                    //Check if array is sorted properly
                    if (dataInMs > new Date(date).getTime()) console.log("Fehler" + chartDataArray.data);
                    dataInMs = new Date(date).getTime();
                    chartDataArray.data.push([dataInMs, rawData[i].networth]);
                    lastDate = date;
                }
            }
            $scope.data.maxValue = chartDataArray.data.length -1;
             $scope.data.sliderVal = chartDataArray.data.length -10;
            $scope.chartConfig = {
                chart: {
                    type: 'areaspline'
                },
                xAxis: {
                    dashStyle: 'LongDash',
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        //Format xAxis labels
                        month: '%b.%Y',
                    }
                },
                tooltip: {
                    formatter: function () {
                        //Label
                        return this.y + '€';
                    }
                },
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'right',
                        x: -5,
                        padding: 0
                    },
                },
                plotOptions: {
                    "series": {
                        "stacking": ""
                    }
                },
                series: [chartDataArray],
                //Disable title
                title: {
                    text: null
                }
            }
        }


        var chartDataArray = {
            type: 'areaspline',
            showInLegend: false,
            id: "1",
            color: "#ffcd00",
            fillColor: "#ffffff",
            data: []
        }
        var dataInMs = 0;
        var lastDate;
        //Sort orders to display
        var rawData = $filter('orderBy')(rawData, 'orderDateRaw', false);
        for (var i = 0; i < rawData.length; i++) {
            var date = rawData[i].orderDateRaw;
            if (date == lastDate) {
                chartDataArray.data[chartDataArray.data.length - 1][1] += rawData[i].networth;
            } else {
                //Check if array is sorted properly
//                if (dataInMs > new Date(date).getTime()){console.log("Fehler" + chartDataArray.data);} 

                dataInMs = new Date(date).getTime();
                chartDataArray.data.push([dataInMs, rawData[i].networth]);
                lastDate = date;
            }
        }

        //set slider values
        $scope.dataLength = chartDataArray.data.length;
        $scope.data.sliderVal = chartDataArray.data.length;
        $scope.data = {};
        //        $scope.data.sliderVal = $scope.dataLength;
        //Set initial slider value
//    $log.log(chartDataArray.data.length - 10);

        //Set max slider value
//        $scope.data.maxValue = chartDataArray.data.length - 5


        $scope.sliderChanged = function () {
            var sliderValTmp = $scope.data.sliderVal;
            var min = new Date(chartDataArray.data[0][0]).getTime() + 1000000000 * sliderValTmp;
            if (sliderValTmp > -1) min = new Date(chartDataArray.data[sliderValTmp][0]).getTime();
            $scope.chartConfig.xAxis.min = min;
        };
    });