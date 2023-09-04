"use strict";


/**
 * Reiniciará todos los campos del formulario
 * @param {HTMLFormElement} formulario Formulario que se limpipará
 * @param {Boolean} dinamico Indica si el formulario es dinámico o no
 * @param {Boolean} simple Indica si el formlario tiene divisiones en DIV o no
 * @param {String} claseElementoDinamico Clase que referencia el elemento que debe ser eliminado
 * @param {String} claseContador Clase que indica el elemento contador en caso de existir
 */
function limpiarFormulario(formulario, simple = true,  dinamico = false, claseElementoDinamico = null, claseContador = null) {
    // Accede a cada campo individual del formulario (considera 2 anidaciones) y los deja en "".
    if (!simple) { // Si tiene DIV
        try {
            for(let i = 0; i < formulario.childNodes.length; i++) {
                for(let j = 0; j < formulario.childNodes[i].childNodes.length; j++) {
                    // Se cambia todo menos el boton submit
                    if(!formulario.childNodes[i].isSameNode(formulario.querySelector('[type="submit"]'))){
                        formulario.childNodes[i].childNodes[j].value = "";
                    }
                }
            }
        } catch (exc){
            console.log(exc);
            }
    } else { // Si es simple
        try {
            for(let i = 0; i < formulario.childNodes.length; i++) {
                // Se cambia todo menos el boton submit
                if(!formulario.childNodes[i].isSameNode(formulario.querySelector('[type="submit"]'))){
                    formulario.childNodes[i].value = "";
                }
            }
        } catch (exc){
            console.log(exc);
            }
    }

    // Si es dinámico elimina los elementos y reinicia.
    if(dinamico){
        const elementos = formulario.querySelectorAll(`.${claseElementoDinamico}`);
        for(let i = 0; i < elementos.length; i++){
            elementoCloneRemove(formulario, claseElementoDinamico, false, claseContador)
        }
    }
}

/**
 * Duplica o elimina un elemento HTML de un formulario, se utiliza para formularios dinámicos, en donde se puede agregar o eliminar un elemento.
 * @param {HTMLFormElement} formulario Formulario en donde se duplicará o eliminará el campo
 * @param {String} claseElemento Clase HTML del campo que se duplicará o eliminará
 * @param {Boolean} agrega true en caso que se duplique, false en caso que se elimine
 * @param {String} claseContador Clase HTML de algún campo de texto si es que tiene un contador de cantidad
 */
function elementoCloneRemove(formulario, claseElemento, agrega = true, claseContador = "") {
    
    // Obtiene todos los elementos de la clase
    const elementos = formulario.querySelectorAll(`.${claseElemento}`)

    // Extrae el último elemento para reubicar parrafo/error si es que existe
    const last = formulario.lastChild

    // Selecciona el último elemento de la clase
    const elemento = elementos[elementos.length - 1];
    
    // Agrega el nuevo elemento al final del formulario
    if(agrega){
        const nuevo = elemento.cloneNode(true);
        const nuevos = nuevo.childNodes;

        // Vacía los campos del elemento nuevo
        for(let i = 0; i < nuevos.length; i++) {
            try {
                nuevos[i].value = "";
            } catch (exc) {
                console.log(exc);
            }
        }

        formulario.appendChild(nuevo);
    } else if (elementos.length > 1) {
        elemento.remove();
    }
    

    // Actualiza el número de elementos en el dato
    if(claseContador !== "") {
        const elementos = document.querySelectorAll(`.${claseElemento}`);
        formulario.querySelector(`.${claseContador}`).value = elementos.length
    }

    // Reubica el botón de guardar
    const boton = formulario.querySelector(`.${button}`);
    formulario.appendChild(boton);

    console.log(last);
    
    // Reubica el parrafo de error u otro si es que existe
    if(last.tagName === "P") {
        formulario.appendChild(last);
    }
}

/**
 * Reinicia el contador al valor que se le pase como argumento
 * @param {HTMLFormElement} formulario Formulario que contiene el contador
 * @param {String} contador Clase de contador a reiniciar
 * @param {Number} valor Valor que tomará el contador
 */

function reiniciarContador(formulario, contador, valor = 1) {
    formulario.querySelector(`.${contador}`).value = valor
}


/**
 * Valida un formulario para ver si tiene campos vacíos que son obligatorios.
 * @param {HTMLFormElement} formulario Formulario que se validará
 * @param {String} claseObligatorio Clase de HTML que indica que el campo es obligatorio
 * @returns {Boolean} true si el formulario se validó o false si no se validó
 */
function validarFormularioVacio(formulario, claseObligatorio) {

    const elementos = formulario.querySelectorAll(`.${claseObligatorio}`);
    
    const error = document.createElement("P");
    error.classList.add("errorCampo");
    error.textContent = "Debe ingresar información.";

    // Revisa que los elementos tengan algún valor
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].value === "" && elementos[i].nodeName !== "SELECT") {
            elementos[i].parentElement.insertBefore(error, elementos[i])
            elementos[i].focus();
            setTimeout(() => error.remove(), 5000);
            return false;
        } else if (elementos[i].nodeName === "SELECT" && elementos[i].selectedIndex === 0) {
            elementos[i].parentElement.insertBefore(error, elementos[i]);
            elementos[i].focus();
            setTimeout(() => error.remove(), 5000);
            return false;
        }
    }

    return true;
}

/**
 * Muestra un mensaje de error en el formulario, usado luego de validación de formulario y le asigna la clase ".errorForm"
 * @param {HTMLFormElement} formulario El formulario donde se insertará el mensaje de error
 * @param {String} mensaje Mensaje de error
 * @param {Boolean} abajo true: Inserta abajo, false: Inserta arriba
 * @returns {HTMLParagraphElement} Retorna el campo creado con el mensaje de error
 */

function mostrarErrorFormulario(formulario, mensaje, abajo = true) {
    
    // Crea el elemento para el mensaje de error
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.className = "errorForm";

    // Inserta arriba o abajo dependiendo del parámetro abajo
    if (abajo && error.className != formulario.lastChild.className) {
        formulario.appendChild(error);
    } else if(!abajo && error.className != formulario.className) {
        formulario.insertBefore(error, formulario.firstChild)
    }

    return error;
}

/**
 * 
 * @param {HTMLFormElement} formulario Formulario que se enviará
 * @param {String} phpUrl URL del archivo PHP a utilizar
 */

function enviarFormulario(formulario, phpUrl){

    // Crear un objeto FormData para enviar los datos del formulario
    const formData = new FormData(formulario);
    fetch(phpUrl, {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}

