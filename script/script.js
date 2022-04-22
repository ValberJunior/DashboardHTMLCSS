import {ADDESTUDANTE, GERENCIARTURMA, FORM, NOME, CPF, DATANASC, EMAIL, TELEFONE, LOGRADOURO
, CEP, BAIRRO, CIDADE, ESTADO, ENVIAR, LABELCPF, LABELEMAIL, LABELDATA, LABELTEL} from "./elements.js";

import { listarAlunos } from "./listarAlunos.js";
import { validarCEP } from "./validarCEP.js";
import { MascararCPF, MascararData, MascararTelefone, VerificarEmail} from "./validacao.js";


//Retirar o submit padrão do FORM && validações do Form

/*
O formulário não poderá ser enviado se o campos
 Nome, CPF, Data Nascimento, Telefone não contiverem valor
*/

if(FORM){
          FORM.addEventListener("submit", (event)=>{
              if( NOME.value === " " || CPF.value ===" "
              || DATANASC.value === " " || TELEFONE === " "){
              event.preventDefault()
              }
            })

}

//eventos
if(EMAIL){
            EMAIL.addEventListener('input', (event)=>{
              const email = event.target.value;
              VerificarEmail(email);
            });
}

if(CPF){
          CPF.addEventListener('input',(event)=>{
            const Cpf = event.target.value;
            MascararCPF(Cpf)
          });
}

if(DATANASC){
              DATANASC.addEventListener('input', (event)=>{
                const Data = event.target.value;
                MascararData(Data);
              });
}

if(TELEFONE){
              TELEFONE.addEventListener('input', (event)=>{
                const Tel = event.target.value;
                console.log(Tel);
                MascararTelefone(Tel);
              });
              
}





//Resetar os campos do formulário;

const ResetarForm = ()=>{

        LOGRADOURO.style.color ="black";
        BAIRRO.style.color ="black";
        CIDADE.style.color ="black";
        ESTADO.style.color ="black";

        LABELEMAIL.style.color = "black";
        LABELEMAIL.textContent="Digite o E-mail";
        LABELCPF.style.color = "black";
        LABELCPF.textContent="Digite o CPF";
        LABELDATA.style.color = "black";
        LABELDATA.textContent="Data de Nascimento";
        LABELTEL.style.color = "black";
        LABELTEL.textContent="Telefone ou Celular com DDD";

         FORM.reset(); // Não está resetando
}

const ResetarCampo = (elemento)=>{
  const ELEMENTO = elemento;

    ELEMENTO.style.color="black";
    ELEMENTO.value = "";

}


/*
Caso seja adicionado um aluno, posteriormente o usuário volte
 ao menu principal e clique para adicionar um novo aluno,
 o form será resetado quando o elemento for clicado
 */

if(ADDESTUDANTE){
    ADDESTUDANTE.addEventListener("click", ResetarForm);
}



//localizar CEP e preencher o endereço
if (CEP){
            CEP.addEventListener('input',(event)=>{
                const value = event.target.value;
                if(value !== "")
                {
                    validarCEP(value);
                } else{
                    ResetarCampo(LOGRADOURO);
                    ResetarCampo(BAIRRO);
                    ResetarCampo(CIDADE);
                    ResetarCampo(ESTADO);
                }

            })

           }


//GET Lista de alunos

if(GERENCIARTURMA){
GERENCIARTURMA.addEventListener('click', ()=>{
    window.location.replace("./classroom.html");
  });
}

listarAlunos();


