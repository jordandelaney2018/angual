(function () {
    'use strict';
    /** Service to return the data */

    angular.module('filmApp').
    service('dataService',         // the data service name, can be anything we want
        ['$q',                     // dependency, $q handles promises, the request initially returns a promise, not the data
            '$http',                  // dependency, $http handles the ajax request
            function($q, $http) {     // the parameters must be in the same order as the dependencies

                /*
                 * var to hold the data base url
                 */
                var urlBase = '/wai-film/index.php';


                /*
                 * method to retrieve courses, or, more accurately a promise which when
                 * fulfilled calls the success method
                 */
                this.getFilms = function () {
                    var defer = $q.defer(),             // The promise
                        data = {                        // the data to be passed to the url
                            action: 'list',
                            subject: 'films'
                        };
                    $http.get(urlBase, {params: data, cache: true}).                         // notice the dot to start the chain to success()
                    success(function(response){
                        defer.resolve({
                            data: response.ResultSet.Result,         // create data property with value from response
                            rowCount: response.ResultSet.RowCount  // create rowCount property with value from response
                        });
                    }).                                                 // another dot to chain to error()
                    error(function(err){
                        defer.reject(err);
                    });
                    // the call to getCourses returns this promise which is fulfilled
                    // by the .get method .success or .failure
                    return defer.promise;
                };
                this.getActors = function (film_id) {
                        var defer = $q.defer(),
                            data = {                        // the data to be passed to the url
                                action: 'list',
                                subject: 'actors',
                                id: film_id
                            };
                            $http.get(urlBase, {params: data, cache: true}).                    // notice the dot to start the chain to success()
                            success(function(response){
                                defer.resolve({
                                    data: response.ResultSet.Result,         // create data property with value from response
                                    rowCount: response.ResultSet.RowCount// create rowCount property with value from response
                                });
                            }).                                         // another dot to chain to error()
                            error(function(err){
                                defer.reject(err);
                            });
                        // the call to getCourses returns this promise which is fulfilled
                        // by the .get method .success or .failure
                        return defer.promise;
                };
                this.getNotes = function (film_id) {
                    var defer = $q.defer(),
                        data = {                        // the data to be passed to the url
                            action: 'list',
                            subject: 'notes',
                            id: film_id
                        };
                    $http.get(urlBase, {params: data, cache: true}).                    // notice the dot to start the chain to success()
                    success(function(response){
                        defer.resolve({
                            data: response.ResultSet.Result,         // create data property with value from response
                            rowCount: response.ResultSet.RowCount// create rowCount property with value from response
                        });
                    }).                                         // another dot to chain to error()
                    error(function(err){
                        defer.reject(err);
                    });
                    // the call to getCourses returns this promise which is fulfilled
                    // by the .get method .success or .failure
                    return defer.promise;
                };
                this.getTerm = function(term) {

                    var defer = $q.defer(),
                        data = {                        // the data to be passed to the url
                            action: 'list',
                            subject:'Films',
                            term: term
                        };
                    $http.get(urlBase, {params: data, cache: true}).                    // notice the dot to start the chain to success()
                    success(function(response){
                        defer.resolve({
                            data: response.ResultSet.Result,         // create data property with value from response
                            rowCount: response.ResultSet.RowCount// create rowCount property with value from response
                        });
                    }).                                         // another dot to chain to error()
                    error(function(err){
                        defer.reject(err);
                    });
                    // the call to getCourses returns this promise which is fulfilled
                    // by the .get method .success or .failure
                    return defer.promise;
                };



            }
        ]
    );
}());