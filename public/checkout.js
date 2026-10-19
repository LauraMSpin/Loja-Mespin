// checkout.js - Finalização de compra via WhatsApp

// CEP de referência (Casa da Laura em BH)
const CEP_REFERENCIA = '30220400';

// Tabela de frete
const FRETE_TABLE = [
  { kmMax: 2, preco: 5 },
  { kmMax: 5, preco: 10 },
  { kmMax: 10, preco: 15 },
  { kmMax: Infinity, preco: 20 }
];

// Cache de distâncias para evitar requisições repetidas
const distanciaCache = {};

// Função para calcular frete baseado em distância
function calcularFrete(km) {
  for (let tier of FRETE_TABLE) {
    if (km <= tier.kmMax) return tier.preco;
  }
  return 20;
}

// Função para calcular distância entre dois CEPs usando a API
async function calcularDistancia(cepOrigem, cepDestino) {
  const chave = `${cepOrigem}-${cepDestino}`;
  if (distanciaCache[chave]) {
    return distanciaCache[chave];
  }
  
  try {
    // Usar API de geocodificação do Google Maps (requer chave API)
    // Para versão simples, usaremos aproximação por coordenadas via CEP
    
    // Primeiro, obter coordenadas do CEP de origem
    const resOrigem = await fetch(`https://viacep.com.br/ws/${cepOrigem.replace(/\D/g, '')}/json/`);
    const dataOrigem = await resOrigem.json();
    
    if (dataOrigem.erro) {
      console.warn('CEP de origem inválido');
      return null;
    }
    
    // Depois, obter coordenadas do CEP de destino
    const resDestino = await fetch(`https://viacep.com.br/ws/${cepDestino.replace(/\D/g, '')}/json/`);
    const dataDestino = await resDestino.json();
    
    if (dataDestino.erro) {
      console.warn('CEP de destino inválido');
      return null;
    }
    
    // Calcular distância usando fórmula de Haversine
    const lat1 = parseFloat(dataOrigem.lat || 0);
    const lon1 = parseFloat(dataOrigem.lon || 0);
    const lat2 = parseFloat(dataDestino.lat || 0);
    const lon2 = parseFloat(dataDestino.lon || 0);
    
    const km = calcularDistanciaHaversine(lat1, lon1, lat2, lon2);
    
    distanciaCache[chave] = { km, cidade: dataDestino.localidade, estado: dataDestino.uf };
    return distanciaCache[chave];
  } catch (erro) {
    console.error('Erro ao calcular distância:', erro);
    return null;
  }
}

// Fórmula de Haversine para calcular distância entre duas coordenadas
function calcularDistanciaHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raio da terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Verificar se CEP é de BH
function ehCepBH(cep) {
  // CEPs de BH começam com 30 ou 31
  const cepNum = cep.replace(/\D/g, '').substring(0, 2);
  return cepNum === '30' || cepNum === '31';
}

