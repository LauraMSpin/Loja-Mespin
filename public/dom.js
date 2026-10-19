// dom.js - Cache de referências aos elementos do DOM

const DOM = {
  // Modais
  modalProduto: document.getElementById('modal-produto'),
  modalCarrinho: document.getElementById('modal-carrinho'),
  modalOverlay: document.querySelector('.modal-overlay'),
  
  // Grid de produtos
  produtosGrid: document.getElementById('produtos-grid'),
  produtosNatal: document.getElementById('produtos-natal'),
  
  // Detalhes do produto (modal)
  modalCategoria: document.getElementById('modal-category'),
  modalNome: document.getElementById('modal-name'),
  modalDescricao: document.getElementById('modal-desc'),
  modalPreco: document.getElementById('modal-price'),
  modalEmoji: document.getElementById('modal-image'),
  
  // Personalização de aromas
  personalizacaoContainer: document.getElementById('personalizacao-container'),
  aromasSimples: document.getElementById('aromas-simples-container'),
  aromasKit: document.getElementById('aromas-kit-container'),
  aromasCheckboxes: document.getElementById('aromas-checkboxes'),
  aromasKitCheckboxes: document.getElementById('aromas-kit-checkboxes'),
  
  // Quantidade
  qtyInput: document.getElementById('qty-input'),
  qtyPlus: document.getElementById('qty-plus'),
  qtyMinus: document.getElementById('qty-minus'),
  
  // Botões do modal de produto
  addToCartBtn: document.getElementById('add-to-cart'),
  modalCloseBtn: document.getElementById('modal-close-btn'),
  
  // Carrinho
  cartBtn: document.getElementById('cart-btn'),
  cartCount: document.querySelector('.cart-count'),
  carrinhoVazio: document.getElementById('carrinho-vazio'),
  carrinhoItems: document.getElementById('carrinho-items'),
  
  // Totais do carrinho
  subtotal: document.getElementById('subtotal'),
  taxa: document.getElementById('taxa'),
  total: document.getElementById('total'),
  
  // Formulário de cliente
  clienteNome: document.getElementById('cliente-nome'),
  clienteEmail: document.getElementById('cliente-email'),
  clienteWhatsapp: document.getElementById('cliente-whatsapp'),
  
  // Botões de ação
  finalizarCompra: document.getElementById('finalizar-compra'),
  limparCarrinho: document.getElementById('limpar-carrinho'),
  
  // Busca e filtros
  searchInput: document.getElementById('search-input'),
  categoryFilter: document.getElementById('category-filter'),
  
  // Navegação
  navLinks: document.querySelectorAll('.nav-link'),
  categoryItems: document.querySelectorAll('.category-item'),
  bannerButtons: document.querySelectorAll('.banner-hero button'),
  
  // Seções
  catalogSection: document.getElementById('catalogo'),
  natalSection: document.getElementById('natal'),
  bannerHero: document.querySelector('.banner-hero'),
  
  // Header e menu
  header: document.querySelector('header'),
  topBar: document.querySelector('.top-bar'),
  searchBar: document.querySelector('.search-bar'),
  
  // Toast/notificações
  toast: document.getElementById('toast')
};

// Retrocompatibilidade com versão minificada anterior
const modalProduto = DOM.modalProduto;
const modalCarrinho = DOM.modalCarrinho;
const produtosGrid = DOM.produtosGrid;
const produtosNatal = DOM.produtosNatal;
const cartBtn = DOM.cartBtn;
const cartCount = DOM.cartCount;
const toast = DOM.toast;
const searchInput = DOM.searchInput;
const categoryFilter = DOM.categoryFilter;
const clienteNomeInput = DOM.clienteNome;
const clienteEmailInput = DOM.clienteEmail;
const clienteWhatsappInput = DOM.clienteWhatsapp;
