<?php

require "funciones.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){


    require "database.php";
    $db = connectDB();    
    
    $post = getPost($db, $_POST);

    if(!insertToDB($db, "tblContactos", array_keys($post), array_values($post))){
        reg("SQL QUERY ERROR");
    }

    mysqli_close($db);

    $asunto = "Cotización - Mente Ingeniería";
    $msg = "<p>Hola <b>".$post["nombre"]."</b>,<br><br> En adjunto puedes obtener la cotización con el detalle de los servicios que ofrecemos. </p> Atte,<br><br>".contact_signature;
    
    send_email(FROM_EMAIL, $post["email"], $asunto, $msg, QUOTE_PATH);
    $asunto = "Un cliente ha llenado el formulario de inicio";
    
    $msg = "<p>Hola,<br> <b>".$post["nombre"]."</b> ha solicitado una cotización y ha sido enviada, su correo es: <b>$email</b>.</p>";
    
    send_email(FROM_EMAIL, MI_MAILS, $asunto, $msg);
    
}

?>
