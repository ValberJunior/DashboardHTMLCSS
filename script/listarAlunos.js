import { headerInfo, informacoes, LOADING, LOADINGINFO, tdbody} from "./elements.js";

//Montar Tabela de Alunos

const URL = "https://api-fiveacademy.herokuapp.com/api/alunos/";

export const listarAlunos = async()=>{
 const response = await fetch(URL);

 LOADING.classList.remove("invisivel");

 if (!response.ok) {
    LOADING.classList.add("invisivel");
    throw new Error(`Houve um erro, status: ${response.status}`); 
}
else{
        const data = await response.json();

        montarTabela(data);

        }
}
 


function montarTabela(data){
    
    const alunos = data;

    LOADING.classList.add("invisivel");

        alunos.map((item)=>{
            tdbody.innerHTML += `
                                <tr>
                                      <th scope="row">${item.matricula}</th>
                                      <td>${item.nome}</td>
                                      <td>${item.email}</td>
                                      <td>${item.funcao}</td>
                                      <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#visualizarAluno"
                                      id="visualizar" filter="${item._id}"><i class="fa-solid fa-eye"></i></button></td>
                                      
                                </tr>
                                `
                            });

            tdbody.innerHTML += ` <td colspan="5" class="text-end"><button class="btn btn-primary">Editar turma</button></td>`;

            
            if(document.getElementById("visualizar")){

                const BOTOES = document.querySelectorAll("#visualizar");

                BOTOES.forEach(botao=>{
                    botao.addEventListener('click',(event)=>{
                        const aluno = event.target.parentNode;
                        const ID = aluno.getAttribute("filter");

                        filtrarAluno(ID);
                    })
                });
                
            }


        }
 

//Editar Aluno


// function visualizarAluno(e){

//     const elemento = e;
//     const filterId = elemento.getAttribute("filter");
//     console.log(filterId);

//     filtrarAluno(filterId);

// }

//Filtrar Aluno

async function filtrarAluno(valor){

    const URL = `https://api-fiveacademy.herokuapp.com/api/alunos/${valor}`
    const response = await fetch(URL);


    if (!response.ok) {
        LOADINGINFO.classList.add("invisivel");
        throw new Error(`HTTP error! status: ${response.status}`);

    }
    else{
            const aluno = await response.json();

            const nome = aluno.nome;
            const email = aluno.email;
            const cpf = aluno.cpf;
            const telefone = aluno.telefone;
            const datanasc = aluno.datanasc;
            const numero = aluno.numero;
            const bairro = aluno.bairro;
            const cep = aluno.cep;
            const cidade = aluno.cidade;
            const logradouro = aluno.logradouro;
            const complemento = aluno.complemento;
            const estado = aluno.estado;
            const turma = aluno.turma;
            const funcao = aluno.funcao;
            const imagem = aluno.imagem;
            const obs = aluno.comentarios;
            const matricula = aluno.matricula;
    

            LOADINGINFO.classList.add("invisivel");

                     headerInfo.innerHTML = `
                                                <h2 class="infoAluno-nome ms-2" >${nome}</h2> 
                                                 <img src=${imagem} class="infoAluno-imagem" alt="foto do aluno" /> 
                            
                             `
            

                    informacoes.innerHTML = `
                                        <label class="text-secondary">Matricula</label>
                                        <p>${matricula}</p>

                                        <label class="text-secondary">Email</label>
                                        <p>${email}</p>

                                        <label  class="text-secondary">Telefone</label>
                                        <p>${telefone}</p>

                                        <label  class="text-secondary">CPF</label>
                                        <p>${cpf}</p>

                                        <label  class="text-secondary">Data de Nascimento</label>
                                        <p>${datanasc}</p>

                                        <h5>Endereço</h5>
                                        <label  class="text-secondary">Logradouro</label>
                                        <p>${logradouro} - Número ${numero}, ${complemento!==""?complemento:null} / cep ${cep}, ${bairro} - ${cidade} - ${estado} </p>

                                        <label  class="text-secondary">Turma</label>
                                        <p> ${turma !== "" ? turma : "Defenir Turma" }</p>

                                        <label  class="text-secondary">Função</label>
                                        <p> ${funcao !== "" ? funcao : "Defenir Função" }</p>

                                        <label class="text-secondary">Comentários</label>
                                        <p>${obs !== "" ? obs : "Nenhuma observação"}</p>  
                
                                     `
                }
    

}