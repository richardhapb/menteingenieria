<?php

use App\Mail;

require "config/app.php";

if ($_SERVER["REQUEST_METHOD"] === "POST"){

    $db = connectDB();

    // Get data from POST
    $post = getpost($db, $_POST);
    $post1 = getPost($db, $_POST, ["solicitud"]);
    $post2 = getPost($db, $_POST, array_keys($post1)); // Obtains razon

    $result = insertToDB($db, "tblContactos", array_keys($post1), array_values($post1));
    
    // SECOND TABLE

    $post2["idContacto"] = $result; // Add the client id
    insertToDB($db, "tblSolicitudes", array_keys($post2), array_values($post2));

    mysqli_close($db);

    
    $msg = "<p>Hola <b>".$post["nombre"]."</b>,<br><br> Hemos recibido tu solicutd a través de nuestro formulario. Te contactaremos antes de las próximas 24 horas.</p> Atte,<br><br>";
    
    $mailUser = new Mail([$post["email"]], "Contacto - Mente Ingeniería", $msg);
    $mailUser->sendMail();
    
    $msg = "<p>Hola,<br> <b>".$post["nombre"]."</b> ha enviado una solicitud, estos son sus datos:<br>";

    foreach($post as $n => $d){
        if($n !== "nombre"){
            $msg .= "<br> <b>". ucwords($n) . ": </b>" . $d;
        }
    }
    
    $mailMI = new Mail(Mail::getTeamMails(), "Un cliente ha llenado el formulario de contacto", $msg);
    $mailMI->sendMail();
}

?>
