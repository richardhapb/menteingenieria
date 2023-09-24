<?php

namespace Model;

// This class represent the Solicitud table from Database
class Servicio extends Table{
    public static $table = "tblServicios";
    public static $columns = ["id", "servicio"];

    
    public $id;
    public $servicio;

    public function __construct(array $args = [])
    {
        $this->id = $args["id"] ?? null;
        $this->servicio = $args["servicio"] ?? "";
    }

}

?>