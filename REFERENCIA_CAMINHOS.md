# 📐 Referência de Caminhos - GitHub Pages

## ✅ Caminhos CORRETOS no Projeto

### Imagens

```
✅ Logo
  Caminho: public/logo-mespin.png
  HTML: <img src="logo-mespin.png">

✅ Banner Principal
  Caminho: public/banner-mespin.png
  HTML: <img src="banner-mespin.png">

✅ Banner de Natal
  Caminho: public/natal-banner-hero.png
  CSS: background-image: url('natal-banner-hero.png')

✅ Produtos
  Caminho: public/images/produtos/produto-001.png
  JS: "imagem": "images/produtos/produto-001.png"

✅ Outras imagens em images/
  Caminho: public/images/natal-hero-bg.png
  JS: url('images/natal-hero-bg.png')
```

### Folhas de Estilo

```
✅ CSS Principal
  Caminho: public/style.css
  HTML: <link rel="stylesheet" href="style.css">

✅ CSS de Natal
  Caminho: public/natal-style.css
  HTML: <link rel="stylesheet" href="natal-style.css">

✅ Google Fonts
  URL: https://fonts.googleapis.com/css2?family=...
  HTML: <link href="https://fonts.googleapis.com/..." rel="stylesheet">
```

### Arquivos JavaScript

```
✅ Config (WhatsApp, configurações)
  Caminho: public/config.js
  HTML: <script src="config.js"></script>

✅ Categorias
  Caminho: public/categories.js
  HTML: <script src="categories.js"></script>

✅ Dados de Produtos
  Caminho: public/products-data.js
  HTML: <script src="products-data.js"></script>

✅ Aromas
  Caminho: public/aromas.js
  HTML: <script src="aromas.js"></script>

✅ App State
  Caminho: public/app-state.js
  HTML: <script src="app-state.js"></script>

✅ DOM Utilities
  Caminho: public/dom.js
  HTML: <script src="dom.js"></script>

✅ Products (renderização)
  Caminho: public/products.js
  HTML: <script src="products.js"></script>

✅ Modal
  Caminho: public/modal.js
  HTML: <script src="modal.js"></script>

✅ Cart (carrinho)
  Caminho: public/cart.js
  HTML: <script src="cart.js"></script>

✅ Checkout
  Caminho: public/checkout.js
  HTML: <script src="checkout.js"></script>

✅ Persistence (LocalStorage)
  Caminho: public/persistence.js
  HTML: <script src="persistence.js"></script>

✅ Utils (funções auxiliares)
  Caminho: public/utils.js
  HTML: <script src="utils.js"></script>

✅ Base URL (DEVE SER PRIMEIRO)
  Caminho: public/base-url.js
  HTML: <script src="base-url.js"></script> ← No <head>

✅ Main (inicialização)
  Caminho: public/main.js
  HTML: <script src="main.js"></script> ← Por último
```

### Páginas HTML

```
✅ Página Principal
  Caminho: public/index.html
  URL local: http://localhost:8080/
  URL GitHub: https://seu-usuario.github.io/mespin-loja/

✅ Página Natal
  Caminho: public/natal.html
  URL local: http://localhost:8080/natal.html
  URL GitHub: https://seu-usuario.github.io/mespin-loja/natal.html

✅ Links entre páginas
  index.html → natal.html: <a href="natal.html">
  natal.html → index.html: <a href="index.html">
```

---

## ❌ CAMINHOS ERRADOS (Evitar)

### Absolutos que não funcionam em GitHub Pages

```
❌ /images/produtos/produto-001.png
   (Falta o nome do repositório)

❌ /style.css
   (Falta o nome do repositório)

❌ /logo-mespin.png
   (Falta o nome do repositório)
```

### Caminhos Windows que não funcionam

```
❌ C:\Users\laura\OneDrive\Documentos\Loja Mespin\public\images\...
   (Caminhos locais não funcionam em GitHub Pages)

❌ file:///C:/Users/laura/...
   (URLs de arquivo local não são públicas)
```

### URLs hardcoded

```
❌ http://localhost:8080/images/produtos/...
   (Localhost não funciona em produção)

❌ https://github.com/seu-usuario/mespin-loja/blob/main/public/...
   (URL do repositório GitHub, não do site publicado)
```

### Caminhos relativos incorretos

```
❌ ../images/produtos/produto-001.png
   (Sobe uma pasta desnecessariamente)

❌ ./images/produtos/produto-001.png
   (Prefixo ./ é redundante, use sem ele)
```

---

## 📊 Estrutura Correta de Pastas

