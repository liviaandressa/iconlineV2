/** @format */

// Popula a lista de professores ao carregar a página
document.addEventListener('DOMContentLoaded', async function () {
  const professorSelect = document.getElementById('professor');

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/backend/api/professores/'
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar professores');
    }

    const professores = await response.json();

    // Preenche o dropdown com os professores retornados da API
    professores.forEach((professor) => {
      const option = document.createElement('option');
      option.value = professor.id; // Assume que a API retorna `id` e `nome` do professor
      option.textContent = professor.nome;
      professorSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar a lista de professores:', error);
    alert('Ocorreu um erro ao carregar a lista de professores.');
  }
});

// Popula a lista de disciplinas ao carregar a página
document.addEventListener('DOMContentLoaded', async function () {
  const disciplinaSelect = document.getElementById('disciplina');

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/backend/api/disciplinas/'
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar disciplinas');
    }

    const disciplinas = await response.json();

    // Preenche o dropdown com as disciplinas retornados da API
    disciplinas.forEach((disciplina) => {
      const option = document.createElement('option');
      option.value = disciplina.id; // Assume que a API retorna `id` e `nome` da disciplina
      option.textContent = disciplina.nome;
      disciplinaSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar a lista de disciplinas:', error);
    alert('Ocorreu um erro ao carregar a lista de disciplinas.');
  }
});

// Lida com o envio do formulário
document
  .getElementById('materialForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    const formData = new FormData();
    // Adicionando campos de texto
    formData.append('nome', document.getElementById('nome').value);
    formData.append('disciplina', document.getElementById('disciplina').value);
    formData.append('professor', document.getElementById('professor').value);
    formData.append('semestre', document.getElementById('semestre').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('link', document.querySelector('input[name="link"]').value);

    // Adicionando checkboxes (tipos e cursos)
    const tipoSelecionado = document.querySelector(
      'input[name="tipo"]:checked'
    );
    if (tipoSelecionado) {
      formData.append('tipo', tipoSelecionado.value);
    } else {
      console.error('Nenhum tipo de material selecionado');
      alert('Você precisa selecionar um tipo de material.');
      return; // Impede o envio do formulário caso nenhum tipo tenha sido selecionado
    }

    const cursos = document.querySelectorAll('input[name="curso"]:checked');
    cursos.forEach((curso) => formData.append('curso', curso.value));

    // Adicionando o arquivo
    const arquivo = document.getElementById('meuArquivo').files[0];
    if (arquivo) {
      formData.append('arquivo', arquivo);
    }

    // Enviar os dados para a API
    fetch('http://127.0.0.1:8000/backend/api/materiais/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error || 'Erro ao processar a solicitação.');
          });
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message); // Exibe a mensagem de sucesso
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert(`Ocorreu um erro: ${error.message}`);
      });
  });
