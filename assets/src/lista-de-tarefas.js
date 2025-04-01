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

function renderizarTarefasNoHTML(tarefa) {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    
    input.addEventListener('change', (event) => {
        const liToToggle = event.target.parentElement;
        const spanToToggle = liToToggle?.querySelector('span');
        const done = event.target.checked;
        
        if (done) {
            spanToToggle.style.textDecoration = 'line-through';
        } else {
            spanToToggle.style.textDecoration = 'none';
        }
        
        tarefas = tarefas.map(t => {
            if (t.titulo === tarefa.titulo) {
                return {
                    ...t,
                    feito: !t.feito
                };
            }
            return t;
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    });
    
    input.checked = tarefa.feito;
    const span = document.createElement('span');
    span.textContent = tarefa.titulo;
    
    if (tarefa.feito) {
        span.style.textDecoration = 'line-through';
    }
    
    // Aplicar cor baseada na prioridade
    if (tarefa.prioridade === "2") {
        li.style.backgroundColor = "yellow";
        li.style.color = "black";
    } else if (tarefa.prioridade === "3") {
        li.style.backgroundColor = "red";
        li.style.color = "white";
    } else {
        li.style.backgroundColor = "transparent";
        li.style.color = "black";
    }

    const button = document.createElement('button');
    button.textContent = "-";
    button.addEventListener('click', (evento) => {
        tarefas = tarefas.filter(t => t.titulo !== tarefa.titulo);
        listaDeTarefas?.removeChild(li);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    });

    const prioridadeBtn = document.createElement('button');
    prioridadeBtn.textContent = "^";
    prioridadeBtn.addEventListener('click', (evento) => {
        const opcao = prompt("Qual a prioridade da tarefa? 1-Nenhuma, 2-Pouco, 3-Muito") || "1";
        
        // Atualizar visual
        if (opcao === "2") {
            li.style.backgroundColor = "yellow";
            li.style.color = "black";
        } else if (opcao === "3") {
            li.style.backgroundColor = "red";
            li.style.color = "white";
        } else {
            li.style.backgroundColor = "transparent";
            li.style.color = "black";
        }

        // Atualizar array de tarefas
        tarefas = tarefas.map(t => {
            if (t.titulo === tarefa.titulo) {
                return {
                    ...t,
                    prioridade: opcao
                };
            }
            return t;
        });
        
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    });

    li.appendChild(prioridadeBtn);
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    listaDeTarefas?.appendChild(li);
}

window.onload = () => {
    const tarefasStorage = localStorage.getItem('tarefas');
    if (tarefasStorage) {
        tarefas = JSON.parse(tarefasStorage);
        tarefas.forEach(t => {
            renderizarTarefasNoHTML(t);
        });
    }
};

formulario?.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tituloDaTarefa = document.querySelector('#tarefa').value;
    
    if (tituloDaTarefa.length <= 3) {
        alert('A tarefa precisa ter no mínimo 3 caracteres.');
        return;
    }

    const novaTarefa = {
        titulo: tituloDaTarefa,
        feito: false,
        prioridade: "1" // Prioridade padrão
    };
    
    tarefas.push(novaTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizarTarefasNoHTML(novaTarefa);
    document.querySelector('#tarefa').value = '';
});