  var appName = 'kavintage';
  var width = window.innerWidth;
  var products = [
    "Kitkat Milkshake",
    "Oreo Milkshake",
    "Tutty fruity",
    "Thandai",
    "Kaser Badam",
    "Mint Oreo",
    "Strawberry Savory",
    "Chocolate Hazelnut",
    "Chocolate Peanut Butter",
    "Choco Chip",
    "Kavintage Raspberry",
    "Kavintage Blueberry",
    "Alphanso Mango",
    "Exotique strawberry",
    "ButterScotch",
    "Strawberry",
    "Mango",
    "Vanilla",
    "Pineapple",
    "Rasmalai",
    "Healthy Faluda",
    "Cold Coffee",
    "Sugar Free Coffee"
  ];
  var checkoutProducts = new Array();
  var priceList = new Array();
  var smallarray = new Array();
  var largearray = new Array();
  var small = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var large = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  var themes = []

  var example = angular.module('kavintage', ['ionic', 'kavintage.controllers', 'backand'])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider

        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
        })

        .state('app.search', {
          url: '/search',
          views: {
            'menuContent': {
              templateUrl: 'templates/search.html'
            }
          }
        })

        .state('app.orderDetails', {
          url: '/orderDetails',
          views: {
            'menuContent': {
              templateUrl: 'templates/orderDetails.html'
            }
          }
        })

        .state('app.browse', {
          url: '/browse',
          views: {
            'menuContent': {
              templateUrl: 'templates/browse.html'
            }
          }
        })
        .state('app.playlists', {
          url: '/playlists',
          views: {
            'menuContent': {
              templateUrl: 'templates/playlists.html',
              controller: 'PlaylistsCtrl'
            }
          }
        })

        .state('app.single', {
          url: '/playlists/:playlistId',
          views: {
            'menuContent': {
              templateUrl: 'templates/playlist.html',
              controller: 'PlaylistCtrl'
            }
          }
        });
      $urlRouterProvider.otherwise('/app/playlists');
    })

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    /*
      This directive is used to disable the "drag to open" functionality of the Side-Menu
      when you are dragging a Slider component.
    */
    .directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
      return {
        restrict: "A",
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {

          function stopDrag() {
            $ionicSideMenuDelegate.canDragContent(false);
          }

          function allowDrag() {
            $ionicSideMenuDelegate.canDragContent(true);
          }

          $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
          $element.on('touchstart', stopDrag);
          $element.on('touchend', allowDrag);
          $element.on('mousedown', stopDrag);
          $element.on('mouseup', allowDrag);

        }]
      };
    }])

    /*
      This directive is used to open regular and dynamic href links inside of inappbrowser.
    */
    .directive('hrefInappbrowser', function() {
      return {
        restrict: 'A',
        replace: false,
        transclude: false,
        link: function(scope, element, attrs) {
          var href = attrs['hrefInappbrowser'];

          attrs.$observe('hrefInappbrowser', function(val) {
            href = val;
          });

          element.bind('click', function(event) {

            window.open(href, '_system', 'location=yes');

            event.preventDefault();
            event.stopPropagation();

          });
        }
      };
    })

    .config(function(BackandProvider) {
      BackandProvider.setAppName('kavintage');
      BackandProvider.setAnonymousToken('4cbbb0c7-bd17-4cc9-b034-1988649655a6');

    });


  var count = 0;
  var indexCheck = 999;
  example.controller("ExampleController", function($scope, $ionicSlideBoxDelegate) {
    $scope.navSlide = function(index) {
      $ionicSlideBoxDelegate.slide(index, 500);
    };

    $scope.moveCard = function(index) {
      var movePosition = width;
      var moveSpeed = 0.3;
      var buttons = document.getElementById('thickShakes-list-item' + index);

      if (index - indexCheck != 0 && count != 0 && count % 2 != 0) {
        count = 0;
        var buttona = document.getElementById('thickShakes-list-item' + indexCheck);

        move(buttona)
          .sub('margin-right', movePosition)
          .sub('margin-left', -movePosition)
          .duration('0.1s')
          .end();

        console.log("[Correction loop]Count is: " + count + ", Index used is " + index + ",Previous index is " + indexCheck);
      }

      if (count % 2 == 0) {
        move(buttons)
          .add('margin-right', movePosition)
          .add('margin-left', -movePosition)
          .duration('0.1s')
          .end();

        console.log("[Even]Count is: " + count + ", Index used is " + index + ",Previous index is " + indexCheck);


      } else {
        move(buttons)
          .sub('margin-right', movePosition)
          .sub('margin-left', -movePosition)
          .duration('0.1s')
          .end();

      }

      indexCheck = index;
      count++;
    };

    $scope.subBottle = function(index, quantity) {
      if (large[index] != 0 && quantity == 'l') {
        large[index] = large[index] - 1;
        //console.log(large);
        document.getElementById("numberInTheMiddlwOfTheBottleLarge" + index).innerHTML = large[index];
        if (large[index] > 99) {
          document.getElementById("numberInTheMiddlwOfTheBottleLarge" + index).style.fontSize = "10px";
        } else if (large[index] > 9 && large[index] < 100) {
          document.getElementById("numberInTheMiddlwOfTheBottleLarge" + index).style.fontSize = "12px";
        } else {
          document.getElementById("numberInTheMiddlwOfTheBottleLarge" + index).style.fontSize = "16px";
        }
      } else if (small[index] != 0 && quantity != 'l') {
        small[index] = small[index] - 1;
        document.getElementById("numberInTheMiddlwOfTheBottleSmall" + index).innerHTML = small[index];
        if (small[index] > 99) {
          document.getElementById("numberInTheMiddlwOfTheBottleSmall" + index).style.fontSize = "10px";
        } else if (small[index] > 9 && small[index] < 100) {
          document.getElementById("numberInTheMiddlwOfTheBottleSmall" + index).style.fontSize = "12px";
        } else {
          document.getElementById("numberInTheMiddlwOfTheBottleSmall" + index).style.fontSize = "16px";
        }
      }
    };

    $scope.addBottle = function(index, quantity) {
      if (quantity == 's') {
        small[index] = small[index] + 1;
        //console.log(small);
        document.getElementById("numberInTheMiddlwOfTheBottleSmall" + index).innerHTML = small[index];
        if (small[index] > 99) {
          document.getElementById("numberInTheMiddlwOfTheBottleSmall" + index).style.fontSize = "10px";
        } else if (small[index] > 9 && small[index] < 100) {
          document.getElementById("numberInTheMiddlwOfTheBottleSmall" + index).style.fontSize = "12px";
        } else {
          document.getElementById("numberInTheMiddlwOfTheBottleSmall" + index).style.fontSize = "16px";
        }
      } else {
        large[index] = large[index] + 1;
        //console.log(large);
        document.getElementById("numberInTheMiddlwOfTheBottleLarge" + index).innerHTML = large[index];
        if (large[index] > 99) {
          document.getElementById("numberInTheMiddlwOfTheBottleLarge" + index).style.fontSize = "10px";
        } else if (large[index] > 9 && large[index] < 100) {
          document.getElementById("numberInTheMiddlwOfTheBottleLarge" + index).style.fontSize = "12px";
        } else {
          document.getElementById("numberInTheMiddlwOfTheBottleLarge" + index).style.fontSize = "16px";
        }
      }
    };
  });

  example.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  });

  example.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    }
  });

  example.controller("myCtrl", function($scope, $state, placeOrder) {
    $scope.goToTab = function() {
      $state.go('app.orderDetails');

      for (var productsOrdered = 0; productsOrdered <= products.length - 1; productsOrdered++) {
        if (small[productsOrdered] != 0 || large[productsOrdered] != 0) {
          checkoutProducts[productsOrdered] = products[productsOrdered];
          priceList[productsOrdered] = (small[productsOrdered] * 80) + (large[productsOrdered] * 100);

          checkoutProducts = checkoutProducts.filter(Boolean);
          priceList = priceList.filter(Boolean);
        } else {
          checkoutProducts.splice(productsOrdered, 1);
        }
      }

      for (var arrValue = 0; arrValue < small.length; arrValue++) {
        if (small[arrValue] != 0) {
          smallarray[arrValue] = small[arrValue];
        }
        if (large[arrValue] != 0) {
          largearray[arrValue] = large[arrValue];
        }
      }
      checkoutProducts = checkoutProducts.filter(Boolean);
      priceList = priceList.filter(Boolean);
      console.log("large: " + large);
      console.log("smallarray: " + smallarray);
      console.log("priceList: " + priceList);
      console.log("checkoutProducts: " + checkoutProducts);
      $scope.records = checkoutProducts;
      console.log(checkoutProducts);
      setTimeout(function() {
        for (var x = 0; x <= checkoutProducts.length - 1; x++) {
          document.getElementsByClassName('orderQuantity')[x].innerHTML = "(" + small[x] + "S" + large[x] + "L)";
          document.getElementsByClassName('orderPrice')[x].innerHTML = priceList[x] + "₹";
        }
      }, 10);
    }

    $scope.products = ["Kitkat Milkshake","Oreo Milkshake","Tutty fruity"];
    $scope.input = {'name':'Ankit','fields':{'name':'name'}};

    function getAllProducts() {
      placeOrder.getProducts().then(function(results){
        $scope.products= results.data.data;
        console.log(products);
      });
    }
    $scope.addproducts = function() {
      placeOrder.addProducts($scope.input).then(function(results){
        $scope.input = {};
        getAllProducts();
      });
    }
      getAllProducts();
  });

  example.service('placeOrder', function($http, Backand) {
    var service = this,
      baseUrl = '/1/objects/',
      objectName = 'items/';
    function getUrl() {
      return Backand.getApiUrl() + baseUrl + objectName;
    }
    function getUrlForId(itemId) {
      return getUrl(path) + itemId;
    }
    //give all contents of a database
    getProducts = function() {
      return $http.get(getUrl());
    };
    addProducts = function(productsPlaces) {
      console.log(productsPlaces);
      return $http.post(getUrl(), productsPlaces);
    };
    return {
      getProducts: getProducts,
      addProducts: addProducts
    }
  });
