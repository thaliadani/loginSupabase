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
const listaDeTarefas = document.querySelector('#lista');
let tarefas = [];

function renderizarTarefasNoHTML(tarefa) {
    // Container principal que envolve toda a tarefa
    const container = document.createElement('div');
    container.className = 'tarefa-container';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.margin= '.7rem 0';
    container.style.gap = '.7rem';

    // Botão de prioridade (fora da caixa colorida)
    const prioridadeBtn = document.createElement('button');
    prioridadeBtn.className = 'prioridade-btn';
    prioridadeBtn.textContent = "^";

    // Container da tarefa (caixa colorida)
    const tarefaBox = document.createElement('div');
    tarefaBox.className = 'tarefa-box';
    tarefaBox.style.display = 'flex';
    tarefaBox.style.alignItems = 'center';
    tarefaBox.style.flexGrow = '1';
    tarefaBox.style.padding = '.8rem .5rem';
    tarefaBox.style.borderRadius = '.4rem';
    tarefaBox.style.width = '200px';
    tarefaBox.style.transition = 'all 0.3s ease';

    // Aplicar cor baseada na prioridade
    if (tarefa.prioridade === "2") {
        tarefaBox.style.backgroundColor = "#fff3bf";
        tarefaBox.style.borderLeft = ".3rem solid #ffd43b";
    } else if (tarefa.prioridade === "3") {
        tarefaBox.style.backgroundColor = "#ffdddd";
        tarefaBox.style.borderLeft = ".3rem solid #ff6b6b";
    } else {
        tarefaBox.style.backgroundColor = "#f8f9fa";
        tarefaBox.style.borderLeft = ".3rem solid #ced4da";
    }

    // Checkbox
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.className = 'tarefa-checkbox';
    input.style.marginRight = '.5rem';
    input.style.cursor = 'pointer';
    
    input.addEventListener('change', (event) => {
        const spanToToggle = event.target.nextElementSibling;
        const done = event.target.checked;
        
        if (done) {
            spanToToggle.style.textDecoration = 'line-through';
            spanToToggle.style.opacity = '0.7';
        } else {
            spanToToggle.style.textDecoration = 'none';
            spanToToggle.style.opacity = '1';
        }
        
        tarefas = tarefas.map(t => {
            if (t.titulo === tarefa.titulo) {
                return { ...t, feito: !t.feito };
            }
            return t;
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    });
    
    input.checked = tarefa.feito;

    // Texto da tarefa
    const span = document.createElement('span');
    span.className = 'tarefa-texto';
    span.textContent = tarefa.titulo;
    span.style.flexGrow = '1';
    
    if (tarefa.feito) {
        span.style.textDecoration = 'line-through';
        span.style.opacity = '0.7';
    }

    // Botão de remover (fora da caixa colorida)
    const removerBtn = document.createElement('button');
    removerBtn.className = 'remover-btn';
    removerBtn.textContent = "-";
    removerBtn.addEventListener('click', () => {
        tarefas = tarefas.filter(t => t.titulo !== tarefa.titulo);
        listaDeTarefas?.removeChild(container);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    });

    // Evento do botão de prioridade
    prioridadeBtn.addEventListener('click', () => {
        const opcao = prompt("Defina a prioridade:\n1 - Normal\n2 - Importante\n3 - Urgente", tarefa.prioridade) || "1";
        
        // Atualizar array de tarefas
        tarefas = tarefas.map(t => {
            if (t.titulo === tarefa.titulo) {
                return { ...t, prioridade: opcao };
            }
            return t;
        });
        
        // Reordenar e atualizar
        tarefas.sort((a, b) => b.prioridade - a.prioridade);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        listaDeTarefas.innerHTML = '';
        tarefas.forEach(t => renderizarTarefasNoHTML(t));
    });

    // Montagem da estrutura
    container.appendChild(prioridadeBtn);
    tarefaBox.appendChild(input);
    tarefaBox.appendChild(span);
    container.appendChild(tarefaBox);
    container.appendChild(removerBtn);
    
    listaDeTarefas?.appendChild(container);
}

window.onload = () => {
    const tarefasStorage = localStorage.getItem('tarefas');
    if (tarefasStorage) {
        tarefas = JSON.parse(tarefasStorage);
        
        // Ordena do maior (3) para o menor (1) ao carregar
        tarefas.sort((a, b) => b.prioridade - a.prioridade);
        
        // Renderiza na ordem correta
        listaDeTarefas.innerHTML = '';
        tarefas.forEach(t => renderizarTarefasNoHTML(t));
    }
};

formulario?.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const inputTarefa = document.querySelector('#tarefa');
    const tituloDaTarefa = inputTarefa.value.trim();
    
    if (tituloDaTarefa.length <= 3) {
        alert('A tarefa precisa ter no mínimo 3 caracteres.');
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
    inputTarefa.value = '';
    inputTarefa.focus();
});