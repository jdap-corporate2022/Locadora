// auth.js - Mapeamento e Proteção de Rotas do MotoFácil

(function() {
  // Obtém o nome do arquivo da página atual
  const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

  // Verifica as sessões salvas
  const estaLogado = localStorage.getItem('usuarioLogado') === 'true' || 
                     sessionStorage.getItem('usuarioLogado') === 'true';

  // Páginas que NÃO precisam de login (públicas)
  const paginasPublicas = ['login.html'];

  // Se a página for protegida e o usuário NÃO estiver logado, redireciona para o login
  if (!paginasPublicas.includes(paginaAtual) && !estaLogado) {
    window.location.href = 'login.html';
  }

  // Se o usuário JÁ estiver logado e tentar acessar a tela de login, redireciona para o início
  if (paginasPublicas.includes(paginaAtual) && estaLogado) {
    window.location.href = 'index.html';
  }
})();

// Função global de Logout (pode ser chamada de qualquer botão do sistema)
function fazerLogout() {
  localStorage.removeItem('usuarioLogado');
  sessionStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}
