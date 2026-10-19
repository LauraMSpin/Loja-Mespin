// utils.js - Funções utilitárias

function validarTotalAromas(p) {
  const inputs = document.querySelectorAll('.spinner-input');
  let totalAromas = 0;
  
  inputs.forEach(inp => {
    totalAromas += parseInt(inp.value) || 0;
  });
  
  // Determinar se é Kit: por categoria ou por nome
  // Se produto tem maxAromas < 999 e maxPorAroma < 999, é Kit (restritivo)
  // Caso contrário, é vela simples
  const isRestricted = (p.maxAromas || 999) < 999 || (p.maxPorAroma || 999) < 999;
  const necessaria = isRestricted ? (p.maxAromas || 1) : parseInt(document.getElementById('qty-input').value) || 1;
  const valido = totalAromas === necessaria;
  
  // Mostrar feedback visual
  const addBtn = document.getElementById('add-to-cart');
  const tooltip = document.getElementById('btn-tooltip');
  
  if (addBtn) {
    addBtn.disabled = !valido;
    addBtn.style.opacity = valido ? '1' : '0.5';
    
    // Mostrar ou esconder tooltip
    if (tooltip) {
      if (!valido) {
        const tipoMsg = isRestricted ? 'aroma(s)' : 'vela(s)';
        tooltip.textContent = `Selecione ${necessaria} ${tipoMsg} (${totalAromas}/${necessaria})`;
        tooltip.style.display = 'block';
      } else {
        tooltip.style.display = 'none';
      }
    }
  }
  
  return {
    quantidade: totalAromas,
    necessaria: necessaria,
    valido: valido
  };
}

function mostrarToast(msg, tipo = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) {
    console.log(msg);
    return;
  }
  
  toast.textContent = msg;
  toast.className = 'toast ' + tipo;
  toast.style.display = 'block';
  
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}
