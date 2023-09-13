<?php

/**
 * Connect to a MySQL DataBase
 *
 * @return mysqli Returns the database that connected.
 */
function connectDB():mysqli {
    //Local
    $hostname = "localhost";
    $username = "root";
    $userpass = "";
    $dbname = "mente_db";
    
    // Hostinger
    // $hostname = "127.0.0.1:3306";
    // $username = "u195520240_richard";
    // $userpass = "Mentedbrp23";
    // $dbname = "u195520240_mente_db";

    $db = mysqli_connect($hostname, $username, $userpass, $dbname);

    if (!$db){
        echo json_encode("Hubo un error en la conexión");
        exit;
    }

    return $db;
}
