const tempoPomodoro = 25;
const tempoPausa = 5;
let minutos = tempoPomodoro;
let segundos = 0;
let intervalo;
let emPausa = false;

// Elementos do DOM
const displayMinutos = document.getElementById('pomodoro-minutos');
const displaySegundos = document.getElementById('pomodoro-segundos');
const selectPomodoroPausa = document.getElementById('pomodoro-pausa');
const mensagemPomodoro = document.getElementById('mensagem-pomodoro');
const audioNotificacao = new Audio('assets/sound/notification.mp3');
let audioLiberado = false;

function liberarAudio() {
    audioLiberado = true;
    // Reproduzir e pausar imediatamente para "destravar" o áudio
    audioNotificacao.play().then(() => {
        audioNotificacao.pause();
        audioNotificacao.currentTime = 0;
    }).catch(e => {
        console.error("Pré-liberação do áudio falhou:", e);
    });
}

// Adicionar evento de clique em algum elemento para liberar o áudio
document.addEventListener('DOMContentLoaded', () => {
    // Pode ser qualquer elemento - botão, div, ou até o documento todo
    document.body.addEventListener('click', liberarAudio, { once: true });
    
    // Ou especificamente no botão de iniciar
    document.getElementById('iniciar').addEventListener('click', liberarAudio, { once: true });
});

// Configuração do áudio para autoplay
audioNotificacao.muted = false;
audioNotificacao.preload = 'auto';

// Inicializa o display
atualizarDisplay();

// Event listener para mudança no select
selectPomodoroPausa.addEventListener('change', function() {
    alternarModo();
});

function alternarModo() {
    const modoSelecionado = selectPomodoroPausa.value;
    
    // Para o timer se estiver rodando
    pararPomodoro();
    
    if (modoSelecionado === "pomodoro") {
        minutos = tempoPomodoro;
        emPausa = false;
    } else {
        minutos = tempoPausa;
        emPausa = true;
    }
    
    segundos = 0;
    atualizarDisplay();
    mensagemPomodoro.innerText = "";
    
    // Habilita o botão iniciar quando alterna o modo
    document.getElementById('iniciar').disabled = false;
}

function atualizarDisplay() {
    displayMinutos.textContent = minutos.toString().padStart(2, '0');
    displaySegundos.textContent = segundos.toString().padStart(2, '0');
}

function iniciarPomodoro() {
    // Desabilita o botão iniciar e habilita os outros
    document.getElementById('iniciar').disabled = true;
    document.getElementById('parar').disabled = false;
    document.getElementById('reiniciar').disabled = false;
    
    // Se não houver intervalo em andamento, cria um
    if (!intervalo) {
        intervalo = setInterval(() => {
            // Quando os segundos chegarem a 0
            if (segundos === 0) {
                if (minutos === 0) {
                    // Timer completado
                    clearInterval(intervalo);
                    intervalo = null;
                    
                    // Exibir mensagem
                    if (emPausa) {
                        mensagemPomodoro.innerText = "Pausa terminada! Volte a tarefa!";
                    } else {
                        mensagemPomodoro.innerText = "Tempo do Pomodoro terminado! Descanse!";
                    }
                    
                    // Tocar o som de notificação
                    audioNotificacao.play().catch(e => {
                        console.error("Erro ao reproduzir som:", e);
                        mensagemPomodoro.style.display = 'block';
                    });
                    
                    // Habilita o botão iniciar para que o usuário possa escolher o que fazer
                    document.getElementById('iniciar').disabled = false;
                    
                    return;
                } else {
                    // Decrementa os minutos e reseta os segundos
                    minutos--;
                    segundos = 59;
                }
            } else {
                // Decrementa os segundos
                segundos--;
            }
            
            // Atualiza o display
            atualizarDisplay();
        }, 1000);
    }
}

function pararPomodoro() {
    // Habilita o botão iniciar e desabilita o parar
    document.getElementById('iniciar').disabled = false;
    document.getElementById('parar').disabled = true;
    
    // Para o intervalo
    clearInterval(intervalo);
    intervalo = null;
}

function reiniciarPomodoro() {
    // Para o timer se estiver rodando
    pararPomodoro();
    
    // Reseta o tempo de acordo com o modo atual
    if (selectPomodoroPausa.value === "pomodoro") {
        minutos = tempoPomodoro;
        emPausa = false;
    } else {
        minutos = tempoPausa;
        emPausa = true;
    }
    
    segundos = 0;
    
    // Atualiza o display
    atualizarDisplay();
    
    // Desabilita o botão reiniciar até que o timer comece novamente
    document.getElementById('reiniciar').disabled = true;
    
    // Limpa mensagens
    mensagemPomodoro.innerText = "";
    mensagemPomodoro.style.display = 'block';
    
    // Habilita o botão iniciar
    document.getElementById('iniciar').disabled = false;
}

// Inicializa o display quando a página carregar
window.onload = function() {
    atualizarDisplay();
    
    // Garante que o elemento de mensagem está visível
    if (mensagemPomodoro) {
        mensagemPomodoro.style.display = 'block';
    }
};

