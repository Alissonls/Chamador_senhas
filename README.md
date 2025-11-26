# 🎯 Chamador de Senhas 

Sistema web moderno e responsivo para gerenciamento de fila de atendimento por senhas/pedidos.

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📋 Descrição

O **Chamador de Senhas** é uma aplicação web premium que permite gerenciar filas de atendimento de forma eficiente e moderna. Ideal para restaurantes, lanchonetes, estabelecimentos comerciais e instituições como o SESC.

### ✨ Características Principais

- 🎨 Interface moderna com efeito glassmorphism
- 📱 Totalmente responsivo (desktop, tablet, mobile)
- ⌨️ Suporte a teclado físico e virtual
- 🔊 Feedback sonoro ao chamar senha
- 📊 Histórico das últimas 5 senhas chamadas
- 💾 Persistência de dados com localStorage
- ♿ Acessível (ARIA, navegação por teclado, alto contraste)
- 🎪 Carrosséis laterais para propaganda (desktop)
- 🌐 Funciona offline após primeira carga

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Frameworks CSS**: TailwindCSS 3.x
- **Biblioteca**: Glide.js 3.5.0 (carrosséis)
- **Tipografia**: Google Fonts (Inter)
- **Armazenamento**: localStorage API

## 📁 Estrutura do Projeto

```
Chamador_senhas/
├── css/
│   └── style.css          # Estilos personalizados e design system
├── js/
│   └── app.js             # Lógica da aplicação (modularizada)
├── img/                   # Imagens e assets
│   ├── logosesc_branco.png
│   ├── funco_ondas.png
│   ├── entrada.png
│   ├── frente.png.jpg
│   └── peixes.png.jpg
├── docs/
│   └── manual.md          # Manual do usuário
├── index.html             # Página principal
└── README.md              # Este arquivo
```

## 🔧 Instalação e Uso

### Opção 1: Uso Direto (Recomendado)

1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` em um navegador moderno
3. Pronto! O sistema está funcionando

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/Chamador_senhas.git

# Navegue até o diretório
cd Chamador_senhas

# Abra o index.html no navegador
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

### Opção 2: Servidor Local

Para melhor performance e evitar problemas de CORS:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (npx)
npx serve

# Com PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## 📖 Como Usar

### Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| `0-9` | Digitar número da senha |
| `Enter` | Chamar senha |
| `Backspace` | Apagar último dígito |
| `Escape` | Limpar tudo |
| `Espaço` | Abrir/fechar painel de controle |

### Teclado Virtual

1. Clique no botão flutuante (canto inferior direito) ou pressione `Espaço`
2. Use os botões numéricos para digitar a senha
3. Clique em "Chamar" para chamar a senha
4. Use "Limpar" para apagar

### Fluxo de Trabalho

1. **Digite** o número do pedido (1-1000)
2. **Pressione Enter** ou clique em "Chamar"
3. **Ouça** o som de notificação
4. **Visualize** a senha na tela principal
5. **Histórico** é atualizado automaticamente

## ⚙️ Configurações

### Carrosséis

Para alterar imagens ou tempo dos carrosséis, edite `js/app.js`:

```javascript
// Linha ~430 - Tempo de autoplay (em milissegundos)
autoplay: 30000,  // 30 segundos
```

### Limites e Validações

```javascript
// Linha ~175 - Máximo de dígitos
if (this.senhaAtual.length >= 4) return false;

// Linha ~201 - Range de senhas válidas
if (numero < 1 || numero > 1000) { ... }

// Linha ~133 - Tamanho do histórico
constructor(maxHistorySize = 5)
```

## 🎨 Personalização

### Cores (Design System)

Edite as variáveis CSS em `css/style.css`:

```css
:root {
    --color-primary: #0066cc;
    --color-accent: #dc2626;
    --color-success: #10b981;
    /* ... mais cores */
}
```

### Background

Substitua a imagem em `body` no CSS:

```css
body {
    background-image: url('../img/sua-imagem.png');
}
```

## 🐛 Solução de Problemas

### Som não funciona
- Alguns navegadores bloqueiam áudio automático
- Interaja com a página primeiro (clique em qualquer lugar)
- Verifique o volume do sistema

### Carrosséis não aparecem
- Verifique se as imagens existem na pasta `img/`
- Abra o console do navegador (F12) e procure erros
- Certifique-se de que Glide.js foi carregado

### Dados não persistem
- Verifique se localStorage está habilitado
- Navegação anônima/privada desabilita localStorage
- Limpar cache do navegador remove dados salvos

## 📊 Arquitetura do Código

O JavaScript está organizado em 6 classes principais:

1. **AudioPlayer**: Gerencia sons e notificações
2. **StorageManager**: Persistência com localStorage
3. **QueueManager**: Lógica de fila e validações
4. **UIController**: Controle de interface
5. **CarouselController**: Gerencia carrosséis
6. **ChamadorApp**: Orquestra toda a aplicação

## ♿ Acessibilidade

- ✅ Atributos ARIA adequados
- ✅ Navegação completa por teclado
- ✅ Contraste de cores (WCAG AA)
- ✅ Suporte a leitores de tela
- ✅ Respeita `prefers-reduced-motion`
- ✅ Respeita `prefers-contrast`

## 🌐 Compatibilidade

| Navegador | Versão Mínima | Status |
|-----------|---------------|---------|
| Chrome | 90+ | ✅ Suportado |
| Firefox | 88+ | ✅ Suportado |
| Safari | 14+ | ✅ Suportado |
| Edge | 90+ | ✅ Suportado |
| Opera | 76+ | ✅ Suportado |
| Mobile (iOS) | 14+ | ✅ Suportado |
| Mobile (Android) | 90+ | ✅ Suportado |

## 📝 Changelog

### v2.0.0 (2025-11-25)
- ♻️ Refatoração completa do código
- 📦 Separação em arquivos CSS e JS
- 🎯 Modularização em classes
- 💾 Persistência com localStorage
- ♿ Melhorias de acessibilidade
- 🐛 Correção de bugs (timing, espaços)
- 📚 Documentação completa

### v1.0.0
- 🎉 Versão inicial

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autor

- **Alisson Luiz Siqueira Coquieiro** - Desenvolvimento inicial
- **Alisson Luiz Siqueira Coquieiro** - Melhorias e contribuições

## 📞 Suporte

Para dúvidas ou problemas:

- 📧 Email: alissonls@gmail.com    
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/Chamador_senhas/issues)
- 📖 Documentação: [docs/manual.md](docs/manual.md)

## 🙏 Agradecimentos

- TailwindCSS pela excelente biblioteca CSS
- Glide.js pelo carrossel suave
- Google Fonts pela tipografia Inter
- Comunidade open-source

---

**Desenvolvido por @ALISSONCOQUEIRO com ❤️**
