<!DOCTYPE html>
<html lang="es">

<head>
    <?php

    use Model\Servicio;

    include("includes/head.php"); 
    include("includes/short-form.php");
    $servicios = Servicio::all();
    
    ?>

    <title>Home - Mente Ingeniería</title>
</head>
<body>
<?php include("includes/header.php"); ?>    
<main class="container mente-p">
    <div class="img-brochure">
        <picture>
            <source srcset="build/img/brochure.avif" type="image/avif">
            <source srcset="build/img/brochure.webp" type="image/webp">
            <img loading="lazy" width=300 height=200 src="build/img/brochure.png" alt="Brochure de Mente Ingeniería">
        </picture>
    </div>
    <h1>Nuestros servicios</h1>
    <p> En mente ingeniería nos interesa mantener una relación de confianza con nuestros clientes, en este apartado puedes obtener el catálogo de los servicios que ofrecemos y también algo de información adicional referente a nosotros.</p>


    <p>Puedes revisar la información de nuestra empresa de forma online aquí: <a href="https://view.genial.ly/64e93a21e74949001987f632">Brochure</a></p>

    <p>También puedes descargar nuestro brochure en PDF: <a href="brochure/MI-brochure-2023.pdf">Brochure</a></p>
</main>

    <form class="form">
        <h1>Solicita información</h1>
        <p>Escribe tu nombre y correo, indicanos que servicio te interesa y te haremos llegar de inmediato más información.</p>
        <input class="required" autocomplete="off" type="text" name="nombre" placeholder="Nombre">
        <input class="required" autocomplete="off" type="text" name="email" placeholder="Email">
        <select class="form__select required" name="idServicio">
            <option value="" selected disabled>-- Selecciona servicio --</option>
            <?php foreach($servicios as $s) {?>
                <option value="<?php echo $s->id ?>"><?php echo $s->servicio ?></option>
            <?php } ?>
        </select>
        <input class="form__submit" type="submit" value="Enviar">
    </form>

<?php include("includes/footer.php"); ?>

<script src="build/js/validation.js"></script>
<script src="build/js/functions.js"></script>
<script src="build/js/short-form.js"></script>
</body>
</html>

