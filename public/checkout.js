/**
 * CHECKOUT - Finalização de compra via WhatsApp
 * ═══════════════════════════════════════════════════════════════
 * Gerencia seleção de forma de entrega, cálculo de frete e envio
 * ═══════════════════════════════════════════════════════════════
 */

/**
 * Calcula distância entre dois CEPs usando ViaCEP API
 * @param {string} cepOrigem - CEP de origem
 * @param {string} cepDestino - CEP de destino
 * @returns {Object} { km, cidade, estado } ou null
 */
async function calcularDistancia(cepOrigem, cepDestino) {
  const chave = `${cepOrigem}-${cepDestino}`;
  
  // Verificar se já está em cache
  if (MESPIN.state.distanciaCache[chave]) {
    return MESPIN.state.distanciaCache[chave];
  }

  try {
    // Obter coordenadas do CEP de origem
    const resOrigem = await fetch(`https://viacep.com.br/ws/${cepOrigem.replace(/\D/g, '')}/json/`);
    const dataOrigem = await resOrigem.json();

    if (dataOrigem.erro) {
      console.warn('CEP de origem inválido');
      return null;
    }

    // Obter coordenadas do CEP de destino
    const resDestino = await fetch(`https://viacep.com.br/ws/${cepDestino.replace(/\D/g, '')}/json/`);
    const dataDestino = await resDestino.json();

    if (dataDestino.erro) {
      console.warn('CEP de destino inválido');
      return null;
    }

    // Calcular distância
    const lat1 = parseFloat(dataOrigem.lat || 0);
    const lon1 = parseFloat(dataOrigem.lon || 0);
    const lat2 = parseFloat(dataDestino.lat || 0);
    const lon2 = parseFloat(dataDestino.lon || 0);

    const km = MESPIN.utils.calcularDistanciaHaversine(lat1, lon1, lat2, lon2);

    // Cachear resultado
    MESPIN.state.distanciaCache[chave] = { km, cidade: dataDestino.localidade, estado: dataDestino.uf };
    return MESPIN.state.distanciaCache[chave];
  } catch (erro) {
    console.error('Erro ao calcular distância:', erro);
    return null;
  }
}

/**
 * Verifica se um CEP é de Belo Horizonte
 * @param {string} cep - CEP a verificar
 * @returns {boolean}
 */
function ehCepBH(cep) {
  const cepNum = cep.replace(/\D/g, '').substring(0, 2);
  return cepNum === '30' || cepNum === '31';
}

/**
 * Atualiza opções de entrega quando CEP é alterado
 */
