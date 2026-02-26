const tarefa = document.getElementById('nTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const lista = document.querySelector('ul');

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

    item.addEventListener('click', () => {
        item.classList.toggle('concluida');
    })

    const btnExcluir= document.createElement('button');
    btnExcluir.textContent = 'Excluir';

    btnExcluir.addEventListener('click',(event) => {
        event.stopPropagation();
        item.remove();
    })

    item.appendChild(btnExcluir);
    lista.appendChild(item);

    tarefa.value = '';
})
