
// Initalize
document.addEventListener("DOMContentLoaded", eventListeners);

/**
 * Initalize after page load with eventListener
 */
function eventListeners() {
    createShortForm();

}

/** Insert short-form to document
 * @param {HTMLElement} previousElement HTML Element that new form insert after
 */

function createShortForm() {

    const body = document.querySelector("BODY");

    const layer = document.createElement("DIV");
    const form = document.createElement("DIV");

    form.classList.add("short-form");


    form.innerHTML = `
            <form class="form">
                <h1>Cotiza</h1>
                <p>Indicanos dónde y te haremos llegar la cotización junto con el detalle de nuestros servicios de inmediato.</p>
                <input class="required" autocomplete="off" type="text" name="nombre" placeholder="Nombre">
                <input class="required" autocomplete="off" type="text" name="email" placeholder="Email">
                <input class="form__submit" type="submit" value="Enviar">
            </form>
    `

    body.classList.add("fix");
    layer.classList.add("window-background");

    layer.onclick = function (e) {
        if (e.target !== this){
            return;
        }
        body.classList.remove("fix");
        body.removeChild(layer);
    };

    layer.append(form);
    body.appendChild(layer);
}