// Atualizar opções de entrega quando CEP é inserido
async function atualizarOpcoesEntrega() {
  const cepInput = document.getElementById('cliente-cep');
  const opcoesFrete = document.getElementById('opcoes-frete');
  const freteAtual = document.getElementById('frete-atual');
  const totalDiv = document.getElementById('total');
  
  if (!cepInput || !cepInput.value) {
    if (opcoesFrete) opcoesFrete.style.display = 'none';
    return;
  }
  
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length !== 8) {
    mostrarToast('CEP deve ter 8 dígitos', 'error');
    return;
  }
  
  // Verificar se é BH
  if (!ehCepBH(cep)) {
    // Calcular frete para fora de BH
    const resultado = await calcularDistancia(CEP_REFERENCIA, cep);
    
    if (!resultado) {
      mostrarToast('CEP inválido', 'error');
      cepInput.value = '';
      if (opcoesFrete) opcoesFrete.style.display = 'none';
      if (freteAtual) freteAtual.style.display = 'none';
      return;
    }
    
    // Para fora de BH, mostrar mensagem de frete a ser definido
    app.freteInfo = { 
      cep: cep, 
      km: resultado.km, 
      frete: 0,  // Frete ainda não definido
      tipo: 'envio',
      cidade: resultado.cidade,
      estado: resultado.estado,
      freteADefinir: true
    };
    
    if (freteAtual) {
      freteAtual.innerHTML = `
        <div style="padding: 10px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
          <strong>📍 ${resultado.cidade}, ${resultado.estado}</strong><br>
          <span style="font-size: 12px;">Distância: ${resultado.km.toFixed(1)} km</span><br>
          <span style="color: #856404; font-size: 13px;">⚠️ Frete será definido no fechamento da compra</span>
        </div>
      `;
      freteAtual.style.display = 'block';
    }
    
    if (opcoesFrete) {
      opcoesFrete.innerHTML = `
        <label style="display: block; margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 4px;">
          <input type="radio" name="tipo-entrega" value="envio" checked>
          <strong>📦 Envio</strong><br>
          <span style="font-size: 12px; color: #666; margin-left: 20px; display: block;">Frete será confirmado via contato direto</span>
        </label>
      `;
      opcoesFrete.style.display = 'block';
    }
  } else {
    // CEP de BH - calcular frete automaticamente
    const resultado = await calcularDistancia(CEP_REFERENCIA, cep);
    
    if (resultado) {
      const frete = calcularFrete(resultado.km);
      app.freteInfo = { 
        cep: cep, 
        tipo: 'retirada', 
        frete: 0, 
        freteADefinir: false,
        km: resultado.km,
        freteEnvio: frete
      };
      
      if (opcoesFrete) {
        opcoesFrete.innerHTML = `
          <label style="display: block; margin-top: 10px;">
            <input type="radio" name="tipo-entrega" value="retirada" checked onchange="atualizarTipoEntrega('retirada')">
            🏪 Retirada em Bairro Serra - R$ 0,00
          </label>
          <label style="display: block; margin-top: 8px;">
            <input type="radio" name="tipo-entrega" value="envio" onchange="atualizarTipoEntrega('envio')">
            📦 Envio - R$ ${frete.toFixed(2)}
          </label>
        `;
        opcoesFrete.style.display = 'block';
        
        // Atualizar total
        atualizarTotalCarrinho();
      }
    }
  }
}

// Função para atualizar tipo de entrega e frete
function atualizarTipoEntrega(tipo) {
  if (tipo === 'retirada') {
    app.freteInfo.tipo = 'retirada';
    app.freteInfo.frete = 0;
  } else if (tipo === 'envio') {
    app.freteInfo.tipo = 'envio';
    app.freteInfo.frete = app.freteInfo.freteEnvio || 0;
  }
  
  // Atualizar exibição do frete
  const freteAtual = document.getElementById('frete-atual');
  if (freteAtual) {
    freteAtual.textContent = app.freteInfo.frete.toFixed(2);
  }
  
  // Atualizar subtotal
  const subtotalDiv = document.getElementById('subtotal');
  if (subtotalDiv) {
    let subtotal = 0;
    app.carrinho.forEach(item => {
      const p = app.produtos.find(x => x.id === item.id);
      if (p) subtotal += p.preco * item.quantidade;
    });
    subtotalDiv.textContent = subtotal.toFixed(2);
  }
  
  atualizarTotalCarrinho();
}

// Atualizar total do carrinho (chamado quando frete muda)
function atualizarTotalCarrinho() {
  let subtotal = 0;
  app.carrinho.forEach(item => {
    const p = app.produtos.find(x => x.id === item.id);
    if (p) subtotal += p.preco * item.quantidade;
  });
  
  const frete = app.freteInfo?.frete || 0;
  const totalFinal = subtotal + frete;
  
  // Atualizar subtotal
  const subtotalDiv = document.getElementById('subtotal');
  if (subtotalDiv) {
    subtotalDiv.textContent = subtotal.toFixed(2);
  }
  
  // Atualizar frete
  const freteDiv = document.getElementById('frete-atual');
  if (freteDiv) {
    freteDiv.textContent = frete.toFixed(2);
  }
  
  // Atualizar total
  const totalDiv = document.getElementById('total');
  if (totalDiv) {
    totalDiv.textContent = totalFinal.toFixed(2);
  }
}

