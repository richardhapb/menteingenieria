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
        $sql = mb_substr($sql, 0, mb_strlen($sql) - 2); 
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
        $sql = mb_substr($sql, 0, mb_strlen($sql) - 2); 
        $sql .= ")";

        reg($sql);
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
 * Get the names and data from post.
 *
 * @param mysqli $db Database for validating
 * @param  array $POST The $_POST variable from Form
 * @param array $exclude Names of values that don't interest obtain
 * @return array [$names, $data]
 */
function getPost(mysqli $db, array $POST, array $exclude = []):array {
    $names = array_keys($POST);
    $data = [];
    $final = [];
    $j = 0;

    for($i = 0; $i < count($POST); $i++){
        if(!in_array($names[$i], $exclude)){
            array_push($data, str_replace("'", "''" , mysqli_real_escape_string($db ,trim($POST[$names[$i]]))));

            switch($names[$i]){
                case "nombre":
                    $data[$j] = ucwords($data[$i]);
                    break;
                case "email":
                    $data[$j] = filter_var(strtolower($data[$i]), FILTER_VALIDATE_EMAIL);
                    if (!$data[$j]){
                        exit;
                    }
                    break;
            }
            $final[$names[$i]] = $data[$j];
            $j++;
        }
    }

    return $final;
}
