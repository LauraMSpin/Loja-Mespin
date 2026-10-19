# 📍 Onde Está Cada Coisa - Mapa Visual do Projeto

Este documento ajuda você a encontrar rapidamente os arquivos e entender a estrutura.

---

## 🗺️ Mapa Visual da Pasta

```
Loja Mespin/                                    ← SUA PASTA RAIZ
│
├── 📋 Documentação (Leia isto primeiro)
│   ├── INDICE_DOCUMENTACAO_GITHUB.md          ← COMECE AQUI! Índice de tudo
│   ├── GUIA_RAPIDO.md                         ← 5 minutos para publicar
│   ├── GITHUB_PAGES_GUIA.md                   ← Guia completo
│   ├── RESUMO_GITHUB_PAGES.md                 ← O que foi feito
│   ├── CHECKLIST_GITHUB_PAGES.md              ← Verificação passo a passo
│   ├── DETECCAO_AUTOMATICA_CAMINHOS.md        ← Como funciona (técnico)
│   ├── REFERENCIA_CAMINHOS.md                 ← Lista de todos os caminhos
│   ├── LIVRO_RECEITAS.md                      ← Soluções práticas
│   └── MAPA_VISUAL.md                         ← Este arquivo
│
├── ⚙️ Configuração do GitHub
│   ├── .gitignore                              ← Arquivos ignorados
│   └── .github/
│       └── workflows/
│           └── deploy.yml                      ← Deploy automático
│
└── 📁 public/                                   ← PASTA PUBLICADA NO GITHUB PAGES
    ├── 🌐 Páginas HTML
    │   ├── index.html                         ← Página principal (Início)
    │   └── natal.html                         ← Página de Natal
    │
    ├── 🎨 Estilos CSS
    │   ├── style.css                          ← Estilos principais
    │   └── natal-style.css                    ← Estilos da página Natal
    │
    ├── ⚡ Scripts JavaScript
    │   ├── base-url.js            ⭐          ← Detecta localhost vs GitHub Pages
    │   ├── path-checker.js        🧪          ← Verificador de diagnóstico
    │   ├── config.js                          ← Configurações (WhatsApp, taxa)
    │   ├── categories.js                      ← Categorias de produtos
    │   ├── products-data.js                   ← Base de dados de produtos
    │   ├── app-state.js                       ← Estado global da aplicação
    │   ├── aromas.js                          ← Aromas disponíveis
    │   ├── persistence.js                     ← LocalStorage
    │   ├── dom.js                             ← Helper para DOM
    │   ├── products.js                        ← Renderiza produtos
    │   ├── modal.js                           ← Modal de detalhes
    │   ├── cart.js                            ← Carrinho de compras
    │   ├── checkout.js                        ← Finalização de pedido
    │   ├── utils.js                           ← Funções auxiliares
    │   └── main.js                            ← Inicialização
    │
    ├── 🖼️ Imagens
    │   ├── logo-mespin.png                    ← Logo da marca
    │   ├── banner-mespin.png                  ← Banner principal
    │   ├── natal-banner-hero.png              ← Banner de Natal
    │   └── images/
    │       ├── natal-hero-bg.png              ← Fundo animado Natal
    │       └── produtos/
    │           ├── produto-001.png           ← Imagens dos produtos
    │           ├── produto-002.png
    │           ├── produto-003.png
    │           └── ... (mais produtos)
    │
    └── 📚 Documentação do Projeto
        └── README.md                          ← Como customizar e usar
```

---

## 🎯 Guia Rápido por Tarefa

### "Quero publicar o site"
```
1. Abra GUIA_RAPIDO.md
2. Siga os 7 passos
3. Pronto! 🎉
```

### "Quero entender como funciona"
```
1. Leia RESUMO_GITHUB_PAGES.md
2. Depois DETECCAO_AUTOMATICA_CAMINHOS.md
3. Consulte REFERENCIA_CAMINHOS.md para dúvidas
```

### "Quero mudar algo no site"
```
1. Abra LIVRO_RECEITAS.md
2. Procure a tarefa (Adicionar produto, mudar cores, etc)
3. Siga o passo a passo
```

