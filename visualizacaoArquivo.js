/** @format */

const API_BASE_URL = 'http://127.0.0.1:8000/backend/api';

const disciplinaId = new URLSearchParams(window.location.search).get('id'); // Obtém o ID da disciplina pela URL
const tipoMaterial = new URLSearchParams(window.location.search).get('tipo'); // Obtém o tipo de material (provas, listas, etc.)

const disciplinaNome = document.getElementById('disciplinaNome');
const materiaisTableBody = document.getElementById('materiaisTableBody');
const descricaoMaterial = document.getElementById('descricaoMaterial');

// Verificação se o token existe
const token = localStorage.getItem('authToken'); // ou sessionStorage.getItem('authToken')

if (!token) {
  console.error('Token de autenticação não encontrado.');
  window.location.href = 'login.html'; // Redireciona para login se não houver token
}

// Função para buscar materiais da API
async function fetchMateriais() {
  try {
    if (!token) {
      throw new Error('Token de autenticação não encontrado.');
    }
    console.log(token);
    console.log(localStorage.getItem('authToken')); // Verifique o valor do token

    const response = await fetch(
      `${API_BASE_URL}/disciplinas/${disciplinaId}/${tipoMaterial}/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${token}`, // Envia o token no cabeçalho
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao carregar materiais: ${response.statusText}`);
    }

    const data = await response.json();
    disciplinaNome.textContent = data.disciplina;

    materiaisTableBody.innerHTML = '';

    data[tipoMaterial].forEach((material) => {
      const row = document.createElement('tr');

      const tdNome = document.createElement('td');
      tdNome.textContent = material.nome;
      row.appendChild(tdNome);

      const tdProfessor = document.createElement('td');
      tdProfessor.textContent = material.professor;
      row.appendChild(tdProfessor);

      const tdSemestre = document.createElement('td');
      tdSemestre.textContent = material.semestre;
      row.appendChild(tdSemestre);

      const tdAcoes = document.createElement('td');
      const btnDescricao = document.createElement('button');
      btnDescricao.classList.add('btn', 'btn-link', 'text-white');
      btnDescricao.setAttribute('data-bs-toggle', 'modal');
      btnDescricao.setAttribute('data-bs-target', '#confirmModal');
      btnDescricao.innerHTML = '<i class="bi bi-info-circle"></i>';
      btnDescricao.addEventListener('click', () => {
        descricaoMaterial.textContent =
          material.descricao || 'Sem descrição disponível.';
      });
      tdAcoes.appendChild(btnDescricao);

      const btnDownload = document.createElement('a');
      btnDownload.classList.add('btn', 'btn-link', 'text-white');
      btnDownload.setAttribute('href', material.link);
      btnDownload.setAttribute('download', '');
      btnDownload.target = '_blank';
      btnDownload.innerHTML = '<i class="bi bi-download"></i>';
      tdAcoes.appendChild(btnDownload);

      const btnDenunciar = document.createElement('button');
      btnDenunciar.classList.add('btn', 'btn-link', 'text-white');
      btnDenunciar.setAttribute('data-bs-toggle', 'modal');
      btnDenunciar.setAttribute('data-bs-target', '#denunciarModal');
      btnDenunciar.innerHTML = '<i class="bi bi-flag"></i>';
      tdAcoes.appendChild(btnDenunciar);

      row.appendChild(tdAcoes);
      materiaisTableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    disciplinaNome.textContent = 'Erro ao carregar materiais';
  }
}

// Carrega os materiais assim que a página é aberta
fetchMateriais();
