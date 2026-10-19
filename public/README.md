# 🕯️ Mespín - Loja Virtual de Velas Aromáticas

Loja virtual elegante e responsiva de velas aromáticas artesanais com catálogo, carrinho de compras, personalização de aromas e finalização via WhatsApp.

## 🌐 Visite o Site

Acesse a loja em funcionamento no GitHub Pages:

```
https://seu-usuario.github.io/mespin-loja
```

> **Nota:** Substitua `seu-usuario` pelo seu usuário do GitHub. Veja [GITHUB_PAGES_GUIA.md](./GITHUB_PAGES_GUIA.md) para instruções completas de publicação.

## ✨ Características

- 🛍️ **Catálogo Completo**: Velas, kits e aromatizadores
- 🎄 **Página Exclusiva de Natal**: Produtos sazonais com design natalino premium
- 🛒 **Carrinho de Compras**: Persistência local com LocalStorage
- 🌸 **Personalização de Aromas**: Múltiplas opções para cada produto
- 📱 **Design Responsivo**: Funciona em desktop, tablet e mobile
- 🚚 **Cálculo de Frete**: Integração com ViaCEP
- 💬 **Checkout via WhatsApp**: Pedidos finalizados por mensagem
- 🎨 **Design Premium**: Paleta sofisticada com tons quentes
- ♿ **Acessível**: Respeita preferências de movimento reduzido

## 🚀 Como Publicar no GitHub Pages

### Pré-requisitos
- Conta no GitHub (gratuita)
- Git instalado no seu computador

### Guia Rápido

1. **Criar Repositório** no GitHub
2. **Clonar e Configurar**:
   ```bash
   cd "Documentos/Loja Mespin"
   git init
   git add .
   git commit -m "Projeto Mespín"
   git remote add origin https://github.com/SEU-USUARIO/mespin-loja.git
   git push -u origin main
   ```
3. **Aguardar Deploy**: A aba **Actions** mostrará o progresso
4. **Acessar Site**: https://seu-usuario.github.io/mespin-loja

**Guia Completo:** Veja [GITHUB_PAGES_GUIA.md](./GITHUB_PAGES_GUIA.md) para instruções detalhadas passo a passo.

## 📁 Estrutura do Projeto

```
mespin-loja/
├── public/                      # Pasta publicada no GitHub Pages
│   ├── index.html              # Página principal
│   ├── natal.html              # Página de Natal
│   ├── style.css               # Estilos principais
│   ├── natal-style.css         # Estilos da página Natal
│   ├── base-url.js             # Configuração automática de caminhos
│   ├── path-checker.js         # Ferramenta de verificação
│   │
│   ├── *.js                    # Scripts da aplicação
│   │   ├── config.js           # Configuração (WhatsApp, taxa)
│   │   ├── categories.js       # Categorias de produtos
│   │   ├── products-data.js    # Base de dados de produtos
│   │   ├── app-state.js        # Estado da aplicação
│   │   ├── aromas.js           # Configurações de aromas
│   │   ├── products.js         # Renderização de produtos
│   │   ├── modal.js            # Modal de detalhes do produto
│   │   ├── cart.js             # Carrinho de compras
│   │   ├── checkout.js         # Finalização de pedido
│   │   ├── main.js             # Inicialização e event listeners
│   │   └── outros...
│   │
│   ├── logo-mespin.png         # Logo da marca
│   ├── banner-mespin.png       # Banner principal
│   ├── natal-banner-hero.png   # Banner de Natal
│   └── images/                 # Imagens
│       └── produtos/           # Imagens dos produtos
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions - Deploy automático
│
├── .gitignore                  # Arquivos não versionados
├── GITHUB_PAGES_GUIA.md        # Guia de publicação
└── README.md                   # Este arquivo
```

## 🎯 Funcionalidades Principais

### 1. Catálogo de Produtos
- Visualização em grid responsivo
- Filtro por categoria
- Busca por nome
- Imagens em alta qualidade

### 2. Página de Natal
- Banner com imagem temática
- Coleção exclusiva de produtos natalinos
- Design premium com paleta natalina
- Animações elegantes

### 3. Modal de Produto
- Imagem do produto
- Descrição completa
- Seleção de aroma
- Controle de quantidade
- Preço atualizado em tempo real

