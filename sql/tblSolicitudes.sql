-- Active: 1688929214369@@127.0.0.1@3306@mente_db
CREATE TABLE tblSolicitudes (
    id INT(11) AUTO_INCREMENT NOT NULL,
    idContacto INT(11) NOT NULL,
    solicitud VARCHAR(700) NULL,
    fechaHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_tblSolicitudes_tblContactos
    FOREIGN KEY (idContacto)
    REFERENCES tblContactos(id)
);
