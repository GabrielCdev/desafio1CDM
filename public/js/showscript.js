// Filter
function filterFunction() {
  let input, filter, table, tr, td, i, txtValue;

  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('myTable');
  tr = table.getElementsByTagName('tr');

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0];

    if (td) {
      txtValue = td.textContent || td.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}

  
// Máscara de contato
function contatoMask() {
  let contato1 = document.getElementById('contato1');
  
  if (contato1.value.length === 2) {
    contato1.value += " ";
  } else if (contato1.value.length === 8 || contato1.value.length === 9) {
    contato1.value += "-";
  }
}

// Máscara de CEP
function cepMask() {
  let cep = document.getElementById('cep');

  if (cep.value.length === 2) {
    cep.value += ".";
  } else if (cep.value.length === 6) {
    cep.value += "-";
  }
}