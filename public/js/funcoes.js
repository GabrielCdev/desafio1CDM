const { MaxKey } = require("mongodb");

function cnpjFunc() {

    let inpCnpj = document.getElementById('inpCnpj');

    if (inpCnpj.value.length == 2 || inpCnpj.value.length == 7) {
        inpCnpj.value += ".";
    } else if (inpCnpj.value.length === 10) {
        inpCnpj.value += "/";
    } else if (inpCnpj.value.length == 15) {
        inpCnpj.value += "-";
    }

}

function contatoFunc() {
    let contato = document.getElementById('contato');

    if (contato.value.length == 2) {
        contato.value += " ";
    } else if (contato.value.length == 4 || contato.value.length == 9) {
        contato.value += "-";
    }
}