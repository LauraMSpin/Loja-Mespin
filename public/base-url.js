/**
 * Configuração de Base URL
 * Detecta automaticamente se está rodando localmente ou no GitHub Pages
 * e ajusta os caminhos dos recursos (imagens, CSS, JS) accordingly
 */

(function() {
  // Detecta se está no GitHub Pages ou localhost
  const isGitHubPages = window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1' &&
                        !window.location.hostname.includes(':8080');
  
  // Extrai o nome do repositório da URL do GitHub Pages
  // Exemplo: https://usuario.github.io/repositorio/ → repositorio
  let repoName = '';
  if (isGitHubPages) {
    const pathParts = window.location.pathname.split('/').filter(p => p);
    if (pathParts.length > 0 && pathParts[0] !== '') {
      repoName = pathParts[0];
    }
  }

  // Define a base URL para recursos
  window.BASE_URL = repoName ? `/${repoName}` : '';
  
  // Função auxiliar para resolver caminhos
  window.resolvePath = function(path) {
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
      return path; // URLs absolutas não são modificadas
    }
    if (path.startsWith('/')) {
      return window.BASE_URL + path; // Caminhos absolutos recebem base URL
    }
    return path; // Caminhos relativos mantêm-se como estão
  };

  // Log para debugging (remover em produção)
  if (window.location.search.includes('debug')) {
    console.log('🔗 GitHub Pages Detection:');
    console.log('  Hostname:', window.location.hostname);
    console.log('  Is GitHub Pages:', isGitHubPages);
    console.log('  Repository Name:', repoName);
    console.log('  BASE_URL:', window.BASE_URL);
  }
})();
