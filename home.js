/** @format */

const API_BASE_URL = 'http://127.0.0.1:8000/backend/api';
const disciplinaLink = document.getElementById('disciplinaLink');
const disciplinaModal = document.getElementById('disciplinaModal');
const disciplinaList = document.getElementById('disciplinaList');

// IDs dos cursos
const cursos = [
  { id: 1, nome: 'Ciência da Computação' },
  { id: 2, nome: 'Engenharia de Computação' },
  //{ id: 3, nome: 'Eletivas' },
];

// Recupera o token do localStorage (ou sessionStorage)
const token = localStorage.getItem('authToken'); // Certifique-se de armazenar o token ao fazer login

if (!token) {
  console.error('Token não encontrado. O usuário precisa estar logado.');
}

// Função para buscar disciplinas da API
async function fetchDisciplinas(idCurso) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/cursos/${idCurso}/disciplinas/`,
      {
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar disciplinas do curso ${idCurso}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.disciplinas;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Função para renderizar as disciplinas organizadas por curso
async function renderDisciplinas() {
  disciplinaList.innerHTML = ''; // Limpa o conteúdo anterior

  for (const curso of cursos) {
    const cursoContainer = document.createElement('div');
    cursoContainer.classList.add('curso-container');

    // Adiciona o título do curso
    const cursoTitulo = document.createElement('h3');
    cursoTitulo.textContent = curso.nome;
    cursoContainer.appendChild(cursoTitulo);

    // Busca e adiciona as disciplinas do curso
    const disciplinas = await fetchDisciplinas(curso.id);
    const disciplinaUl = document.createElement('ul');

    disciplinas.forEach((disciplina) => {
      const disciplinaItem = document.createElement('li');

      // Cria o link para cada disciplina
      const disciplinaLink = document.createElement('a');
      disciplinaLink.textContent = disciplina.nome;
      disciplinaLink.href = `disciplinaSelecionada.html?id=${disciplina.id}`; // Passa o ID da disciplina na URL

      disciplinaItem.appendChild(disciplinaLink);
      disciplinaUl.appendChild(disciplinaItem);
    });

    cursoContainer.appendChild(disciplinaUl);
    disciplinaList.appendChild(cursoContainer);
  }
}

// Manipulador de clique no link de disciplinas
disciplinaLink.addEventListener('click', async function (event) {
  event.preventDefault(); // Previne o comportamento padrão do link

  // Certifique-se de alternar corretamente o estilo do modal
  if (disciplinaModal.style.display === 'block') {
    disciplinaModal.style.display = 'none';
  } else {
    disciplinaModal.style.display = 'block';
    await renderDisciplinas(); // Carrega as disciplinas apenas quando o modal é exibido
  }
});

document
  .getElementById('logoutLink')
  .addEventListener('click', function (event) {
    event.preventDefault(); // Impede o comportamento padrão do link

    // Limpar informações de autenticação
    localStorage.removeItem('token'); // Remove o token do localStorage
    sessionStorage.removeItem('token'); // Remove o token do sessionStorage (se necessário)

    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Redirecionar para a página de login
    window.location.href = 'index.html';
  });
