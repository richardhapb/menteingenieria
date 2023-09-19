<?php

namespace Model;

class Contacto extends Table {
    public static $table = "tblContactos";
    public static $columns = ["id", "nombre", "email", "telefono", "empresa", "medio", "fechaHora"];

    
    public $id;
    public $nombre;
    public $email;
    public $telefono;
    public $empresa;
    public $medio;
    public $fechaHora;

    public function __construct(array $args = [])
    {
        $this->id = $args["id"] ?? null;
        $this->nombre = $args["nombre"] ?? "";
        $this->email = $args["email"] ?? "";
        $this->telefono = $args["telefono"] ?? "";
        $this->empresa = $args["empresa"] ?? "";
        $this->medio = $args["medio"] ?? "";
        $this->fechaHora = $args["fechaHora"] ?? null;
    }

    public function validate():bool {
        $result = true;
        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)){
            $result = false;
        }

        return $result;
    }

    public function standarize():void {
        $this->nombre = ucwords(strtolower($this->nombre));
        $this->email = strtolower($this->email);

        foreach(static::$columns as $c){
            $this->$c = trim($this->$c);
        }
    }
}