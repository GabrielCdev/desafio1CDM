const { when } = require("jquery");
const { MaxKey } = require("mongodb");

$(document).ready(() => {
    $('#contato').mask('(00) 00000-0000');
    $('#inpCnpj').mask('00.0000.00/0000-00');
  })