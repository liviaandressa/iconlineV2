/** @format */

document
  .getElementById('form-cadastro')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validação simples para garantir que todos os campos sejam preenchidos
    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      // Envia os dados para a API usando fetch
      const response = await fetch(
        'http://127.0.0.1:8000/backend/api/acesso/cadastro/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: nome,
            email: email,
            password: senha,
          }),
        }
      );

      // Verifica a resposta da API
      if (response.ok) {
        const data = await response.json();
        const token = data.token; // O token retornado da API
        alert('Usuário cadastrado com sucesso!');

        // Redireciona para a página inicial ou onde preferir
        window.location.href = 'home.html';
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Ocorreu um erro ao cadastrar o usuário.');
      }
    } catch (error) {
      // Trata qualquer erro de conexão ou erro inesperado
      console.error('Erro ao enviar os dados:', error);
      alert('Ocorreu um erro ao tentar se cadastrar. Tente novamente.');
    }
  });
