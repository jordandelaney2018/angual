(function () {
    "use strict";  // turn on javascript strict syntax mode
    angular.module("filmApp",
        [
            'ngRoute'   // the only dependency at this stage, for routing
        ]
    ).              // note this fullstop where we chain the call to config
    config(
        [
            '$routeProvider',     // built in variable which injects functionality, passed as a string
            function($routeProvider) {
                $routeProvider.
                when('/films', {
                    controller: 'filmController'
                }).when('/films/:film_id', {
                    templateUrl: 'js/partials/actor-list.html',
                    controller: 'FilmActorsController'
                }).
                    when('/', {
                    controller: 'filmController'
                }).
                otherwise({
                    redirectTo: '/'
                });
            }
        ]
    );  // end of config method
}());   // end of IIFE