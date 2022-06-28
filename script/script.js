import {
  GERENCIARTURMA,
  FORM,
  NOME,
  CPF,
  DATANASC,
  EMAIL,
  TELEFONE,
  LOGRADOURO,
  CEP,
  BAIRRO,
  CIDADE,
  ESTADO,
  LABELCPF,
  LABELEMAIL,
  LABELDATA,
  LABELTEL,
  MATRICULA,
  SECAOADDALUNO,
} from "./elements.js";

import { listarAlunos } from "./listarAlunos.js";
import { validarCEP } from "./validarCEP.js";
import {
  MascararCPF,
  MascararData,
  MascararTelefone,
  VerificarEmail,
} from "./validacao.js";

/*
O formulário não poderá ser enviado se o campos
 Nome, CPF, Data Nascimento, Telefone não contiverem valor
*/

if (FORM) {
  FORM.addEventListener("submit", (event) => {
    if (
      NOME.value === " " ||
      CPF.value === " " ||
      DATANASC.value === " " ||
      TELEFONE.value === " "
    ) {
      alert("Por gentileza, Preencha os Campos Obrigatórios!");
      event.preventDefault();
    }
  });
}

if (EMAIL) {
  EMAIL.addEventListener("input", (event) => {
    const email = event.target.value;
    if (email === "") {
      ResetarCampo(EMAIL);
      LABELEMAIL.style.color = "black";
      LABELEMAIL.textContent = "Digite o Email";
    } else {
      VerificarEmail(email);
    }
  });
}

if (CPF) {
  CPF.addEventListener("input", (event) => {
    const cpf = event.target.value;
    if (cpf === "") {
      ResetarCampo(CPF);
      LABELCPF.style.color = "black";
      LABELCPF.textContent = "Digite o CPF";
    } else {
      MascararCPF(cpf);
    }
  });
}

if (DATANASC) {
  DATANASC.addEventListener("input", (event) => {
    const data = event.target.value;
    if (data === "") {
      ResetarCampo(DATANASC);
      LABELDATA.style.color = "black";
      LABELDATA.textContent = "Data de Nascimento";
    } else {
      MascararData(data);
    }
  });
}

if (TELEFONE) {
  TELEFONE.addEventListener("input", (event) => {
    const tel = event.target.value;
    if (tel === "") {
      ResetarCampo(TELEFONE);
      LABELTEL.style.color = "black";
      LABELTEL.textContent = "Telefone ou Celular com DDD";
    } else {
      MascararTelefone(tel);
    }
  });
}

//Resetar os campos do formulário;

const ResetarForm = () => {
  LOGRADOURO.style.color = "black";
  BAIRRO.style.color = "black";
  CIDADE.style.color = "black";
  ESTADO.style.color = "black";

  LABELEMAIL.style.color = "black";
  LABELEMAIL.textContent = "Digite o E-mail";
  LABELCPF.style.color = "black";
  LABELCPF.textContent = "Digite o CPF";
  LABELDATA.style.color = "black";
  LABELDATA.textContent = "Data de Nascimento";
  LABELTEL.style.color = "black";
  LABELTEL.textContent = "Telefone ou Celular com DDD";

  FORM.reset();
};

const ResetarCampo = (elemento) => {
  const ELEMENTO = elemento;

  ELEMENTO.style.color = "black";
  ELEMENTO.value = "";
};

/*
Caso seja adicionado um aluno, posteriormente o usuário volte
 ao menu principal e clique para adicionar um novo aluno,
 o form será resetado quando o elemento for clicado
 */

if (SECAOADDALUNO) {
  SECAOADDALUNO.addEventListener("click", () => {
    ResetarForm();
    const valor = Math.ceil(Math.random() * 90000);
    MATRICULA.value = valor;
  });
}

//localizar CEP e preencher o endereço
if (CEP) {
  CEP.addEventListener("input", (event) => {
    const value = event.target.value;
    if (value !== "") {
      validarCEP(value);
    } else {
      ResetarCampo(LOGRADOURO);
      ResetarCampo(BAIRRO);
      ResetarCampo(CIDADE);
      ResetarCampo(ESTADO);
    }
  });
}

//GET Lista de alunos

if (GERENCIARTURMA) {
  GERENCIARTURMA.addEventListener("click", () => {
    window.location.replace("./classroom.html");
  });
}

listarAlunos();
