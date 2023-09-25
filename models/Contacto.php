<?php

namespace Model;

// This class represent the tblContactos table in DataBase
class Contacto extends Table {
    public static $table = "tblContactos";
    public static $columns = ["id", "nombre", "email", "telefono", "empresa", "fechaHora"];

    
    public $id;
    public $nombre;
    public $email;
    public $telefono;
    public $empresa;
    public $fechaHora;

    public function __construct(array $args = [])
    {
        $this->id = $args["id"] ?? null;
        $this->nombre = $args["nombre"] ?? "";
        $this->email = $args["email"] ?? "";
        $this->telefono = $args["telefono"] ?? "";
        $this->empresa = $args["empresa"] ?? "";
        $this->fechaHora = $args["fechaHora"] ?? null;
    }

    // Validates if value are corrects
    public function validate():bool {
        $result = true;
        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
            $result = false;
        }

        return $result;
    }

    // Standarizes the values that DataBase expceted
    public function standarize():void {
        $this->nombre = ucwords(strtolower($this->nombre));
        $this->email = strtolower($this->email);

        foreach(static::$columns as $c){
            $this->$c = trim($this->$c);
        }
    }
}