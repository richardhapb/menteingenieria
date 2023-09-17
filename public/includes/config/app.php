
<?php

mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

define("ROOT", __DIR__ . "/../../..");
define("PUB", ROOT . "/public");

require ROOT . "/public/includes/config/database.php";
require ROOT . "/public/includes/config/funciones.php";
include(ROOT . "/vendor/autoload.php");

// Log file in root
define("LOG", ROOT . "/log.txt");

?>

