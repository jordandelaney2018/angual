(function () {
    "use strict"; // turn on javascript strict syntax mode
    angular.module("filmApp").
    controller("IndexController",
        [/**
         *
         * @param $scope
         */
            "$scope",
            function ($scope) {
                // add a title property which we can refer to in our view (index.html in this example)
                $scope.title = "Films";

            }
        ]

    ).
    controller("filmController",
        [
         /**
          * Sends request to the services to retrieve and display the film list and category drop down
         * @param $scope
         * @param dataService
         * @param $location
         */
            "$scope",
            "dataService",
            "$location",
            function ($scope, dataService, $location)  {
                var getFilms = function () {
                    dataService.getFilms().then(  // then() is called when the promise is resolve or rejected
                        function(response){
                            $scope.filmCount  = response.rowCount + " films";
                            $scope.films      = response.data;
                        },
                        function(err){
                            $scope.status = "Unable to load data " + err;
                        },
                        function(notify){
                            console.log(notify);
                        }
                    );
                };
                var getCategorys = function(){
                    dataService.getCategorys().then(
                        function (response) {
                            $scope.categoryCount = response.rowCount + " categorys";
                            $scope.categorys = response.data;
                        },
                        function (err){
                            $scope.status = "Unable to load data " + err;
                        }
                    );
                };
                // Function to redirect to the correct URL when a film is selected
                $scope.selectedFilms = {};
                $scope.selectFilm = function ($event, film) {
                    $scope.selectedFilms = film;
                    $location.path("/films/" + film.film_id);
                };

                getCategorys();
                getFilms();  // call the method just defined
            }
        ]
    ).
    controller("FilmActorsController",
        [
         /**
          * Film Actor controller, responsible for retrieving and displaying the actors as well as the notes
          * Also includes functionality to edit and save notes
         * @param $scope
         * @param dataService
         * @param $routeParams
         */
            "$scope",
            "dataService",
            "$routeParams",
            function ($scope, dataService, $routeParams){
                $scope.actors = [ ];
                $scope.actorCount = 0;
                // Gets actor List
                var getActors = function (film_id) {
                    dataService.getActors(film_id).then(
                        function (response) {
                            $scope.actorCount = response.rowCount + " actors";
                            $scope.actors = response.data;
                        },
                        function (err){
                            $scope.status = "Unable to load data " + err;
                        }
                    );
                };
                if ($routeParams && $routeParams.film_id) {
                    console.log($routeParams.film_id);
                    getActors($routeParams.film_id);
                }
                // Gets notes related to the selected film
                var getNotes = function (film_id) {
                    dataService.getNotes(film_id).then(
                        function (response) {
                            $scope.noteCount = response.rowCount + " notes";
                            $scope.notes = response.data;
                        },
                        function (err){
                            $scope.status = "Unable to load data " + err;
                        }
                    );
                };

                // Only if film params have been passed in should it find the notes
                if ($routeParams && $routeParams.film_id) {
                    console.log($routeParams.film_id);
                    getNotes($routeParams.film_id);
                    // Shows the Edit note Box
                    $scope.showEditNote= function ($event, note, editorID) {
                        var element = $event.currentTarget,
                            padding = 22,
                            posY = (element.offsetTop + element.clientTop + padding) - (element.scrollTop + element.clientTop),
                            showEditNote = document.getElementById(editorID);

                        // Creates copy of the note
                        $scope.selectedNote = angular.copy(note);
                        $scope.editorVisible = true;

                        showEditNote.style.position = "absolute";
                        showEditNote.style.top = posY + "px";
                    };
                }
                // Abandon the copy if we decide to not edit
                $scope.abandonEdit = function () {
                    $scope.editorVisible = false;
                    $scope.selectedStudent = null;
                };
                // Otherwise save the copy and update the database with that copy
                $scope.saveNote = function (){
                    var n,
                        ncount = $scope.notes.length,
                        currentNote;

                    $scope.editorVisible = false;
                    // call dataService method
                    dataService.updateNote($scope.selectedNote).then(
                        function (response) {
                            $scope.status = response.status;
                            console.log(response);
                            for (n = 0; n < ncount; n += 1) {
                                currentNote = $scope.notes[n];
                                if (currentNote.film_id === $scope.selectedNote.film_id) {
                                    $scope.notes[n] = angular.copy($scope.selectedNote);
                                    break;
                                }
                            }

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

