'use strict';

const claseFormulario = 'form';
const claseObligatorio = 'required';
const claseSelect = 'form__select';

const formulario = document.querySelector(`.${claseFormulario}`);
try {
  const select = formulario.querySelector(`.${claseSelect}`);
  if (select){
    select.selectedIndex = 0; // Selecciona el primer elemento (disabled)
  }
} catch (error) {
  console.log(error)
}

limpiarFormulario(formulario);

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const result = sendForm(formulario, 'contacto.php', 'Formulario enviado con éxito, en breve te contactaremos.', 'Existen campos vacíos');

  if (result) {
    limpiarFormulario(formulario);
    try {
      select.selectedIndex = 0; // Selecciona el primer elemento (disabled)
    } catch (error) {
      console.log(error)
    }
  }
});

try {
  // Cambia la clase una vez se selecciona un valor para cambiar el color del texto
  select.addEventListener('change', () => select.classList.add(`${claseSelect}--selected`));
  
} catch (error) {
  console.log(error)
}
