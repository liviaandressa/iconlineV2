// Script para controlar o modal de disciplinas
const disciplinaLink = document.getElementById('disciplinaLink');
const disciplinaModal = document.getElementById('disciplinaModal');

disciplinaLink.addEventListener('click', function (event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    disciplinaModal.style.display =
        disciplinaModal.style.display === 'block' ? 'none' : 'block'; // Alterna a exibição do modal
});

// Fechar o modal ao clicar fora dele
window.addEventListener('click', function (event) {
    if (event.target === disciplinaModal) {
        disciplinaModal.style.display = 'none';
    }
});

// Script para controlar o modal de cadastro
const floatingButton = document.querySelector('.floating-button');
const modalCadastro = document.getElementById('modal-cadastro');
const closeModal = document.querySelector('.close-modal');

// Abrir o modal ao clicar no botão flutuante
floatingButton.addEventListener('click', () => {
    modalCadastro.style.display = 'flex';
});

// Fechar o modal ao clicar no botão de fechar
closeModal.addEventListener('click', () => {
    modalCadastro.style.display = 'none';
});

// Fechar o modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === modalCadastro) {
        modalCadastro.style.display = 'none';
    }
});

// Submeter o formulário (lógica básica, pode ser expandida)
const formCadastro = document.getElementById('cadastro-form');
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    // Capturar os dados do formulário
    const texto = formCadastro.querySelector('textarea').value;
    const imagem = formCadastro.querySelector('#upload-imagem').files[0];

    console.log('Texto:', texto);
    console.log('Imagem:', imagem);

    // Fechar o modal após o envio
    modalCadastro.style.display = 'none';

    // Resetar o formulário
    formCadastro.reset();
});
