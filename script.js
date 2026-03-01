const tarefa = document.getElementById('nTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const lista = document.querySelector('ul');

carregarTarefas();

btnAdicionar.addEventListener('click', () => {
    console.log('Você adicionou: ' + tarefa.value);

    const novaTarefa = tarefa.value;

    console.log(
        'Texto:', novaTarefa,
        'Tamanho:', novaTarefa.length,
        'Tipo:', typeof novaTarefa
    )
    if (novaTarefa === '') {
        console.log('Tarefa vazia');
        alert('A tarefa não pode ser vazia');
        return;
    } else if (novaTarefa.length < 3) {
        alert('A tarefa deve ter mais de 3 caracteres');
        console.log('Tarefa muito curta');
        return;
    }

    console.log('Validações ok');

    const item = document.createElement('li');
    item.textContent = novaTarefa;

    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';

    item.appendChild(btnExcluir);
    lista.appendChild(item);
    salvarTarefas();
    tarefa.value = '';
})
lista.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        event.target.parentElement.remove();
        salvarTarefas();
        return;
    }

    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('concluida');
        salvarTarefas();
    } 
});

function salvarTarefas() {
    const itens = lista.querySelectorAll('li');
    const tarefas = [];

    itens.forEach(item => {
        tarefas.push({
            texto: item.firstChild.textContent,
            concluida: item.classList.contains('concluida')
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefas));

}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');

    if (!tarefasSalvas) return;

    const tarefas = JSON.parse(tarefasSalvas);

    tarefas.forEach(tarefa => {
        const item = document.createElement('li');
        item.textContent = tarefa.texto;

        if (tarefa.concluida) {
            item.classList.add('concluida');
        }

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';

        item.appendChild(btnExcluir);
        lista.appendChild(item);

    });
}