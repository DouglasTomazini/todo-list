'use restrict';

let banco = [

    //{'tarefa':'Estudar JS', 'status': ''},
    //{'tarefa':'Netflix', 'status': 'checked'},
    //{'tarefa':'Teste2', 'status': ''},
];


const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const  setBanco = (banco) => localStorage.setItem("todoList", JSON.stringify(banco));

function CriaTarefa(tarefa, status, indice){
    const item = document.createElement('label');    
    item.classList.add('todo__item');
    //<input type="checkbox" ${status} data-indice= ${indice}></input>
    item.innerHTML= `
        
        <div>${tarefa}</div>
        <input type='button' value='x' data-indice= ${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

function limparUsuarios(){
    const todoList= document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

function atualizarTela() {
    limparUsuarios();
    const banco = getBanco();
    banco.forEach( (item, indice) => CriaTarefa (item.tarefa, item.status, indice));
}

const inserirItem = (evento) =>{
    const tecla = evento.key;
    if(tecla === 'Enter'){
        const banco = getBanco();
        banco.push ({'tarefa': evento.target.value, 'status': ''})
        setBanco(banco);
        atualizarTela();
        evento.target.value='';
    }
}


function clickItem (evento){
    const elemento = evento.target;
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

function removerItem (indice){
    const banco = getBanco();
    banco.splice (indice, 1 );
    setBanco(banco);
    atualizarTela();
}

function atualizarItem (indice){
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}
document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();
