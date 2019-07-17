(function () {
    "use strict";  // turn on javascript strict syntax mode
    angular.module("filmApp",
        [
            "ngRoute"   // the only dependency at this stage, for routing
        ]
    ).
    config(
        [ /**
         * Function responsible for the redirecting of the different urls
         * Also sets what partials will display
         * @param $routeProvider
         */
            "$routeProvider",
            function($routeProvider) {
                $routeProvider. // Changes what is displayed based on route taken
                when("/films", {
                    controller: "filmController"
                }).when("/films/:film_id", {
                    templateUrl: "js/partials/actor-list.html",
                    controller: "FilmActorsController"
                }).
                otherwise({
                    redirectTo: "/"
                });
            }
        ]
    );
}());