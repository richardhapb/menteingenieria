<?php 

namespace Model;

// This class represent the Solicitud table from Database
class Solicitud extends Table{
    public static $table = "tblSolicitudes";
    public static $columns = ["id", "idContacto", "solicitud", "fechaHora", "idServicio"];

    
    public $id;
    public $idContacto;
    public $solicitud;
    public $fechaHora;
    public $idServicio;

    public function __construct(array $args = [])
    {
        $this->id = $args["id"] ?? null;
        $this->idContacto = $args["idContacto"] ?? "";
        $this->solicitud = $args["solicitud"] ?? "";
        $this->fechaHora = $args["fechaHora"] ?? null;
        $this->idServicio = $args["idServicio"] ?? "";
    }

}

?>

