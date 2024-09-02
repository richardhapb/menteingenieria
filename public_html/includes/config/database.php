<?php

/**
 * Connect to a MySQL DataBase
 *
 * @return mysqli Returns the database that connected.
 */
function connectDB():mysqli {

if(LOCAL) {
    
    //Local
    $hostname = "127.0.0.1";
    $username = "root";
    $userpass = "root";
    $dbname = "mente_db";
    
} else {

    // Hostinger
    $hostname = "127.0.0.1:3306";
    $username = "u195520240_richard";
    $userpass = "Mentedbrp23";
    $dbname = "u195520240_mente_db";
}

    $db = new mysqli($hostname, $username, $userpass, $dbname);

    if ($db->connect_errno){
        reg("Hubo un error en la conexión: " . $db->connect_errno);
        echo json_encode("Hubo un error en la conexión");
        exit;
    }

    return $db;
}
