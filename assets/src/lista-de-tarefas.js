// Mensagem de bem vindo

const usuarioNome = localStorage.getItem("usuarioNome");

if (usuarioNome) {
    document.getElementById("mensagem").innerText = `Bem-vindo(a), ${usuarioNome}!`;
} else {
    document.getElementById("mensagem").innerText = "Usuário não autenticado!";
}

// Lista de Tarefas

"use strict";
const formulario = document.querySelector('#formulario');
const adicionarTarefa = document.querySelector('#adicionar');
const listaDeTarefas = document.querySelector('#lista');
let tarefas = [];
function renderizarTarefasNoHTML(tituloDaTarefa, feito = false) {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.addEventListener('change', (event) => {
        const liToToggle = event.target.parentElement;
        const spanToToggle = liToToggle === null || liToToggle === void 0 ? void 0 : liToToggle.querySelector('span');
        const done = event.target.checked;
        if (done) {
            spanToToggle.style.textDecoration = 'line-through';
        }
        else {
            spanToToggle.style.textDecoration = 'none';
        }
        tarefas = tarefas.map(t => {
            if (t.titulo === (spanToToggle === null || spanToToggle === void 0 ? void 0 : spanToToggle.textContent)) {
                return {
                    titulo: t.titulo,
                    feito: !t.feito
                };
            }
            return t;
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    });
    input.checked = feito;
    const span = document.createElement('span');
    span.textContent = tituloDaTarefa;
    if (feito) {
        span.style.textDecoration = 'line-through';
    }
    const button = document.createElement('button');
    button.textContent = "-";
    button.addEventListener('click', (evento) => {
        var _a;
        if (evento.target) {
            const liRemover = evento.target.parentElement;
            const spanElement = liRemover === null || liRemover === void 0 ? void 0 : liRemover.querySelector('span');
            const tituloRemover = spanElement === null || spanElement === void 0 ? void 0 : spanElement.textContent;
            tarefas = tarefas.filter(t => t.titulo !== tituloRemover);
            listaDeTarefas === null || listaDeTarefas === void 0 ? void 0 : listaDeTarefas.removeChild(liRemover);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }
    });

    const prioridade = document.createElement('button');
    prioridade.textContent = "^";
    prioridade.addEventListener('click', (evento) => {
        opcao = prompt("Qual a prioridade da tarefa? 1-Nenhuma, 2-Pouco, 3-Muito");
        if (opcao == "2") {
            li.style.backgroundColor = "yellow"
            li.style.color = "black"
        } else if (opcao == "3") {
            li.style.backgroundColor = "red"
            li.style.color= "white"
        } else {
            li.style.backgroundColor = "transparent"
            li.style.color = "black"
        }

    });

    li.appendChild(prioridade);
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    listaDeTarefas === null || listaDeTarefas === void 0 ? void 0 : listaDeTarefas.appendChild(li);
}
window.onload = () => {
    const tarefasStorage = localStorage.getItem('tarefas');
    if (tarefasStorage) {
        tarefas = JSON.parse(tarefasStorage);
        tarefas.forEach(t => {
            renderizarTarefasNoHTML(t.titulo, t.feito);
        });
    }
};
formulario === null || formulario === void 0 ? void 0 : formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita o comportamento padrão do formulário, que seria recarregar a página.
    const tituloDaTarefa = document.querySelector('#tarefa').value;
    if (tituloDaTarefa.length <= 3) {
        alert('A tarefa precisa ter no mínimo 3 caracteres.');
        return;
    }

    //Adicionando a tarefa no array de tarefas
    tarefas.push({
        titulo: tituloDaTarefa,
        feito: false
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizarTarefasNoHTML(tituloDaTarefa);
    document.querySelector('#tarefa').value = '';
});
