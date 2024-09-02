
<?php

mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

define("ROOT", __DIR__ . "/../../..");
define("PUB", ROOT . "/public_html");

define("LOCAL", str_contains(ROOT, "richard"));

require PUB . "/includes/config/database.php";
require PUB . "/includes/config/funciones.php";
require ROOT . "/vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(ROOT);
$dotenv->load();

// Log file in root
define("LOG", ROOT . "/log.txt");

use App\Mail;

if(LOCAL) {
    Mail::setTeamMails(["richard.pena@menteingenieria.com", "richard.hapb@icloud.com"]);
} else {   
    Mail::setTeamMails(["richard.pena@menteingenieria.com"]);
}
Mail::setFromName("Equipo Mente Ingeniería");
Mail::setFromMail("contacto@menteingenieria.com");
Mail::setFromPass('MenteIngenieria!23');
Mail::setFromSignatureFromFile(ROOT . "/contact-signature.html");
Mail::setSMTP("smtp.titan.email");

?>

