# 📦 Publicação da Loja Mespín no GitHub Pages

Este documento fornece instruções passo a passo para publicar seu projeto da Loja Virtual Mespín no GitHub Pages.

## 📋 Pré-requisitos

- Uma conta no GitHub (gratuita em https://github.com)
- Git instalado no seu computador (https://git-scm.com)
- Seu projeto já pronto para publicação

## 🚀 Passo 1: Criar um Repositório no GitHub

### Se você ainda não tem uma conta:
1. Acesse https://github.com
2. Clique em "Sign up" e siga as instruções
3. Verifique seu email para confirmar a conta

### Criar um novo repositório:
1. Faça login no GitHub
2. Clique no ícone **+** no canto superior direito
3. Selecione **New repository**
4. Preencha os dados:
   - **Repository name**: `mespin-loja` (ou outro nome de sua escolha)
   - **Description**: "Loja Virtual de Velas Aromáticas Mespín"
   - **Public**: ☑️ Marque como público (necessário para GitHub Pages gratuito)
   - **Initialize repository**: Deixe em branco por enquanto
5. Clique em **Create repository**

Após criar o repositório, você receberá a URL dele. Será algo como:
```
https://github.com/seu-usuario/mespin-loja
```

## 🔧 Passo 2: Preparar o Projeto Localmente

### 2.1 Abrir Terminal/Prompt de Comando

**Windows:**
- Pressione `Win + R`
- Digite `cmd` e pressione Enter
- Ou use o PowerShell

**Mac/Linux:**
- Abra o Terminal

### 2.2 Navegar para a Pasta do Projeto

```bash
cd "Documentos/Loja Mespin"
```

### 2.3 Inicializar o Git

```bash
git init
git add .
git commit -m "Projeto Mespín pronto para publicação"
```

## 📡 Passo 3: Conectar ao Repositório do GitHub

Substitua `SEU-USUARIO` pelo seu usuário do GitHub e `mespin-loja` pelo nome que escolheu:

```bash
git remote add origin https://github.com/SEU-USUARIO/mespin-loja.git
git branch -M main
git push -u origin main
```

**Primeira vez:**
- Pode pedir para fazer login via navegador
- Clique em "Autorizar"

## ⚙️ Passo 4: Configurar GitHub Pages

### 4.1 Acessar Configurações do Repositório

1. No seu repositório no GitHub, clique em **Settings** (Configurações)
2. No menu esquerdo, procure por **Pages** (em torno da linha "Code and automation")

### 4.2 Configurar a Origem de Publicação

Na seção "Build and deployment":

1. **Source**: Selecione **GitHub Actions**
2. **Branch**: Já deve estar configurado como `main`

> O workflow automático que incluímos no projeto fará o deploy a cada push!

## ✅ Passo 5: Aguardar o Deploy

1. Após fazer push do código, acesse a aba **Actions** no seu repositório
2. Você verá um workflow chamado **"Deploy para GitHub Pages"**
3. Aguarde até ficar verde (✅), indicando sucesso

O primeiro deploy pode levar de 1 a 5 minutos.

## 🌐 Passo 6: Acessar o Site Publicado

Após o deploy ser concluído, seu site estará em:

```
https://SEU-USUARIO.github.io/mespin-loja
```

**Exemplo:**
Se seu usuário é `laura` e o repositório é `mespin-loja`:
```
https://laura.github.io/mespin-loja
```

**Encontrar a URL exata:**
1. No repositório, vá para **Settings → Pages**
2. Procure por "Your site is live at..."
3. Clique no link para ver o site ao vivo

## 📝 Passo 7: Publicar Atualizações Futuras

Sempre que fizer mudanças no projeto:

```bash
# Na pasta do projeto
git add .
git commit -m "Descrição das mudanças"
git push
```

O GitHub Actions automaticamente:
- Detectará o push
- Fará o build (se necessário)
- Publicará as mudanças no GitHub Pages
- O site será atualizado em poucos minutos

## 🔍 Verificação de Funcionalidades

Após publicar, verifique:

- ✅ **Página inicial carrega** - Acesse a URL do site
- ✅ **Logo e imagens aparecem** - Verifique o header e banner
- ✅ **Catálogo funciona** - Clique em "Catálogo" e veja os produtos
- ✅ **Página de Natal abre** - Clique em "Natal"
- ✅ **Modal de produtos funciona** - Clique em um produto
- ✅ **Carrinho funciona** - Adicione itens e veja o contador
- ✅ **Links entre páginas funcionam** - Navegue entre Início, Catálogo e Natal
- ✅ **Finalização pelo WhatsApp funciona** - Complete uma compra
- ✅ **Layout responsivo funciona** - Acesse pelo celular

## 🆘 Solução de Problemas

### Problema: "404 - Página não encontrada"

**Causa:** Caminho incorreto na URL

**Solução:**
- Certifique-se de usar a URL correta: `https://seu-usuario.github.io/repositorio`
- Não use `https://seu-usuario.github.io` (faltaria o nome do repositório)
- Verifique se o deployment foi bem-sucedido em **Actions**

### Problema: "Imagens não carregam"

**Causa:** Projeto não foi enviado ou caminhos incorretos

**Solução:**
- Verifique se o push foi bem-sucedido: `git push`
- Confirme que a pasta `public/` contém as imagens
- Veja a aba **Actions** para erros de build

### Problema: "CSS/JavaScript não funcionam"

**Causa:** Os arquivos não foram publicados corretamente

**Solução:**
- Verifique em **Actions** se o workflow foi bem-sucedido (verde)
- Faça um hard refresh: Ctrl+Shift+R (Windows/Linux) ou Cmd+Shift+R (Mac)
- Aguarde alguns minutos para o cache atualizar

### Problema: Mudanças não aparecem após push

**Solução:**
- Aguarde o workflow terminar (1-5 minutos)
- Faça um hard refresh no navegador
- Limpe o cache do navegador ou use modo anônimo

## 📚 Informações Técnicas

### Estrutura do Projeto

```
mespin-loja/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow automático do GitHub Actions
├── public/                     # Pasta publicada no GitHub Pages
│   ├── index.html             # Página principal
│   ├── natal.html             # Página de Natal
│   ├── style.css              # Estilos
│   ├── *.js                   # Scripts do projeto
│   ├── logo-mespin.png        # Logo
│   ├── banner-mespin.png      # Banner principal
│   ├── natal-banner-hero.png  # Banner de Natal
│   └── images/                # Pastas com imagens
│       └── produtos/          # Imagens dos produtos
├── .gitignore                 # Arquivos não versionados
└── ...outros arquivos documentação
```

### Como o Deploy Funciona

1. **Push**: Você faz `git push` para o GitHub
2. **Trigger**: O GitHub Actions detecta mudanças na branch `main`
3. **Build**: O workflow faz upload da pasta `public/` como artifact
4. **Deploy**: Os arquivos são publicados no GitHub Pages
5. **Resultado**: Seu site fica disponível em 1-5 minutos

### Base URL Automática

O arquivo `base-url.js` detecta automaticamente se o site está:
- **Localmente**: http://localhost:8080 → usa caminhos relativos
- **GitHub Pages**: https://seu-usuario.github.io/repositorio → ajusta caminhos

Não é necessário fazer alterações manuais!

## 🎯 Próximos Passos

Após publicar com sucesso:

1. **Compartilhe o link** com amigos, família e clientes
2. **Configure domínio personalizado** (opcional) - Para usar um domínio próprio
3. **Monitore o site** - Acompanhe a aba Actions para ver deployments
4. **Continue desenvolvendo** - Faça push de novas mudanças sempre que desejar atualizar

## 📞 Suporte

Se encontrar problemas:

1. Verifique a aba **Actions** do repositório para ver erros
2. Consulte a documentação oficial: https://docs.github.com/pages
3. Verifique a consola do navegador (F12) para erros de JavaScript
4. Teste localmente em http://localhost:8080 para isolar problemas

---

**Parabéns!** 🎉 Seu site Mespín está pronto para o mundo! 🚀
