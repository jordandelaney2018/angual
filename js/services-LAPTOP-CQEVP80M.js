(function () {
    "use strict"; // turn on javascript strict syntax mode

    angular.module("filmApp").
    service("dataService",
        [
         /**
         *
         * @param $q
         * @param $http
         */
            "$q",
            "$http",
            function($q, $http) {

                // Holds the base URL
                var urlBase = "/wai-assignment/server/index.php";

                /**
                 * Sends link to the index.php and gets the echo'd JSON
                 * @returns {Promise<any>}
                 */
                this.getFilms = function () {
                    var defer = $q.defer(),
                        // The promise
                        data = {    // the data to be passed to the url
                            action: "list",
                            subject: "films",
                        };
                    $http.get(urlBase, {params: data, cache: true}).
                    success(function(response){
                        defer.resolve({
                            data: response.ResultSet.Result,
                            rowCount: response.ResultSet.RowCount  // create rowCount property with value from response
                        });
                    }).
                    error(function(err){
                        defer.reject(err);
                    });

                    return defer.promise;
                };
                /**
                 * Gets List of actors for a given film
                 * @param film_id
                 * @returns {Promise<any>}
                 */
                this.getActors = function (film_id) {
                        var defer = $q.defer(),
                            data = {
                                action: "list",
                                subject: "actors",
                                id: film_id
                            };
                            $http.get(urlBase, {params: data, cache: true}).
                            success(function(response){
                                defer.resolve({
                                    data: response.ResultSet.Result,
                                });
                            }).
                            error(function(err){
                                defer.reject(err);
                            });
                        return defer.promise;
                };
                /**
                 * Gets the list of category for the drop down
                 * @returns {Promise<any>}
                 */
                this.getCategorys = function () {
                    var defer = $q.defer(),
                        data = {
                            action: "list",
                            subject: "categorys"
                        };
                    $http.get(urlBase, {params: data, cache: true}).
                    success(function(response){
                        defer.resolve({
                            data: response.ResultSet.Result,
                            rowCount: response.ResultSet.RowCount
                        });
                    }).
                    error(function(err){
                        defer.reject(err);
                    });
                    return defer.promise;
                };
                /**
                 * Gets the notes for the provided film_ID
                 * @param film_id
                 * @returns {Promise<any>}
                 */
                this.getNotes = function (film_id) {
                    var defer = $q.defer(),
                        data = {
                            action: "list",
                            subject: "notes",
                            id: film_id
                        };
                    $http.get(urlBase, {params: data, cache: true}).
                    success(function(response){
                        defer.resolve({
                            data: response.ResultSet.Result,
                            rowCount: response.ResultSet.RowCount
                        });
                    }).
                    error(function(err){
                        defer.reject(err);
                    });
                    return defer.promise;
                };
                /**
                 * POSTS the data to the index.php to update the database
                 * @param note
                 * @returns {promise|*}
                 */
                this.updateNote = function (note) {
                    var defer = $q.defer(),
                        data = {
                            action: "update",
                            subject: "note",
                            data: angular.toJson(note)
                        };

                    $http.post(urlBase, data).
                    success(function(response){
                        defer.resolve(response);
                    }).
                    error(function (err){
                        defer.reject(err);
                    });
                    return defer.promise;
                };
            }
        ]
    );
}());