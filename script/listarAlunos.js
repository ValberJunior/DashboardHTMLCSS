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

            const id = aluno._id;
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

                                        <button type="button" class="btn btn-primary" idAluno=${id} id="editarAluno">Editar Aluno <i class="fa-solid fa-pen"></i></button>
                
                                     `       
                        }

                        if(document.getElementById('editarAluno')){
                            const EDITARALUNO = document.getElementById('editarAluno');
                            EDITARALUNO.addEventListener('click', ()=>{
                                const id = EDITARALUNO.getAttribute("idAluno");
                                editarAluno(id);
                            })
                        } 
    

}

//editar Aluno
const editarAluno = async (id )=> {
    const ID = id;

    const response = await fetch(`https://api-fiveacademy.herokuapp.com/api/alunos/${ID}`);

    if(!response.ok){
        console.log("Houve um erro")
    }else{
        
    const data = await response.json();

    if(data){
        const id = data._id;
        const nome = data.nome;
        const email = data.email;
        const cpf = data.cpf;
        const telefone = data.telefone;
        const datanasc = data.datanasc;
        const numero = data.numero;
        const bairro = data.bairro;
        const cep = data.cep;
        const cidade = data.cidade;
        const logradouro = data.logradouro;
        const complemento = data.complemento;
        const estado = data.estado;
        const turma = data.turma;
        const funcao = data.funcao;
        const imagem = data.imagem;
        const obs = data.comentarios;
        const matricula = data.matricula;
    }
    
    
        informacoes.innerHTML = `
        
                                        <!--Inicio do FORM  -->
                                        <form class= p-3 pt-5 mt-5" action="https://api-fiveacademy.herokuapp.com/api/alunos" method="POST" id="formulario">
                                            
                                            <div class="mt-5 pt-3">

                                                <fieldset id="personal__data">
                                                    <legend class="text-secondary mb-2 mt-2">Dados Pessoais</legend>
                                                    
                                                        <!--Nome-->
                                                        <div class="row mb-2 g-2">
                                                            <div class="col-md">
                                                            <div class="form-floating">
                                                                <!--NOME-->
                                                                <input type="text" class="form-control" value=${nome} id="nome" name="nome">
                                                                <label for="nome">Nome Completo</label>
                                                            </div>
                                                            </div>
                                                        </div>

                                                    <!--url da imagem-->
                                                        <div class="row mb-2 g-2">
                                                            <div class="col-md">
                                                            <div class="form-floating">
                                                                <!--IMAGEM-->
                                                                <input type="text" class="form-control" value=${imagem} id="imagem" name="imagem">
                                                                <label for="nome">URL da Imagem</label>
                                                            </div>
                                                            </div>
                                                        </div>

                                                        <!--Id do aluno-->
                                                        <div class="row mb-2 g-2">
                                                            <div class="col-md">
                                                            <div class="form-floating">
                                                                <!--ID-->
                                                                <input type="text" class="form-control text-primary" value=${id} id="idAluno" name="id" readonly>
                                                                <label for="nome">ID do Aluno</label>
                                                            </div>
                                                            </div>
                                                        </div>

                                                        <!--CPF e data de nascimento-->
                                                        <div class="row mb-2 g-2">
                                                            <div class="col-md">
                                                            <div class="form-floating">
                                                                <!--CPF-->
                                                                <input type="text" class="form-control" value=${cpf}
                                                                minlength="11" maxlength="15" id="cpf" name="cpf">
                                                                <label for="cpf" id="labelCPF">Digite o CPF</label>
                                                            </div>
                                                            </div>
                                                            <div class="col-md">
                                                                <div class="form-floating">
                                                                    <!-- Data de Nascimento -->
                                                                    <input type="text" class="form-control" value=${datanasc} name="datanasc" id="dataNascimento">
                                                                    <label for="dataNascimento" id="labelData">Data de Nascimento</label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!--Email e Telefone/ Celular-->
                                                        <div class="row mb-2 g-2">
                                                            <div class="col-md">
                                                            <div class="form-floating">
                                                                <!--Email-->
                                                                <input type="email" class="form-control" value=${email}  name="email" id="email">
                                                                <label for="email" id="labelEmail">Digite o E-mail</label>
                                                            </div>
                                                            </div>
                                                            <div class="col-md">
                                                                <div class="form-floating">
                                                                    <!--Telefone-->
                                                                    <input type="tel" class="form-control" value=${telefone}
                                                                    minlength="14" maxlength="16" name="telefone" id="telefone">
                                                                    <label for="telefone" id="labelTel">Telefone ou Celular com DDD</label>
                                                                </div>
                                                            </div>
                                                        </div>                           
                                                </fieldset>

                                                <fieldset id="address">
                                                    <legend class="text-secondary mb-2 mt-2">Endereço</legend>

                                                    <!--Nome da Rua e Número-->
                                                    <div class="row mb-2 g-2">
                                                        <div class="col-md-10">
                                                        <div class="form-floating">
                                                            <!--logradouro-->
                                                            <input type="text" class="form-control" id="logradouro" value=${logradouro} name="logradouro">
                                                            <label for="logradouro">Logradouro</label>
                                                        </div>
                                                        </div>
                                                        <div class="col-md-2">
                                                            <div class="form-floating">
                                                                <!--Número-->
                                                                <input type="number" class="form-control" id="numero" value=${numero} name="numero"
                                                                min="0" minlength="1" maxlength="5">
                                                                <label for="numero">Número</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!--Complemento e CEP-->
                                                    <div class="row mb-2 g-2">
                                                        <div class="col-md-9">
                                                            <div class="form-floating">
                                                                <!--Complemento-->
                                                                <input type="text" class="form-control" id="complemento" value=${complemento} name="complemento">
                                                                <label for="complemento">Complemento</label>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-3">
                                                            <div class="form-floating">
                                                                <!--CEP-->
                                                                <input type="text" class="form-control" value=${cep}
                                                                min="0" minlength="8" maxlength="10" name="cep" id="cep">
                                                                <label for="cep">Digite o CEP</label>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <!--Bairro, Cidade e Estado-->
                                                    <div class="row mb-2 g-2">
                                                        <div class="col-md-5">
                                                            <div class="form-floating">
                                                                <!--Bairro-->
                                                                <input type="text" class="form-control" value=${bairro} 
                                                                name="bairro" id="bairro">
                                                                <label for="bairro">Digite o Bairro</label>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-5">
                                                        <div class="form-floating">
                                                            <!--Cidade-->
                                                            <input type="text" class="form-control"value=${cidade}
                                                            name="cidade" id="cidade">
                                                            <label for="cidade">Digite a Cidade</label>
                                                        </div>
                                                        </div>
                                                        <div class="col-md-2">
                                                        <div class="form-floating">
                                                            <!-- Estado -->
                                                            <select class="form-select" aria-label="Floating label select state" 
                                                            name="estado" id="estado" > 
                                                            <option value=${estado}>${estado}</option>
                                                            <option value="AC">AC</option>
                                                            <option value="AL">AL</option>
                                                            <option value="AP">AP</option>
                                                            <option value="AM">AM</option>
                                                            <option value="BA">BA</option>
                                                            <option value="CE">CE</option>
                                                            <option value="DF">DF</option>
                                                            <option value="ES">ES</option>
                                                            <option value="GO">GO</option>
                                                            <option value="MA">MA</option>
                                                            <option value="MT">MT</option>
                                                            <option value="MS">MS</option>
                                                            <option value="MG">MG</option>
                                                            <option value="PA">PA</option>
                                                            <option value="PB">PB</option>
                                                            <option value="PR">PR</option>
                                                            <option value="PE">PE</option>
                                                            <option value="PI">PI</option>
                                                            <option value="RJ">RJ</option>
                                                            <option value="RN">RN</option>
                                                            <option value="RS">RS</option>
                                                            <option value="RO">RO</option>
                                                            <option value="RR">RR</option>
                                                            <option value="SC">SC</option>
                                                            <option value="SP">SP</option>
                                                            <option value="SE">SE</option>
                                                            <option value="TO">TO</option>
                                                            </select>
                                                            <label for="estado">Estado</label>
                                                        </div>
                                                        </div>
                                                    </div>

                                                </fieldset>

                                                <fieldset id="coments">
                                                    <legend class="text-secondary mb-2 mt-2">Informações adicionais</legend>
                                                    <!--Turma e Função-->
                                                    <div class="row mb-2 g-2">
                                                        <div class="col-md">
                                                            <div class="form-floating">
                                                            <!-- Turma -->
                                                            <select class="form-select" aria-label="Floating label select classroom"
                                                             name="turma" id="turma" >
                                                                <option value=${turma}>${turma}</option>
                                                                <option value="Turma 01">Turma 01</option>
                                                                <option value="Turma 02">Turma 02</option>
                                                                <option value="Turma 03">Turma 03</option>
                                                                <option value="Turma 04">Reserva</option>
                                                            </select>
                                                            <label for="turma">Turma</label>
                                                            </div>
                                                        </div>

                                                        <div class="col-md">
                                                            <div class="form-floating">
                                                            <!--Função-->   
                                                            <select class="form-select" aria-label="Floating label select function"
                                                              name="funcao" id="funcao"  >
                                                                <option value=${funcao}> ${funcao}</option>
                                                                <option value="FrontEnd">FrontEnd</option>
                                                                <option value="BackEnd">BackEnd</option>
                                                                <option value="DevOps">DevOps</option>
                                                            </select>
                                                            <label for="funcao">Função</label>
                                                            </div>
                                                        </div>


                                                        <div class="col-md">
                                                            <div class="form-floating">
                                                            <!--ID-->   
                                                                <input type="text" class="form-control text-center text-primary"  value=${matricula} 
                                                                name="matricula" id="matricula" readonly>
                                                                <label for="matricula">Matrícula do Aluno</label>
                                                           
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!--Comentários-->
                                                    <div class="form-floating mb-4">
                                                        <textarea class="form-control" value=${comentarios} id="comentarios" name="comentarios"></textarea>
                                                        <label for="comentarios">Comentário</label>
                                                    </div>
                                                </fieldset>

                                                
                                            </div>
                                            
                                            <div class= btn-group">
                                                <button type="button" class="btn btn-lg btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                <button type="reset" class="btn btn-lg btn-dark" ><i class="fa-solid fa-eraser"></i> Limpar</button>
                                                <button type="submit" class="btn btn-lg btn-primary" id="botaoAddAluno"> <i class="fa-solid fa-floppy-disk"></i> Salvar</button>
                                            </div>
                                        </form>

        `

        

      }
}