/** @format */

const API_BASE_URL = 'http://127.0.0.1:8000/backend/api';
const disciplinaId = new URLSearchParams(window.location.search).get('id'); // Obtém o ID da disciplina pela URL

const disciplinaNome = document.getElementById('disciplinaNome');
const disciplinaDescricao = document.getElementById('disciplinaDescricao');
const provasLink = document.getElementById('provasLink');
const listasLink = document.getElementById('listasLink');
const projetosLink = document.getElementById('projetosLink');
const todosOsMateriais = document.getElementById('todosMAteriais');

// Configura links dinâmicos
provasLink.addEventListener('click', () => {
  window.location.href = `visualizacaoArquivo.html?tipo=provas&id=${disciplinaId}`;
});

listasLink.addEventListener('click', () => {
  window.location.href = `visualizacaoArquivo.html?tipo=listas&id=${disciplinaId}`;
});

projetosLink.addEventListener('click', () => {
  window.location.href = `visualizacaoArquivo.html?tipo=projetos&id=${disciplinaId}`;
});

todosOsMateriais.addEventListener('click', () => {
  window.location.href = `visualizacaoArquivo.html?tipo=materiais&id=${disciplinaId}`;
});
// Carrega as informações da disciplina ao abrir a página
