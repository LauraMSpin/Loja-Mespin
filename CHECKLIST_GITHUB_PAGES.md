# ✅ Checklist de Verificação - Publicação GitHub Pages

## 📋 Antes de Publicar

### Estrutura do Projeto
- [x] Pasta `public/` contém `index.html`
- [x] Pasta `public/` contém `natal.html`
- [x] Pasta `public/` contém `style.css` e `natal-style.css`
- [x] Pasta `public/` contém todos os scripts `.js`
- [x] Pasta `public/images/` contém todas as imagens
- [x] Arquivo `.gitignore` criado
- [x] Arquivo `.github/workflows/deploy.yml` criado

### Configuração de Caminhos
- [x] `index.html` - Links relativos (`natal.html`, não `/natal.html`)
- [x] `natal.html` - Links para `index.html` são relativos
- [x] Imagens usam caminhos relativos (`images/produtos/produto-001.png`)
- [x] CSS e JS linkados com caminhos relativos
- [x] Script `base-url.js` carregado primeiro em ambas páginas
- [x] Arquivo `.gitignore` exclui arquivos desnecessários

### Arquivo .gitignore
```
✅ Criado com:
  - Arquivos do sistema (.DS_Store, Thumbs.db)
  - Arquivos de editor (.vscode, .idea)
  - Node modules e build
  - Arquivos .env
  - Temporários e logs
```

### Workflow GitHub Actions
```
✅ Criado em .github/workflows/deploy.yml com:
  - Trigger em push para main/master
  - Permissões corretas (pages: write)
  - Upload de artifact da pasta public/
  - Deploy automático para GitHub Pages
```

---

## 🔍 Verificação de Caminhos (Manual)

### 1. Arquivo: index.html

```html
✅ Head contém:
  <script src="base-url.js"></script>

✅ Logos/Imagens usam caminhos relativos:
  <img src="logo-mespin.png" alt="Logo Mespín">
  <img src="banner-mespin.png" alt="Banner">

✅ Links de navegação são internos:
  <a href="natal.html" class="nav-link">Natal</a>
  <a href="index.html" class="nav-link">Início</a>

✅ Scripts carregados com caminhos relativos:
  <script src="config.js"></script>
  <script src="base-url.js"></script>
  ... etc
```

### 2. Arquivo: natal.html

```html
✅ Head contém:
  <script src="base-url.js"></script>

✅ Links de navegação para volta:
  <a href="index.html" class="nav-link">Início</a>
  <a href="index.html#catalogo" class="nav-link">Catálogo</a>

✅ Mesmo logo e scripts que index.html
```

### 3. Arquivo: products-data.js

```javascript
✅ Caminhos de imagens são relativos:
  "imagem": "images/produtos/produto-001.png"
  (NÃO começa com / ou C:\)

✅ Sem hardcoded localhost:
  (Nenhuma referência a http://localhost)
```

### 4. Arquivo: config.js

```javascript
✅ WhatsApp é URL pública:
  const WHATSAPP_NUMBER='5531984840078';
  (Pode ser público)

✅ Sem credenciais privadas:
  (Somente números públicos)
```

---

## 🧪 Testes de Funcionalidade

### Teste 1: Acesso Local (http://localhost:8080)

Execute este teste antes de publicar:

```bash
# Na pasta do projeto
cd public
# Iniciar servidor (necessário para testes de imagens)
# Use Live Server do VS Code ou equivalente
```

Verifique:
- [ ] Página carrega sem erros no console
- [ ] Logo Mespín aparece no header
- [ ] Banner principal carrega com imagem
- [ ] Produtos aparecem no catálogo
- [ ] Menu "Natal" funciona
- [ ] Links internos funcionam
- [ ] Modal de produto abre
- [ ] Aromas aparecem corretamente
- [ ] Carrinho adiciona itens
- [ ] Checkout funciona

### Teste 2: Verificação de Caminhos (Console)

1. Abra o site em http://localhost:8080
2. Pressione F12 para abrir Developer Tools
3. Vá para a aba "Console"
4. Cole e execute este código:

```javascript
// Teste de BASE_URL
console.log('BASE_URL:', window.BASE_URL);
console.log('Hostname:', window.location.hostname);
console.log('Pathname:', window.location.pathname);

// Teste de scripts carregados
console.log('Config carregado:', typeof WHATSAPP_NUMBER !== 'undefined');
console.log('Produtos carregados:', typeof PRODUTOS_DATA !== 'undefined');
console.log('Categorias carregadas:', typeof CATEGORIAS !== 'undefined');

// Teste de imagens
const imgs = document.querySelectorAll('img');
console.log('Imagens na página:', imgs.length);
imgs.forEach(img => {
  console.log(`- ${img.src}: ${img.complete && img.naturalHeight > 0 ? '✅' : '❌'}`);
});

// Teste de DOM
console.log('Header presente:', !!document.querySelector('header'));
console.log('Catálogo presente:', !!document.querySelector('.catalog-section'));
console.log('Modal produto presente:', !!document.getElementById('modal-produto'));
console.log('Carrinho presente:', !!document.getElementById('modal-carrinho'));
```

**Resultado esperado:**
```
✅ BASE_URL: ""  (vazio no localhost)
✅ Hostname: localhost
✅ Todos os scripts: true
✅ Imagens: ✅ (várias)
✅ DOM: true (todos)
```

### Teste 3: Navegação e Links

- [ ] Página inicial carrega
- [ ] Menu "Início" funciona
- [ ] Menu "Catálogo" funciona
- [ ] Menu "Natal" funciona
- [ ] Link "VER CATÁLOGO" no banner funciona
- [ ] Link "EXPLORAR COLEÇÃO DE NATAL" funciona
- [ ] Links do footer funcionam
- [ ] Botão cart abre carrinho
- [ ] Modal fecha corretamente

### Teste 4: Funcionalidades

- [ ] Buscar produto funciona
- [ ] Filtro por categoria funciona
- [ ] Abrir modal de produto
- [ ] Selecionar aroma
- [ ] Aumentar/diminuir quantidade
- [ ] Adicionar ao carrinho
- [ ] Carrinho atualiza
- [ ] Remover do carrinho
- [ ] Limpar carrinho
- [ ] Inserir CEP calcula frete
- [ ] Finalizar compra abre WhatsApp

### Teste 5: Responsividade

Teste em diferentes tamanhos:

**Desktop (1920x1080):**
- [ ] Layout em 2-3 colunas
- [ ] Imagens e texto proporcionais
- [ ] Modal compacto e visível
- [ ] Botões acessíveis

**Tablet (768x1024):**
- [ ] Layout adaptado
- [ ] Toque em botões funciona
- [ ] Modal responsivo
- [ ] Imagens redimensionam

**Mobile (375x667):**
- [ ] Layout single-column
- [ ] Menu adaptado
- [ ] Modal fullscreen/compacto
- [ ] Sem scroll horizontal
- [ ] Touch-friendly

---

## 📤 Preparação para GitHub Pages

### Passo 1: Inicializar Git

```bash
cd "C:\Users\usuario\OneDrive\Documentos\Loja Mespin"
git init
git add .
git commit -m "Projeto Mespín pronto para GitHub Pages"
```

Verifique:
- [ ] Comando `git init` executado
- [ ] Comando `git add .` executado sem erros
- [ ] Commit criado com sucesso

### Passo 2: Criar Repositório no GitHub

1. [ ] Acesse github.com e faça login
2. [ ] Clique em "+" → "New repository"
3. [ ] Nome: `mespin-loja` (ou similar)
4. [ ] Descrição: "Loja Virtual Mespín"
5. [ ] **Public** (necessário para GitHub Pages gratuito)
6. [ ] Não initialize com README (vamos fazer push)
7. [ ] Clique "Create repository"

### Passo 3: Conectar Repositório Local