### "Algo deu errado"
```
1. Abra GITHUB_PAGES_GUIA.md
2. Procure a seção "Solução de Problemas"
3. Se ainda tiver dúvida, execute path-checker.js (F12 → Console)
```

### "Quero verificar tudo antes de publicar"
```
1. Abra CHECKLIST_GITHUB_PAGES.md
2. Faça cada verificação
3. Publique com confiança!
```

---

## 📍 Onde Encontrar Cada Tipo de Arquivo

### Configuração
```
.gitignore                      - Arquivos ignorados por Git
.github/workflows/deploy.yml    - Workflow de deploy automático
public/config.js                - Número WhatsApp e configurações
```

### Páginas
```
public/index.html               - Página inicial
public/natal.html               - Página de Natal
```

### Estilos
```
public/style.css                - Estilos principais (2,000+ linhas)
public/natal-style.css          - Estilos página Natal
```

### Dados
```
public/products-data.js         - Lista de produtos (json)
public/categories.js            - Categorias (Velas, Kits, etc)
public/aromas.js                - Aromas disponíveis
```

### Funcionalidades
```
public/products.js              - Renderiza grid de produtos
public/modal.js                 - Modal de detalhes do produto
public/cart.js                  - Carrinho e operações
public/checkout.js              - Cálculo de frete e finalização
```

### Ferramentas
```
public/base-url.js              - Detecção automática de caminhos ⭐
public/path-checker.js          - Verificador de diagnóstico 🧪
public/dom.js                   - Helpers para manipular DOM
public/utils.js                 - Funções auxiliares gerais
public/persistence.js           - LocalStorage
public/app-state.js             - Estado global
```

### Imagens
```
public/logo-mespin.png          - Logo
public/banner-mespin.png        - Banner principal
public/natal-banner-hero.png    - Banner Natal
public/images/natal-hero-bg.png - Fundo animado
public/images/produtos/         - Imagens dos produtos
```

### Documentação
```
INDICE_DOCUMENTACAO_GITHUB.md   - Índice (COMECE AQUI)
GUIA_RAPIDO.md                  - 5 minutos de publicação
GITHUB_PAGES_GUIA.md            - Guia completo
RESUMO_GITHUB_PAGES.md          - O que foi feito
CHECKLIST_GITHUB_PAGES.md       - Verificações
DETECCAO_AUTOMATICA_CAMINHOS.md - Explicação técnica
REFERENCIA_CAMINHOS.md          - Referência de caminhos
LIVRO_RECEITAS.md               - Soluções práticas
MAPA_VISUAL.md                  - Este arquivo
public/README.md                - Documentação do projeto
```

---

## 🔄 Fluxo de Desenvolvimento

### Local (Seu Computador)

```
Editar arquivo
    ↓
Salvar (Ctrl+S)
    ↓
Abrir http://localhost:8080
    ↓
Ver mudança no navegador
    ↓
Git add . → commit → push
```

### GitHub (Remoto)

```
Push para GitHub
    ↓
Webhook dispara
    ↓
GitHub Actions inicia
    ↓
Upload de public/
    ↓
Deploy em GitHub Pages
    ↓
Site atualiza em 1-5 min
    ↓
Acesso em https://seu-usuario.github.io/mespin-loja
```

---

## 📊 Hierarquia de Informação

```
Você quer saber...          Vá para...
├─ Como publicar?           → GUIA_RAPIDO.md
├─ Como funciona?           → DETECCAO_AUTOMATICA_CAMINHOS.md
├─ Onde está cada arquivo?  → REFERENCIA_CAMINHOS.md
├─ O que foi feito?         → RESUMO_GITHUB_PAGES.md
├─ Tem um problema?         → GITHUB_PAGES_GUIA.md (troubleshooting)
├─ Como fazer X?            → LIVRO_RECEITAS.md
├─ Tudo está certo?         → CHECKLIST_GITHUB_PAGES.md
├─ Qual é o passo exato?    → GITHUB_PAGES_GUIA.md
└─ Qual documento ler?      → INDICE_DOCUMENTACAO_GITHUB.md
```

---

## ✅ Verificação Rápida

### Antes de Publicar

