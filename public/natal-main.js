// ═══════════════════════════════════════════════════════════════
// 🎄 SCRIPT PRINCIPAL - PÁGINA NATAL
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar estado do aplicativo
  inicializarNatal();
  
  // Renderizar produtos natalinos
  renderizarProdutosNatal();
  
  // Atualizar carrinho visual
  atualizarCarrinho();
});

// ═══════════════════════════════════════════════════════════════
// 🎄 INICIALIZAR PÁGINA NATAL
// ═══════════════════════════════════════════════════════════════

function inicializarNatal() {
  // Restaurar estado do carrinho do localStorage
  restaurarCarrinho();
  
  // Configurar busca
  configurarBusca();
  
  // Configurar cliques no menu
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Remover active anterior
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      // Adicionar active ao link clicado
      if (!link.href.includes('#')) {
        link.classList.add('active');
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// 🎄 RENDERIZAR PRODUTOS NATALINOS
// ═══════════════════════════════════════════════════════════════

function renderizarProdutosNatal() {
  const container = document.getElementById('produtos-natal');
  
  if (!container || !PRODUTOS_DATA) {
    console.error('Erro: Container ou dados não encontrados');
    return;
  }
  
  // Filtrar apenas produtos natalinos
  const produtosNatalinos = PRODUTOS_DATA.filter(produto => produto.natal === true);
  
  if (produtosNatalinos.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">Nenhum produto natalino disponível no momento.</p>';
    return;
  }
  
  container.innerHTML = '';
  
  produtosNatalinos.forEach(produto => {
    const disponivel = produto.disponivel !== false;
    const imagemUrl = produto.imagem ? produto.imagem : null;
    const categoriaNome = obterNomeCategoria(produto.categoriaId) || 'Produto';
    
    const cartaoHTML = `
      <div class="product-card ${!disponivel ? 'indisponivel' : ''}" data-produto-id="${produto.id}">
        <div class="product-image">
          ${imagemUrl ? `<img src="${imagemUrl}" alt="${produto.nome}" onerror="this.src=''; this.nextElementSibling.style.display='flex';">` : ''}
          <div class="image-fallback" style="${imagemUrl ? 'display:none;' : 'display:flex;'}">${produto.imagemAlternativa || '🎁'}</div>
        </div>
        
        <div class="product-info">
          <span class="product-category">${categoriaNome}</span>
          <h3 class="product-name">${produto.nome}</h3>
          <p class="product-description">${produto.descricao}</p>
          
          <div class="product-price">
            R$ ${produto.preco.toFixed(2).replace('.', ',')}
          </div>
          
          <div class="product-availability">
            ${disponivel ? '<span class="disponivel">✓ Disponível</span>' : '<span class="indisponivel-badge">Indisponível</span>'}
          </div>
          
          <button class="product-add-btn ${!disponivel ? 'disabled' : ''}" 
                  data-produto-id="${produto.id}"
                  ${!disponivel ? 'disabled' : ''}>
            ${disponivel ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </button>
        </div>
      </div>
    `;
    
    container.innerHTML += cartaoHTML;
  });
  
  // Adicionar event listeners
  container.querySelectorAll('.product-add-btn:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      const produtoId = parseInt(btn.dataset.produtoId);
      const produto = PRODUTOS_DATA.find(p => p.id === produtoId);
      if (produto) {
        abrirModalProduto(produto);
      }
    });
  });
  
  // Adicionar tooltips aos botões desabilitados
  container.querySelectorAll('.product-add-btn.disabled').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      mostrarTooltip(btn, 'Este produto não está disponível no momento');
    });
    
    btn.addEventListener('mouseleave', () => {
      esconderTooltip();
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// 🎄 CONFIGURAR BUSCA
// ═══════════════════════════════════════════════════════════════

function configurarBusca() {
  const searchInput = document.getElementById('search-input');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    
    if (!termo) {
      // Se vazio, mostrar todos os natalinos novamente
      renderizarProdutosNatal();
      return;
    }
    
    // Filtrar produtos natalinos por termo de busca
    const produtosNatalinos = PRODUTOS_DATA.filter(p => p.natal === true);
    const resultados = produtosNatalinos.filter(p => 
      p.nome.toLowerCase().includes(termo) ||
      p.descricao.toLowerCase().includes(termo)
    );
    
    const container = document.getElementById('produtos-natal');
    
    if (resultados.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">Nenhum produto encontrado para "${termo}".</p>`;
      return;
    }
    
    container.innerHTML = '';
    
    resultados.forEach(produto => {
      const disponivel = produto.disponivel !== false;
      const imagemUrl = produto.imagem ? produto.imagem : null;
      
      const cartaoHTML = `
        <div class="product-card ${!disponivel ? 'indisponivel' : ''}" data-produto-id="${produto.id}">
          <div class="product-image">
            ${imagemUrl ? `<img src="${imagemUrl}" alt="${produto.nome}" onerror="this.src=''; this.nextElementSibling.style.display='flex';">` : ''}
            <div class="image-fallback" style="${imagemUrl ? 'display:none;' : 'display:flex;'}">${produto.imagemAlternativa || '🎁'}</div>
          </div>
          
          <div class="product-info">
            <span class="product-category">${CATEGORIAS[produto.categoriaId]?.nome || 'Produto'}</span>
            <h3 class="product-name">${produto.nome}</h3>
            <p class="product-description">${produto.descricao}</p>
            
            <div class="product-price">
              R$ ${produto.preco.toFixed(2).replace('.', ',')}
            </div>
            
            <div class="product-availability">
              ${disponivel ? '<span class="disponivel">✓ Disponível</span>' : '<span class="indisponivel-badge">Indisponível</span>'}
            </div>
            
            <button class="product-add-btn ${!disponivel ? 'disabled' : ''}" 
                    data-produto-id="${produto.id}"
                    ${!disponivel ? 'disabled' : ''}>
              ${disponivel ? 'Adicionar ao Carrinho' : 'Indisponível'}
            </button>
          </div>
        </div>
      `;
      
      container.innerHTML += cartaoHTML;
    });
    
    // Reabilitar event listeners
    container.querySelectorAll('.product-add-btn:not(.disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        const produtoId = parseInt(btn.dataset.produtoId);
        const produto = PRODUTOS_DATA.find(p => p.id === produtoId);
        if (produto) {
          abrirModalProduto(produto);
        }
      });
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// 🎄 FUNÇÕES DE CARRINHO (reutilizadas)
// ═══════════════════════════════════════════════════════════════

function restaurarCarrinho() {
  const carrinhoSalvo = localStorage.getItem('mespinCarrinho');
  
  if (carrinhoSalvo) {
    try {
      CARRINHO = JSON.parse(carrinhoSalvo);
    } catch (e) {
      console.warn('Erro ao restaurar carrinho:', e);
      CARRINHO = [];
    }
  }
}

function atualizarCarrinho() {
  // Atualizar contador no header
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItens = CARRINHO.reduce((sum, item) => sum + item.quantidade, 0);
    cartCount.textContent = totalItens;
  }
}

// ═══════════════════════════════════════════════════════════════
// 🎄 AUXILIARES
// ═══════════════════════════════════════════════════════════════

function mostrarTooltip(elemento, mensagem) {
  // Criar tooltip se não existir
  let tooltip = elemento.dataset.tooltip;
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = mensagem;
    tooltip.style.position = 'absolute';
    tooltip.style.background = '#3E2723';
    tooltip.style.color = '#FAF0E6';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    tooltip.style.whiteSpace = 'nowrap';
    tooltip.style.marginTop = '-40px';
    
    elemento.parentElement.style.position = 'relative';
    elemento.parentElement.appendChild(tooltip);
  }
}

function esconderTooltip() {
  document.querySelectorAll('.tooltip').forEach(t => t.remove());
}

console.log('✅ natal-main.js carregado');
