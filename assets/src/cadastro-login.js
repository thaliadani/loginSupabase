async function cadastrar() {
  const username = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!username || !email || !senha) {
    document.getElementById("mensagem").innerText = "Preencha todos os campos!";
    return;
  }

  try {
    // Primeiro verifica se o usuário ou email já existem
    const { data: existingUsers, error: checkError } = await supabase
      .from('usuarios')
      .select('username, email')
      .or(`username.eq.${username},email.eq.${email}`);

    if (checkError) throw checkError;
    
    if (existingUsers && existingUsers.length > 0) {
      const usernameExists = existingUsers.some(u => u.username === username);
      const emailExists = existingUsers.some(u => u.email === email);
      
      if (usernameExists && emailExists) {
        throw new Error('Nome de usuário e email já cadastrados');
      } else if (usernameExists) {
        throw new Error('Nome de usuário já cadastrado');
      } else {
        throw new Error('Email já cadastrado');
      }
    }

    // Cadastra no sistema de autenticação do Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          username: username
        }
      }
    });

    if (authError) throw authError;

    // Salva na tabela de usuários
    const { error: dbError } = await supabase
      .from('usuarios')
      .insert([
        {
          username: username,
          email: email,
          password_hash: senha // Na prática, você deveria usar um hash seguro aqui
        }
      ]);

    if (dbError) throw dbError;

    document.getElementById("mensagem").innerText = "Cadastro realizado com sucesso!";
  } catch (error) {
    document.getElementById("mensagem").innerText = "Erro: " + error.message;
  }
}

async function login() {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    document.getElementById("mensagem").innerText = "Preencha todos os campos!";
    return;
  }

  try {
    // Faz login no sistema de autenticação
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) throw error;

    // Obtém o nome do usuário
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('username')
      .eq('email', email)
      .single();

    if (userError) throw userError;

    document.getElementById("mensagem").innerText = "Login realizado com sucesso!";
    localStorage.setItem("usuarioNome", userData.username);
    
    setTimeout(() => {
      window.location.href = "lista-tarefa.html";
    }, 2000);
  } catch (error) {
    document.getElementById("mensagem").innerText = "Erro: " + error.message;
  }
}