### 4. Carrinho
- Adicionar/remover produtos
- Atualizar quantidades
- Cálculo automático de subtotal
- Persistência via LocalStorage

### 5. Checkout
- Coleta de nome e CEP
- Cálculo de frete com ViaCEP
- Múltiplas opções de envio
- Finalização via WhatsApp

## 💻 Desenvolvimento Local

### Iniciar Servidor

**Windows (PowerShell):**
```powershell
cd "C:\Users\seu-usuario\Documents\Loja Mespin\public"
python -m http.server 8080
```

**Mac/Linux:**
```bash
cd ~/Documents/Loja\ Mespin/public
python3 -m http.server 8080
```

### Acessar Localmente
- Abra http://localhost:8080 no navegador
- Alterações em CSS/JS aparecem com F5 (refresh)

### Testar Caminhos
1. Pressione F12 para abrir Developer Tools
2. Abra a aba Console
3. Copie e cole o conteúdo de `public/path-checker.js`
4. Pressione Enter para executar verificação

## 🔒 Segurança

- ✅ Nenhuma credencial no código
- ✅ WhatsApp número público (intencional para contato)
- ✅ Dados do carrinho apenas localmente
- ✅ Projeto estático sem backend exposto
- ✅ Arquivo `.gitignore` exclui arquivos sensíveis

## 📱 Responsividade

O site funciona perfeitamente em:
- ✅ Desktop (1920x1080 e superiores)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

## 🌐 Compatibilidade

Testado em:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 📊 Performance

- Carregamento rápido (arquivos estáticos)
- Sem dependências externas (apenas Google Fonts)
- Otimizado para GitHub Pages
- Cache automático pelo navegador

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos responsivos e animações
- **JavaScript (Vanilla)**: Sem frameworks, máxima performance
- **LocalStorage**: Persistência de dados do carrinho
- **GitHub Pages**: Hospedagem gratuita
- **GitHub Actions**: Deploy automático

## 📝 Como Customizar

### Mudar Informações da Loja

**Arquivo:** `public/config.js`
```javascript
const WHATSAPP_NUMBER = '5531984840078'; // Seu WhatsApp
const CONFIG = { taxa: 0.1 }; // Taxa de frete (10%)
```

### Adicionar Produtos

**Arquivo:** `public/products-data.js`

Adicione novo objeto ao array `PRODUTOS_DATA`:
```javascript
{
  id: 20,
  nome: "Novo Produto",
  categoriaId: "velas",
  preco: 50.00,
  descricao: "Descrição do produto",
  imagem: "images/produtos/produto-020.png",
  natal: false,
  personalizavel: true,
  usarAromas: "tradicionais",
  maxAromas: 1,
  // ... outras propriedades
}
```

### Modificar Aromas

**Arquivo:** `public/aromas.js`

```javascript
const AROMAS = {
  tradicionais: ["Lavanda", "Camomila", ...],
  natal: ["Canela", "Gengibre", ...]
};
```

### Atualizar Estilos

**Arquivos:** 
- `public/style.css` - Estilos principais
- `public/natal-style.css` - Estilos da página Natal

Paleta de cores Mespín:
- Marrom: `#3E2723`
- Creme: `#FAF0E6`
- Caramelo: `#C19A6B`
- Terracota: `#A0522D`

## 🐛 Troubleshooting

### Problema: Imagens não aparecem
**Solução:** Verifique se os arquivos PNG existem em `public/images/`

### Problema: Página "404 - Not Found"
**Solução:** Use URL completa com nome do repositório: `https://seu-usuario.github.io/mespin-loja`

### Problema: Deploy não funciona
**Solução:** Verifique a aba **Actions** no GitHub para erros

### Problema: Mudanças não aparecem
**Solução:** Aguarde 1-5 minutos e faça hard refresh (Ctrl+Shift+R)

## 📞 Contato

Para comercialização e dúvidas:
- 📱 WhatsApp: [+55 31 98484-0078](https://wa.me/5531984840078)
- 🌐 Rede Social: Instagram

## 📜 Licença

Projeto desenvolvido para Mespín - Velas Aromáticas Artesanais

## 🎉 Créditos

Desenvolvido com ❤️ para Mespín

---

**Versão:** 1.0  
**Data:** 2024  
**Status:** ✅ Pronto para Produção
