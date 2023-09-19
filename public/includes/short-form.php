<?php

use App\Mail;
use Model\Contacto;
use Model\Table;

require "config/app.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $db = connectDB();

    Table::setDB($db);

    $contacto = new Contacto();
    $contacto->synchronize($_POST);
    $contacto->standarize();
    if(!$contacto->create() == -1){
        reg("SQL QUERY ERROR");
    }

    $msg = "<p>Hola <b>".$contacto->nombre."</b>,<br><br> En adjunto puedes obtener la cotización con el detalle de los servicios que ofrecemos. </p> Atte,<br><br>";

    $mailUser = new Mail([$contacto->email], "Cotización - Mente Ingeniería", $msg, [QUOTE_PATH]);

    $msg = "<p>Hola,<br> <b>".$contacto->nombre."</b> ha solicitado una cotización y ha sido enviada, su correo es: <b>" . $contacto->email . "</b>.</p>";
    
    $mailMI = new Mail(Mail::getTeamMails(), "Un cliente ha llenado el formulario de inicio", $msg);
    $mailMI->sendMail();
    
}

?>
