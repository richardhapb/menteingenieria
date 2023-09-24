<!DOCTYPE html>
<html lang="es">

<head>
    <?php include("includes/head.php");  ?>
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

    <p>Dentro de nuestro alcance se encuentran desarrollos con el manejo de información, gestión etratégica, ingeniería de procesos, automatización digital y soportes informáticos, a continuación detallamos algunos de ellos:</p>

    <ul class="actividades">
        <li>Diseño, limpieza, estructura y normalización de bases de datos.</li>
        <li>Creación, mantenimiento y consultas en bases de datos relacionales SQL.</li>
        <li>Reportabilidad y análisis de datos con Python.</li>
        <li>Scripts en Python.</li>
        <li>Macros y programación VBA en Excel.</li>
        <li>Creación de reportes dinámicos Power BI.</li>
        <li>Presetaciones de estrategia o datos organizacionales.</li>
        <li>Diagramas de procesos.</li>
        <li>Investigación de mercado y tendencias.</li>
        <li>Clases de Excel, básico, intermedio y avanzado.</li>
        <li>Clases de Power BI, básico, intermedio y avanzado.</li>
    </ul>


    <p>Puedes revisar la información de nuestra empresa de forma online aquí: <a href="https://view.genial.ly/64e93a21e74949001987f632">Brochure</a></p>

    <p>También puedes descargar nuestro brochure en PDF: <a href="brochure/MI-brochure-2023.pdf">Brochure</a></p>
</main>

    <form class="form invisible">
        <h1>Solicita información</h1>
        <p>Escribe tu nombre y correo, indicanos que norma te interesa y te haremos llegar de inmediato más información.</p>
        <input class="required" autocomplete="off" type="text" name="nombre" placeholder="Nombre">
        <input class="required" autocomplete="off" type="text" name="email" placeholder="Email">
        <select class="form__select required" name="idServicio">
            <option value="" selected disabled>-- Seleccione servicio --</option>
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