```
mespin-loja/                          (Raiz do repositório)
│
├── .github/
│   └── workflows/
│       └── deploy.yml                ✅ Workflow automático
│
├── public/                           ✅ Pasta publicada
│   ├── index.html                   ✅ Página principal
│   ├── natal.html                   ✅ Página Natal
│   ├── style.css                    ✅ Estilos principais
│   ├── natal-style.css              ✅ Estilos Natal
│   ├── base-url.js                  ✅ Detecção de caminhos
│   ├── config.js                    ✅ Config
│   ├── categories.js                ✅ Categorias
│   ├── products-data.js             ✅ Produtos
│   ├── products.js                  ✅ Renderização
│   ├── modal.js                     ✅ Modal
│   ├── cart.js                      ✅ Carrinho
│   ├── checkout.js                  ✅ Checkout
│   ├── main.js                      ✅ Inicialização
│   ├── logo-mespin.png              ✅ Logo
│   ├── banner-mespin.png            ✅ Banner principal
│   ├── natal-banner-hero.png        ✅ Banner Natal
│   ├── images/                      ✅ Pasta de imagens
│   │   ├── natal-hero-bg.png
│   │   └── produtos/
│   │       ├── produto-001.png
│   │       ├── produto-002.png
│   │       └── ... (demais produtos)
│   └── README.md                    ✅ Documentação
│
├── .gitignore                       ✅ Arquivos não rastreados
├── GITHUB_PAGES_GUIA.md            ✅ Guia completo
├── CHECKLIST_GITHUB_PAGES.md       ✅ Checklist
├── GUIA_RAPIDO.md                  ✅ Guia rápido
├── DETECCAO_AUTOMATICA_CAMINHOS.md ✅ Explicação técnica
└── ... (outros arquivos documentação)
```

---

## 🔄 Ordem de Carregamento (index.html e natal.html)

**Importante:** A ordem no `<head>` e antes de `</body>` importa!

### No `<head>`

```html
<!-- 1º: Deve ser o PRIMEIRO script -->
<script src="base-url.js"></script>
```

### Antes de `</body>` (ordem importante)

```html
<!-- 1º: Dependências globais -->
<script src="config.js"></script>           <!-- Config básica -->

<!-- 2º: Dados -->
<script src="categories.js"></script>       <!-- Categorias (usado por config) -->
<script src="products-data.js"></script>    <!-- Produtos (usado por renderização) -->

<!-- 3º: Estado e estado de app -->
<script src="app-state.js"></script>        <!-- Estado global -->
<script src="aromas.js"></script>           <!-- Aromas (usado em modal) -->
<script src="persistence.js"></script>      <!-- Persistência (usado em cart) -->

<!-- 4º: Utilitários -->
<script src="dom.js"></script>              <!-- DOM helpers -->
<script src="utils.js"></script>            <!-- Utilitários gerais -->

<!-- 5º: Renderização e funcionalidades -->
<script src="products.js"></script>         <!-- Renderiza produtos -->
<script src="modal.js"></script>            <!-- Abre modal de produto -->
<script src="cart.js"></script>             <!-- Carrinho de compras -->
<script src="checkout.js"></script>         <!-- Checkout e frete -->

<!-- 6º: Inicialização DEVE SER POR ÚLTIMO -->
<script src="main.js"></script>             <!-- Inicializa tudo -->
```

---

## 🌐 URL do Site Após Publicação

Substitua `SEU-USUARIO` pelo seu username do GitHub:

```
https://seu-usuario.github.io/mespin-loja
```

**Exemplos:**

```
Se usuario = laura
https://laura.github.io/mespin-loja

Se usuario = joao-silva
https://joao-silva.github.io/mespin-loja

Se usuario = mara.costa
https://mara.costa.github.io/mespin-loja
```

---

## 🧪 Como Verificar Caminhos

No console do navegador (F12):

```javascript
// Ver BASE_URL
console.log('BASE_URL:', window.BASE_URL);

// Verificar se scripts carregaram
console.log('Config:', typeof WHATSAPP_NUMBER);
console.log('Produtos:', typeof PRODUTOS_DATA);
console.log('Categorias:', typeof CATEGORIAS);

// Verificar imagens
const imgs = document.querySelectorAll('img');
imgs.forEach(img => console.log(img.src));

// Testar resolve de caminho
console.log('Imagem de produto:', window.BASE_URL + '/images/produtos/produto-001.png');
```

---

## ✅ Checklist de Caminhos Antes de Publicar

- [ ] Nenhum caminho começa com `/`
- [ ] Nenhum caminho contém `C:\` ou `C:/`
- [ ] Nenhum caminho contém `localhost`
- [ ] Todas as imagens usam `.png` (verificar extensão)
- [ ] Links HTML usam `.html` sem `/`
- [ ] Scripts carregam com `src="arquivo.js"`
- [ ] CSS carrega com `href="arquivo.css"`
- [ ] base-url.js está no primeiro `<script>` no `<head>`
- [ ] main.js está no último `<script>` antes de `</body>`
- [ ] Todos os arquivos .js, .css, .png estão em `public/`
- [ ] Arquivo `.github/workflows/deploy.yml` existe

---

**Versão:** 1.0  
**Data:** 18 de outubro de 2024  
**Status:** ✅ Referência Completa
