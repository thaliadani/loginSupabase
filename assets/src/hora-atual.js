// Exibe a hora atual no formato HH:MM

const horaAtual = new Date();
const horaFormatada = horaAtual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
document.getElementById('hora').innerText = horaFormatada;  

// Atualiza a hora a cada segundo

setInterval(() => {
    const horaAtual = new Date();
    const horaFormatada = horaAtual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('hora').innerText = horaFormatada;  
}, 1000);


