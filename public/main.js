// main.js - Inicialização e Event Listeners

document.addEventListener('DOMContentLoaded', () => {
  iniciarApp();
});

function iniciarApp() {
  try {
    app.produtos = PRODUTOS_DATA;
    carregarCarrinho();
    renderizarCategorias();
    renderizarProdutos(app.produtos);
    configurarEventos();
    console.log('✓ App iniciado');
  } catch (e) {
    console.error('Erro:', e);
    mostrarToast('Erro ao iniciar', 'error');
  }
}

function configurarEventos() {
  if (cartBtn) cartBtn.addEventListener('click', abrirCarrinho);
  
  document.querySelectorAll('#modal-produto .modal-close, #modal-close-btn').forEach(btn => {
    btn.addEventListener('click', fecharModalProduto);
  });
  
  const addBtn = document.getElementById('add-to-cart');
  if (addBtn) addBtn.addEventListener('click', adicionarAoCarrinho);
  
  const qtyPlus = document.getElementById('qty-plus');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyInput = document.getElementById('qty-input');
  
  if (qtyPlus) qtyPlus.addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
    // Revalidar após mudança
    const pId = parseInt(modalProduto.dataset.produtoId);
    const p = app.produtos.find(x => x.id === pId);
    if (p) validarTotalAromas(p);
  });
  
  if (qtyMinus) qtyMinus.addEventListener('click', () => {
    if (parseInt(qtyInput.value) > 1) {
      qtyInput.value = parseInt(qtyInput.value) - 1;
      // Revalidar após mudança
      const pId = parseInt(modalProduto.dataset.produtoId);
      const p = app.produtos.find(x => x.id === pId);
      if (p) validarTotalAromas(p);
    }
  });
  
  if (qtyInput) qtyInput.addEventListener('change', () => {
    const pId = parseInt(modalProduto.dataset.produtoId);
    const p = app.produtos.find(x => x.id === pId);
    if (p) validarTotalAromas(p);
  });
  
  document.querySelectorAll('#modal-carrinho .modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = document.querySelector('.modal-overlay');
      if (overlay) overlay.classList.remove('active');
      modalCarrinho.classList.remove('active');
    });
  });
  
  const finalizarBtn = document.getElementById('finalizar-compra');
  if (finalizarBtn) finalizarBtn.addEventListener('click', finalizarCompra);
  
  const limparBtn = document.getElementById('limpar-carrinho');
  if (limparBtn) limparBtn.addEventListener('click', limparCarrinho);
  
  if (searchInput) searchInput.addEventListener('input', filtrarProdutos);
  
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        if (modalProduto) modalProduto.classList.remove('active');
        if (modalCarrinho) modalCarrinho.classList.remove('active');
      }
    });
  }
  
  if (modalProduto) modalProduto.addEventListener('click', (e) => { e.stopPropagation(); });
  if (modalCarrinho) modalCarrinho.addEventListener('click', (e) => { e.stopPropagation(); });
}