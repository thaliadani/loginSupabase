async function cadastrar() {
  const usuario = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!usuario || !email || !senha) {
    document.getElementById("mensagem").innerText = "Preencha todos os campos!";
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.auth.signUp({
    user: usuario,
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

async function login() {
  const usuario = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!usuario || !email || !senha) {
    document.getElementById("mensagem").innerText = "Preencha todos os campos!";
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.auth.signInWithPassword({
    user: usuario,
    email,
    password: senha,
  });

  if (error) {
    document.getElementById("mensagem").innerText = "Erro: " + error.message;
  } else {
    document.getElementById("mensagem").innerText =
      "Login realizado com sucesso!";
    localStorage.setItem("usuarioNome", usuario);
    setTimeout(() => {
      window.location.href = "lista-tarefa.html";
    }, 2000);
  }
}