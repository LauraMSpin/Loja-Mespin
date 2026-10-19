# 🚀 Guia Rápido: Publicar em GitHub Pages em 5 Minutos

Se você quer ir direto ao ponto, este é o guia para você!

## ⏱️ Tempo Total: ~5-10 minutos (primeira vez)

---

## 📋 Passo 1: Criar Conta GitHub (Se não tiver)

1. Acesse https://github.com
2. Clique **Sign up**
3. Siga as instruções (email, senha, verificação)
4. **Pronto!** ✅

**Tempo:** ~2 minutos

---

## 📁 Passo 2: Criar Repositório

1. No GitHub, clique no **+** (canto superior direito)
2. **New repository**
3. Preencha:
   - **Name:** `mespin-loja`
   - **Description:** "Loja Virtual Mespín"
   - ☑️ **Public** (IMPORTANTE!)
   - Deixe outras opções como estão
4. Clique **Create repository**

**Tempo:** ~1 minuto

---

## 🖥️ Passo 3: Abrir Terminal

### Windows:
- Pressione `Win + R`
- Digite `cmd` e pressione Enter

### Mac/Linux:
- Abra o Terminal

**Tempo:** ~30 segundos

---

## 📤 Passo 4: Enviar Código

Copie e cole estes comandos (um por um):

```bash
cd "C:\Users\seu-usuario\OneDrive\Documentos\Loja Mespin"
```

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Projeto Mespín"
```

```bash
git remote add origin https://github.com/SEU-USUARIO/mespin-loja.git
```

> **Importante:** Substitua `SEU-USUARIO` pelo seu username no GitHub

```bash
git branch -M main
```

```bash
git push -u origin main
```

**Tempo:** ~1-2 minutos

---

## ⚙️ Passo 5: Configurar GitHub Pages

1. Volte ao GitHub no navegador
2. Entre no repositório (se saiu)
3. Clique em **Settings**
4. No menu esquerdo, procure **Pages**
5. Em "Build and deployment":
   - **Source:** GitHub Actions
   - **Branch:** main (já deve estar)
6. Salve

**Tempo:** ~30 segundos

---

## ⏳ Passo 6: Aguardar Deploy

1. Clique na aba **Actions** (no topo do repositório)
2. Procure por **Deploy para GitHub Pages**
3. Espere ficar verde (✅) - leva 1-5 minutos
4. Pronto! ✅

**Tempo:** ~2-5 minutos (automático)

---

## 🌐 Passo 7: Acessar o Site

Abra no navegador:

```
https://seu-usuario.github.io/mespin-loja
```

**Exemplo:** Se você é `laura` no GitHub:
```
https://laura.github.io/mespin-loja
```

**Parabéns!** 🎉 Seu site está ao vivo!

---

## 📱 Testar o Site

- ✅ Abra a página
- ✅ Clique em "Catálogo"
- ✅ Clique em "Natal"
- ✅ Clique em um produto
- ✅ Adicione ao carrinho
- ✅ Teste o checkout

---

## 🔄 Atualizar o Site no Futuro

Sempre que fizer mudanças:

```bash
cd "C:\Users\seu-usuario\OneDrive\Documentos\Loja Mespin"
git add .
git commit -m "Descrição das mudanças"
git push
```

**Pronto!** O site atualiza automaticamente em 1-5 minutos.

---

## 🆘 Erro? 3 Soluções Rápidas

### Erro 1: "git not found"
Git não está instalado. Baixe em https://git-scm.com

### Erro 2: "404 Page not found"
Verifique a URL - deve ser: `https://seu-usuario.github.io/mespin-loja`

### Erro 3: Deploy falha (Actions com X)
- Verifique o workflow em `.github/workflows/deploy.yml`
- Clique na ação com erro para ver detalhes
- Corrija o arquivo e faça `git push` novamente

---

## 📞 Pronto!

Seu site Mespín está no ar! 🎉🕯️

Para guias mais detalhados, veja:
- `GITHUB_PAGES_GUIA.md` - Guia completo
- `CHECKLIST_GITHUB_PAGES.md` - Verificação passo a passo
- `DETECCAO_AUTOMATICA_CAMINHOS.md` - Como funciona os caminhos

**Compartilhe seu site:**
```
🌐 https://seu-usuario.github.io/mespin-loja
```

---

**Versão:** Quick Start  
**Tempo:** ~5-10 minutos  
**Dificuldade:** ⭐ Iniciante
