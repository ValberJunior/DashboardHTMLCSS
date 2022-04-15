import { tdbody } from "./elements.js";

//Montar Tabela de Alunos

const URL = "https://five-turma-3.herokuapp.com/alunos";

export const listarAlunos = async()=>{
 const response = await fetch(URL);

 if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}
else{
        const json = await response.json();

        const data = json.lista;


        console.log(data);
        montarTabela(data);

        }
}
 


function montarTabela(data){
    
    const alunos = data;

        alunos.map((item)=>{
            tdbody.innerHTML += `
                                <tr>
                                      <th scope="row">${item.nr_sequencia}</th>
                                      <td>${item.nm_pessoa}</td>
                                      <td>${item.ds_email}</td>
                                      <td>Estagiário</td>
                                      <td><button><i class="fa-solid fa-user-pen"></i></button></td>
                                </tr>
                                `
                            });

            tdbody.innerHTML += ` <td colspan="5" class="text-end"><button class="btn btn-primary">Editar turma</button></td>`;

        }

