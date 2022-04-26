import { LOGRADOURO, BAIRRO, CIDADE, ESTADO } from "./elements.js";

export const validarCEP = async(cep)=>{
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    else{
            const data = await response.json();

            if (data.erro){
                const invalid = "Digite um CEP válido"

                LOGRADOURO.style.color ="red";
                BAIRRO.style.color ="red";
                CIDADE.style.color ="red";
                ESTADO.style.color ="red";

                LOGRADOURO.value = invalid;
                BAIRRO.value = invalid;
                CIDADE.value = invalid;
                ESTADO.value = invalid ;
            }else{
                
                LOGRADOURO.value = data.logradouro;
                BAIRRO.value = data.bairro;
                CIDADE.value = data.localidade;
                ESTADO.value = data.uf;
            }
        }
    }

    