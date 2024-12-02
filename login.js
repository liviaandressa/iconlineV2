/** @format */

document
  .getElementById('form-login')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validação simples para garantir que todos os campos sejam preenchidos
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      // Envia os dados para a API de login usando fetch
      const response = await fetch(
        'http://127.0.0.1:8000/backend/api/acesso/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: senha,
          }),
        }
      );

      // Verifica a resposta da API
      if (response.ok) {
        const data = await response.json();
        const token = data.token; // O token retornado da API
        // alert('Login bem-sucedido!');

        // Armazena o token no localStorage (ou em cookies, conforme necessário)
        localStorage.setItem('authToken', token);

        // Redireciona para a página inicial ou onde preferir
        window.location.href = 'home.html';
      } else {
        const errorData = await response.json();
        alert(
          errorData.error || 'Credenciais inválidas ou erro ao fazer login.'
        );
      }
    } catch (error) {
      // Trata qualquer erro de conexão ou erro inesperado
      console.error('Erro ao enviar os dados:', error);
      alert('Ocorreu um erro ao tentar fazer login. Tente novamente.');
    }
  });
