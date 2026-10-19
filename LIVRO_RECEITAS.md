# 🍳 Livro de Receitas - GitHub Pages Mespín

Soluções práticas para tarefas comuns durante e após a publicação.

---

## 🚀 Receita 1: Publicar o Site (Primeira Vez)

### Ingredientes:
- Git instalado
- Conta GitHub
- Terminal/CMD
- Este projeto

### Modo de Fazer:

**Passo 1:** Criar repositório no GitHub
```
1. github.com → + → New repository
2. Nome: mespin-loja
3. Descrição: Loja Virtual Mespín
4. Public ☑️
5. Create repository
```

**Passo 2:** Abrir Terminal
```bash
# Windows: Win + R → cmd
# Mac/Linux: Abra o Terminal
```

**Passo 3:** Entrar na pasta
```bash
cd "C:\Users\seu-usuario\OneDrive\Documentos\Loja Mespin"
```

**Passo 4:** Inicializar Git e fazer push
```bash
git init
git add .
git commit -m "Projeto Mespín"
git remote add origin https://github.com/SEU-USUARIO/mespin-loja.git
git branch -M main
git push -u origin main
```

**Passo 5:** Configurar GitHub Pages
```
1. GitHub → Settings
2. Pages
3. Source: GitHub Actions
4. Branch: main
5. Salvar
```

**Passo 6:** Aguardar e acessar
```
1. Actions → Deploy para GitHub Pages → Aguarde ✅
2. Acesse: https://seu-usuario.github.io/mespin-loja
```

### Resultado:
Site ao vivo em ~5-10 minutos! 🎉

---

## 🔄 Receita 2: Atualizar o Site

### Ingredientes:
- Mudanças feitas no projeto
- Terminal/Git
- 1-5 minutos de paciência

### Modo de Fazer:

```bash
# Entrar na pasta do projeto
cd "C:\Users\seu-usuario\OneDrive\Documentos\Loja Mespin"

# Adicionar todas as mudanças
git add .

# Fazer commit com descrição
git commit -m "Descreva o que mudou"

# Fazer push para GitHub
git push
```

### Resultado:
Site atualizado automaticamente em 1-5 minutos! ✅

---

## 🎨 Receita 3: Mudar Cores da Paleta Mespín

### Ingredientes:
- Editor de texto (VS Code, Notepad++)
- Arquivo: `public/style.css`

### Modo de Fazer:

**Passo 1:** Abrir `style.css`

**Passo 2:** Procurar pelas variáveis de cor:
```css
/* Encontrar e modificar */
--marrom-escuro: #3E2723;
--creme: #FAF0E6;
--caramelo: #C19A6B;
--terracota: #A0522D;
```

**Passo 3:** Mudar os valores HEX:
```css
/* Antes */
--marrom-escuro: #3E2723;

/* Depois */
--marrom-escuro: #2C1810;  /* Mais escuro */
```

**Passo 4:** Salvar arquivo

**Passo 5:** Testar localmente
```bash
# Abrir http://localhost:8080 no navegador
```

**Passo 6:** Se gostar, fazer push
```bash
git add .
git commit -m "Atualizar paleta de cores"
git push
```

### Resultado:
Novo design com suas cores! 🎨

---

## 📦 Receita 4: Adicionar Novo Produto

### Ingredientes:
- Arquivo: `public/products-data.js`
- Imagem PNG do produto
- Dados do produto

### Modo de Fazer:

**Passo 1:** Preparar imagem
```
1. Tirar foto ou gerar imagem do produto
2. Salvar como PNG em: public/images/produtos/
3. Nomear como: produto-XXX.png (XXX = número)
```

**Passo 2:** Abrir `products-data.js`

**Passo 3:** Encontrar o array PRODUTOS_DATA e adicionar:
```javascript
{
  id: 20,  // Número único novo
  nome: "Vela Lavanda Premium",
  categoriaId: "velas",
  preco: 59.99,
  descricao: "Vela aromática de lavanda premium",
  imagem: "images/produtos/produto-020.png",
  imagemAlternativa: "🕯️",
  natal: false,  // true se for de Natal
  personalizavel: true,
  usarAromas: "tradicionais",
  maxAromas: 1,
  maxPorAroma: 999,
  disponibilidade: 25
}
```

**Passo 4:** Salvar arquivo

