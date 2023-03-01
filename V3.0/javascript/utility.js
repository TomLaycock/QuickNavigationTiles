function program_ready(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function IsNullOrUndefined(value) {
    return value === undefined || value == null;
}

function FindChildById(element, id) {
    //console.log(element);
    for (let index = 0; index < element.childNodes.length; index++) {
        if (element.childNodes[index].id == id) {
            return element.childNodes[index];
        }
    }
}

function FindChildByClassName(element, className) {
    for (let index = 0; index < element.childNodes.length; index++) {
        for (let classIndex = 0; classIndex < element.childNodes[index].classList.length; classIndex++) {
            if (element.childNodes[index].classList[classIndex] == className) {
                return element.childNodes[index];
            }
        }
    }
}

function AddClickListnerToButton(button, func) {
    button.addEventListener("click", func);
}