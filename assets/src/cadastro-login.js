async function cadastrar() {
  const username = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const mensagem = document.getElementById("mensagem");

  document.getElementById("popup-mensagem").style.display ="flex"

  if (!username || !email || !senha) {
    mensagem.innerText = "Preencha todos os campos!";
    return;
  }

  try {
    // Verifica se o usuário já existe
    const { data: existingUser, error: checkError } = await supabase
      .from("usuarios")
      .select("username, email")
      .or(`username.eq.${username},email.eq.${email}`)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingUser) {
      if (existingUser.username === username && existingUser.email === email) {
        throw new Error("Nome de usuário e email já cadastrados");
      } else if (existingUser.username === username) {
        throw new Error("Nome de usuário já cadastrado");
      } else {
        throw new Error("Email já cadastrado");
      }
    }

    // Cadastra apenas no sistema de autenticação
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (authError) throw authError;

    mensagem.innerText =
      "Cadastro realizado com sucesso! Verifique seu email!";
  } catch (error) {
    mensagem.innerText = "Erro: " + error.message;
  }
}

async function login() {
  const username = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

   document.getElementById("popup-mensagem").style.display ="flex"

  if (!username || !email || !senha) {
    mensagem.innerText = "Preencha todos os campos!";
    return;
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) throw error;

    // Obtém o username do usuário logado
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const username = user.user_metadata.username;

    mensagem.innerText =
      "Login realizado com sucesso!";
    localStorage.setItem("usuarioNome", username);

    setTimeout(() => {
      window.location.href = "lista-tarefa.html";
    }, 2000);
  } catch (error) {
    mensagem.innerText = "Erro: " + error.message;
  }
}
