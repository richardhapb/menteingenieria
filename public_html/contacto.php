<!DOCTYPE html>
<html lang="es">
<head>
    <title>Formulario de contacto - Mente Ingeniería</title>
    <?php

use Model\Servicio;

    include("includes/head.php"); 
    include("includes/form-contacto.php");

    $servicios = Servicio::all();
    ?>
</head>
<body>
    <?php  include("includes/header.php");  ?>
    <main>
        <form class="form">
            <h1>Ingrese sus datos y solicitud</h1>
            <label>Ingrese nombre</label>
            <input class="required" autocomplete="off" type="text" name="nombre" placeholder="Nombre">
            <label>Ingrese correo electrónico</label>
            <input class="required" autocomplete="off" type="text" name="email" placeholder="Email">
            <label>Ingrese número de teléfono</label>
            <input class="required" autocomplete="off" type="text" name="telefono" placeholder="+569...">
            <label>Indique su empresa</label>
            <input class="required" autocomplete="off" type="text" name="empresa" placeholder="Empresa">
            <label>Indiquenos que servicio le interesa</label>
            <select class="form__select required" name="idServicio">
                <option value="" selected disabled>-- Seleccione servicio --</option>
                <?php foreach($servicios as $s) {?>
                    <option value="<?php echo $s->id ?>"><?php echo $s->servicio ?></option>
                <?php } ?>
            </select>
            <label>Indique la razón por la que nos contacta</label>
            <textarea class="form__razon required" autocomplete="off" name="solicitud"cols="30" rows="10" placeholder="¿En qué podemos ayudar?" maxlength="700"></textarea>
            <input class="form__submit" type="submit" value="Enviar">
        </form>
    </main>
    <?php include("includes/footer.php"); ?>
    <script src="build/js/validation.js"></script>
    <script src="build/js/functions.js"></script>
    <script src="build/js/form-contact.js"></script>
</body>
</html>
