<?php

function console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(",", $output);

    echo "<script>console.log(' Debug: " . $output . "' );</script>";
}

function reg($data, $log_file = "log.txt") {
    
    $file = fopen($log_file, "a") or die("Unable to open file");

    fwrite($file, $data . "\n");

    fclose($file);
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
        
        // Constula SQL
        $sql = "INSERT INTO tblContactos (nombre, email, telefono, empresa, medio, razon) VALUES ('$nombre', '$email', '$telefono', '$empresa', '$medio', '$razon')";

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

function insert_short_form() {
    try {
        // Acceso a la DB
        require "database.php";
        $nombre = $_POST["nombre"];
        $email = $_POST["email"];
        
        // Constula SQL
        $sql = "INSERT INTO tblContactos (nombre, email) VALUES ('$nombre', '$email')";
        // Realizar consulta
        $result = mysqli_query($db, $sql);
        if ($result){
            echo json_encode("Consulta realizada exitosamente.");
        } else {
            echo json_encode("Hubo un error en la consuta.");
        }
        mysqli_close($db);
    } catch (\Throwable $th) {
        echo json_encode("ERROR");
    }

    define("mails", "laura.guerrero\@menteingenieria.com, richard.pena\@menteingenieria.com");
    define("from", "contacto\@menteingenieria.com");
    define("att_path", "../att/cotizacion.pdf");


    $asunto = "Cotización - Mente Ingeniería";
    $msg = "Hola '$nombre'\n En adjunto puedes obtener la cotización con el listado de precios.\n Agradecemos que nos hayas contactado.";

    send_email(from, $email, $asunto, $msg, att_path);
    $asunto = "Un cliente ha llenado un formulario";

    $msg = "Hola, '$nombre'\n ha solicitado una cotizaicón y ha sido enviada, estos son sus datos:\n Email: '$email'";

    send_email(from, mails, $asunto, $msg, att_path);
    
}

function enviar_mail($email, $asunto, $mensaje, $header){
    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($mensaje, 70);

    // send email
    mail($email, $asunto, $msg, $header);
}

function send_email($from, $to, $subject, $message, $att_path = "") {

    reg($to);

    $size = filesize($att_path);
    $type = filetype($att_path);
    $name = basename($att_path);

    (file_exists($att_path)) ? reg("SI EXISTE") : reg("NO EXISTE") ;
    reg($att_path);
    reg($size);
    reg($type);
    reg($name);

    //read from the uploaded file & base64_encode content
    $handle = fopen($att_path, "r"); // set the file handle only for reading the file
    $content = fread($handle, $size); // reading the file
    fclose($handle);                 // close upon completion


    $encoded_content = chunk_split(base64_encode($content));
    //$boundary = md5("random"); // define boundary with a md5 hashed value
    $boundary = uniqid();
    reg($boundary);
 
    //header
    $headers = "MIME-Version: 1.0\r\n"; // Defining the MIME version
    $headers .= "From:".$from."\r\n"; // Sender Email
    $headers .= "Reply-To: ".mails."\r\n"; // Email address to reach back
    $headers .= "Content-Type: multipart/mixed;"; // Defining Content-Type
    $headers .= "boundary = \"".$boundary."\"\r\n"; //Defining the Boundary
         
    //plain text
    $body = "--".$boundary."\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($message));
         
    //attachment
    $body .= "--".$boundary."\r\n";
    $body .="Content-Type: ".$type."; name=\"".$name."\"\r\n";
    $body .="Content-Disposition: attachment; filename=\"".$name."\"\r\n";
    $body .="Content-Transfer-Encoding: base64\r\n";
    //$body .="X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";
    $body .= $encoded_content; // Attaching the encoded file with email
    $body .= "--".$boundary."--";
     
    $sentMailResult = mail($to, $subject, $body, $headers);

    if($sentMailResult ) {
        reg("File Sent Successfully.");
        // unlink($name); // delete the file after attachment sent.
    } else {
        reg("Sorry but the email could not be sent.
        Please go back and try again!");
        die("Sorry but the email could not be sent.
                    Please go back and try again!");
    }
 
}