**Passo 5:** Testar localmente
```bash
# Abrir http://localhost:8080
# Procurar novo produto no catálogo
```

**Passo 6:** Fazer push
```bash
git add .
git commit -m "Adicionar novo produto: Vela Lavanda Premium"
git push
```

### Resultado:
Novo produto no catálogo! 📦

---

## 🎁 Receita 5: Ativar/Desativar Coleção Natal

### Ingredientes:
- Arquivo: `public/products-data.js`
- Flag `natal: true/false`

### Modo de Fazer:

**Para ATIVAR Natal:**
```javascript
// Em cada produto de Natal, certifique-se:
natal: true  // Isso já está lá

// Resultado: Produto aparece em https://.../natal.html
```

**Para DESATIVAR Natal:**
```javascript
// Para cada produto, mude:
natal: false  // Ou remova da coleção

// Resultado: Produto some da página de Natal
```

### Alternativa: Ocultar Página Inteira

Se quiser ocultar a página de Natal completamente:

**Passo 1:** Abrir `public/index.html`

**Passo 2:** Encontrar link de Natal:
```html
<a href="natal.html" class="nav-link">Natal</a>
```

**Passo 3:** Comentar ou remover:
```html
<!-- <a href="natal.html" class="nav-link">Natal</a> -->
```

**Passo 4:** Fazer push
```bash
git add .
git commit -m "Desativar página de Natal até próxima estação"
git push
```

### Resultado:
Coleção de Natal ativada/desativada! 🎄

---

## 💰 Receita 6: Mudar Taxa de Frete

### Ingredientes:
- Arquivo: `public/config.js`
- Novo percentual

### Modo de Fazer:

**Passo 1:** Abrir `config.js`

**Passo 2:** Encontrar:
```javascript
const CONFIG = { taxa: 0.1 };  // 10%
```

**Passo 3:** Mudar o valor:
```javascript
const CONFIG = { taxa: 0.15 };  // 15%
// ou
const CONFIG = { taxa: 0.05 };  // 5%
```

**Passo 4:** Salvar

**Passo 5:** Testar
```bash
# Abrir localhost e adicionar produto ao carrinho
# Verificar se o frete muda corretamente
```

**Passo 6:** Fazer push
```bash
git add .
git commit -m "Atualizar taxa de frete para 15%"
git push
```

### Resultado:
Taxa de frete atualizada! 💰

---

## 📱 Receita 7: Testar Responsividade

### Ingredientes:
- Navegador
- F12 (Developer Tools)
- Alguns minutos

### Modo de Fazer:

**Passo 1:** Abrir site
```
http://localhost:8080 (localmente)
ou
https://seu-usuario.github.io/mespin-loja (publicado)
```

**Passo 2:** Pressionar F12 (ou Cmd+Option+I no Mac)

**Passo 3:** Clicar no ícone de dispositivo (responsividade)

**Passo 4:** Testar em vários tamanhos:
```
Desktop: 1920x1080
Tablet: 768x1024
Mobile: 375x667
```

**Passo 5:** Verificar:
- [ ] Textos legíveis
- [ ] Imagens aparecem
- [ ] Botões clicáveis
- [ ] Sem scroll horizontal
- [ ] Menu funciona
- [ ] Modal abre corretamente

### Resultado:
Certeza de que tudo funciona em qualquer dispositivo! ✅

---

## 🐛 Receita 8: Debugar Problema de Imagem

### Ingredientes:
- F12 (Developer Tools)
- Console do navegador
- Verificação de arquivo

### Modo de Fazer:

**Passo 1:** Abrir site e F12

**Passo 2:** Ir para aba Console

**Passo 3:** Listar imagens:
```javascript
const imgs = document.querySelectorAll('img');
imgs.forEach(img => console.log(img.src, img.complete));
```

**Resultado:** Lista todas as imagens e se carregaram

**Passo 4:** Se tiver erro, verificar:
```bash
# Arquivo existe?
ls public/images/produtos/produto-001.png

# Caminho correto?
# Deve ser: images/produtos/produto-001.png (relativo)
# NÃO: /images/produtos/... ou C:\...
```

**Passo 5:** Se estiver errado, corrigir em:
- `products-data.js` (estrutura de dados)
- `style.css` (if background-image)
- Renomear arquivo se necessário

