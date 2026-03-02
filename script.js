const tarefa = document.getElementById('nTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const lista = document.querySelector('ul');

carregarTarefas();

btnAdicionar.addEventListener('click', adicionarTarefa);

tarefa.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
})

lista.addEventListener('click', (event) => {
    const li = event.target.closest('li');
    if (!li) return;

    if (event.target.textContent === 'Excluir') {
        li.remove();
        salvarTarefas();
        return;
    }

    if (event.target.textContent === 'Editar') {
        editarTarefa(li);
        return;
    }
});

lista.addEventListener('dblclick', (event) => {
    const li = event.target.closest('li');
    if (!li) return;

    editarTarefa(li);
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
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';

        item.appendChild(btnEditar);
        item.appendChild(btnExcluir);
        lista.appendChild(item);

    });
}
function adicionarTarefa() {
    const novaTarefa = tarefa.value;

    if (novaTarefa === '') {
        alert('A tarefa não pode ser vazia');
        return;
    } else if (novaTarefa.length < 3) {
        alert('A tarefa deve ter mais de 3 caracteres');
        return;
    }

    const item = document.createElement('li');
    item.textContent = novaTarefa;
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';

    item.appendChild(btnEditar);
    item.appendChild(btnExcluir);
    lista.appendChild(item);
    salvarTarefas();
    tarefa.value = '';
}
function editarTarefa(li) {
    const textoNode = li.firstChild;
    const textoAtual = textoNode.textContent;

    const input = document.createElement('input');
    input.type = 'text'; // Correção do ponto
    input.value = textoAtual;

    textoNode.replaceWith(input);
    input.focus();

    let finalizado = false;

    function salvarEdicao() {
        if (finalizado) return;
        finalizado = true;

        const novoTexto = input.value.trim(); // Padronizado para CamelCase

        if (novoTexto === '' || novoTexto.length < 3) {
            alert('A tarefa deve ter mais de 3 caracteres');
            input.replaceWith(document.createTextNode(textoAtual));
            return;
        }

        input.replaceWith(document.createTextNode(novoTexto));
        salvarTarefas();
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') salvarEdicao();
        if (e.key === 'Escape') {
            finalizado = true;
            input.replaceWith(document.createTextNode(textoAtual));
        }
    });

    input.addEventListener('blur', salvarEdicao);
}