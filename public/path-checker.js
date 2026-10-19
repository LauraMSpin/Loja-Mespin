/**
 * path-checker.js
 * 
 * Ferramenta de verificação de caminhos para GitHub Pages
 * Execute este script no console (F12) para verificar se todos os caminhos estão corretos
 * 
 * Uso:
 * 1. Abra o site no navegador
 * 2. Pressione F12 para abrir o Developer Tools
 * 3. Vá até a aba "Console"
 * 4. Copie e cole todo o conteúdo deste arquivo
 * 5. Pressione Enter
 */

(function() {
  console.log('%c🔍 VERIFICADOR DE CAMINHOS - Mespín GitHub Pages', 'font-size: 16px; font-weight: bold; color: #8B4513;');
  console.log('%c='.repeat(60), 'color: #D2B48C;');
  
  const checks = {
    passed: [],
    warnings: [],
    errors: []
  };

  // 1. Verificar BASE_URL
  console.log('\n📌 Configuração de Base URL:');
  if (typeof window.BASE_URL !== 'undefined') {
    console.log(`  ✅ BASE_URL definida: "${window.BASE_URL}"`);
    console.log(`  📍 Hostname: ${window.location.hostname}`);
    console.log(`  📍 Pathname: ${window.location.pathname}`);
    checks.passed.push('BASE_URL configurada');
  } else {
    console.warn('  ⚠️ BASE_URL não definida! Verifique base-url.js');
    checks.warnings.push('BASE_URL não encontrada');
  }

  // 2. Verificar Scripts Carregados
  console.log('\n📜 Scripts Carregados:');
  const scripts = {
    'config.js': 'typeof WHATSAPP_NUMBER',
    'categories.js': 'typeof CATEGORIAS',
    'products-data.js': 'typeof PRODUTOS_DATA',
    'app-state.js': 'typeof app',
    'aromas.js': 'typeof AROMAS',
    'products.js': 'typeof renderizarProdutos',
    'modal.js': 'typeof abrirModalProduto',
    'cart.js': 'typeof adicionarAoCarrinho'
  };

  Object.entries(scripts).forEach(([name, check]) => {
    const result = eval(check);
    if (result && result !== 'undefined') {
      console.log(`  ✅ ${name} carregado`);
      checks.passed.push(name);
    } else {
      console.error(`  ❌ ${name} NÃO CARREGADO`);
      checks.errors.push(name);
    }
  });

  // 3. Verificar Imagens
  console.log('\n🖼️  Verificação de Imagens:');
  const imagesToCheck = [
    { name: 'Logo', selector: '.logo-img' },
    { name: 'Banner Hero', selector: '.banner-hero' },
    { name: 'Produtos Grid', selector: '.produtos-grid .product-card img' }
  ];

  imagesToCheck.forEach(item => {
    const el = document.querySelector(item.selector);
    if (el && el.tagName === 'IMG' && el.complete && el.naturalHeight > 0) {
      console.log(`  ✅ ${item.name}: Carregada`);
      checks.passed.push(`Imagem: ${item.name}`);
    } else if (el && el.tagName === 'IMG') {
      console.warn(`  ⚠️ ${item.name}: Pode estar falhando ao carregar`);
      checks.warnings.push(`Imagem: ${item.name}`);
    } else {
      console.log(`  ℹ️  ${item.name}: Elemento não encontrado (pode estar usando emoji)`);
    }
  });

  // 4. Verificar Estilos CSS
  console.log('\n🎨 Verificação de Estilos:');
  const cssChecks = [
    { name: 'style.css', element: 'body', property: 'font-family' },
    { name: 'natal-style.css', selector: '.banner-natal', property: 'background-image' }
  ];

  cssChecks.forEach(check => {
    const el = document.querySelector(check.selector || 'body');
    if (el) {
      const style = window.getComputedStyle(el);
      const value = style[check.property];
      if (value) {
        console.log(`  ✅ ${check.name}: Estilos aplicados`);
        checks.passed.push(check.name);
      }
    }
  });

  // 5. Verificar DOM Elements
  console.log('\n🏗️  Verificação de Elementos DOM:');
  const domElements = [
    { name: 'Header', selector: 'header' },
    { name: 'Catálogo', selector: '.catalog-section' },
    { name: 'Modal Produto', selector: '#modal-produto' },
    { name: 'Modal Carrinho', selector: '#modal-carrinho' },
    { name: 'Footer', selector: 'footer' }
  ];

  domElements.forEach(item => {
    const el = document.querySelector(item.selector);
    if (el) {
      console.log(`  ✅ ${item.name}: Encontrado`);
      checks.passed.push(`DOM: ${item.name}`);
    } else {
      console.warn(`  ⚠️ ${item.name}: NÃO encontrado`);
      checks.warnings.push(`DOM: ${item.name}`);
    }
  });

  // 6. Verificar LocalStorage
  console.log('\n💾 Verificação de Armazenamento:');
  try {
    localStorage.setItem('test', 'ok');
    const test = localStorage.getItem('test');
    localStorage.removeItem('test');
    if (test === 'ok') {
      console.log('  ✅ LocalStorage: Funcionando');
      checks.passed.push('LocalStorage');
    }
  } catch (e) {
    console.warn('  ⚠️ LocalStorage: Pode estar desabilitado');
    checks.warnings.push('LocalStorage');
  }

  // 7. Verificar Conectividade com Serviços Externos
  console.log('\n🌐 Verificação de Serviços Externos:');
  console.log('  ℹ️  ViaCEP (para cálculo de frete): Será testado ao inserir CEP');

  // 8. Resumo Final
  console.log('\n' + '%c='.repeat(60), 'color: #D2B48C;');
  console.log('%c📊 RESUMO DO DIAGNÓSTICO', 'font-size: 14px; font-weight: bold; color: #8B4513;');
  console.log(`%c✅ Passou: ${checks.passed.length}`, 'color: green; font-weight: bold;');
  console.log(`%c⚠️  Avisos: ${checks.warnings.length}`, 'color: orange; font-weight: bold;');
  console.log(`%c❌ Erros: ${checks.errors.length}`, 'color: red; font-weight: bold;');

  if (checks.errors.length > 0) {
    console.log('\n%c❌ ERROS ENCONTRADOS:', 'color: red; font-weight: bold;');
    checks.errors.forEach(e => console.log(`  - ${e}`));
  }

  if (checks.warnings.length > 0) {
    console.log('\n%c⚠️  AVISOS:', 'color: orange; font-weight: bold;');
    checks.warnings.forEach(w => console.log(`  - ${w}`));
  }

  // Recomendações
  console.log('\n%c💡 RECOMENDAÇÕES:', 'font-size: 12px; font-weight: bold; color: #3E2723;');
  
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('  ℹ️  Você está acessando localmente');
    console.log('  💡 Dica: Após fazer push para GitHub, test em: https://seu-usuario.github.io/repositorio');
  } else if (window.location.hostname.includes('github.io')) {
    console.log('  ✅ Você está acessando via GitHub Pages');
    console.log('  🎉 O site está publicado e acessível!');
  }

  if (checks.errors.length === 0 && checks.warnings.length === 0) {
    console.log('%c🎉 TUDO PRONTO! Seu site está configurado corretamente para GitHub Pages!', 'font-size: 14px; font-weight: bold; color: green; background: #F0FFF0; padding: 10px;');
  }

  console.log('\n%c' + '='.repeat(60), 'color: #D2B48C;');
})();
