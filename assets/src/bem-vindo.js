const usuarioNome = localStorage.getItem("usuarioNome");

    if (usuarioNome) {
        document.getElementById("mensagem").innerText = `Bem-vindo(a), ${usuarioNome}!`;
    } else {
        document.getElementById("mensagem").innerText = "Usuário não autenticado!";
    }