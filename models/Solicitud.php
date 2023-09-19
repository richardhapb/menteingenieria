<?php 

namespace Model;

class Solicitud extends Table{
    public static $table = "tblSolicitudes";
    public static $columns = ["id", "idContacto", "solicitud", "fechaHora"];

    
    public $id;
    public $idContacto;
    public $solicitud;
    public $fechaHora;

    public function __construct(array $args = [])
    {
        $this->id = $args["id"] ?? null;
        $this->idContacto = $args["idContacto"] ?? "";
        $this->solicitud = $args["solicitud"] ?? "";
        $this->fechaHora = $args["fechaHora"] ?? null;
    }

}

?>

