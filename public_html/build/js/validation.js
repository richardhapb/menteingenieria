
/**
 * Validate an email string
 * @param {String} email Email to validate
 * @returns {Boolean} True if email is validated.
 */

function validateEmail(email){
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

/**
 * Validates Form and send or not in consequence
 * @param {HTMLFormElement} form Form to add listener
 * @param {String} phpUrl Url to sending php file
 * @param {String} okMessage Message to show when form is valid
 * @param {String} errorMessage Message to show when form is invalid
 * @param {Boolean} topMessage If shows a error message in top of the empty input.
 * @returns {Boolean} True in case that the form is ok
 */

function sendForm(form, phpUrl , okMessage, errorMessage, topMessage = true) {

        const email = form.querySelector("[name=email]").value.trim().toLowerCase();
        const validEmail = validateEmail(email);

        // Send form if is complete
        if (validarFormularioVacio(form, "required", topMessage) && validEmail){
            console.log("Formulario validado");
            enviarFormulario(form, phpUrl);
            alert(okMessage);
            return true;
        }

        if(!validEmail && email !== ""){
            errorMessage = "Email inválido.";
        }
        // This don't execute if form has been sent
        const error = mostrarErrorFormulario(form, errorMessage, true);
    
        // Elimina el mensaje de error luego de 5 segundos.
        setTimeout(() => error.remove(), 5000);
        return false;
}
