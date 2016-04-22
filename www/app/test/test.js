angular.module('app.test', []).config(function ($stateProvider) {
  $stateProvider.state('app.test', {
    url: '/test',
    views: {
      'menuContent': {
        templateUrl: 'app/test/test.html',
        controller: 'TestCtrl'
      }
    }
  })
})
  .controller('TestCtrl', function ($scope, $log, localStorageService) {
      var rawData = localStorageService.get("orders");

    var blub = {
      id:"1",
      data: []
    }
    for(var i = 0; i<rawData.length; i++){
      var date = rawData[i].orderDateRaw;
      blub.data.push([date,rawData[i].networth]);
    }
    console.log(blub);
    //This is not a highcharts object. It just looks a little like one!
    $scope.chartConfig = {
      options: {
        zoomType: "x"
      },
      charts:
      {
        panning:true
      },
      xAxis:
      {
        type: 'datetime',
        tickInterval: 20
      },
      yAxis:
      {
        title:{
           text: null
        },
        labels: {
          align: 'right',
          x: -5,
          y: -3,
          padding: 0
        },
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },
      series: [blub],
      title: {
        text: null
      }
    }
    var first = rawData[0].orderDateRaw;
    var last = rawData[rawData.length-1].orderDateRaw;
    console.log(first);
    console.log(last);
  });
