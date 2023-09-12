<?php

mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

include("../vendor/autoload.php");

define("mails", ["laura.guerrero@menteingenieria.com", "richard.pena@menteingenieria.com"]);
define("from", "contacto@menteingenieria.com");
define("att_path", "../att/MING-001-Listado_de_precios.pdf");
define("contact_signature", "
<style>
@import url('https://fonts.googleapis.com/css2?family=Michroma&family=News+Cycle:wght@400;700&display=swap');
</style>
<table style='font-family: Arial, sans-serif; color: #2e9aa4;max-width:500px;' cellspacing='0' cellpadding='0' border='0'>
    <tbody>
        <tr>
            <td colspan='2' style='padding-bottom: 4px; border-bottom: 1px solid #2f9aa3;' width='500'>
                <span style='font-size: 18pt; color: #252b48; font-family: Michroma, News Cycle, Arial;'><strong>Equipo Mente Ingeniería</strong></span>
                <span><br></span>
                <span style='font-size: 10pt; color: #445069; font-family: News Cycle, Arial'>Contacto <span> | </span></span>
                <span>
            <a href='https://www.menteingenieria.com' target='_blank' rel='noopener' style='font-size: 10pt; color: #003e4d !important; text-decoration:none ; font-weight: bold;'><span style='font-size: 10pt; color: #5B9A8B !important; text-decoration:none ; font-weight: bold; font-family: News Cycle, Arial'>www.menteingenieria.com</span></a>
                </span>
            </td>
        </tr>
        <tr>
            <td style='padding-top: 0px;' width='120'>
                <p style='padding: 0px; margin: 0px;'>
                    <picture>
                    <source srcset='https://menteingenieria.com/build/img/logo.avif' type='image/avif'>
                    <source srcset='https://menteingenieria.com/build/img/logo.webp' type='image/webp'>
                    <img loading='lazy' style='max-width:110px; height:auto;'width='110px' border='0' src='https://menteingenieria.com/build/img/logo.jpg' alt='Logo'>
                    </picture>
                </p>
            </td>
            <td style='padding-top: 0px;'>
                <p style='padding-bottom: 2px; margin-bottom: 0px; padding-top: 0px; margin-top: 0px; line-height: 10pt; '><span style='font-size: 9pt; line-height: 10pt; color: #2e9aa4; font-weight: bold;'></span> <span style='font-size: 9pt; line-height: 10pt; color: #101010; font-family: News Cycle, Arial'>+569 4417 5484 / +569 4007 4354</span></p>
                <p style='padding-bottom: 2px; margin-bottom: 0px; padding-top: 0px; margin-top: 0px; line-height: 10pt; '>
                <p style='padding-bottom: 2px; margin-bottom: 0px; padding-top: 0px; margin-top: 0px; line-height: 10pt; '><span style='font-size: 9pt; line-height: 10pt; color: #2e9aa4; font-weight: bold; font-family: News Cycle, Arial'></span> <a href='mailto:{contacto@menteingenieria.com}' style='text-decoration: none; font-size: 9pt; line-height: 10pt;  color: #101010; font-family: News Cycle, Arial'><span style='text-decoration: none; font-size: 9pt; line-height: 10pt;  color: #101010'>contacto@menteingenieria.com</span></a></p>
                <p style=' line-height: 10pt; padding-bottom: 2px; margin-bottom: 0px; padding-top: 0px; margin-top: 0px;'>
                    <span style='font-size: 9pt;  line-height: 10pt; color: #2e9aa4; font-weight: bold; font-family: News Cycle, Arial'></span>
                    <span style='font-size: 9pt;  line-height: 10pt; color: #101010; font-family: News Cycle, Arial'>Antofagasta, Chile</span>
                    <span style='font-size: 9pt;  line-height: 10pt; color: #101010'></span><span style='font-size: 9pt;  line-height: 10pt; color: #101010'> </span>
                    
                <p style='margin-bottom: 0px; padding-bottom: 0px; padding-top: 0px; margin-top: 4px;'>
            </td>
        </tr>
        <tr>
            <td colspan='2' style='padding-top:10px;'>
                <p style='font-size:7pt; line-height:8pt; color: #959595; font-family: Arial, sans-serif;  text-align:justify;'>
            </td>
        </tr>
    </tbody>
</table>
");


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
        $nombre = ucwords(trim($_POST["nombre"]));
        $email = strtolower(trim($_POST["email"]));
        $telefono = trim($_POST["telefono"]);
        $empresa = trim($_POST["empresa"]);
        $medio = trim($_POST["medio"]);
        $razon = trim($_POST["razon"]);
        
        // Constula SQL
        $sql = "INSERT INTO tblContactos (nombre, email, telefono, empresa, medio, razon) VALUES ('$nombre', '$email', '$telefono', '$empresa', '$medio', '$razon')";

        // Realizar consulta
        $result = mysqli_query($db, $sql);
        mysqli_close($db);
        echo json_encode("Consulta realizada exitosamente.");
    } catch (\Throwable $th) {
        echo json_encode("ERROR");
    }


    $asunto = "Contacto - Mente Ingeniería";
    $msg = "<p>Hola <b>$nombre</b>,<br><br> Hemos recibido tu solicutd a través de nuestro formualario. Te contactaremos antes de las próximas 24 horas.</p> Atte,<br><br>".contact_signature;

    send_email(from, $email, $asunto, $msg);
    $asunto = "Un cliente ha llenado el formulario de contacto";

    $msg = "<p>Hola,<br> <b>$nombre</b> ha enviado una solicitud, estos son sus datos: 
    <br> <b> Email: </b>$email
    <br> <b> Teléfono: </b>$telefono
    <br> <b> Empresa: </b>$empresa
    <br> <b> Medio: </b>$medio
    <br> <b> Razón: </b>$razon
    </p>";

    send_email(from, mails, $asunto, $msg);
    
}

