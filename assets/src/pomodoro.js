const tempoPomodoro = 25;
const tempoPausa = 5;
let minutos = tempoPomodoro;
let segundos = 0o0;
let intervalo;

document.getElementById('pomodoro-minutos').innerText = minutos
document.getElementById('pomodoro-segundos').innerText = segundos

const opcaoSelecionada = document.getElementById("pomodoro-pausa").value;
const audioNotificacao = new Audio('./sound/bell.mp3');

function atualizarDisplay() {
    document.getElementById('pomodoro-minutos').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('pomodoro-segundos').textContent = segundos.toString().padStart(2, '0');
}

function iniciarPomodoro() {
    // Desabilita o botão iniciar e habilita os outros
    document.getElementById('iniciar').disabled = true;
    document.getElementById('parar').disabled = false;
    document.getElementById('reiniciar').disabled = false;
    
    // Se não houver intervalo em andamento, cria um
    if (opcaoSelecionada == "pomodoro" && !intervalo) {
        intervalo = setInterval(() => {
            // Quando os segundos chegarem a 0
            if (segundos === 0) {
                if (minutos === 0) {
                    // Timer completado
                    clearInterval(intervalo);
                    intervalo = null;
                     document.getElementById('mensagem-pomodoro').innerText="Tempo do Pomodoro terminado! Comece o intervalo!"
                     audioNotificacao.addEventListener('canplaythrough',function(){
                        audioNotificacao.play();
                     });
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
        }, 1000); // Executa a cada 1 segundo (1000ms)
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
    
    // Reseta o tempo
    minutos = tempoPomodoro;
    segundos = 0;
    
    // Atualiza o display
    atualizarDisplay();
    
    // Desabilita o botão reiniciar até que o timer comece novamente
    document.getElementById('reiniciar').disabled = true;
}

// Inicializa o display quando a página carregar
window.onload = function() {
    atualizarDisplay();
};
