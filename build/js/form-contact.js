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

    const result = sendForm(formulario, "includes/form-contacto.php", "Formulario enviado con éxito, en breve te contactaremos.", "Existen campos vacíos");
    
    if(result){
        limpiarFormulario(formulario);
        select.selectedIndex = 0;
    }
});

// Cambia la clase una vez se selecciona un valor para cambiar el color del texto
select.addEventListener("change", () => select.classList.add(`${claseSelect}--selected`))

