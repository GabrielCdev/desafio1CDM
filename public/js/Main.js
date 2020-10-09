// mascara de cpf
function MascaraCPF() {

    let cpf = document.getElementById('cpf')
    if (cpf.value.length == 3 || cpf.value.length == 7) {
        cpf.value += "."
    } else if (cpf.value.length == 11) {
        cpf.value += "-"
    }
}
// mascara de cep
function cepMask() {

    let cep = document.getElementById('cep')
    if (cep.value.length == 2) {
        cep.value += "."
    } else if (cep.value.length == 6) {
        cep.value += "-"
    }
}
// filtro da pesquisa de filial
function myFunction() {
    let input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];

        if (td) {
            txtValue = td.textContent || td.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
// Máscara de contato
function contatoMask() {
    let contato = document.getElementById('contato');
    
    let er = /[^0-9-./]/;
    er.lastIndex = 0;
 
    if (contato.value.length === 7 || contato.value.length === 8) {
      contato.value += "-";
    } else if (er.test(contato.value)) {
      contato.value = "";
    }
  }
  /* function maskNum(evt) {
    evt = (evt) ? evt : window.event;
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode < 48 && charCode < 58) || ((charCode > 95 && charCode < 106))){
        return true;
    }
    return false
}
*/