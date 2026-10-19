// modal.js - Gerenciamento de modais do produto

function abrirModalProduto(p) {
  console.log('abrirModalProduto chamada com:', p.nome);
  
  // Limpar tooltip ao abrir novo modal
  const tooltip = document.getElementById('btn-tooltip');
  if (tooltip) tooltip.style.display = 'none';
  
  document.getElementById('modal-name').textContent = p.nome;
  document.getElementById('modal-desc').textContent = p.descricao;
  
  // Obter nome da categoria corretamente
  const categoriaNome = obterNomeCategoria(p.categoriaId);
  const categoryDisplay = p.natal ? `${categoriaNome} • 🎄 Natal` : categoriaNome;
  const categoryEl = document.getElementById('modal-category');
  
  // Mostrar categoria apenas se existir
  if (categoriaNome && categoriaNome !== p.categoriaId) {
    categoryEl.textContent = categoryDisplay;
    categoryEl.style.display = 'block';
  } else {
    categoryEl.style.display = 'none';
  }
  
  document.getElementById('modal-price').textContent = p.preco.toFixed(2);
  
  const imgEl = document.getElementById('modal-image');
  imgEl.innerHTML = ''; // Limpar HTML anterior
  
  if (p.imagem && p.imagem.startsWith('images/')) {
    const img = document.createElement('img');
    img.src = p.imagem;
    img.alt = p.nome;
    img.onerror = () => {
      // Se a imagem não carregar, mostrar emoji
      imgEl.innerHTML = '';
      imgEl.textContent = p.imagemAlternativa || '🎁';
    };
    imgEl.appendChild(img);
  } else {
    imgEl.textContent = p.imagemAlternativa || '🎁';
  }
  
  document.getElementById('qty-input').value = 1;
  
  const pc = document.getElementById('personalizacao-container'),
        as = document.getElementById('aromas-simples-container'),
        ak = document.getElementById('aromas-kit-container'),
        ach = document.getElementById('aromas-checkboxes'),
        akh = document.getElementById('aromas-kit-checkboxes');
  
  ach.innerHTML = '';
  akh.innerHTML = '';
  
  let ar = [];
  
  if (p.usarAromas === 'tradicionais') ar = AROMAS.tradicionais;
  else if (p.usarAromas === 'natal') ar = AROMAS.natal;
  else if (p.usarAromas === 'natal_e_tradicionais') {
    ar = [...AROMAS.tradicionais, ...AROMAS.natal];
    AROMAS.tradicionais.forEach(t => {
      AROMAS.natal.forEach(n => {
        ar.push(`${t} + ${n}`);
      });
    });
  }
  
  if (ar.length > 0 && p.personalizavel) {
    pc.style.display = 'block';
    
    const isRestricted = (p.maxAromas || 999) < 999 || (p.maxPorAroma || 999) < 999;
    as.style.display = 'block';
    ak.style.display = 'none';
    
    // Para velas simples: permitir distribuição de quantidade entre aromas
    // Para kits: apenas definir quantidade por aroma
    const maxPerAroma = isRestricted ? (p.maxPorAroma || 1) : 999;
    
    ar.forEach(a => {
      const div = document.createElement('div');
      div.className = 'aroma-quantidade-item';
      div.dataset.aroma = a;
      
      const label = document.createElement('label');
      label.className = 'aroma-label';
      label.textContent = a;
      
      const spinner = document.createElement('div');
      spinner.className = 'aroma-spinner';
      spinner.innerHTML = `
        <button type="button" class="spinner-btn spinner-menos">−</button>
        <input type="number" class="spinner-input" data-aroma="${a}" value="0" min="0" max="${maxPerAroma}">
        <button type="button" class="spinner-btn spinner-mais">+</button>
      `;
      
      const btnMenos = spinner.querySelector('.spinner-menos');
      const btnMais = spinner.querySelector('.spinner-mais');
      const inp = spinner.querySelector('.spinner-input');
      
      const maxAromas = (p.maxAromas || 999);
      
      btnMenos.onclick = () => {
        let v = parseInt(inp.value) || 0;
        if (v > 0) inp.value = v - 1;
        validarTotalAromas(p);
      };
      
      btnMais.onclick = () => {
        let v = parseInt(inp.value) || 0;
        
        // Verificar limite por aroma
        if (v >= maxPerAroma) return;
        
        // Se vai criar novo aroma, verificar limite de aromas diferentes
        if (v === 0) {
          const allInputs = ach.querySelectorAll('.spinner-input');
          let aromaSelecionados = 0;
          allInputs.forEach(input => {
            if (parseInt(input.value) > 0) aromaSelecionados++;
          });
          if (aromaSelecionados >= maxAromas) return;
        }
        
        inp.value = v + 1;
        validarTotalAromas(p);
      };
      
      inp.onchange = () => {
        let v = parseInt(inp.value) || 0;
        if (v < 0) v = 0;
        if (v > maxPerAroma) v = maxPerAroma;
        
        // Verificar limite de aromas diferentes
        const allInputs = ach.querySelectorAll('.spinner-input');
        let aromaSelecionados = 0;
        allInputs.forEach(input => {
          if (input === inp && v > 0) aromaSelecionados++;
          else if (input !== inp && parseInt(input.value) > 0) aromaSelecionados++;
        });
        if (aromaSelecionados > maxAromas) v = 0;
        
        inp.value = v;
        validarTotalAromas(p);
      };
      
      div.appendChild(label);
      div.appendChild(spinner);
      ach.appendChild(div);
    });
  } else {
    pc.style.display = 'none';
  }
  
  modalProduto.dataset.produtoId = p.id;
  modalProduto.dataset.isKit = ((p.maxAromas || 999) < 999 || (p.maxPorAroma || 999) < 999) ? 'true' : 'false';
  
  console.log('Adicionando classe "active" ao overlay');
  
  // Mostra o overlay (backdrop) e o modal
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.add('active');
  }
  modalProduto.classList.add('active');
  
  console.log('Modal aberto:', modalProduto.className);
}

function fecharModalProduto() {
  console.log('fecharModalProduto chamada');
  
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
  modalProduto.classList.remove('active');
}
