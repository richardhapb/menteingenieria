<?php

use App\Mail;

require "config/app.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){

    $db = connectDB();
    
    $post = getPost($db, $_POST);

    if(!insertToDB($db, "tblContactos", array_keys($post), array_values($post))){
        reg("SQL QUERY ERROR");
    }

    mysqli_close($db);

    $msg = "<p>Hola <b>".$post["nombre"]."</b>,<br><br> En adjunto puedes obtener la cotización con el detalle de los servicios que ofrecemos. </p> Atte,<br><br>";

    $mailUser = new Mail([$post["email"]], "Cotización - Mente Ingeniería", $msg, [QUOTE_PATH]);
    reg($mailUser->sendMail());

    $msg = "<p>Hola,<br> <b>".$post["nombre"]."</b> ha solicitado una cotización y ha sido enviada, su correo es: <b>" . $post["email"] . "</b>.</p>";
    
    $mailMI = new Mail(Mail::getTeamMails(), "Un cliente ha llenado el formulario de inicio", $msg);
    $mailMI->sendMail();
    
}

?>
