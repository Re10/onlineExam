var app = angular.module("myApp", ['toastr','ui.router']).config(($stateProvider, $httpProvider, $urlRouterProvider,$templateFactoryProvider) => {
//  $templateFactoryProvider.shouldUnsafelyUseHttp(false);  
  $stateProvider.state("main", {
        url: "/main",
        templateUrl: "index.html",
        controller: "mainController",
        controllerAs: 'main'
    }).state("test", {  
        url: "/test/:id",
        templateUrl: "test.html",
        controller: "testController",
        controllerAs: 'testCtrl'
    }).state("finish",{
        url:"/finish",
        templateUrl:"finish.html",
        controller:"finishController",
        controllerAs:"finishCtrl",
       
    })
})

app.directive('resize', function($window) {
    return {
      link: function(scope) {
        function onResize(e) {
          // Namespacing events with name of directive + event to avoid collisions
          scope.$broadcast('resize::resize');
        }
  
        function cleanUp() {
          angular.element($window).off('resize', onResize);
        }
  
        angular.element($window).on('resize', onResize);
        scope.$on('$destroy', cleanUp);
      }
    }
  });

