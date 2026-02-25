const tarefa = document.getElementById('nTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const lista = document.querySelector('ul');

btnAdicionar.addEventListener('click', () => {
    const novaTarefa = tarefa.value;

    if(novaTarefa === '') return;

    const item = document.createElement('li');
    item.textContent = novaTarefa;

    lista.appendChild(item);
    tarefa.value = '';
})