/**
 * MESPIN NAMESPACE
 * ═══════════════════════════════════════════════════════════════
 * Centraliza todo o estado global e configurações da aplicação
 * Evita poluição do escopo global e reduz conflitos de nomes
 * ═══════════════════════════════════════════════════════════════
 */

window.MESPIN = {
  // ═══════════════════════════════════════════════════════════
  // 1. CONFIGURAÇÃO DA APLICAÇÃO
  // ═══════════════════════════════════════════════════════════
  config: {
    whatsappNumber: '5531984840078',
    taxaAdministrativa: 0.1,
    cepReferencia: '30220400',
    frete: {
      table: [
        { kmMax: 2, preco: 5 },
        { kmMax: 5, preco: 10 },
        { kmMax: 10, preco: 15 },
        { kmMax: Infinity, preco: 20 }
      ]
    },
    validation: {
      emailPattern: /@/g
    }
  },

  // ═══════════════════════════════════════════════════════════
  // 2. ESTADO DA APLICAÇÃO
  // ═══════════════════════════════════════════════════════════
  state: {
    app: {
      produtos: [],
      carrinho: [],
      personalizacoes: {},
      clienteInfo: {
        nome: '',
        cep: '',
        tipoEntrega: ''
      },
      freteInfo: {}
    },

    // Cache de distâncias para evitar requisições repetidas
    distanciaCache: {}
  },

  // ═══════════════════════════════════════════════════════════
  // 3. CACHE DE ELEMENTOS DOM
  // ═══════════════════════════════════════════════════════════
  dom: {
    // Será populado por dom.js após DOMContentLoaded
    cached: false,
    elements: {}
  },

  // ═══════════════════════════════════════════════════════════
  // 4. FUNÇÕES UTILITÁRIAS
  // ═══════════════════════════════════════════════════════════
  utils: {
    /**
     * Valida o total de aromas selecionados
     * @param {Object} produto - Objeto do produto
     * @returns {Object} { quantidade, necessaria, valido }
     */
    validarTotalAromas: function(produto) {
      const inputs = document.querySelectorAll('.spinner-input');
      let totalAromas = 0;

      inputs.forEach(inp => {
        totalAromas += parseInt(inp.value) || 0;
      });

      const isRestricted = (produto.maxAromas || 999) < 999 || (produto.maxPorAroma || 999) < 999;
      const necessaria = isRestricted ? (produto.maxAromas || 1) : parseInt(document.getElementById('qty-input').value) || 1;
      const valido = totalAromas === necessaria;

      // Atualizar feedback visual
      const addBtn = document.getElementById('add-to-cart');
      const tooltip = document.getElementById('btn-tooltip');

      if (addBtn) {
        addBtn.disabled = !valido;
        addBtn.style.opacity = valido ? '1' : '0.5';
      }

      if (tooltip) {
        if (!valido) {
          const tipoMsg = isRestricted ? 'aroma(s)' : 'vela(s)';
          tooltip.textContent = `Selecione ${necessaria} ${tipoMsg} (${totalAromas}/${necessaria})`;
          tooltip.style.display = 'block';
        } else {
          tooltip.style.display = 'none';
        }
      }

      return {
        quantidade: totalAromas,
        necessaria: necessaria,
        valido: valido
      };
    },

    /**
     * Exibe notificação toast
     * @param {string} msg - Mensagem a exibir
     * @param {string} tipo - Tipo: 'success', 'error', 'info'
     */
    mostrarToast: function(msg, tipo = 'success') {
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
    },

    /**
     * Calcula frete baseado em distância
     * @param {number} km - Distância em km
     * @returns {number} Preço do frete
     */
    calcularFrete: function(km) {
      for (let tier of MESPIN.config.frete.table) {
        if (km <= tier.kmMax) return tier.preco;
      }
      return 20;
    },

    /**
     * Calcula distância entre dois pontos usando Haversine
     * @param {number} lat1, lon1, lat2, lon2 - Coordenadas
     * @returns {number} Distância em km
     */
    calcularDistanciaHaversine: function(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
  },

  // ═══════════════════════════════════════════════════════════
  // 5. MÉTODOS PARA LOGGING E DEBUGGING
  // ═══════════════════════════════════════════════════════════
  debug: {
    /**
     * Log seguro para debug
     */
    log: function(...args) {
      if (window.location.search.includes('debug')) {
        console.log('[MESPIN]', ...args);
      }
    },

    /**
     * Exibe estado atual
     */
    exibirEstado: function() {
      console.table({
        'Produtos': MESPIN.state.app.produtos.length,
        'Itens no Carrinho': MESPIN.state.app.carrinho.length,
        'Cliente Nome': MESPIN.state.app.clienteInfo.nome || '(vazio)',
        'Client CEP': MESPIN.state.app.clienteInfo.cep || '(vazio)'
      });
    }
  }
};

// ═══════════════════════════════════════════════════════════
// RETROCOMPATIBILIDADE COM CÓDIGO ANTIGO
// ═══════════════════════════════════════════════════════════
// Estes aliases permitem que código antigo continue funcionando
// Será removido em versão futura após refatoração completa

const app = MESPIN.state.app;
const CONFIG = MESPIN.config;
const WHATSAPP_NUMBER = MESPIN.config.whatsappNumber;
const CEP_REFERENCIA = MESPIN.config.cepReferencia;
const FRETE_TABLE = MESPIN.config.frete.table;

function mostrarToast(msg, tipo = 'success') {
  MESPIN.utils.mostrarToast(msg, tipo);
}

function validarTotalAromas(p) {
  return MESPIN.utils.validarTotalAromas(p);
}

function calcularFrete(km) {
  return MESPIN.utils.calcularFrete(km);
}

function calcularDistanciaHaversine(lat1, lon1, lat2, lon2) {
  return MESPIN.utils.calcularDistanciaHaversine(lat1, lon1, lat2, lon2);
}

console.log('✓ Namespace MESPIN carregado');
