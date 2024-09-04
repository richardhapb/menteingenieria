<?php

use App\Mail;
use Model\Contacto;
use Model\Servicio;
use Model\Solicitud;
use Model\Table;

require_once "config/app.php";

$db = connectDB();
Table::setDB($db);

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $contacto = new Contacto();
    $contacto->synchronize($_POST);
    $contacto->standarize();

    // Lockin for old register for update
    $oldReg = $contacto::search("email", $contacto->email)[0];
    reg(var_export($oldReg, true));

    // Update o create
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
    
    $servicio = Servicio::search("id", $_POST["idServicio"]);

    // Is generic for this request
    $regSolicitud["idServicio"] = $servicio[0]->id;
    $regSolicitud["solicitud"] = $servicio[0]->servicio;
    reg(var_export($regSolicitud, true));

    $solicitud = new Solicitud();

    $solicitud->synchronize(array_merge($regSolicitud, $idContacto));
    if(!$solicitud->create() == -1){
        reg("SQL QUERY ERROR");
    }

    // Updates object data
    $solicitud->synchronize();

    $msg = "<p>Hola <b>".$contacto->nombre."</b>,<br><br> En adjunto puedes obtener el detalle referente al servicio de " . $servicio[0]->servicio . ". </p> Atte,<br><br>";

    // Send the user mail
    $mailUser = new Mail([$contacto->email], "Cotización - Mente Ingeniería", $msg, [QUOTE_PATH]);
    $mailUser->sendMail();

    $msg = "<p>Hola,<br> <b>".$contacto->nombre."</b> ha solicitado información de <b>" . $servicio[0]->servicio . "</b> y ha sido enviada, su correo es: <b>" . $contacto->email . "</b>.</p>";
    
    // Send the MI mail
    $mailMI = new Mail(Mail::getTeamMails(), "Un cliente ha llenado el formulario de inicio", $msg);
    $mailMI->sendMail();
    
}

?>
