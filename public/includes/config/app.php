
<?php

mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

define("ROOT", __DIR__ . "/../../..");
define("PUB", ROOT . "/public");

require ROOT . "/public/includes/config/database.php";
require ROOT . "/public/includes/config/funciones.php";
require ROOT . "/vendor/autoload.php";

// Log file in root
define("LOG", ROOT . "/log.txt");

use App\Mail;

Mail::setTeamMails(["richard.pena@menteingenieria.com", "richard.hapb@icloud.com"]);
Mail::setFromName("Equipo Mente Ingeniería");
Mail::setFromMail("contacto@menteingenieria.com");
Mail::setFromPass('MenteIngenieria!23');
Mail::setFromSignatureFromFile(ROOT . "/contact-signature.html");
Mail::setSMTP("smtp.titan.email");

?>

