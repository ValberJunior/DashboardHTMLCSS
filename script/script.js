import {ADDESTUDANTE, GERENCIARTURMA, FORM, NOME, CPF, DATANASC, EMAIL, TELEFONE, LOGRADOURO
, NUMERO, COMPLEMENTO, CEP, BAIRRO, CIDADE, ESTADO, TURMA, 
FUNCAO, COMENTARIOS, ENVIAR} from "./elements.js";

import { listarAlunos } from "./listarAlunos.js";
import { validarCEP } from "./validarCEP.js";


//Retirar o submit padrão do FORM && validações do Form

if(FORM){
    FORM.addEventListener("submit", (event)=>{
        event.preventDefault()
      })
    
}

const ResetarForm = ()=>{

    LOGRADOURO.style.color ="black";
    BAIRRO.style.color ="black";
    CIDADE.style.color ="black";
    ESTADO.style.color ="black";

    FORM.reset();
}


(ADDESTUDANTE)?ADDESTUDANTE.addEventListener('click', ResetarForm):null;


//localizar CEP e preencher o endereço
if (CEP){
            CEP.addEventListener('input',(event)=>{
                const value = event.target.value;
                if(value !== "")
                {
                    validarCEP(value);
                }else{
                    ResetarForm();
                }

            })

           }          


//GET Lista de alunos

if(GERENCIARTURMA){
GERENCIARTURMA.addEventListener('click', ()=>{
    window.location.replace("./classroom.html");
  })
}


//listar alunos
listarAlunos();

