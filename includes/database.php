<?php

$hostname = "localhost";
$username = "root";
$userpass = "";
$dbname = "mente_db";

$db = mysqli_connect($hostname, $username, $userpass, $dbname);


if(!$db) {
    echo json_encode("Hubo un error en la conexión");
    exit;
}