**Passo 6:** Fazer push após corrigir
```bash
git add .
git commit -m "Corrigir caminho de imagem"
git push
```

### Resultado:
Imagem carregada corretamente! 📸

---

## 🔐 Receita 9: Manter Segredos (Não cometer)

### Ingredientes:
- Arquivo `.gitignore`
- Bom senso

### Modo de Fazer:

**NUNCA faça isso:**
```javascript
// ❌ Nunca cometer credenciais
const API_KEY = "sk-1234567890abcdef";
const SENHA_BANCO = "admin123";
const TOKEN = "ghp_xxxxxxxxxxxxxx";
```

**NUNCA envie esses arquivos:**
```
❌ .env
❌ config-local.js
❌ database.json
❌ chaves-privadas.txt
```

**Como proteger:**
```bash
# O .gitignore já foi criado
# Arquivo já está preparado para ignorar:
# - .env
# - Arquivos .log
# - Node modules
# etc

# Verificar antes de fazer push:
git status
# Não deve mostrar nenhum arquivo sensível
```

**Resulado:**
Seu projeto seguro! 🔐

---

## 📊 Receita 10: Monitorar Deploy

### Ingredientes:
- GitHub Actions
- Aba "Actions" do repositório
- Paciência (1-5 minutos)

### Modo de Fazer:

**Passo 1:** Fazer push no GitHub
```bash
git push
```

**Passo 2:** Ir para GitHub no navegador

**Passo 3:** Clicar em **Actions** (no topo do repositório)

**Passo 4:** Procurar por "Deploy para GitHub Pages"

**Passo 5:** Acompanhar o progresso:
```
🟡 Em execução (amarelo)
   ↓ (aguarde 1-5 minutos)
🟢 Sucesso (verde) - Pronto!
🔴 Erro (vermelho) - Ver detalhes
```

**Passo 6:** Se ficar verde, abrir site:
```
https://seu-usuario.github.io/mespin-loja
```

**Passo 7:** Se ficar vermelho, clicar no workflow:
```
1. Clicar no nome do workflow (em vermelho)
2. Ver "Logs" para encontrar o erro
3. Corrigir localmente
4. Fazer push novamente
```

### Resultado:
Deploy automático monitorado! 📊

---

## 🎓 Receita 11: Aprender Mais

### Ingredientes:
- Curiosidade
- Documentação incluída

### Modo de Fazer:

**Para entender como funciona:**
```
👉 DETECCAO_AUTOMATICA_CAMINHOS.md
   Aprenda como base-url.js funciona
```

**Para ver todos os caminhos:**
```
👉 REFERENCIA_CAMINHOS.md
   Lista completa de todos os arquivos
```

**Para troubleshooting:**
```
👉 GITHUB_PAGES_GUIA.md (seção de problemas)
   Soluções para erros comuns
```

**Para verificar tudo:**
```
👉 CHECKLIST_GITHUB_PAGES.md
   Testes automáticos e manuais
```

### Resultado:
Você fica um especialista! 🎓

---

## 📞 Receita 12: Pedir Ajuda (Se Necessário)

### Ingredientes:
- Descrição do problema
- Screenshots (se possível)
- Logs de erro

### Modo de Fazer:

**Passo 1:** Reproduzir o problema

**Passo 2:** Abrir Console (F12)

**Passo 3:** Copiar mensagem de erro

**Passo 4:** Procurar em:
- GITHUB_PAGES_GUIA.md (troubleshooting)
- CHECKLIST_GITHUB_PAGES.md (testes)
- REFERENCIA_CAMINHOS.md (se for sobre caminhos)

**Passo 5:** Se não encontrar, executar diagnóstico:
```javascript
// F12 → Console → Copiar tudo de public/path-checker.js
// Colar e executar
// Isso dará um relatório detalhado
```

### Resultado:
Problema resolvido! ✅

---

## 🎉 Conclusão

Com essas receitas, você pode:
- ✅ Publicar o site
- ✅ Atualizar conteúdo
- ✅ Mudar design
- ✅ Adicionar produtos
- ✅ Ativar/desativar seções
- ✅ Debugar problemas
- ✅ Manter segurança
- ✅ Monitorar deploy

**Bom cozinhar!** 👨‍🍳🕯️

---

**Versão:** 1.0  
**Data:** 18 de outubro de 2024  
**Nível:** Iniciante a Intermediário
