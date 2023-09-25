<?php

namespace Model;

use mysqli;


// This class is the base for tables administration in database
class Table {
    protected static $table = "";
    protected static $columns = [];

    // DATABASE
    protected static $db;

    protected $id;

    // Set the database instance
    public static function setDB(mysqli $db){
        self::$db = $db;
    }

    // Give all of registers for table
    public static function all():array {
        $query = "SELECT * FROM " . static::$table;
        return static::sqlQuery($query);
    }

    // Search for a register with the specificated value
    public static function search(string $column, string $value):array{
        $query = "SELECT * FROM " . static::$table . " ";
        $query .= "WHERE " . $column . "='". $value . "'";
        reg("QUERY DE SEARCH: " . $query);
        $results = self::sqlQuery($query);

        return $results;
    }

    // Return objects for each row that has been found
    protected static function sqlQuery(string $query):array {
        $result = self::$db->query($query);

        $results = [];
        while($row = $result->fetch_assoc()){
            $results[] = static::createObject($row);
        }

        $result->free();

        return $results;
    }

    // Create a new register with the currently attributes
    public function create(): int {
        try {
            $attributes = $this->sanitize();

            // Make the sql query from values
            $query = "INSERT INTO " . static::$table . " (";
            $query .= join(", ", array_keys($attributes));
            $query .= ") VALUES (";
            foreach(array_values($attributes) as $v){
                if(is_int($v) || is_float($v)){
                    $query .= $v . ", ";
                } else {
                    $query .= "'" . $v . "', ";
                }
            }
            // Cut the last comma 
            $query = mb_substr($query, 0, mb_strlen($query) - 2); 
            $query .= ")";

            // For debug
            reg($query);

            self::$db->query($query);
            $result = self::$db->insert_id;
            // Assign the new id
            $this->id = $result;
    
            // Evaluate if is ok
            reg("QUERY SUCCESSFULLY");
    
            return $result;
        } catch (\Throwable $th) {
            reg("ERROR");
            echo json_encode("ERROR IN QUERY");
            return -1;
        }
    }
    
    // Sanitize the values of attributes
    public function sanitize():array {
        $sanitizated = [];

        foreach(static::$columns as $c){
            if($c === "id" || $c === "fechaHora"){
                continue;
            }
            $sanitizated[$c] = self::$db->escape_string($this->$c);
        }

        return $sanitizated;
    }

    // Create a object from an array with register
    protected static function createObject(array $row){
        $object = new static;

        foreach($row as $c => $v){
            if(property_exists($object, $c)){
                $object->$c = $v;
            }
        }

        return $object;
    }

    // Update data of a register, replaceNulls indicates if nulls overwrites another values
    public function update(bool $replaceNulls = false):bool{
        $newValues = $this->sanitize();
        $queryValues = "";
        // Only is in the columns
        foreach ($newValues as $c => $v){
            if(in_array($c, static::$columns)){
                // reg("Valor de v: " . $v);
                // reg("!empty = " . var_export(!empty($v), true) . " || replaceNulls = " . var_export($replaceNulls, true) . " = " . var_export(!is_null($v) || $replaceNulls, true));
                // Don't overwrite if new is empty
                if(!empty($v) || $replaceNulls){
                    if(is_int($v) || is_float($v)){
                        $queryValues .= $c . "=" . $v . ", ";
                    } else {
                        $queryValues .= $c . "=" .  "'" . $v . "', ";
                    }
                }
            }
        }

        // Cut the last comma
        if(!empty($newValues)){
            $queryValues = mb_substr($queryValues, 0, mb_strlen($queryValues) - 2);
        }

        // Make final query
        $query = "UPDATE " . static::$table . " ";
        $query .= "SET " . $queryValues . " ";
        $query .= "WHERE id = " . $this->id;

        // For debug
        reg("QUERY DE UPDATE: " . $query);
        $result = self::$db->query($query);

        return $result;
    }

    // Synchronize the object from $_POST or from DB register, that depends if $_POST is passed or not
    public function synchronize(array $post = []):void {
        // If $_POST is passed
        if(!empty($post)){
            foreach($post as $c => $v){
                if (property_exists($this, $c) && !is_null($v)){
                    $this->$c = $v;
                }
            }
        } elseif(!is_null($this->id)) {
            $query = "SELECT * FROM " . static::$table . " ";
            $query .= "WHERE id=" . $this->id;
            $results = static::sqlQuery($query);

            foreach(static::$columns as $c){
                $this->$c = $results[0]->$c;
            }
        }
    }
}
