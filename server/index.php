<?php
// Require the needed classes and PHP files
require_once("require_once/setEnv.php");
require_once("require_once/errorFunctions.php");
require_once( "classes/webpage.class.php" );
require_once("classes/JSONRecordSet.php");
require_once("classes/SQLiteConnection.class.php");

// Request the various details that will be passed from services.js
$action = isset($_REQUEST["action"]) ? $_REQUEST["action"] : null;
$subject = isset($_REQUEST["subject"]) ? $_REQUEST["subject"] : null;
$id = isset($_REQUEST["id"]) ? $_REQUEST["id"] : null;
$category = isset($_REQUEST["category"]) ? $_REQUEST["category"] : null;
$term = isset($_REQUEST["term"]) ? $_REQUEST["term"] : null;

// Needed in order to receive post,put nad delete methods. Used for editing the notes
if (empty($action)) {
    if ((($_SERVER["REQUEST_METHOD"] == "POST") ||
            ($_SERVER["REQUEST_METHOD"] == "PUT") ||
            ($_SERVER["REQUEST_METHOD"] == "DELETE")) &&
        (strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false)) {

        $input = json_decode(file_get_contents("php://input"), true);

        $action = isset($input["action"]) ? $input["action"] : null;
        $subject = isset($input["subject"]) ? $input["subject"] : null;
        $data = isset($input["data"]) ? $input["data"] : null;
    }
}

// concat action and subject with uppercase first letter of subject
$route = $action . ucfirst($subject);

//Connect to database, try other wise throw connection error
try{
    $db = SQLiteConnection::getConnection();
}
catch (PDOException $e) {
    echo "Connection Error: " . $e->getMessage();
}

//set the header to json because everything is returned in that format
header("Content-Type: application/json");


// take the appropriate action based on the action and subject
switch ($route) {
    // List Of Films
    case "listFilms":
        //First Check if a term is passed.
        if ($term !== null){
            $searchTerm = $term;
            // Format search term
            $searchTerm = preg_replace("#[^0-9a-z]#i", "", $searchTerm);
            // Set statement
            $filmSQL = "SELECT nfc_film.film_id, nfc_film.title, nfc_film.description, nfc_film.release_year, nfc_film.rating,nfc_film.last_update, nfc_category.name
                        FROM nfc_film JOIN  nfc_film_category ON nfc_film.film_id = nfc_film_category.film_id JOIN nfc_category ON nfc_category.category_id = nfc_film_category.category_id
                        WHERE nfc_film.title like'%$searchTerm%'
                        ORDER BY  nfc_film.title";
        }
        // Else if term is null but category is not
        else if($category !== null){
            $searchCat = $category;
            // Set statement to search based on category
            $filmSQL = "SELECT nfc_film.film_id, nfc_film.title, nfc_film.description, nfc_film.release_year, nfc_film.rating,nfc_film.last_update, nfc_category.name
                        FROM nfc_film JOIN  nfc_film_category ON nfc_film.film_id = nfc_film_category.film_id JOIN nfc_category ON nfc_category.category_id = nfc_film_category.category_id
                        WHERE nfc_category.category_id ='$searchCat'
                        ORDER BY  nfc_film.title";
        }
        //Else if both term and category are null return all results
        else{
            $filmSQL = "SELECT nfc_film.film_id, nfc_film.title, nfc_film.description, nfc_film.release_year, nfc_film.rating,nfc_film.last_update, nfc_category.name
                        FROM nfc_film JOIN  nfc_film_category ON nfc_film.film_id = nfc_film_category.film_id JOIN nfc_category ON nfc_category.category_id = nfc_film_category.category_id
                        ORDER BY  nfc_film.title";
        }
        // Echo out retrieved data as JSON
        $rs = new JSONRecordSet();
        $retval = $rs->getRecordSet($filmSQL);
        echo $retval;

        break;

    //List Of Students and Modules
    case 'listActors':
        // Get the Film ID
        $filmID = $id;
        //Search the database for all actor results based on the film ID
        $actorSQL = "SELECT nfc_actor.actor_id, nfc_actor.first_name, nfc_actor.last_name, nfc_film_actor.actor_id, nfc_film_actor.film_id
                     FROM nfc_film_actor 
                     JOIN  nfc_actor ON nfc_actor.actor_id= nfc_film_actor.actor_id
                     WHERE  nfc_film_actor.film_id = '$filmID'
                     ORDER BY  nfc_actor.last_name";
        // Echo out results as JSON
        $rs = new JSONRecordSet();
        $retval = $rs->getRecordSet($actorSQL);
        echo $retval;
        break;

    //List of Courses
    case 'listNotes':
        // Get the Film ID
        $filmID = $id;
        // Search Database for the notes based on film ID
        $notesSQL = "SELECT film_id, comment, lastupdated 
                     FROM nfc_note
                     WHERE film_id = '$filmID'
                     ORDER BY  lastupdated ";
        // Echo out results as JSON
        $rs = new JSONRecordSet();
        $retval = $rs->getRecordSet($notesSQL);
        echo $retval;
        break;

    //Specific Students Modules
    case 'UpdateNote':
        // If data is received
        if (!empty($data)) {
            // Decode the Posted JSON data
            $note = json_decode($data);
            // Prepare Statement
            $noteUpdateSql = "UPDATE nfc_note
                              SET comment=:comment  WHERE film_id=:filmID";
            // Bind parameters for the the update
            // Echo out the status afterwards
            $rs = new JSONRecordSet();
            $retval = $rs->getRecordSet($noteUpdateSql,
                'ResultSet',
                array(':comment'=>$note->comment,
                    ':filmID'=>$note->film_id));
            echo '{"status":"ok", "message":{"text":"updated", "film_id":"'.$note->film_id.'"}}';
        }
        break;

    //Specific Students Modules
    case 'listCategorys':
        // Find a list of all category
        $categorySql = "SELECT nfc_category.name, nfc_category.category_id 
                        FROM nfc_category";

        $rs = new JSONRecordSet();
        $retval = $rs->getRecordSet($categorySql);
        echo $retval;
        break;

    default:

        break;
}


