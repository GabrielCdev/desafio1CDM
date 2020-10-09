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

// Máscara CEP e Contato
$(document).ready(() => {
  $('#cep').mask('00.000-000');
  $('#contato1').mask('(00) 00000-0000');
})

// Gera CEP
$(document).ready(function() {
  function limpa_formulário_cep() {
      // Limpa valores do formulário de cep.
      $("#rua").val("");
      $("#bairro").val("");
      $("#cidade").val("");
      $("#estado").val("");
  }
  
  // Event blur()
  $("#cep").blur(function() {
    //Nova variável "CEP" somente com dígitos.
    let cep = $(this).val().replace(/\D/g, '');

    //Verifica se campo CEP possui valor informado.
    if (cep != "") {
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        $("#rua").val("...");
        $("#bairro").val("...");
        $("#cidade").val("...");
        $("#estado").val("...");

        //Consulta o webservice viacep.com.br/
        $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
          if (!("erro" in dados)) {
            //Atualiza os campos com os valores da consulta.
            $("#rua").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
            $("#cidade").val(dados.localidade);
            $("#estado").val(dados.uf);
          } else {
            //CEP pesquisado não foi encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
          }
        });
      } else {
        //CEP inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    } else {
      // CEP sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  });
});