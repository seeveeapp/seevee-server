var seevee = angular.module('seevee', ['ngRoute', 'ngSanitize']);

seevee.config(function($routeProvider, $httpProvider) {
    $routeProvider
    .when("/", {
        templateUrl: '../partials/partials.accomplishment.html',
        controller: 'accomplishmentController',
        resolve: {
            loggedin: checkLoggedin
        }
    })
    .when("/info", {
        templateUrl: '../partials/partials.info.html',
        controller: 'infoController',
        resolve: {
            loggedin: checkLoggedin
        }
    })
    .when("/resumes", {
        templateUrl: '../partials/partials.resume.html',
        controller: 'resumeController',
        resolve: {
            loggedin: checkLoggedin
        }
    })
    .when("/login", {
        templateUrl: '../partials/partials.login.html',
        controller: 'loginController',
        controllerAs: 'model'
    })
    .when("/account", {
        templateUrl: '../partials/partials.account.html',
        controller: 'accountController',
        resolve: {
            loggedin: checkLoggedin
        }
    })
    .otherwise({
        redirectTo: '/'
    });
});

var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/api/user/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
        {
                $rootScope.currentUser = user;
        }
        deferred.resolve();
    });

    return deferred.promise;
};

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/api/user/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
        {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};
