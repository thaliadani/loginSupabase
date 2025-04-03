async function login() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !email || !senha) {
    document.getElementById("mensagem").innerText = "Preencha todos os campos!";
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    user: nome,
    email,
    password: senha,
  });

  if (error) {
    document.getElementById("mensagem").innerText = "Erro: " + error.message;
  } else {
    document.getElementById("mensagem").innerText =
      "Login realizado com sucesso!";
    localStorage.setItem("usuarioNome", nome);
    setTimeout(() => {
      window.location.href = "lista-tarefa.html";
    }, 2000);
  }
}

async function cadastrar() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !email || !senha) {
    document.getElementById("mensagem").innerText = "Preencha todos os campos!";
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    user: nome,
    email,
    password: senha,
  });

  if (error) {
    document.getElementById("mensagem").innerText = "Erro: " + error.message;
  } else {
    document.getElementById("mensagem").innerText =
      "Cadastro realizado com sucesso!";
  }
}
