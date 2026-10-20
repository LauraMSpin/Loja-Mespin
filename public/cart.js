/**
 * CARRINHO - Gerenciamento de itens e operações
 * ═══════════════════════════════════════════════════════════════
 * Adiciona, remove, lista e persiste itens do carrinho
 * ═══════════════════════════════════════════════════════════════
 */

/**
 * Adiciona produto ao carrinho
 */
function adicionarAoCarrinho() {
  try {
    const pId = parseInt(modalProduto.dataset.produtoId);
    const qtd = parseInt(document.getElementById('qty-input').value) || 1;
    const p = MESPIN.state.app.produtos.find(x => x.id === pId);

    if (!p) {
      mostrarToast('Produto não encontrado', 'error');
      return;
    }

    // Valida personalização
    const validacao = MESPIN.utils.validarTotalAromas(p);
    if (!validacao.valido) {
      const tipo = (p.maxAromas || 999) < 999 ? 'aroma(s)' : 'vela(s)';
      mostrarToast(`Distribua ${validacao.necessaria} ${tipo}`, 'error');
      return;
    }

    // Coleta os aromas selecionados com suas quantidades
    const aromasCont = {};
    document.querySelectorAll('.spinner-input').forEach(inp => {
      const q = parseInt(inp.value) || 0;
      if (q > 0) {
        aromasCont[inp.dataset.aroma] = q;
      }
    });

    // Formata string de aromas
    const aroma = Object.keys(aromasCont)
      .map(x => `${x} (${aromasCont[x]})`)
      .join(' + ');

    // Adiciona ao carrinho
    let item = MESPIN.state.app.carrinho.find(i => i.id === pId && i.aroma === aroma);
    if (item) {
      item.quantidade += qtd;
    } else {
      MESPIN.state.app.carrinho.push({ id: pId, quantidade: qtd, aroma: aroma });
    }

    salvarCarrinho();
    atualizarCarrinho();
    fecharModalProduto();
    mostrarToast(p.nome + ' adicionado!');
    MESPIN.debug.log(`Produto ${p.nome} adicionado ao carrinho`);
  } catch (e) {
    console.error('Erro ao adicionar:', e);
    mostrarToast('Erro ao adicionar', 'error');
  }
}

/**
 * Remove produto do carrinho pelo índice
 */
function removerDoCarrinho(idx) {
  if (MESPIN.state.app.carrinho && idx >= 0 && idx < MESPIN.state.app.carrinho.length) {
    const removido = MESPIN.state.app.carrinho[idx];
    MESPIN.state.app.carrinho.splice(idx, 1);
    salvarCarrinho();
    atualizarCarrinho();
    abrirCarrinho();
    mostrarToast('Removido do carrinho');
    MESPIN.debug.log(`Produto removido: ${removido.id}`);
  }
}

/**
 * Limpa todo o carrinho com confirmação
 */
function limparCarrinho() {
  if (confirm('Limpar carrinho?')) {
    MESPIN.state.app.carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
    abrirCarrinho();
    mostrarToast('Carrinho limpo');
    MESPIN.debug.log('Carrinho limpo completamente');
  }
}

/**
 * Atualiza contador visual do carrinho
 */
function atualizarCarrinho() {
  const count = MESPIN.state.app.carrinho.reduce((total, item) => total + item.quantidade, 0);
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) cartCount.textContent = count;
}

/**
 * Abre modal do carrinho e lista itens
 */
