<?php

/**
 * Class Config
 * Sets up path for the SQLliteConnection class, also stores login details for if an online database was needed
 */
class Config {
    // Driver for database is sqlite
    const DB_DRIVER = 'sqlite';

    //Path to the db file
    const PATH_TO_SQLITE_FILE = 'db/nfc_films_v2.sqlite';

    // Needed for connecting to a non local DB
    const DSN = 'mysql:host=localhost;dbname=unn_w16015149';
    const USERNAME ='unn_w16015149';
    const PASSWD ='-';
    const OPTIONS = array ('PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION');
}