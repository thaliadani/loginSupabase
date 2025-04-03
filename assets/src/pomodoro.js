const tempoPomodoro = 25;
let minutos = tempoPomodoro;
let segundos = 0;
let intervalo;

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
    if (!intervalo) {
        intervalo = setInterval(() => {
            // Quando os segundos chegarem a 0
            if (segundos === 0) {
                if (minutos === 0) {
                    // Timer completado
                    clearInterval(intervalo);
                    intervalo = null;
                    alert("Tempo do Pomodoro terminado!");
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

// Inicializa o display quando a página carrega
window.onload = function() {
    atualizarDisplay();
};