/**
 * PERSISTÊNCIA - Gerenciamento de localStorage
 * ═══════════════════════════════════════════════════════════════
 * Salva e carrega estado do carrinho com validação de dados
 * ═══════════════════════════════════════════════════════════════
 */

/**
 * Salva carrinho e dados do cliente no localStorage
 * @returns {boolean} true se salvo com sucesso
 */
function salvarCarrinho() {
  try {
    const dados = {
      carrinho: MESPIN.state.app.carrinho || [],
      personalizacoes: MESPIN.state.app.personalizacoes || {},
      clienteInfo: MESPIN.state.app.clienteInfo || {
        nome: '',
        cep: '',
        tipoEntrega: ''
      }
    };

    // Validar dados antes de salvar
    if (!Array.isArray(dados.carrinho)) {
      console.warn('Carrinho inválido, usando array vazio');
      dados.carrinho = [];
    }

    localStorage.setItem('mespin_carrinho', JSON.stringify(dados));
    MESPIN.debug.log('Carrinho salvo com sucesso');
    return true;
  } catch (erro) {
    console.error('Erro ao salvar carrinho:', erro);
    return false;
  }
}

/**
 * Carrega carrinho e dados do cliente do localStorage
 * @returns {boolean} true se carregado com sucesso
 */
function carregarCarrinho() {
  try {
    const dadosArmazenados = localStorage.getItem('mespin_carrinho');

    if (!dadosArmazenados) {
      MESPIN.debug.log('Nenhum carrinho armazenado');
      return false;
    }

    const dados = JSON.parse(dadosArmazenados);

    // Validar estrutura dos dados
    if (!dados || typeof dados !== 'object') {
      console.warn('Dados de carrinho inválidos, reiniciando');
      localStorage.removeItem('mespin_carrinho');
      return false;
    }

    // Restaurar carrinho com validação
    MESPIN.state.app.carrinho = Array.isArray(dados.carrinho) ? dados.carrinho : [];
    MESPIN.state.app.personalizacoes = dados.personalizacoes || {};
    
    // Restaurar dados do cliente com valores padrão
    MESPIN.state.app.clienteInfo = {
      nome: dados.clienteInfo?.nome || '',
      cep: dados.clienteInfo?.cep || '',
      tipoEntrega: dados.clienteInfo?.tipoEntrega || ''
    };

    MESPIN.debug.log('Carrinho carregado com sucesso');
    MESPIN.debug.log(`Itens no carrinho: ${MESPIN.state.app.carrinho.length}`);
    
    if (typeof atualizarCarrinho === 'function') {
      atualizarCarrinho();
    }

    return true;
  } catch (erro) {
    console.error('Erro ao carregar carrinho:', erro);
    // Limpar dados corrompidos
    localStorage.removeItem('mespin_carrinho');
    return false;
  }
}

/**
 * Limpa todos os dados armazenados
 */
function limparArmazenamento() {
  try {
    localStorage.removeItem('mespin_carrinho');
    MESPIN.state.app.carrinho = [];
    MESPIN.state.app.personalizacoes = {};
    MESPIN.state.app.clienteInfo = {
      nome: '',
      cep: '',
      tipoEntrega: ''
    };
    MESPIN.debug.log('Armazenamento limpo');
    return true;
  } catch (erro) {
    console.error('Erro ao limpar armazenamento:', erro);
    return false;
  }
}

console.log('✓ Persistence carregado');
