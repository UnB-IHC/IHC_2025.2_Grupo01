# AcessiCheck - Verificador de Acessibilidade Web

## 📋 Sobre o Projeto

**AcessiCheck** é uma extensão de navegador desenvolvida para auditoria de acessibilidade web, baseada nos critérios **WCAG 2.2** (Web Content Accessibility Guidelines) e **ABNT NBR 17225:2025**. A ferramenta analisa páginas web em tempo real e identifica não-conformidades relacionadas à acessibilidade, fornecendo recomendações práticas para correção.
 
## 🎯 Objetivo

Esta extensão foi desenvolvida como parte do projeto da disciplina de **Interação Humano-Computador (IHC)** da Universidade de Brasília. O objetivo é criar uma ferramenta de auditoria de acessibilidade que funcione como extensão de navegador, analisando páginas web e reportando erros (não-conformidades) baseados em um checklist de critérios WCAG desenvolvido anteriormente.


## 🛠️ Tecnologias Utilizadas

A extensão foi desenvolvida utilizando as seguintes tecnologias:

- **HTML5**: Estrutura semântica da interface
- **CSS3**: Estilização moderna com Flexbox e Grid
- **JavaScript (Vanilla)**: Lógica de análise sem dependências externas
- **Chrome Extension APIs**: `chrome.tabs`, `chrome.scripting`

## 📂 Estrutura de Arquivos

```
plugin/
├── manifest.json           # Configuração da extensão
├── popup/
│   ├── popup.html         # Interface do popup
│   ├── popup.css          # Estilos da interface
│   └── popup.js           # Lógica de interação do popup
├── content/
│   └── content.js         # Script injetado na página
├── scripts/
│   └── analyzer.js        # Módulo de análise de acessibilidade
├── icons/
│   ├── icon16.png         # Ícone 16x16
│   ├── icon48.png         # Ícone 48x48
│   └── icon128.png        # Ícone 128x128
└── README.md              # Este arquivo
```

## 🔧 Como Instalar e Rodar a Extensão

### Passo 1: Baixar os Arquivos

Clone ou baixe este repositório para o seu computador.

```bash
git clone [URL_DO_REPOSITORIO]
cd plugin
```

### Passo 2: Abrir o Chrome

Abra o navegador Google Chrome (ou navegadores baseados em Chromium como Edge, Brave, etc.).

### Passo 3: Acessar a Página de Extensões

1. Digite `chrome://extensions/` na barra de endereços
2. Ou acesse através do menu: **⋮** (três pontos) → **Mais ferramentas** → **Extensões**

### Passo 4: Ativar o Modo Desenvolvedor

No canto superior direito da página de extensões, ative o toggle **"Modo do desenvolvedor"** (Developer mode).

### Passo 5: Carregar a Extensão

1. Clique no botão **"Carregar sem compactação"** (Load unpacked)
2. Navegue até a pasta `plugin` onde você baixou os arquivos
3. Selecione a pasta e clique em **"Selecionar pasta"**

### Passo 6: Confirmar Instalação

A extensão **AcessiCheck** deve aparecer na lista de extensões instaladas com o ícone de acessibilidade.

## 📖 Como Usar

### 1. Navegar para uma Página Web

Abra qualquer página web que você deseja analisar.

### 2. Abrir a Extensão

Clique no ícone da extensão **AcessiCheck** na barra de ferramentas do Chrome.

### 3. Analisar a Página

Clique no botão **"Analisar Página Atual"** no popup da extensão.

### 4. Visualizar Resultados

A extensão exibirá:

- **Resumo**: Contadores de problemas por severidade (Críticos, Altos, Médios, Baixos)
- **Lista de Problemas**: Detalhes de cada não-conformidade encontrada

### 5. Expandir Detalhes

Clique em qualquer problema para ver:

- **Descrição**: Explicação do problema
- **Elemento**: Seletor CSS do elemento problemático
- **Critérios**: Referências WCAG e NBR relacionadas
- **Recomendação**: Como corrigir o problema


## 📊 Categorias de Severidade

Os problemas são classificados em quatro níveis de severidade:

- **🔴 Crítico**: Impede completamente o acesso ao conteúdo (ex: imagem sem alt, botão sem texto)
- **🟠 Alto**: Dificulta significativamente a navegação (ex: contraste inadequado, link sem href)
- **🔵 Médio**: Causa inconveniência mas não bloqueia (ex: hierarquia de títulos incorreta)
- **⚫ Baixo**: Melhorias recomendadas (ex: link sem aviso de nova aba)

## 📚 Referências e Critérios

A extensão baseia-se nos seguintes padrões e diretrizes:

### WCAG 2.2 (Web Content Accessibility Guidelines)

- **1.1.1**: Conteúdo Não Textual
- **1.3.1**: Informações e Relações
- **1.4.3**: Contraste Mínimo
- **1.4.11**: Contraste Não Textual
- **2.1.1**: Teclado
- **2.2.2**: Pausar, Parar, Ocultar
- **2.4.3**: Ordem do Foco
- **2.4.4**: Finalidade do Link (em Contexto)
- **2.4.6**: Cabeçalhos e Rótulos
- **2.5.8**: Tamanho do Alvo (Mínimo)
- **3.1.1**: Idioma da Página
- **3.2.2**: Entrada
- **3.3.2**: Rótulos ou Instruções
- **4.1.2**: Nome, Função, Valor

### ABNT NBR 17225:2025

- Acessibilidade em comunicação na televisão
- Aplicável também a conteúdos web com mídia

### Guia RUBR (Recomendações de Acessibilidade para Conteúdo Web)

- Guia brasileiro de boas práticas de acessibilidade

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte da disciplina de Interação Humano-Computador da Universidade de Brasília.

## 📧 Contato

Para dúvidas ou sugestões sobre o projeto, entre em contato com os membros do grupo através do repositório no GitHub.

---

**Desenvolvido para promover a acessibilidade web**

*Baseado em WCAG 2.2 e ABNT NBR 17225:2025*
