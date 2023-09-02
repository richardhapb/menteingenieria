"use strict";

const claseFormulario = "form";
const claseObligatorio = "required";
const claseSelect = "form__select";

const formulario = document.querySelector(`.${claseFormulario}`);
const select = formulario.querySelector(`.${claseSelect}`);

limpiarFormulario(formulario);
select.selectedIndex = 0; // Selecciona el primer elemento (disabled)


formulario.addEventListener("submit", function(e){
    e.preventDefault();
    // Si el formulario se valida
    if(validarFormularioVacio(formulario, claseObligatorio)) {
        console.log("Formulario validado");
        enviarFormulario(formulario, "./includes/form-contacto.php");
        alert("Formulario enviado con éxito, en breve te contactaremos.");
        return;
    }
    const error = mostrarErrorFormulario(formulario, "Hay campos obligatorios que están vacíos", true);
    console.log("Existen campos vacíos");

    // Elimina el mensaje de error luego de 5 segundos.
    setTimeout(() => error.remove(), 5000);
});

// Cambia la clase una vez se selecciona un valor para cambiar el color del texto
select.addEventListener("change", () => select.classList.add(`${claseSelect}--selected`))

