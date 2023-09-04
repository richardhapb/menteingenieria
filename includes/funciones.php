<?php

function console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(",", $output);

    echo "<script>console.log(' Debug: " . $output . "' );</script";
}

function insertar_contacto() {
    try {
        // Acceso a la DB
        require "database.php";
        $nombre = $_POST["nombre"];
        $email = $_POST["email"];
        $telefono = $_POST["telefono"];
        $empresa = $_POST["empresa"];
        $medio = $_POST["medio"];
        $razon = $_POST["razon"];
        $fecha = date("Y-m-d");
        
        // Constula SQL
        $sql = "INSERT INTO CONTACTOS (nombre, email, telefono, empresa, medio, razon, fecha) VALUES ('$nombre', '$email', '$telefono', '$empresa', '$medio', '$razon', '$fecha')";
        // Realizar consulta
        $result = mysqli_query($db, $sql);
        mysqli_close($db);
        echo json_encode("Consulta realizada exitosamente.");
    } catch (\Throwable $th) {
        echo json_encode("ERROR");
    }
    $headers =
    "From: contacto@menteingenieria.com" .
    "\r\n" .
    "Reply-To: richard.pena@menteingenieria.com, laura.guerrero@menteingenieria.com" .
    "\r\n" .

    $asunto = "Formulario enviado exitosamente";

    $msg = "Hola '$nombre'\n Recibimos tu formulario correctamente, en breve te contactaremos para revisar los detalles.";

    enviar_mail($email, $asunto, $msg, $headers);

    $mails = "laura.guerrero\@menteingenieria.com, richard.pena\@menteingenieria.com";
    $asunto = "Un cliente ha llenado un formulario";

    $msg = "Hola,\n '$nombre' ha enviado un formulario, estos son sus datos:\n Email: '$email'\n Teléfono: '$telefono'\n Motivo: '$razon'\n\n Los contactó a través de '$medio'\n\n Contáctalo pronto.";

    enviar_mail($mails, $asunto, $msg, $headers);
    
}

function enviar_mail($email, $asunto, $mensaje, $header){
    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($mensaje, 70);

    // send email
    mail($email, $asunto, $msg, $header);
}
