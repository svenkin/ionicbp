angular.module('app.dashboard.customer', []).config(function ($stateProvider) {
        $stateProvider.state('app.customerDashboard', {
            url: '/dashboard/customer',
            views: {
                'menuContent': {
                    templateUrl: 'app/dashboard/customer/customer.html',
                    controller: 'CustomerDashboardCtrl'
                }
            }
        })
    })
    .controller('CustomerDashboardCtrl', function ($scope, $log, UserData, Orders, Customer, $filter, $ionicLoading, $timeout, newOrder, localStorageService, $state, $rootScope) {
        var stateBefore = '';
        var rawData = localStorageService.get("orders") || [];

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            var userRole = localStorageService.get('role');
            if (from.name === 'login' && userRole === 'customer') {
                stateBefore = from.name;
                loadDataCust();
                chartDataArray.data = [];
            } else {
                stateBefore = '';
            }
        });
        $scope.data = {};
        //        $log.log(Orders.getAllOrdersCustomer(20001))
        function loadDataCust() {
            $scope.$on('$ionicView.beforeEnter', function () {
                if (stateBefore === 'login') {
                    $ionicLoading.show({
                        template: '<div style="text-align:center">Lade Daten...<br/><ion-spinner icon="spiral"></ion-spinner></div>'
                    });
                }
            })
            var id = localStorageService.get('customer').customerId || 'fail';
            Orders.getOrdersByCust(id).then(function (ord) {
                var ordered = $filter('orderBy')(ord.data, 'orderId', true);
                $log.log(ordered);
                $scope.data.orders = ordered.splice(0, 5);
                $scope.data.customer = localStorageService.get("customer");
                $log.log(localStorageService.get('costumer'));
                rawData = localStorageService.get("orders");
                chart(rawData);
                $timeout(function () {
                    $ionicLoading.hide();
                    $scope.$apply();
                }, 500)

            }, function (err) {
                $log.log(err);
                $ionicLoading.hide();
            })
        };
        loadDataCust();

        $scope.refresh = function () {
            var id = localStorageService.get('customer').customerId || 'fail';
            $scope.data.orders = [];
            Orders.getOrdersByCust(id).then(function (ord) {
                var ordered = $filter('orderBy')(ord.data, 'orderId', true);
                rawData = localStorageService.get("orders");
                $scope.data.customer = localStorageService.get("customer");
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
                var date = rawData[i].orderDateRaw;
                if (date == lastDate) {
                    chartDataArray.data[chartDataArray.data.length - 1][1] += rawData[i].networth;
                } else {
                    //Check if array is sorted properly
                    //                if (dataInMs > new Date(date).getTime()) console.log("Fehler" + chartDataArray.data);
                    dataInMs = new Date(date).getTime();
                    chartDataArray.data.push([dataInMs, rawData[i].networth]);
                    lastDate = date;
                }
            }
            $scope.data.maxValue = chartDataArray.data.length - 1;
            $scope.data.sliderVal = chartDataArray.data.length - 10;
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
            $scope.sliderChanged();
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
        $log.log('rawData', rawData);
        for (var i = 0; i < rawData.length; i++) {
            var date = rawData[i].orderDateRaw;
            if (date == lastDate) {
                chartDataArray.data[chartDataArray.data.length - 1][1] += rawData[i].networth;
            } else {
                //Check if array is sorted properly
                //                if (dataInMs > new Date(date).getTime()) console.log("Fehler" + chartDataArray.data);
                dataInMs = new Date(date).getTime();
                chartDataArray.data.push([dataInMs, rawData[i].networth]);
                lastDate = date;
            }
        }
        $log.log('dates', chartDataArray.data)
            //set slider values

        $scope.data = {};
        //        $scope.data.sliderVal = $scope.dataLength;
        //Set initial slider value
        $scope.dataLength = chartDataArray.data.length;
        $scope.data.sliderVal = chartDataArray.data.length;

        //Set max slider value
        //        $scope.data.maxValue = chartDataArray.data.length - 5;


        $scope.sliderChanged = function () {
            var sliderValTmp = $scope.data.sliderVal;
            var min = new Date(chartDataArray.data[0][0]).getTime() + 1000000000 * sliderValTmp;
            if (sliderValTmp > -1) min = new Date(chartDataArray.data[sliderValTmp][0]).getTime();
            $scope.chartConfig.xAxis.min = min;
        };
    });