<?php

use App\Mail;
use Model\Contacto;
use Model\Solicitud;
use Model\Table;

require "config/app.php";

if ($_SERVER["REQUEST_METHOD"] === "POST"){

    $db = connectDB();

    Table::setDB($db);

    $contacto = new Contacto();

    $contacto->synchronize($_POST);
    $contacto->standarize();
    $idContacto["idContacto"] = $contacto->create();
    if(!$idContacto == -1){
        reg("SQL QUERY ERROR");
    }

    $contacto->synchronize();


    $solicitud = new Solicitud();

    $solicitud->synchronize(array_merge($_POST, $idContacto));
    if(!$solicitud->create() == -1){
        reg("SQL QUERY ERROR");
    }

    $solicitud->synchronize();

    
    $msg = "<p>Hola <b>".$contacto->nombre."</b>,<br><br> Hemos recibido tu solicutd a través de nuestro formulario. Te contactaremos antes de las próximas 24 horas.</p> Atte,<br><br>";
    
    $mailUser = new Mail([$contacto->email], "Contacto - Mente Ingeniería", $msg);
    $mailUser->sendMail();
    
    $msg = "<p>Hola,<br> <b>". $contacto->nombre ."</b> ha enviado una solicitud, estos son sus datos:<br>";

    foreach($contacto::$columns as $c){
        if($c !== "nombre"){
            $msg .= "<br> <b>". ucwords($c) . ": </b>" . $contacto->$c;
        }
    }
    
    $mailMI = new Mail(Mail::getTeamMails(), "Un cliente ha llenado el formulario de contacto", $msg);
    $mailMI->sendMail();
}

?>
