function logout() {
    localStorage.removeItem("usuarioNome");
    window.location.href = "index.html";
}
