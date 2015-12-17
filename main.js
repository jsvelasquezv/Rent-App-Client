var rentaApp = angular.module('rentaApp', ['ngRoute', 
                                           'ipCookie', 
                                           'ng-token-auth', 
                                           'moveService', 
                                           'patrimonyService',
                                           'angular-datepicker']);

rentaApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        // Home

        // Login
        .when('/dashboard', {
            templateUrl: 'pages/dashboard.html',
            controller: 'dashboardController' 
        })

        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })

        .when('/signUp', {
            templateUrl: 'pages/signUp.html',
            controller: 'loginController'
        })

        .when('/moves/:moveId', {
            templateUrl: 'pages/moves/viewMove.html',
            controller: 'movesController'
        })

        .when('/newMove', {
            templateUrl: 'pages/moves/createMove.html',
            controller: 'movesController'
        })

        .when('/newPatrimony', {
            templateUrl: 'pages/patrimonies/createPatrimony.html',
            controller: 'patrimoniesController'
        });
}]);

rentaApp.config(
    function($authProvider) {
        $authProvider.configure({
            apiUrl: 'http://localhost:3000/api'
            // authProviderPaths: {
            //     github: '/auth/github' // <-- note that this is different than what was set with github
            // }
        });
});

rentaApp.controller('mainController', function($scope, $http){
    $scope.message = 'Main controller';
});

rentaApp.controller('dashboardController', function($scope, Move, Patrimony){
    // $scope.getMoves = function () {
        Move.getMoves()
        .success(function (data) {
            // console.log(data);
            $scope.moves = data.models;
        })
        .error(function (error) {
            // console.log(error);
            $scope.moves = error;
        });

        Patrimony.getPatrimonies()
        .success(function (data) {
            // console.log(data);
            $scope.patrimonies = data.models;
        })
        .error(function (error) {
            // console.log(error);
            $scope.patrimonies = error;
        });
    // }
});
// succes and error recives (data, status, headers, config)
rentaApp.controller('movesController', function($scope, Move){
    $scope.createMove = function () {
        Move.createMove(
                        $scope.newMove.name,
                        $scope.newMove.description,
                        $scope.newMove.amount,
                        $scope.user.id
                        )
        .success(function (data) {
            Materialize.toast('Movimiento registrado correctamente', 4000);
        })
        .error(function (data) {
            Materialize.toast('Movimiento no registrado', 4000);
        });
    }
});

rentaApp.controller('patrimoniesController', function($scope, Patrimony) {
    $scope.createPatrimony = function () {
        Patrimony.createPatrimony(
                                  $scope.newPatrimony.name,
                                  $scope.newPatrimony.value,
                                  $scope.newPatrimony.kind,
                                  $scope.newPatrimony.acquisition_date,
                                  $scope.user.id
                                 )
        .success(function (data) {
            Materialize.toast('Patrimonio registrado correctamente', 4000);
        })
        .error(function (data) {
            Materialize.toast('Patrimonio no registrado', 4000);
        });
    }
});

rentaApp.controller('loginController', function($scope, $auth, $rootScope, $location){
    $scope.handleLoginBtnClick = function() {
      $auth.submitLogin($scope.loginForm)
        .then(function(resp) {
        })
        .catch(function(resp) {
        });
    };

    $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };

    $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function(resp) {
            $auth.submitLogin({
                email: $scope.registrationForm.email,
                password: $scope.registrationForm.password
            });
        })
        .catch(function(resp) {
          // handle error response
        });
    };
    $scope.handleBtnClick = function() {
      $auth.authenticate('github')
        .then(function(resp) {
          // handle success
        })
        .catch(function(resp) {
          // handle errors
        });
    };

    $rootScope.$on('auth:login-success', function(ev, user) {
        // console.log(user);
        Materialize.toast('Inicio de sesion correcto', 4000);
        $location.path('/dashboard');
    });

    $rootScope.$on('auth:login-error', function(ev, reason) {
        Materialize.toast('Inicio de sesion incorrecto', 4000); 
        console.log('auth failed because', reason.errors[0]);
    });

    $rootScope.$on('auth:logout-success', function(ev) {
        Materialize.toast('Cierre de sesion correcto', 4000);
        $location.path('/login');
    });

    $rootScope.$on('auth:logout-error', function(ev, reason) {
        alert('logout failed because ' + reason.errors[0]);
    });

    $rootScope.$on('auth:oauth-registration', function(ev, user) {
        alert('new user registered through oauth:' + user.email);
    });
});