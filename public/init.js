/**
 * INICIALIZAÇÃO - Configuração comum para todas as páginas
 * ═══════════════════════════════════════════════════════════════
 * Inicializa a aplicação, carrega dados, configura eventos
 * Funciona para index.html e natal.html
 * ═══════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  iniciarApp();
});

/**
 * Inicializa toda a aplicação
 */
function iniciarApp() {
  try {
    MESPIN.debug.log('Iniciando aplicação...');

    // 1. Carregar dados dos produtos
    MESPIN.state.app.produtos = PRODUTOS_DATA || [];
    MESPIN.debug.log(`${MESPIN.state.app.produtos.length} produtos carregados`);

    // 2. Carregar carrinho do localStorage
    if (typeof carregarCarrinho === 'function') {
      carregarCarrinho();
    }

    // 3. Renderizar categorias (apenas na página principal)
    if (document.querySelector('.categories-grid')) {
      if (typeof renderizarCategorias === 'function') {
        renderizarCategorias();
        MESPIN.debug.log('Categorias renderizadas');
      }
    }

    // 4. Renderizar produtos (página principal)
    if (document.getElementById('produtos-grid')) {
      if (typeof renderizarProdutos === 'function') {
        renderizarProdutos(MESPIN.state.app.produtos);
        MESPIN.debug.log('Produtos renderizados');
      }
    }

    // 5. Renderizar produtos de Natal (página Natal)
    if (document.getElementById('produtos-natal')) {
      if (typeof renderizarProdutosNatal === 'function') {
        renderizarProdutosNatal();
        MESPIN.debug.log('Produtos natalinos renderizados');
      }
    }

    // 6. Configurar eventos globais
    if (typeof configurarEventos === 'function') {
      configurarEventos();
    }

    // 7. Atualizar contador do carrinho
    if (typeof atualizarCarrinho === 'function') {
      atualizarCarrinho();
    }

    MESPIN.debug.log('✓ App iniciado com sucesso');
    console.log('✓ App iniciado');
  } catch (e) {
    console.error('Erro ao iniciar app:', e);
    mostrarToast('Erro ao iniciar', 'error');
  }
}

/**
 * Configura event listeners globais
 */
function configurarEventos() {
  // Botão do carrinho
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', abrirCarrinho);
  }

  // Botões de fechar modal de produto
  document.querySelectorAll('#modal-produto .modal-close, #modal-close-btn').forEach(btn => {
    btn.addEventListener('click', fecharModalProdutoCompleto);
  });

  // Botão adicionar ao carrinho
  const addBtn = document.getElementById('add-to-cart');
  if (addBtn) {
    addBtn.addEventListener('click', adicionarAoCarrinho);
  }

  // Controles de quantidade
  const qtyPlus = document.getElementById('qty-plus');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyInput = document.getElementById('qty-input');

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
      const pId = parseInt(modalProduto.dataset.produtoId);
      const p = MESPIN.state.app.produtos.find(x => x.id === pId);
      if (p) MESPIN.utils.validarTotalAromas(p);
    });
  }

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
        const pId = parseInt(modalProduto.dataset.produtoId);
        const p = MESPIN.state.app.produtos.find(x => x.id === pId);
        if (p) MESPIN.utils.validarTotalAromas(p);
      }
    });
  }

  if (qtyInput) {
    qtyInput.addEventListener('change', () => {
      const pId = parseInt(modalProduto.dataset.produtoId);
      const p = MESPIN.state.app.produtos.find(x => x.id === pId);
      if (p) MESPIN.utils.validarTotalAromas(p);
    });
  }

  // Botões de fechar modal do carrinho
  document.querySelectorAll('#modal-carrinho .modal-close').forEach(btn => {
    btn.addEventListener('click', fecharModalCarrinho);
  });

  // Botão finalizar compra
  const finalizarBtn = document.getElementById('finalizar-compra');
  if (finalizarBtn) {
    finalizarBtn.addEventListener('click', finalizarCompra);
  }

  // Botão limpar carrinho
  const limparBtn = document.getElementById('limpar-carrinho');
  if (limparBtn) {
    limparBtn.addEventListener('click', limparCarrinho);
  }

  // Busca
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', filtrarProdutos);
  }

  // Overlay do modal - fechar ao clicar fora
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        const modalProduto = document.getElementById('modal-produto');
        const modalCarrinho = document.getElementById('modal-carrinho');
        if (modalProduto) modalProduto.classList.remove('active');
        if (modalCarrinho) modalCarrinho.classList.remove('active');
      }
    });
  }

  // Evitar que cliques dentro do modal fechem ele
  const modalProduto = document.getElementById('modal-produto');
  const modalCarrinho = document.getElementById('modal-carrinho');

  if (modalProduto) {
    modalProduto.addEventListener('click', (e) => { e.stopPropagation(); });
  }
  if (modalCarrinho) {
    modalCarrinho.addEventListener('click', (e) => { e.stopPropagation(); });
  }
}

/**
 * Filtra produtos por busca ou categoria
 */
function filtrarProdutos() {
  const searchTerm = (document.getElementById('search-input')?.value || '').toLowerCase();
  const categoryFilter = document.getElementById('category-filter')?.value || 'todas';

  let produtos = MESPIN.state.app.produtos;

  // Filtrar por categoria
  if (categoryFilter !== 'todas') {
    produtos = produtos.filter(p => p.categoriaId === categoryFilter);
  }

  // Filtrar por busca
  if (searchTerm) {
    produtos = produtos.filter(p =>
      p.nome.toLowerCase().includes(searchTerm) ||
      p.descricao.toLowerCase().includes(searchTerm)
    );
  }

  // Renderizar produtos filtrados
  if (document.getElementById('produtos-grid')) {
    renderizarProdutos(produtos);
  }
}

console.log('✓ init.js carregado');
