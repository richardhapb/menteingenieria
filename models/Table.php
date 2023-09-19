<?php

namespace Model;

use mysqli;

class Table {
    protected static $table = "";
    protected static $columns = [];

    protected static $db;

    protected $id;

    public static function setDB(mysqli $db){
        self::$db = $db;
    }

    public static function all():array {
        $query = "SELECT * FROM " . static::$table;
        return static::sqlQuery($query);
    }

    public static function search(string $column, string $value){
        $query = "SELECT id FROM " . static::$table . " ";
        $query .= "WHERE " . $column . " = ". $value;
        $results = self::sqlQuery($query);

        return $results;
    }

    protected static function sqlQuery(string $query):array {
        $result = self::$db->query($query);

        $results = [];
        while($row = $result->fetch_assoc()){
            $results[] = static::createObject($row);
        }

        $result->free();

        return $results;
    }

    public function create(): int {
        try {
            $attributes = $this->sanitize();

            // Make the sql query from names
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

            reg($query);

            self::$db->query($query);
            $result = self::$db->insert_id;
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

    protected static function createObject(array $row){
        $object = new static;

        foreach($row as $c => $v){
            if(property_exists($object, $c)){
                $object->$c = $v;
            }
        }

        return $object;
    }

    public function update():bool{
        $newValues = $this->sanitize();
        $queryValues = "";
        // Only is in the columns
        foreach ($newValues as $c => $v){
            if(in_array($c, static::$columns)){
                if(is_int($v) || is_float($v)){
                    $queryValues .= $c . "=" . $v . ", ";
                } else {
                    $queryValues .= $c . "=" .  "'" . $v . "', ";
                }
            }
        }

        if(!empty($values)){
            $queryValues = mb_substr($queryValues, 0, mb_strlen($queryValues) - 2); 
            $queryValues .= ")";
        }

        $query = "UPDATE " . static::$table . " ";
        $query .= "SET " . $queryValues . " ";
        $query .= "WHERE id = " . $this->id;

        $result = self::$db->query($query);

        return $result;
    }

    public function synchronize(array $post = []):void {
        if(!empty($post)){
            foreach($post as $c => $v){
                if (property_exists($this, $c) && !is_null($v)){
                    $this->$c = $v;
                }
            }
        } elseif(!is_null($this->id)) {
            $query = "SELECT * FROM " . static::$table . " ";
            $query .= "WHERE id=" . $this->id;
            reg("UPDATE DE DATOS: ".$query);
            $results = static::sqlQuery($query);

            foreach(static::$columns as $c){
                $this->$c = $results[0]->$c;
            }
        }
    }
}