async function atualizarOpcoesEntrega() {
  const cepInput = document.getElementById('cliente-cep');
  const opcoesFrete = document.getElementById('opcoes-frete');
  const freteAtual = document.getElementById('frete-atual');

  if (!cepInput || !cepInput.value) {
    if (opcoesFrete) opcoesFrete.style.display = 'none';
    return;
  }

  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length !== 8) {
    mostrarToast('CEP deve ter 8 dígitos', 'error');
    return;
  }

  // Verificar se é Belo Horizonte
  if (!ehCepBH(cep)) {
    // Calcular frete para fora de BH
    const resultado = await calcularDistancia(MESPIN.config.cepReferencia, cep);

    if (!resultado) {
      mostrarToast('CEP inválido', 'error');
      cepInput.value = '';
      if (opcoesFrete) opcoesFrete.style.display = 'none';
      if (freteAtual) freteAtual.style.display = 'none';
      return;
    }

    // Frete a ser definido
    MESPIN.state.app.freteInfo = {
      cep: cep,
      km: resultado.km,
      frete: 0,
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
          <span style="color: #856404; font-size: 13px;">⚠️ Frete será definido no fechamento</span>
        </div>
      `;
      freteAtual.style.display = 'block';
    }

    if (opcoesFrete) {
      opcoesFrete.innerHTML = `
        <label style="display: block; margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 4px;">
          <input type="radio" name="tipo-entrega" value="envio" checked>
          <strong>📦 Envio</strong><br>
          <span style="font-size: 12px; color: #666; margin-left: 20px; display: block;">Frete será confirmado via contato</span>
        </label>
      `;
      opcoesFrete.style.display = 'block';
    }
  } else {
    // CEP de BH - calcular frete automaticamente
    const resultado = await calcularDistancia(MESPIN.config.cepReferencia, cep);

    if (resultado) {
      const frete = MESPIN.utils.calcularFrete(resultado.km);

      MESPIN.state.app.freteInfo = {
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

        atualizarTotalCarrinho();
      }
    }
  }
}

/**
 * Atualiza o tipo de entrega selecionado e recalcula frete
 * @param {string} tipo - 'retirada' ou 'envio'
 */
function atualizarTipoEntrega(tipo) {
  if (tipo === 'retirada') {
    MESPIN.state.app.freteInfo.tipo = 'retirada';
    MESPIN.state.app.freteInfo.frete = 0;
  } else if (tipo === 'envio') {
    MESPIN.state.app.freteInfo.tipo = 'envio';
    MESPIN.state.app.freteInfo.frete = MESPIN.state.app.freteInfo.freteEnvio || 0;
  }

  // Atualizar display
  const freteAtual = document.getElementById('frete-atual');
  if (freteAtual) {
    freteAtual.textContent = MESPIN.state.app.freteInfo.frete.toFixed(2);
  }

  atualizarTotalCarrinho();
}

/**
 * Recalcula e atualiza o total do carrinho na tela
 */
function atualizarTotalCarrinho() {
  let subtotal = 0;
  MESPIN.state.app.carrinho.forEach(item => {
    const p = MESPIN.state.app.produtos.find(x => x.id === item.id);
    if (p) subtotal += p.preco * item.quantidade;
  });

  const frete = MESPIN.state.app.freteInfo?.frete || 0;
  const totalFinal = subtotal + frete;

  const subtotalDiv = document.getElementById('subtotal');
  const freteDiv = document.getElementById('frete-atual');
  const totalDiv = document.getElementById('total');

  if (subtotalDiv) subtotalDiv.textContent = subtotal.toFixed(2);
  if (freteDiv) freteDiv.textContent = frete.toFixed(2);
  if (totalDiv) totalDiv.textContent = totalFinal.toFixed(2);
}

/**
 * Finaliza a compra e abre WhatsApp
 */
function finalizarCompra() {
  if (!MESPIN.state.app.carrinho || !MESPIN.state.app.carrinho.length) {
    mostrarToast('Carrinho vazio', 'error');
    return;
  }

  const nomeInput = document.getElementById('cliente-nome');
  const cepInput = document.getElementById('cliente-cep');

  const nome = (nomeInput && nomeInput.value.trim()) || '';
  const cep = (cepInput && cepInput.value.trim()) || '';

  if (!nome) {
    mostrarToast('Por favor, preencha seu nome', 'error');
    return;
  }

  if (!cep || cep.replace(/\D/g, '').length !== 8) {
    mostrarToast('Por favor, preencha um CEP válido (8 dígitos)', 'error');
    return;
  }

  // Obter tipo de entrega escolhido
  const tipoEntrega = document.querySelector('input[name="tipo-entrega"]:checked')?.value || 'retirada';

  MESPIN.state.app.clienteInfo = { nome, cep, tipoEntrega };
  salvarCarrinho();

  // Montar mensagem WhatsApp
  let msg = '*🛍️ PEDIDO MESPÍN*\n\n';
  msg += '*Cliente:* ' + nome + '\n';
  msg += '*CEP:* ' + cep + '\n';
  msg += '*Entrega:* ' + (tipoEntrega === 'retirada' ? 'Retirada em Bairro Serra' : 'Envio') + '\n\n';
  msg += '*📦 PRODUTOS:*\n';

  let total = 0;
  MESPIN.state.app.carrinho.forEach((item, idx) => {
    const p = MESPIN.state.app.produtos.find(x => x.id === item.id);
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

  const frete = MESPIN.state.app.freteInfo?.frete || 0;
  const totalFinal = total + frete;

  if (frete > 0) {
    msg += '\n*📦 Frete:* R$ ' + frete.toFixed(2) + '\n';
  } else if (MESPIN.state.app.freteInfo?.freteADefinir) {
    msg += '\n*📦 Frete:* A definir conforme localização\n';
  }

  msg += '\n*💰 TOTAL: R$ ' + totalFinal.toFixed(2);
  if (MESPIN.state.app.freteInfo?.freteADefinir) {
    msg += ' (sem frete)*\n⚠️ *Frete será confirmado via contato direto*\n\n';
  } else {
    msg += '*\n\n';
  }
  msg += '_Pedido gerado via Loja Mespín_';

  const linkWhatsapp = 'https://api.whatsapp.com/send?phone=' + MESPIN.config.whatsappNumber + '&text=' + encodeURIComponent(msg);

  mostrarToast('Redirecionando para WhatsApp...');

  setTimeout(() => {
    window.open(linkWhatsapp, '_blank');

    setTimeout(() => {
      MESPIN.state.app.carrinho = [];
      MESPIN.state.app.personalizacoes = {};
      MESPIN.state.app.clienteInfo = { nome: '', cep: '', tipoEntrega: '' };
      MESPIN.state.app.freteInfo = {};
      salvarCarrinho();

      const overlay = document.querySelector('.modal-overlay');
      const modalCarrinho = document.getElementById('modal-carrinho');
      if (overlay) overlay.classList.remove('active');
      if (modalCarrinho) modalCarrinho.classList.remove('active');

      atualizarCarrinho();
      mostrarToast('Obrigado! Aguardamos seu contato via WhatsApp 💚');
    }, 1000);
  }, 500);
}

console.log('✓ checkout.js carregado');