function insert_short_form() {
    try {
        // Acceso a la DB
        require "database.php";
        $nombre = ucwords(trim($_POST["nombre"]));
        $email = strtolower(trim($_POST["email"]));
        reg("================");
        reg("Variables");
        reg($nombre);
        reg($email);
        reg("POST");
        reg($_POST["nombre"]);
        reg($_POST["email"]);
        
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


    $asunto = "Cotización - Mente Ingeniería";
    $msg = "<p>Hola <b>$nombre</b>,<br><br> En adjunto puedes obtener la cotización con el detalle de los servicios que ofrecemos. </p> Atte,<br><br>".contact_signature;

    send_email(from, $email, $asunto, $msg, att_path);
    $asunto = "Un cliente ha llenado el formulario de inicio";

    $msg = "<p>Hola,<br> <b>$nombre</b> ha solicitado una cotización y ha sido enviada, su correo es: <b>$email</b>.</p>";

    send_email(from, mails, $asunto, $msg);
    
}

function enviar_mail($email, $asunto, $mensaje, $header){
    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($mensaje, 70);

    // send email
    mail($email, $asunto, $msg, $header);
}

function send_email($from, $to, $subject, $message, $att_path = "") {

    $mail = new PHPMailer(true);
    $mail->setLanguage("es", "../vendor/phpmailer/phpmailer/language/phpmailer.lang-es.php");
    $mail->CharSet = "UTF-8";
    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.titan.email';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'contacto@menteingenieria.com';                     //SMTP username
        $mail->Password   = 'MenteIngenieria!23';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    
        //Recipients
        $mail->setFrom($from, 'Equipo Mente Ingeniería');
        if (is_array($to)){
            foreach ($to as $m) {
                $mail->addAddress($m);
            }
        } else {
            $mail->addAddress($to);     //Add a recipient
        }

        // Only if attachment is indicated
        
        if($att_path !== ""){
            $mail->addAttachment($att_path);         //Add attachments
        }

        //$mail->addAddress('ellen@example.com');               //Name is optional
        $mail->addReplyTo($from, 'Equipo Mente Ingeniería');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');
    
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $message;
        
        //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