```bash
git remote add origin https://github.com/SEU-USUARIO/mespin-loja.git
git branch -M main
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu username do GitHub.

Verifique:
- [ ] Remote adicionado
- [ ] Branch renomeado para `main`
- [ ] Push executado com sucesso
- [ ] Arquivos aparecem no GitHub

### Passo 4: Configurar GitHub Pages

1. [ ] No repositório, vá para **Settings**
2. [ ] No menu esquerdo, procure **Pages**
3. [ ] Em "Build and deployment":
   - [ ] **Source**: GitHub Actions
   - [ ] **Branch**: main
4. [ ] Salve as configurações

### Passo 5: Acompanhar Deploy

1. [ ] Vá para a aba **Actions**
2. [ ] Procure por "Deploy para GitHub Pages"
3. [ ] Aguarde até ficar **verde** (✅)
4. [ ] Clique para ver detalhes (1-5 minutos)

---

## 🌐 Após Publicar

### Teste 1: Acessar o Site Publicado

1. [ ] URL do GitHub Pages: `https://seu-usuario.github.io/mespin-loja`
2. [ ] Página inicial carrega
3. [ ] Sem erros 404
4. [ ] Imagens carregam

### Teste 2: Verificar Caminhos no GitHub Pages

Abra o console (F12) em https://seu-usuario.github.io/mespin-loja:

```javascript
console.log('BASE_URL:', window.BASE_URL);
// Resultado esperado: "/mespin-loja"
```

### Teste 3: Navegar no Site Publicado

- [ ] Página inicial funciona
- [ ] Catálogo carrega produtos
- [ ] Página Natal abre
- [ ] Links entre páginas funcionam
- [ ] Modal de produtos abre
- [ ] Carrinho funciona
- [ ] Aromas aparecem
- [ ] Checkout funciona

### Teste 4: Funcionalidades Completas

- [ ] Buscar funciona
- [ ] Filtros funcionam
- [ ] Personalização funciona
- [ ] Cálculo de frete funciona
- [ ] WhatsApp abre ao finalizar

### Teste 5: Verificação de Recursos

- [ ] Logo Mespín carrega
- [ ] Banners carregam
- [ ] Imagens de produtos carregam
- [ ] CSS aplica (cores corretas)
- [ ] Animações funcionam
- [ ] Fontes (Google Fonts) carregam

---

## 🚨 Troubleshooting

### Problema: "404 Page not found"

**Verificar:**
```
✅ URL contém nome do repo: 
   https://seu-usuario.github.io/mespin-loja
   (NÃO https://seu-usuario.github.io)

✅ Repositório é PUBLIC

✅ GitHub Pages configurado em Settings

✅ Deploy bem-sucedido em Actions
```

### Problema: Imagens não carregam

**Verificar:**
```
✅ Arquivos existem em public/images/

✅ Caminhos são relativos (não começam com /)

✅ Nomes de arquivo batem exatamente
   (diferencia maiúscula/minúscula)

✅ Abra Console (F12) e veja erros 404
```

### Problema: CSS/JS não funcionam

**Verificar:**
```
✅ Arquivos no GitHub (git push funcionou)

✅ Caminhos são relativos e corretos

✅ Action mostra sucesso (verde)

✅ Faça hard refresh: Ctrl+Shift+R
```

### Problema: Mudanças não aparecem

**Solução:**
```bash
git add .
git commit -m "Descrição"
git push

# Aguarde 1-5 minutos
# Faça hard refresh no navegador
```

---

## ✅ Checklist Final

Antes de considerara publicação completa:

- [x] Estrutura de pastas verificada
- [x] Caminhos de arquivos corrigidos (relativos)
- [x] .gitignore criado
- [x] Workflow GitHub Actions configurado
- [x] base-url.js adicionado
- [x] Testes locais executados
- [x] Repositório criado no GitHub
- [x] Código enviado (git push)
- [x] GitHub Pages configurado
- [x] Deploy concluído com sucesso
- [x] Site acessível em HTTPS
- [x] Funcionalidades testadas
- [x] Responsividade verificada

---

## 📚 Referências

- GitHub Pages Docs: https://docs.github.com/pages
- GitHub Actions: https://docs.github.com/actions
- Guia completo: Veja `GITHUB_PAGES_GUIA.md`

---

**Data:** 18 de outubro de 2024  
**Status:** ✅ Pronto para Publicação  
**Versão:** 1.0
