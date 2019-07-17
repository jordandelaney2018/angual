<?php
//Require config class in order to get location of database
require_once 'Config.class.php';

/**
 * Class SQLiteConnection
 * Called to connect to database
 */
class SQLiteConnection {
    /**
     * @var null
     * Declare Private Static PDO variable
     */
    private static $pdo = null;

    /**
     * @return PDO|null
     * Function to get connection to database
     */
    public static function getConnection() {

        if (!self::$pdo) {
            try{
                // Gets location from Config.class
            self::$pdo = new \PDO("sqlite:" . Config::PATH_TO_SQLITE_FILE);
        } catch (\PDOException $e) {
            echo"Connection error " . $e->getMessage();
                exit;
        }

        }
        return self::$pdo;
    }
}
?>