function abrirCarrinho() {
  try {
    // Fechar modal do produto primeiro
    fecharModalProduto();
    
    const itemsDiv = document.getElementById('carrinho-items');
    const vazioDiv = document.getElementById('carrinho-vazio');
    const totaisDiv = document.getElementById('carrinho-totais');
    const clienteForm = document.getElementById('cliente-form');
    const finalizarBtn = document.getElementById('finalizar-compra');
    const limparBtn = document.getElementById('limpar-carrinho');
    const modalCarrinhoEl = document.getElementById('modal-carrinho');
    const overlay = document.querySelector('.modal-overlay');

    // Verificar se todos os elementos existem
    if (!itemsDiv || !vazioDiv || !totaisDiv || !clienteForm || !modalCarrinhoEl || !overlay) {
      console.error('Elementos do carrinho não encontrados');
      mostrarToast('Erro ao abrir carrinho', 'error');
      return;
    }

    itemsDiv.innerHTML = '';

    // Verificar se carrinho está vazio
    if (!MESPIN.state.app.carrinho || MESPIN.state.app.carrinho.length === 0) {
      vazioDiv.style.display = 'block';
      totaisDiv.style.display = 'none';
      clienteForm.style.display = 'none';
      if (finalizarBtn) finalizarBtn.style.display = 'none';
      if (limparBtn) limparBtn.style.display = 'none';
    } else {
      vazioDiv.style.display = 'none';
      totaisDiv.style.display = 'block';
      clienteForm.style.display = 'block';
      if (finalizarBtn) finalizarBtn.style.display = 'block';
      if (limparBtn) limparBtn.style.display = 'block';

      // Listar itens do carrinho
      let subtotal = 0;
      MESPIN.state.app.carrinho.forEach((item, idx) => {
        const p = MESPIN.state.app.produtos.find(x => x.id === item.id);
        if (!p) return;

        const itemTotal = p.preco * item.quantidade;
        subtotal += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'carrinho-item';
        itemDiv.innerHTML = `
          <div style="flex:1">
            <div><strong>${p.nome}</strong></div>
            ${item.aroma ? `<div style="font-size:0.9rem;color:#666">${item.aroma}</div>` : ''}
            <div>x${item.quantidade} × R$ ${p.preco.toFixed(2)} = R$ ${itemTotal.toFixed(2)}</div>
          </div>
          <button class="item-remover" data-index="${idx}">🗑️</button>
        `;

        itemDiv.querySelector('.item-remover').addEventListener('click', () => {
          removerDoCarrinho(idx);
        });

        itemsDiv.appendChild(itemDiv);
      });

      // Calcular totais
      const frete = MESPIN.state.app.freteInfo?.frete || 0;
      const total = subtotal + frete;

      const subtotalEl = document.getElementById('subtotal');
      const freteEl = document.getElementById('taxa');
      const totalEl = document.getElementById('total');

      if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);
      if (freteEl) freteEl.textContent = frete.toFixed(2);
      if (totalEl) totalEl.textContent = total.toFixed(2);
    }

    // Restaurar dados do cliente
    const nomeInput = document.getElementById('cliente-nome');
    const cepInput = document.getElementById('cliente-cep');

    if (nomeInput) nomeInput.value = MESPIN.state.app.clienteInfo.nome || '';
    if (cepInput) {
      cepInput.value = MESPIN.state.app.clienteInfo.cep || '';

      // Adicionar listener para atualizar CEP
      cepInput.addEventListener('blur', atualizarOpcoesEntrega);
      cepInput.addEventListener('input', () => {
        let value = cepInput.value.replace(/\D/g, '');
        if (value.length > 5) {
          value = value.substring(0, 5) + '-' + value.substring(5);
        }
        cepInput.value = value;
        MESPIN.state.app.clienteInfo.cep = value;
      });
    }

    // Abrir modal
    overlay.classList.add('active');
    modalCarrinhoEl.classList.add('active');
    MESPIN.debug.log('Modal carrinho aberto');
  } catch (e) {
    console.error('Erro ao abrir carrinho:', e);
    mostrarToast('Erro ao abrir carrinho', 'error');
  }
}

/**
 * Fecha o modal do carrinho completamente (inclui overlay)
 */
function fecharModalCarrinho() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) overlay.classList.remove('active');
  const modalCarrinho = document.getElementById('modal-carrinho');
  if (modalCarrinho) modalCarrinho.classList.remove('active');
}

console.log('✓ cart.js carregado');

