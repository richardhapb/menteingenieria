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
        $hostname = $_ENV["HOSTNAME"];
        $username = $_ENV["USERNAME"];
        $userpass = $_ENV["USERPASS"];
        $dbname = $_ENV["DBNAME"];
}

    $db = new mysqli($hostname, $username, $userpass, $dbname);

    if ($db->connect_errno){
        reg("Hubo un error en la conexión: " . $db->connect_errno);
        echo json_encode("Hubo un error en la conexión");
        exit;
    }

    return $db;
}
