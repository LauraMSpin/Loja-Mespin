# 📍 Como Funciona a Detecção Automática de Caminhos

## 🎯 O Problema

Quando você publica seu site no GitHub Pages, a URL muda de:

```
Localmente:
  http://localhost:8080/index.html

Para GitHub Pages:
  https://seu-usuario.github.io/mespin-loja/index.html
```

Isso significa que a pasta raiz da aplicação muda! Os caminhos relativos também precisam se adaptar.

## ✅ A Solução: base-url.js

O arquivo `base-url.js` resolve este problema **automaticamente**.

### Como Funciona

```javascript
// base-url.js analisa:
1. window.location.hostname → Detecta onde está hospedado
2. window.location.pathname → Extrai o nome do repositório

// Define:
window.BASE_URL = "/mespin-loja" (em GitHub Pages)
window.BASE_URL = "" (localmente)
```

### Exemplo Prático

**Localmente (http://localhost:8080):**
```
window.location.hostname = "localhost"
window.location.pathname = "/"
BASE_URL = ""

Imagem em: images/produtos/produto-001.png
Resolvida como: images/produtos/produto-001.png ✅
```

**No GitHub Pages (https://seu-usuario.github.io/mespin-loja):**
```
window.location.hostname = "seu-usuario.github.io"
window.location.pathname = "/mespin-loja/"
BASE_URL = "/mespin-loja"

Imagem em: images/produtos/produto-001.png
Resolvida como: /mespin-loja/images/produtos/produto-001.png ✅
```

## 📜 Código do base-url.js Explicado

```javascript
/**
 * Linha 1-5: Detecta se está em GitHub Pages
 * Verifica hostname: se NÃO for localhost, assume GitHub Pages
 */
const isGitHubPages = window.location.hostname !== 'localhost' && 
                      window.location.hostname !== '127.0.0.1' &&
                      !window.location.hostname.includes(':8080');

/**
 * Linha 8-12: Extrai nome do repositório
 * URL: https://github.com/usuario/repositorio/
 * pathname: "/usuario/repositorio/"
 * pathParts: ["usuario", "repositorio"]
 * repoName: "repositorio" (primeiro elemento não vazio)
 */
let repoName = '';
if (isGitHubPages) {
  const pathParts = window.location.pathname.split('/').filter(p => p);
  if (pathParts.length > 0 && pathParts[0] !== '') {
    repoName = pathParts[0];
  }
}

/**
 * Linha 15-16: Define BASE_URL global
 * "/" + "repositorio" = "/repositorio"
 * "" (localmente)
 */
window.BASE_URL = repoName ? `/${repoName}` : '';

/**
 * Linha 19-24: Função auxiliar para resolver caminhos
 * Atualmente não é usada, mas pronta para futuras integrações
 */
window.resolvePath = function(path) {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path; // URLs absolutas não são modificadas
  }
  if (path.startsWith('/')) {
    return window.BASE_URL + path; // Adiciona base URL
  }
  return path; // Caminhos relativos mantêm-se
};
```

## 🧪 Testando o base-url.js

### Teste 1: Localmente

1. Abra http://localhost:8080
2. Pressione F12 (Developer Tools)
3. Vá para a aba "Console"
4. Colete:

```javascript
console.log('BASE_URL:', window.BASE_URL);
console.log('Hostname:', window.location.hostname);
console.log('Pathname:', window.location.pathname);
```

**Resultado esperado:**
```
BASE_URL: ""
Hostname: localhost
Pathname: /
```

### Teste 2: No GitHub Pages

1. Abra https://seu-usuario.github.io/mespin-loja
2. Pressione F12 (Developer Tools)
3. Vá para a aba "Console"
4. Copie:

```javascript
console.log('BASE_URL:', window.BASE_URL);
console.log('Hostname:', window.location.hostname);
console.log('Pathname:', window.location.pathname);
```

**Resultado esperado:**
```
BASE_URL: /mespin-loja
Hostname: seu-usuario.github.io
Pathname: /mespin-loja/
```

## 📝 Exemplo: Como Usar em JavaScript

Se você precisar carregar recursos dinamicamente, use assim:

```javascript
// ❌ ERRADO - Não funciona no GitHub Pages
const img = new Image();
img.src = '/images/produtos/produto-001.png'; // Erro 404

// ✅ CORRETO - Usa caminhos relativos
const img = new Image();
img.src = 'images/produtos/produto-001.png'; // Funciona sempre

// ✅ ALTERNATIVA - Usa BASE_URL se necessário
const img = new Image();
img.src = window.BASE_URL + '/images/produtos/produto-001.png';
```

## 🔄 Por que Caminhos Relativos Funcionam Melhor

```
Estrutura do repositório:
mespin-loja/
├── public/
│   ├── index.html
│   ├── images/
│   │   └── produtos/
│   │       └── produto-001.png
│   └── style.css

Em index.html, um caminho relativo funciona em AMBOS os casos:
<img src="images/produtos/produto-001.png">

Localmente:
  http://localhost:8080/index.html
  + src="images/produtos/produto-001.png"
  = http://localhost:8080/images/produtos/produto-001.png ✅

GitHub Pages:
  https://seu-usuario.github.io/mespin-loja/index.html
  + src="images/produtos/produto-001.png"
  = https://seu-usuario.github.io/mespin-loja/images/produtos/produto-001.png ✅
```

## ⚠️ Armadilhas Comuns

### 1. Caminhos Absolutos (ERRADO)

```javascript
// ❌ Não funciona em GitHub Pages
<img src="/images/produtos/produto-001.png">

// Localmente resolve para: http://localhost:8080/images/...
// GitHub resolve para: https://seu-usuario.github.io/images/...
// (Faltou o nome do repositório!)
```

### 2. Hardcoded URLs (ERRADO)

```javascript
// ❌ Não é portável
const imgUrl = "http://localhost:8080/images/produtos/produto-001.png";
```

### 3. Caminhos do Windows (ERRADO)

```javascript
// ❌ Nunca fazer isso
<img src="C:\Users\laura\OneDrive\Documentos\Loja Mespin\public\images\produto-001.png">
```

### 4. Esquecer de Commitar Arquivos

```bash
# ❌ Esqueci de adicionar imagens
git add index.html
git commit -m "Atualizei HTML"
git push

# ✅ Correto - adicionar tudo
git add .
git commit -m "Atualizei o site"
git push
```

## ✅ Checklist de Caminhos

Antes de publicar, verifique TODOS os caminhos:

### HTML Files

- [ ] `<img src="logo-mespin.png">` (relativo)
- [ ] `<img src="banner-mespin.png">` (relativo)
- [ ] `<link rel="stylesheet" href="style.css">` (relativo)
- [ ] `<link rel="stylesheet" href="natal-style.css">` (relativo)
- [ ] `<script src="base-url.js">` (relativo)
- [ ] `<script src="config.js">` (relativo)
- [ ] `<a href="natal.html">` (relativo)
- [ ] `<a href="index.html">` (relativo)

### JavaScript Files

- [ ] `"imagem": "images/produtos/produto-001.png"` (relativo)
- [ ] Sem URLs localhost
- [ ] Sem caminhos Windows

### CSS Files

- [ ] `background-image: url('images/...')` (relativo)
- [ ] Sem URLs absolutas

## 🎓 Conclusão

O sistema de detecção automática (`base-url.js`) garante que seu site funcione:

✅ Localmente (http://localhost:8080)  
✅ GitHub Pages (https://seu-usuario.github.io/repositorio)  
✅ Domínio personalizado (https://seu-dominio.com)  

**Tudo sem alterar código!** 🚀

---

**Última atualização:** 18 de outubro de 2024  
**Versão:** 1.0
