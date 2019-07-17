(function () {
    "use strict";

    angular.module('filmApp').
    controller('IndexController',   // controller given two params, a name and an array
        [
            '$scope',               // angular variable as a string
            function ($scope) {
                // add a title property which we can refer to in our view (index.html in this example)
                $scope.title = 'Films';

            }
        ]

    ).
    controller('filmController',
        [
            '$scope',
            'dataService',
            '$location',
            function ($scope, dataService, $location)  {
                var getFilms = function () {
                    dataService.getFilms().then(  // then() is called when the promise is resolve or rejected
                        function(response){
                            $scope.filmCount  = response.rowCount + ' films';
                            $scope.films      = response.data;
                        },
                        function(err){
                            $scope.status = 'Unable to load data ' + err;
                        },
                        function(notify){
                            console.log(notify);
                        }
                    ); // end of getCourses().then
                };
                var getCategorys = function(){
                    dataService.getCategorys().then(
                        function (response) {
                            $scope.categoryCount = response.rowCount + ' categorys';
                            $scope.categorys = response.data;
                        },
                        function (err){
                            $scope.status = 'Unable to load data ' + err;
                        }
                    );  // end of getStudents().then
                };
               $scope.selectedFilms = {};
                $scope.selectFilm = function ($event, film) {
                   $scope.selectedFilms = film;
                    $location.path('/films/' + film.film_id);
                };
                $scope.searchTerms = function(){

                };
                getCategorys();
                getFilms();  // call the method just defined
            }
        ]
    ).
    controller('FilmActorsController',
        [
            '$scope',
            'dataService',
            '$routeParams',
            function ($scope, dataService, $routeParams){
                $scope.actors = [ ];
                $scope.actorCount = 0;

                var getActors = function (film_id) {
                    dataService.getActors(film_id).then(
                        function (response) {
                            $scope.actorCount = response.rowCount + ' actors';
                            $scope.actors = response.data;
                        },
                        function (err){
                            $scope.status = 'Unable to load data ' + err;
                        }
                    );  // end of getStudents().then
                };

                // only if there has been a courseid passed in do we bother trying to get the students
                if ($routeParams && $routeParams.film_id) {
                    console.log($routeParams.film_id);
                    getActors($routeParams.film_id);
                }
                var getNotes = function (film_id) {
                    dataService.getNotes(film_id).then(
                        function (response) {
                            $scope.noteCount = response.rowCount + ' notes';
                            $scope.notes = response.data;
                        },
                        function (err){
                            $scope.status = 'Unable to load data ' + err;
                        }
                    );  // end of getStudents().then
                };

                // only if there has been a courseid passed in do we bother trying to get the students
                if ($routeParams && $routeParams.film_id) {
                    console.log($routeParams.film_id);
                    getNotes($routeParams.film_id);

                    $scope.showEditNote= function ($event, note, editorID) {
                        var element = $event.currentTarget,
                            padding = 22,
                            posY = (element.offsetTop + element.clientTop + padding) - (element.scrollTop + element.clientTop),
                            showEditNote = document.getElementById(editorID);

                        console.log(note);
                        $scope.selectedNote = angular.copy(note);
                        $scope.editorVisible = true;

                        showEditNote.style.position = 'absolute';
                        showEditNote.style.top = posY + 'px';
                    };
                }
                /**
                 * Abandon the edit in progress
                 */
                $scope.abandonEdit = function () {
                    $scope.editorVisible = false;
                    $scope.selectedStudent = null;
                };

                /**
                 * functions, attached to $scope so they're visible in the view,
                 * to handle editing a student
                 *
                 * @param {object} student
                 * @returns {null}
                 */
                $scope.saveNote = function (){
                    var n,
                        ncount = $scope.notes.length,
                        currentNote;

                    $scope.editorVisible = false;
                    // call dataService method
                    dataService.updateNote($scope.selectedNote).then(
                        function (response) {
                            $scope.status = response.status;
                          //  if (response.status === 'ok') { // if we saved the file then update the screen
                                console.log(response);
                                for (n = 0; n < ncount; n += 1) {
                                    currentNote = $scope.notes[n];
                                    if (currentNote.film_id === $scope.selectedNote.film_id) {
                                        $scope.notes[n] = angular.copy($scope.selectedNote);
                                        break;
                                    }
                                }
                            //}
                          //  else{
                                console.log("not Okr");
                          //  }

                            // reset selectedStudent
                            $scope.selectedNote = null;
                        },
                        function (err) {
                            $scope.status = "Error with save " + err;
                        }
                    );
                };
            }
        ]
    );
}());
