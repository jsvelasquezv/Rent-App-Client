var rentaApp = angular.module('rentaApp', ['ngRoute', 'ipCookie', 'ng-token-auth']);

rentaApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        // Home
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController' 
        })
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

        .when('/moves/new', {
            templateUrl: 'pages/moves/createMove.html',
            controller: 'movesController'
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

rentaApp.controller('mainController', function($scope){
    $scope.message = 'Main controller';
});

rentaApp.controller('dashboardController', function($scope){
    $scope.message = 'Dashboard controller';
});

rentaApp.controller('movesController', function($scope, $http){
    $scope.newMove = {};
    $scope.createMove = function () {
        $http.post('http://localhost:3000/api/moves',{
            name: $scope.newMove.name,
            description: $scope.newMove.description,
            amount: $scope.newMove.amount,
            user_id: $scope.user.id
        })
        .success(function (data, status, headers, config) {
            console.log(status);
        })
        .error(function (data, status, headers, config) {
            console.log(data);
        });
    }
});

rentaApp.controller('loginController', function($scope, $auth, $rootScope){
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
        console.log(user);
        Materialize.toast('Logueado', 4000);
    });
    $rootScope.$on('auth:login-error', function(ev, reason) {
        console.log('auth failed because', reason.errors[0]);
    });
    $rootScope.$on('auth:logout-success', function(ev) {
        Materialize.toast('Deslogueado', 4000);
    });
    $rootScope.$on('auth:logout-error', function(ev, reason) {
        alert('logout failed because ' + reason.errors[0]);
    });
    $rootScope.$on('auth:oauth-registration', function(ev, user) {
        alert('new user registered through oauth:' + user.email);
    });
});