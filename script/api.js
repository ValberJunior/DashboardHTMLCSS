const URL = "https://five-turma-3.herokuapp.com/alunos";

export const alunos = async()=>{
 const response = await fetch(URL);

 if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}
else{
        const data = await response.json();

        const listaDeAlunos = data.lista;

        }
}
