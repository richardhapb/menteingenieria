<?php

define("LOG", __DIR__ . "/../log.txt");

mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

include(__DIR__."/../vendor/autoload.php");

define("MI_MAILS", ["laura.guerrero@menteingenieria.com", "richard.pena@menteingenieria.com"]);
define("FROM_EMAIL", "contacto@menteingenieria.com");
define("QUOTE_PATH", __DIR__."/../att/MING-001-Listado_de_precios.pdf");
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


/**
 * Make a register to a file for debug
 *
 * @param  string $data Data to log
 * @param  string $log_file Path and name of log file
 * @return void
 */
function reg(string $data, string $log_file = LOG) : void {
    
    $file = fopen($log_file, "a") or die("Unable to open file");

    fwrite($file, $data . "\n");

    fclose($file);
}



/**
 * Insert a register to MySQL DataBase
 *
 * @return int The insert id, 0 in case if have an error
 */
function insertToDB(mysqli $db, string $table, array $names, array $data):int {
    try {
        // Make the sql query from names
        $sql = "INSERT INTO $table (";

        foreach($names as $name){
            $sql .= $name . ", ";
        }
        // Cut the last comma
        $sql = mb_substr($sql, 0, strlen($sql) - 2); 
        $sql .= ") VALUES (";

        // Make sql query from data
        foreach($data as $d){
            if(is_int($d) || is_float($d)){
                $sql .= $d . ", ";
            } else {
                $sql .= "'" . $d . "', ";
            }
        }
        // Cut the last comma
        $sql = mb_substr($sql, 0, strlen($sql) - 2); 
        $sql .= ")";

        // Query DataBase
        $result = mysqli_query($db, $sql);

        $id = mysqli_insert_id($db);

        // Evaluate if is ok
        reg("QUERY SUCCESSFULLY");

        return $id;
    } catch (\Throwable $th) {
        reg("ERROR");
        echo json_encode("ERROR IN QUERY");
        return 0;
    }
}



/**
 * Send an email that can contain a file attached
 *
 * @param  string|array $from Sender email, that can be more of 1 in array
 * @param  string|array $to Receiber email, that can be more of 1 in array
 * @param  string $subject Subject of email
 * @param  string $message Message of email, that can be HTML
 * @param  string $att_path Path of attachment if exists, if is empty, can't send attachment
 * @return bool True when email has been sended successfully
 */
function send_email(string|array $from, string|array $to, string $subject, string $message, string $att_path = "") :bool {

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
        return true;
    } catch (Exception $e) {
        return false;
    }
}

/**
 * Get the names and data from post.
 *
 * @param  array $POST The $_POST variable from Form
 * @param array $exclude Names of values that don't interest obtain
 * @return array [$names, $data]
 */
function getPost(array $POST, array $exclude = []):array {
    $names = array_keys($POST);
    $data = [];
    $final = [];
    $j = 0;

    for($i = 0; $i < count($POST); $i++){
        if(!in_array($names[$i], $exclude)){
            array_push($data, str_replace("'", "''" , trim($POST[$names[$i]])));

            switch($data[$j]){
                case "nombre":
                    $data[$j] = ucwords($data[$i]);
                    break;
                case "email":
                    $data[$j] = strtolower($data[$i]);
            }
            $final[$names[$i]] = $data[$j];
            $j++;
        }
    }

    return $final;
}
