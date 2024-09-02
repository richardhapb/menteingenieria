ALTER TABLE `tblSolicitudes` ADD
    idServicio INT(3) NOT NULL;

DELETE FROM tblSolicitudes;

ALTER TABLE tblSolicitudes 
    ADD CONSTRAINT FK_tblSolicitudes_tblServicios
    FOREIGN KEY (idServicio)
    REFERENCES tblServicios(id);

SELECT * FROM `tblSolicitudes`;
