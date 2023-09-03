<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de contacto - Mente Ingeniería</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="build/css/app.css">
</head>
<body>
    <header class="header">
        <picture class="logo">
            <source srcset="build/img/logo-primario.avif" type="image/avif">
            <source srcset="build/img/logo-primario.webp" type="image/webp">
            <link rel="icon" href="favicon.ico" type="image/x-icon">
            <img loading="lazy" width=300 height=200 src="build/img/logo-primario.jpg" alt="Logo">
        </picture>
    </header>
    <main>
        <form class="form">
            <h1>Ingrese sus datos y solicitud</h1>
            <p>Todos los campos son obligatorios</p>
            <label>Ingrese nombre</label>
            <input class="required" autocomplete="off" type="text" name="nombre" placeholder="Nombre">
            <label>Ingrese correo electrónico</label>
            <input class="required" autocomplete="off" type="text" name="email" placeholder="Email">
            <label>Ingrese número de teléfono</label>
            <input class="required" autocomplete="off" type="text" name="telefono" placeholder="+569...">
            <label>Indique su empresa</label>
            <input class="required" autocomplete="off" type="text" name="empresa" placeholder="Empresa">
            <label>¿A través de que medio nos ubicó?</label>
            <select class="form__select required" name="medio">
                <option value="" disabled>Seleccione...</option>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
                <option value="correo">Correo electrónico</option>
                <option value="recomendacion">Recomendación</option>
                <option value="otro">Otro</option>
            </select>
            <label>Indique la razón por la que nos contacta</label>
            <textarea class="form__razon required" autocomplete="off" name="razon"cols="30" rows="10" placeholder="¿En qué podemos ayudar?"></textarea>
            <input class="form__submit" type="submit" value="Enviar">
        </form>
    </main>
    <script src="build/js/functions.js"></script>
    <script src="build/js/form-contact.js"></script>
</body>
</html>