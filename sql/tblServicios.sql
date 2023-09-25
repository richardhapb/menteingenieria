
CREATE TABLE tblServicios (
    id INT(3) AUTO_INCREMENT NOT NULL,
    servicio VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO `tblServicios` (servicio) VALUES ("Implementación ISO 9001"), ("Implementación ISO 14001"), ("Implementación ISO 45001"), ("Implementación ISO 50001"), ("Implementación ISO 55001"), ("Implementación ISO 14064"), ("Implementación ISO 39001"), ("Implementación ISO 27001");

INSERT INTO `tblServicios` (servicio) VALUES ("Implementación ISO 27001");

SELECT * FROM `tblServicios`;
