import { GERENCIARTURMA, FORM, NOME, CPF, LABELCPF, DATANASC, EMAIL, LABELEMAIL, TELEFONE, LABELTEL, LOGRADOURO
  , NUMERO, COMPLEMENTO, CEP, BAIRRO, CIDADE, ESTADO, TURMA, 
  FUNCAO, COMENTARIOS, LABELDATA} from "./elements.js";



//Verificar o email digitado e validando

export function VerificarEmail(email){
  if(ValidarEmail(email)){
    LABELEMAIL.style.color = "green";
    LABELEMAIL.textContent = "Email Válido"
  } else {
    LABELEMAIL.style.color = "red";
    LABELEMAIL.textContent = "Email Inválido"
  }
}

 function ValidarEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}


//adiciona mascara ao CPF
export function MascararCPF(cpf){
  if (ValidarCPF(cpf)){  
    formataCampo(cpf, '000.000.000-00', CPF);
    ValidarCampo(CPF, LABELCPF);
  };
}

//Mascarar a data de Nascimento
export function MascararData(data){

  if (ValidarData(data)){  
    formataCampo(data, '00/00/0000', DATANASC);
    ValidarCampo(DATANASC, LABELDATA);
  } 
}



//Mascarar o número de Telefone
export function MascararTelefone(tel){      
     FormatarNumeroTelefone(tel, TELEFONE);
     ValidarCampo(TELEFONE, LABELTEL);
}

// Formatar Telefone
function FormatarNumeroTelefone(tel , elemento){
  const TEL = tel;
  const ELEMENTO = elemento;
  
//Mascara
let telefoneValidado = TEL.replace(/\D/g,""); //Remover o que não é dígito
    telefoneValidado = telefoneValidado.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
     telefoneValidado = telefoneValidado.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos

     ELEMENTO.value = telefoneValidado;

}




//valida data
function ValidarData(valor){

  const dataAtual = new Date();
  const dataNascimento = new Date(valor);


    if (dataNascimento < dataAtual){
        return true;
    } else{
        return false;
    }         
}

//valida o CPF digitado
function ValidarCPF(valor){
  let cpf = valor;
  const exp = /\.|\-/g
  cpf = cpf.toString().replace( exp, "" ); 
  const digitoDigitado = eval(cpf.charAt(9)+cpf.charAt(10));
  let soma1=0, soma2=0;
  let total =11;

  for(let i=0;i<9;i++){
          soma1+=eval(cpf.charAt(i)*(total-1));
          soma2+=eval(cpf.charAt(i)*total);
          total--;
  }       
  soma1 = (((soma1*10)%11)==10 ? 0:((soma1*10)%11));
  soma2=(((soma2+(2*soma1))*10)%11);

  const digitoGerado =(soma1*10)+soma2;
  if(digitoGerado!=digitoDigitado)        
  {    
    return false; 
  }

   return true;
   
}




//formata de forma generica os campos

function formataCampo(campo, Mascara, elemento) { 
  let boleanoMascara; 

  const Digitado = campo;
  const ELEMENTO = elemento;
  const exp = /\-|\.|\/|\(|\)| /g;
  const campoSoNumeros = Digitado.toString().replace( exp, "" ); 

  let posicaoCampo = 0;    
  let NovoValorCampo="";
  let TamanhoMascara = campoSoNumeros.length; 

          for(let i=0; i<= TamanhoMascara; i++) { 

                  boleanoMascara  = ( (Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".") || (Mascara.charAt(i) == "/")) ;

                  if (boleanoMascara) { 
                          NovoValorCampo += Mascara.charAt(i); 
                            TamanhoMascara++;
                  }else { 
                          NovoValorCampo += campoSoNumeros.charAt(posicaoCampo); 
                          posicaoCampo++; 
                    }              
            }      
          ELEMENTO.value = NovoValorCampo;

}

//Validar os Campos

function ValidarCampo(elemento, label){
  
  const NAME = elemento.getAttribute("name");
  const ELEMENTO = elemento.value;
  const LABEL = label;

    switch (NAME) {
      case "cpf":
          if(ELEMENTO.length < 11 || ELEMENTO.length > 14){
            LABEL.style.color = "red";
            LABEL.textContent = "CPF inválido";
          }else{
            LABEL.style.color = "green";
            LABEL.textContent = "CPF Válido";
          }       
        break;

        case "telefone":
          if(ELEMENTO.length < 14 || ELEMENTO.length > 15){
            LABEL.style.color = "red";
            LABEL.textContent = "Número inválido";
          }else{
            LABEL.style.color = "green";
            LABEL.textContent = "Número Válido";
          }         
         break;

        case "datanasc": 
            if(ELEMENTO.length < 10 || ELEMENTO.length > 11){
              LABEL.style.color = "red";
              LABEL.textContent = "Data inválida";
            }else{
              LABEL.style.color = "green";
              LABEL.textContent = "Data Válida";
            }             
          break;
    
      default:
        break;
    }
}