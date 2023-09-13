<?php
require "funciones.php";

if ($_SERVER["REQUEST_METHOD"] === "POST"){
    // Get data from POST
    $post = getpost($_POST);
    $post1 = getPost($_POST, ["solicitud"]);
    $post2 = getPost($_POST, array_keys($post1)); // Obtains razon

    require "database.php";
    $db = connectDB();

    $result = insertToDB($db, "tblContactos", array_keys($post1), array_values($post1));
    
    // SECOND TABLE

    $post2["idContacto"] = $result; // Add the client id
    insertToDB($db, "tblSolicitudes", array_keys($post2), array_values($post2));

    mysqli_close($db);

    $asunto = "Contacto - Mente Ingeniería";
    $msg = "<p>Hola <b>".$post["nombre"]."</b>,<br><br> Hemos recibido tu solicutd a través de nuestro formulario. Te contactaremos antes de las próximas 24 horas.</p> Atte,<br><br>".contact_signature;
    
    send_email(FROM_EMAIL, $post["email"], $asunto, $msg);

    $asunto = "Un cliente ha llenado el formulario de contacto";
    
    $msg = "<p>Hola,<br> <b>".$post["nombre"]."</b> ha enviado una solicitud, estos son sus datos:<br>";

    foreach($post as $n => $d){
        if($n !== "nombre"){
            $msg .= "<br> <b>". ucwords($n) . ":</b>" . $d;
        }
    }
    
    send_email(FROM_EMAIL, MI_MAILS, $asunto, $msg);
}

?>
