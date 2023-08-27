"use strict";

const claseFormulario = "form-contacto";
const claseObligatorio = "obligatorio";
const claseSelect = "form-contacto__select";

const formulario = document.querySelector(`.${claseFormulario}`);
const select = formulario.querySelector(`.${claseSelect}`);

limpiarFormulario(formulario);
select.selectedIndex = 0; // Selecciona el primer elemento (disabled)


formulario.addEventListener("submit", function(e){
    e.preventDefault();

    // Si el formulario se valida
    if(validarFormularioVacio(formulario, claseObligatorio)) {
        console.log("Formulario validado");
        return;
    }
    const error = mostrarErrorFormulario(formulario, "Hay campos obligatorios que están vacíos.", true);
    console.log("Existen campos vacíos");

    // Elimina el mensaje de error luego de 5 segundos.
    setTimeout(() => error.remove(), 5000);
});

// Cambia la clase una vez se selecciona un valor para cambiar el color del texto
select.addEventListener("change", () => select.classList.add(`${claseSelect}--seleccionado`))