- [ ] Todos os arquivos .js estão em `public/`?
- [ ] Todas as imagens estão em `public/images/`?
- [ ] .gitignore foi criado?
- [ ] Workflow foi criado em `.github/workflows/deploy.yml`?
- [ ] base-url.js foi adicionado?
- [ ] index.html e natal.html foram modificados?

**Se tudo marcado:** ✅ Pronto para publicar!

### Após Publicar

- [ ] Site abre em `https://seu-usuario.github.io/mespin-loja`?
- [ ] Imagens carregam?
- [ ] Catálogo funciona?
- [ ] Página Natal abre?
- [ ] Modal abre?
- [ ] Carrinho funciona?
- [ ] Console não tem erros?

**Se tudo marcado:** 🎉 Sucesso!

---

## 🎓 Ordem de Leitura Recomendada

### Para Iniciantes
1. INDICE_DOCUMENTACAO_GITHUB.md (você está aqui)
2. GUIA_RAPIDO.md
3. Fazer os passos
4. Sucesso! 🎉

### Para Intermediários
1. MAPA_VISUAL.md (você está aqui)
2. RESUMO_GITHUB_PAGES.md
3. GITHUB_PAGES_GUIA.md
4. CHECKLIST_GITHUB_PAGES.md
5. Fazer os passos com confiança ✅

### Para Avançados
1. REFERENCIA_CAMINHOS.md
2. DETECCAO_AUTOMATICA_CAMINHOS.md
3. Ler source code dos scripts
4. Dominar tudo! 🚀

---

## 🔗 Links Rápidos

| Tarefa | Documento |
|--------|-----------|
| Publicar rápido | GUIA_RAPIDO.md |
| Entender tudo | GITHUB_PAGES_GUIA.md |
| Encontrar arquivo | REFERENCIA_CAMINHOS.md |
| Fazer algo | LIVRO_RECEITAS.md |
| Verificar tudo | CHECKLIST_GITHUB_PAGES.md |
| Ver índice | INDICE_DOCUMENTACAO_GITHUB.md |
| Problemas | GITHUB_PAGES_GUIA.md#solução |
| Técnico | DETECCAO_AUTOMATICA_CAMINHOS.md |

---

## 🎯 Você Está em Qual Etapa?

### Etapa 1: Preparação (Você aqui?)
```
□ Ler documentação
□ Entender estrutura
→ Próximo: Criar conta GitHub
```

### Etapa 2: Configuração
```
□ Criar repositório GitHub
□ Fazer git push
→ Próximo: Configurar GitHub Pages
```

### Etapa 3: Deploy
```
□ Configurar GitHub Pages
□ Aguardar deploy
□ Acessar site publicado
→ Próximo: Testar funcionalidades
```

### Etapa 4: Validação
```
□ Testar em desktop
□ Testar em mobile
□ Testar funcionalidades
□ Resolver problemas se houver
→ Próximo: Sucesso! 🎉
```

### Etapa 5: Manutenção
```
□ Atualizar conteúdo
□ Adicionar produtos
□ Fazer mudanças
□ Fazer git push
→ Site atualiza automaticamente
```

---

## 🆘 Precisa de Ajuda?

### Pergunta: "Qual é o passo 1?"
**Resposta:** GUIA_RAPIDO.md - Passo 1: Criar conta GitHub

### Pergunta: "Onde boto a imagem do produto?"
**Resposta:** LIVRO_RECEITAS.md - Receita 4: Adicionar Novo Produto

### Pergunta: "O que significa X?"
**Resposta:** DETECCAO_AUTOMATICA_CAMINHOS.md - Explicação completa

### Pergunta: "Está tudo certo?"
**Resposta:** CHECKLIST_GITHUB_PAGES.md - Faça todos os testes

### Pergunta: "Algo deu errado"
**Resposta:** GITHUB_PAGES_GUIA.md - Seção Troubleshooting

---

## 📞 Próximo Passo

Agora que você entendeu a estrutura:

👉 **Abra GUIA_RAPIDO.md e comece a publicar!**

Tempo total: ~10 minutos até site ao vivo! ⏱️

---

**Mapa Visual Concluído!**  
**Versão:** 1.0  
**Data:** 18 de outubro de 2024  
**Status:** ✅ Projeto Completo
