<?php

use App\Mail;
use Model\Contacto;
use Model\Solicitud;
use Model\Table;

require_once "config/app.php";

$db = connectDB();
Table::setDB($db);


if ($_SERVER["REQUEST_METHOD"] === "POST"){

    $contacto = new Contacto();

    $contacto->synchronize($_POST);
    $contacto->standarize();

    $oldReg = $contacto::search("email", $contacto->email)[0];

    // If update or create
    if($oldReg){
        $contacto->id = $oldReg->id;
        $contacto->update();
        $idContacto["idContacto"] = $contacto->id;
    } else {
        $idContacto["idContacto"] = $contacto->create();
        if(!$idContacto == -1){
            reg("SQL QUERY ERROR");
        }
        $contacto->synchronize();
    }

    $solicitud = new Solicitud();

    // Connect Contactos with Solicitudes
    $solicitud->synchronize(array_merge($_POST, $idContacto));
    if(!$solicitud->create() == -1){
        reg("SQL QUERY ERROR");
    }

    // Updates data in object
    $solicitud->synchronize();
    
    $msg = "<p>Hola <b>".$contacto->nombre."</b>,<br><br> Hemos recibido tu solicutd a través de nuestro formulario. Te contactaremos antes de las próximas 24 horas.</p> Atte,<br><br>";
    
    // Send to user mail
    $mailUser = new Mail([$contacto->email], "Contacto - Mente Ingeniería", $msg);
    $mailUser->sendMail();
    
    $msg = "<p>Hola,<br> <b>". $contacto->nombre ."</b> ha enviado una solicitud, estos son sus datos:<br>";

    foreach($contacto::$columns as $c){
        if($c !== "nombre"){
            $msg .= "<br> <b>". ucwords($c) . ": </b>" . $contacto->$c;
        }
    }
    
    // Send to MI team mail
    $mailMI = new Mail(Mail::getTeamMails(), "Un cliente ha llenado el formulario de contacto", $msg);
    $mailMI->sendMail();
}

?>
