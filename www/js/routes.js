angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.thickShakes', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/thickShakes.html',
        controller: 'thickShakesCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.flavouredMilk'
      2) Using $state.go programatically:
        $state.go('tabsController.flavouredMilk');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab2/page3
      /page1/tab4/page3
  */
  .state('tabsController.flavouredMilk', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/flavouredMilk.html',
        controller: 'flavouredMilkCtrl'
      },
      'tab4': {
        templateUrl: 'templates/flavouredMilk.html',
        controller: 'flavouredMilkCtrl'
      }
    }
  })

  .state('tabsController.realShakes', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/realShakes.html',
        controller: 'realShakesCtrl'
      }
    }
  })

  .state('coffee', {
    url: '/page6',
    templateUrl: 'templates/coffee.html',
    controller: 'coffeeCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.page', {
    url: '/page5',
    views: {
      'tab1': {
        templateUrl: 'templates/page.html',
        controller: 'pageCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/page4')

  

});