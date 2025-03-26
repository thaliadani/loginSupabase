function logout() {
    localStorage.removeItem("usuarioNome");
    window.location.href = "cadastro.html";
}