
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

    const buttonClose = document.createElement("DIV");

    form.classList.add("short-form");
    buttonClose.classList.add("button-close");

    buttonClose.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" fill="currentColor" stroke-width="0" />
    </svg>
    `

    form.innerHTML = `
            <form class="form">
                <h1>Cotiza</h1>
                <p>Indicanos dónde y te haremos llegar la cotización junto con el detalle de nuestros servicios de inmediato.</p>
                <input class="required" autocomplete="off" type="text" name="nombre" placeholder="Nombre">
                <input class="required" autocomplete="off" type="text" name="email" placeholder="Email">
                <input class="form__submit" type="submit" value="Enviar">
            </form>
    `
    // Insert in the init of form
    form.querySelector(".form").insertBefore(buttonClose, form.querySelector(".form").firstChild);

    body.classList.add("fix");
    layer.classList.add("window-background");

    layer.onclick = function (e) {
        if (e.target !== this){
            return;
        }
        body.classList.remove("fix");
        body.removeChild(layer);
    };

    buttonClose.onclick = function() {
        body.classList.remove("fix");
        body.removeChild(layer);
    };

    layer.append(form);
    body.appendChild(layer);
}
