# 🎫 Cartão de Referência Rápida

Mantenha este cartão à mão durante a publicação!

---

## ⚡ Publicar em 5 Passos

### Passo 1: Terminal
```bash
cd "C:\Users\seu-usuario\OneDrive\Documentos\Loja Mespin"
git init
git add .
git commit -m "Projeto Mespín"
```

### Passo 2: GitHub
```bash
git remote add origin https://github.com/SEU-USUARIO/mespin-loja.git
git branch -M main
git push -u origin main
```

### Passo 3: Configurar GitHub Pages
1. GitHub → Settings
2. Pages
3. Source: GitHub Actions
4. Salvar

### Passo 4: Aguardar Deploy
1. Actions → Deploy para GitHub Pages
2. Aguarde ✅ (1-5 min)

### Passo 5: Acessar
```
https://seu-usuario.github.io/mespin-loja
```

---

## 📚 Documentação Rápida

| Precisa de... | Abra... |
|---|---|
| Publicar rápido | GUIA_RAPIDO.md |
| Guia completo | GITHUB_PAGES_GUIA.md |
| Checklist | CHECKLIST_GITHUB_PAGES.md |
| Caminhos | REFERENCIA_CAMINHOS.md |
| Problemas | GITHUB_PAGES_GUIA.md |
| Receitas | LIVRO_RECEITAS.md |
| Mapa visual | MAPA_VISUAL.md |
| Índice | INDICE_DOCUMENTACAO_GITHUB.md |

---

## 🔧 Atualizar Depois

```bash
cd "C:\Users\seu-usuario\OneDrive\Documentos\Loja Mespin"
# Fazer mudanças nos arquivos
git add .
git commit -m "Descrição"
git push
# Site atualiza em 1-5 min
```

---

## 📍 Caminhos Importantes

```
public/index.html             - Página principal
public/natal.html             - Página Natal
public/products-data.js       - Produtos
public/config.js              - Configurações
public/images/produtos/       - Imagens dos produtos
public/style.css              - Estilos
.gitignore                     - Não commitar
.github/workflows/deploy.yml   - Deploy automático
```

---

## 🧪 Testar

```javascript
// F12 → Console → Cole:
console.log('BASE_URL:', window.BASE_URL);
console.log('Hostname:', window.location.hostname);
```

---

## ⚠️ Não Fazer

```
❌ Caminhos absolutos: /images/...
❌ Caminhos Windows: C:\...
❌ URLs localhost em produção
❌ Credenciais no código
❌ Fazer push sem git add .
```

---

## ✅ Verificação Final

- [ ] Git init
- [ ] Git add .
- [ ] Git commit
- [ ] Git remote add origin
- [ ] Git push
- [ ] GitHub Pages configurado
- [ ] Deploy concluído ✅
- [ ] Site abre
- [ ] Funcionalidades testadas

---

## 🆘 SOS

**404 Page not found?**
- Verificar URL: https://seu-usuario.github.io/**mespin-loja**

**Imagens não carregam?**
- Executar path-checker.js (F12)

**Mudanças não aparecem?**
- Aguardar 1-5 minutos
- Hard refresh: Ctrl+Shift+R

**Deploy falha?**
- Clicar em Actions → Ver logs

---

## 📞 Contatos Úteis

- GitHub Docs: github.com/pages
- ViaCEP (frete): viacep.com.br
- WhatsApp: +55 31 9 8484-0078

---

**Mantenha este cartão à mão!** 🎫

Versão: 1.0 | Data: 18/10/2024
