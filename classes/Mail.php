<?php

namespace App;

use Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

class Mail {
    protected static $teamMails = [];
    protected static $fromName = "";
    protected static $fromMail = "";
    protected static $fromSignature = "";
    protected static $smtp = "";


    protected $to = [];
    protected $subject = "";
    protected $message = "";
    protected $attachments = [];

    function __construct(array $to = [], string $subject = "", string $message = "", array $attachments = [])
    {
        $this->to = $to;
        $this->subject = $subject;
        $this->message = $message;
        $this->attachments = $attachments;
    }

    /**
     * set teamMails attribute
     *
     * @param  string $mails Mails to set
     * @return void
     */
    public static function setTeamMails(array $mails = []):void{
        self::$teamMails = $mails;
    }
    /**
     * set fromMail attribute
     *
     * @param  string $mail Mail to set
     * @return void
     */
    public static function setfromMail(string $mail):void{
        self::$fromMail = $mail;
    }
    /**
     * set fromName attribute
     *
     * @param  string $name Name to set
     * @return void
     */
    public static function setfromName(string $name):void{
        self::$fromName = $name;
    }
    /**
     * set signature for from mail
     *
     * @param  string $signature Mails to set
     * @return void
     */
    public static function setFromSignature(string $signature):void{
        self::$fromSignature = $signature;
    }

     /**
     * set signature for from mail reading a file
     *
     * @param  string $filepath Path to file with signature
     * @return bool True if successfully
     */
    public static function setFromSignatureFromFile(string $filepath):bool{
        if(file_exists($filepath)){
            $result = file_get_contents($filepath);
            if($result){
                self::$fromSignature = $result;
                return true;
            }
        }
        return false;
    }

    /**
     * Set SMTP server
     *
     * @param  string $smtp String of SMTP server
     * @return void
     */
    public static function setSMTP(string $smtp):void{
        self::$smtp = $smtp;
    }
    
    /**
     * Set the attachments for mail
     *
     * @param array $args Array with attachmentes paths
     * @return void
     */
    public function setAttachments(array $args = []):void{
        $this->attachments = $args;
    }

    /**
     * Set the destination mails
     *
     * @param array $mails Array with mails
     * @return void
     */
    public function setTo(array $mails = []):void{
        $this->to = $mails;
    }

    /**
     * Set the subject for mail
     *
     * @param string $subject String with the subject
     * @return void
     */

    public function setSubject(string $subject):void{
        $this->subject = $subject;
    }

    /**
     * Set the message for mail
     *
     * @param string $message String with the message
     * @return void
     */

     public function setMessage(string $message):void{
        $this->message = $message;
    }

    /**
     * Set the message for mail
     *
     * @param string $filepath String with the message
     * @return bool True if successfully
     */

     public function setMessageFromFile(string $filepath):bool{
        if(file_exists($filepath)){
            $result = file_get_contents($filepath);
            if($result){
                $this->message = $result;
                return true;
            }
        }
        return false;
    }

    /**
     * Get teamMails attribute
     *
     * @return array
     */
    public static function getTeamMails():array{
        return self::$teamMails;
    }
    /**
     * Get fromMail attribute
     *
     * @return string
     */
    public static function getfromMail():string{
        return self::$fromMail;
    }

    /**
     * Get fromMail attribute
     *
     * @return string
     */
    public static function getfromName():string{
        return self::$fromName;
    }    

    /**
     * Get signature for from mail
     *
     * @return string
     */
    public static function getFromSignature():string{
        return self::$fromSignature;
    }
    /**
     * Get SMTP server
     *
     * @return string
     */
    public static function getSMTP():string{
        return self::$smtp;
    }
    
    /**
     * Get the attachments for mail
     *
     * @return array
     */
    public function getAttachments():array{
        return $this->attachments;
    }

    /**
     * Get the destination mails
     *
     * @return string
     */
    public function getTo():array{
        return $this->to;
    }

    /**
     * Get the subject for mail
     *
     * @return string
     */

    public function getSubject():string{
        return $this->subject;
    }

    /**
     * Get the message for mail
     *
     * @return string
     */

     public function getMessage():string{
        return $this->message;
    }

    /**
     * Send an email that can contain a file attached
     *
     * @return bool True when email has been sended successfully
     */
    public function sendMail() :bool {

        $mail = new PHPMailer(true);
        $mail->setLanguage("es", ROOT."/vendor/phpmailer/phpmailer/language/phpmailer.lang-es.php");
        $mail->CharSet = "UTF-8";
        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = self::$smtp;                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = $_ENV["MAIL_USER"];                     //SMTP username
            $mail->Password   = $_ENV["MAIL_PASS"];                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
            $mail->Port       = $_ENV['MAIL_PORT'];                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        
            //Recipients
            $mail->setFrom(self::$fromMail, self::$fromName);
            if (is_array($this->to)){
                foreach ($this->to as $m) {
                    $mail->addAddress($m);
                }
            } else {
                $mail->addAddress($this->to);     //Add a recipient
            }

            if(!empty($this->attachments)){
                // Only if attachment is indicated
                if (is_array($this->attachments)){
                    foreach ($this->attachments as $a) {
                        $mail->addAttachment($a);
                    }
                } else {
                    $mail->addAttachment($this->attachments);     //Add a recipient
                }
            }

            //$mail->addAddress('ellen@example.com');               //Name is optional
            $mail->addReplyTo(self::$fromMail, self::$fromName);
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');
        
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
        
            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = $this->subject;
            $mail->Body    = $this->message . "<br><br>" . self::$fromSignature;
            
            //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            $mail->send();
            return true;
        } catch (Exception $e) {
            reg($e->getMessage());
            return false;
        }
    }

}

?>