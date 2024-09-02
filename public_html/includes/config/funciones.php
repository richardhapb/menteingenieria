<?php

define("QUOTE_PATH", ROOT ."/att/MING-001-Listado_de_precios.pdf");


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
