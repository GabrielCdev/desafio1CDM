const { MaxKey } = require("mongodb");

function cnpjFunc(){
   
   let inpCnpj = document.getElementById('inpCnpj');

   if (inpCnpj.value.length == 2 || inpCnpj.value.length == 7) {
      inpCnpj.value += ".";
   } else if (inpCnpj.value.length === 10) {
      inpCnpj.value += "/";
   }else if(inpCnpj.value.length == 15) {
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

 /*function vazio(){

       if(document.getElementById('Inpname').value == "" || document.getElementById('InpFantasia').value == ""){
         alert('Por favor, preencha todos os campo nome');
       }else if(document.getElementById('inpCnpj').value == "" || document.getElementById('InpEmail').value == ""){
         alert('Por favor, preencha todos os campo nome');
       }else if (document.getElementById('inpInpTelCnpj').value == "" || document.getElementById('InpEnd').value == ""){
         alert('Por favor, preencha todos os campo nome');
       }else if (document.getElementById('InpEs').value == "" || document.getElementById('InpCity').value == ""){
         alert('Por favor, preencha todos os campo nome');
       }
};
 */