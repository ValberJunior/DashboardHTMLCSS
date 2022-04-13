import {FORM, NOME, CPF, DATANASC, EMAIL, TELEFONE, LOGRADOURO
, NUMERO, COMPLEMENTO, CEP, BAIRRO, CIDADE, ESTADO, TURMA, 
FUNCAO, COMENTARIOS, ENVIAR} from "./elements.js";


//Retirar o submit padrão do FORM
FORM.addEventListener("submit", (event)=>{
    event.preventDefault()
  })


//localizar CEP e preencher o endereço

CEP.addEventListener('input',(event)=>{
    const value = event.target.value;
    localizarCEP(value);
})

const localizarCEP = async(cep)=>{
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
   
    if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
   }
   else{
           const data = await response.json();
   
           console.log(data);

           LOGRADOURO.value = data.logradouro;
           BAIRRO.value = data.bairro;
           CIDADE.value = data.localidade;
           ESTADO.value = data.uf;

           }
   }
   


