// products.js - Renderização de produtos

function obterNomeCategoria(categoriaId) {
  if (!CATEGORIAS) return categoriaId;
  const cat = CATEGORIAS.find(c => c.id === categoriaId);
  return cat ? cat.nome : categoriaId;
}

function renderizarCategorias() {
  const container = document.querySelector('.categories-grid');
  if (!container || !CATEGORIAS) return;
  
  container.innerHTML = '';
  
  CATEGORIAS.forEach(cat => {
    const btn = document.createElement('div');
    btn.className = 'category-item';
    btn.dataset.filter = cat.id;
    btn.innerHTML = `
      <div class="category-icon">${cat.emoji}</div>
      <div class="category-name">${cat.nome}</div>
    `;
    
    btn.addEventListener('click', () => {
      const filterInput = document.getElementById('category-filter');
      if (filterInput) filterInput.value = cat.id;
      filtrarProdutos();
    });
    
    container.appendChild(btn);
  });
}

function renderizarProdutos(p) {
  produtosGrid.innerHTML = '';
  
  if (!p.length) {
    produtosGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px">Nenhum produto encontrado</p>';
    return;
  }
  
  p.forEach(pr => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const img = pr.imagem && pr.imagem.startsWith('images/') 
      ? `<img src="${pr.imagem}" alt="${pr.nome}">` 
      : pr.imagemAlternativa || '🎁';
    
    const categoriaNome = obterNomeCategoria(pr.categoriaId);
    
    card.innerHTML = `
      <div class="product-image">
        ${typeof img === 'string' && !img.startsWith('<') ? `<div>${img}</div>` : img}
      </div>
      <div class="product-info">
        <div class="product-category">${categoriaNome}${pr.natal ? ' • 🎄' : ''}</div>
        <h3 class="product-name">${pr.nome}</h3>
        <p class="product-description">${pr.descricao}</p>
        <div class="product-price">R$ ${pr.preco.toFixed(2)}</div>
        <div class="product-actions">
          <button class="btn-modal">Ver Detalhes</button>
          <button class="btn-add-cart">Adicionar</button>
        </div>
      </div>
    `;
    
    const btnModal = card.querySelector('.btn-modal');
    const btnAdd = card.querySelector('.btn-add-cart');
    
    btnModal.onclick = (e) => {
      e.stopPropagation();
      console.log('Clicou em Ver Detalhes:', pr.nome);
      abrirModalProduto(pr);
    };
    
    btnAdd.onclick = (e) => {
      e.stopPropagation();
      console.log('Clicou em Adicionar:', pr.nome);
      modalProduto.dataset.produtoId = pr.id;
      document.getElementById('qty-input').value = 1;
      adicionarAoCarrinho();
    };
    
    card.onclick = () => {
      abrirModalProduto(pr);
    };
    
    produtosGrid.appendChild(card);
  });
}

function filtrarProdutos() {
  const busca = searchInput.value.toLowerCase();
  const categoria = categoryFilter.value;
  
  const filtrados = app.produtos.filter(p => {
    const categoriaOk = !categoria || categoria === 'todas' || p.categoriaId === categoria;
    const buscaOk = p.nome.toLowerCase().includes(busca) || 
                   p.descricao.toLowerCase().includes(busca);
    return categoriaOk && buscaOk && !p.natal;
  });
  
  renderizarProdutos(filtrados);
}