function finalizarCompra() {
  if (!app.carrinho || !app.carrinho.length) {
    mostrarToast('Carrinho vazio', 'error');
    return;
  }
  
  const nomeInput = document.getElementById('cliente-nome');
  const cepInput = document.getElementById('cliente-cep');
  
  const n = (nomeInput && nomeInput.value.trim()) || '';
  const cep = (cepInput && cepInput.value.trim()) || '';
  
  if (!n) {
    mostrarToast('Por favor, preencha seu nome', 'error');
    return;
  }
  
  if (!cep || cep.replace(/\D/g, '').length !== 8) {
    mostrarToast('Por favor, preencha um CEP válido (8 dígitos)', 'error');
    return;
  }
  
  // Obter tipo de entrega escolhido
  const tipoEntrega = document.querySelector('input[name="tipo-entrega"]:checked')?.value || 'retirada';
  
  app.clienteInfo = { nome: n, cep: cep, tipoEntrega: tipoEntrega };
  salvarCarrinho();
  
  let msg = '*🛍️ PEDIDO MESPÍN*\n\n';
  msg += '*Cliente:* ' + n + '\n';
  msg += '*CEP:* ' + cep + '\n';
  msg += '*Entrega:* ' + (tipoEntrega === 'retirada' ? 'Retirada em Bairro Serra' : 'Envio') + '\n\n';
  msg += '*📦 PRODUTOS:*\n';
  
  let total = 0;
  app.carrinho.forEach((item, idx) => {
    const p = app.produtos.find(x => x.id === item.id);
    if (!p) return;
    
    const subtotal = p.preco * item.quantidade;
    total += subtotal;
    
    msg += '\n' + (idx + 1) + '. ' + p.nome + '\n';
    msg += '   Quantidade: ' + item.quantidade + 'x\n';
    msg += '   Valor: R$ ' + subtotal.toFixed(2) + '\n';
    
    if (item.aroma) {
      msg += '   🎨 ' + item.aroma + '\n';
    }
  });
  
  const frete = app.freteInfo?.frete || 0;
  const totalFinal = total + frete;
  
  if (frete > 0) {
    msg += '\n*📦 Frete:* R$ ' + frete.toFixed(2) + '\n';
  } else if (app.freteInfo?.freteADefinir) {
    msg += '\n*📦 Frete:* A definir conforme localização\n';
  }
  
  msg += '\n*💰 TOTAL: R$ ' + totalFinal.toFixed(2);
  if (app.freteInfo?.freteADefinir) {
    msg += ' (sem frete)*\n⚠️ *Frete será confirmado via contato direto*\n\n';
  } else {
    msg += '*\n\n';
  }
  msg += '_Pedido gerado via Loja Mespín_';
  
  const linkWhatsapp = 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(msg);
  
  mostrarToast('Redirecionando para WhatsApp...');
  
  setTimeout(() => {
    window.open(linkWhatsapp, '_blank');
    
    setTimeout(() => {
      app.carrinho = [];
      app.personalizacoes = {};
      app.clienteInfo = { nome: '', cep: '', tipoEntrega: '' };
      app.freteInfo = {};
      salvarCarrinho();
      
      const overlay = document.querySelector('.modal-overlay');
      if (overlay) overlay.classList.remove('active');
      if (modalCarrinho) modalCarrinho.classList.remove('active');
      
      atualizarCarrinho();
      mostrarToast('Obrigado! Aguardamos contato via WhatsApp 💚');
    }, 1000);
  }, 500);
}

// Função para exibir notificações
function mostrarToast(mensagem, tipo = 'info') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = mensagem;
  toast.className = 'toast active ' + tipo;
  
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}
