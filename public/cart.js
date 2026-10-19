// cart.js - Gerenciamento de carrinho

console.log('✓ cart_novo.js carregado');

function adicionarAoCarrinho() {
  try {
    const pId = parseInt(modalProduto.dataset.produtoId);
    const qtd = parseInt(document.getElementById('qty-input').value) || 1;
    const isKit = modalProduto.dataset.isKit === 'true' || modalProduto.dataset.isKit === true;
    const p = app.produtos.find(x => x.id === pId);
    
    if (!p) {
      mostrarToast('Produto não encontrado', 'error');
      return;
    }
    
    // Valida personalização
    const validacao = validarTotalAromas(p);
    if (!validacao.valido) {
      mostrarToast(`Distribua ${validacao.necessaria} ${isKit ? 'aroma(s)' : 'vela(s)'}`, 'error');
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
    let item = app.carrinho.find(i => i.id === pId && i.aroma === aroma);
    if (item) {
      item.quantidade += qtd;
    } else {
      app.carrinho.push({ id: pId, quantidade: qtd, aroma: aroma });
    }
    
    salvarCarrinho();
    atualizarCarrinho();
    fecharModalProduto();
    mostrarToast(p.nome + ' adicionado!');
  } catch (e) {
    console.error('Erro ao adicionar:', e);
    mostrarToast('Erro ao adicionar', 'error');
  }
}

function abrirCarrinho() {
  try {
    const itemsDiv = document.getElementById('carrinho-items');
    const vazioDiv = document.getElementById('carrinho-vazio');
    const totaisDiv = document.getElementById('carrinho-totais');
    const clienteForm = document.getElementById('cliente-form');
    const finalizarBtn = document.getElementById('finalizar-compra');
    const limparBtn = document.getElementById('limpar-carrinho');
    const modalCarrinhoEl = document.getElementById('modal-carrinho');
    const overlay = document.querySelector('.modal-overlay');
    
    console.log('abrirCarrinho:', {
      itemsDiv: !!itemsDiv,
      vazioDiv: !!vazioDiv,
      totaisDiv: !!totaisDiv,
      clienteForm: !!clienteForm,
      finalizarBtn: !!finalizarBtn,
      limparBtn: !!limparBtn,
      modalCarrinhoEl: !!modalCarrinhoEl,
      overlay: !!overlay
    });
    
    if (!itemsDiv || !vazioDiv || !totaisDiv || !clienteForm || !modalCarrinhoEl || !overlay) {
      console.error('Elementos do carrinho não encontrados', {
        itemsDiv, vazioDiv, totaisDiv, clienteForm, modalCarrinhoEl, overlay
      });
      return;
    }
    
    itemsDiv.innerHTML = '';
    
    if (!app.carrinho || app.carrinho.length === 0) {
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
      
      let subtotal = 0;
      app.carrinho.forEach((item, idx) => {
        const p = app.produtos.find(x => x.id === item.id);
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
      
      const frete = app.freteInfo?.frete || 0;
      const total = subtotal + frete;
      
      const subtotalEl = document.getElementById('subtotal');
      const taxaEl = document.getElementById('taxa');
      const totalEl = document.getElementById('total');
      
      if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);
      if (taxaEl) taxaEl.textContent = frete.toFixed(2);
      if (totalEl) totalEl.textContent = total.toFixed(2);
    }
    
    // Atualiza dados do cliente
    const nomeInput = document.getElementById('cliente-nome');
    const cepInput = document.getElementById('cliente-cep');
    
    if (nomeInput) nomeInput.value = app.clienteInfo.nome || '';
    if (cepInput) {
      cepInput.value = app.clienteInfo.cep || '';
      // Adicionar listener para quando o CEP muda
      cepInput.addEventListener('blur', atualizarOpcoesEntrega);
      cepInput.addEventListener('input', () => {
        // Formatar CEP enquanto digita
        let value = cepInput.value.replace(/\D/g, '');
        if (value.length > 5) {
          value = value.substring(0, 5) + '-' + value.substring(5);
        }
        cepInput.value = value;
      });
    }
    
    // Abre o modal
    console.log('Ativando modal:', {
      overlay: !!overlay,
      modalCarrinhoEl: !!modalCarrinhoEl,
      overlayClass: overlay?.className,
      modalClass: modalCarrinhoEl?.className
    });
    
    if (overlay) {
      overlay.classList.add('active');
      console.log('Overlay ativado:', overlay.className);
    }
    if (modalCarrinhoEl) {
      modalCarrinhoEl.classList.add('active');
      console.log('Modal carrinho ativado:', modalCarrinhoEl.className);
    }
  } catch (e) {
    console.error('Erro ao abrir carrinho:', e);
    mostrarToast('Erro ao abrir carrinho', 'error');
  }
}

function removerDoCarrinho(idx) {
  if (app.carrinho && idx >= 0 && idx < app.carrinho.length) {
    app.carrinho.splice(idx, 1);
    salvarCarrinho();
    atualizarCarrinho();
    abrirCarrinho();
    mostrarToast('Removido do carrinho');
  }
}

function limparCarrinho() {
  if (confirm('Limpar carrinho?')) {
    app.carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
    abrirCarrinho();
    mostrarToast('Carrinho limpo');
  }
}

function atualizarCarrinho() {
  const count = app.carrinho.reduce((total, item) => total + item.quantidade, 0);
  if (cartCount) cartCount.textContent = count;
}

// Event Listeners para botões de carrinho
document.addEventListener('DOMContentLoaded', () => {
  const btnFinalizarCompra = document.getElementById('finalizar-compra');
  const btnLimparCarrinho = document.getElementById('limpar-carrinho');
  
  if (btnFinalizarCompra) {
    btnFinalizarCompra.addEventListener('click', finalizarCompra);
  }
  
  if (btnLimparCarrinho) {
    btnLimparCarrinho.addEventListener('click', limparCarrinho);
  }
});

