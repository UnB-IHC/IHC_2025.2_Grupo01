# Desenvolvimento Web

<div class="chart-container" style="position: relative; height:250px; width:250px; margin: 20px auto;">
    <canvas class="checklist-pie-chart"></canvas>
</div>

## Imagens
- [ ] Imagens informativas: devem ter alt com descrição breve e significativa do conteúdo. WCAG 1.1.1 [^wcag111]; NBR [^abnt17225];
- [ ] Imagens decorativas: devem ser ignoradas por leitores de tela, utilizando `alt=""` (vazio) ou `role="presentation"`. WCAG 1.1.1 [^wcag111]; NBR [^abnt17225];
- [ ] Imagens com legenda ou título: deve ter legenda ou título associado à imagem com texto claro e descritivo. WCAG 2.4.6 [^wcag246]; NBR [^abnt17225];
- [ ] Imagens em botões ou links o alt deve descrever a ação (ex: `alt="Pesquisar"`). WCAG 1.1.1 [^wcag111]; NBR [^abnt17225];

## Vídeos e Mídia
- [ ] Legenda sincronizada: todo vídeo com áudio deve possuir legendas. WCAG 1.2.2 [^wcag122]; NBR [^abnt17225];
- [ ] Transcrição textual: conteúdos em áudio devem ter transcrição equivalente. WCAG 1.2.1 [^wcag121]; NBR [^abnt17225];
- [ ] Audiodescrição: obrigatória quando informações visuais forem essenciais à compreensão. WCAG 1.2.5 [^wcag125]; NBR [^abnt17225];
- [ ] Controle de reprodução: não utilize autoplay, ofereça pausa, stop e volume ajustável. WCAG 1.4.2 [^wcag142], 2.2.2 [^wcag222]; NBR [^abnt17225];
- [ ] Acessibilidade no player: garanta que todos os botões do player sejam acessíveis por teclado e tenham rótulos (`aria-label`). WCAG 2.1.1 [^wcag211]; Guia UK/BR [^guiaukbr];

## Navegação e Controles
- [ ] Links e botões semânticos: links devem ter `href` válido e botões devem usar `<button>` com ação clara. WCAG 1.3.1 [^wcag131], 4.1.2 [^wcag412];
- [ ] Atalho “Pular para o conteúdo”: inclua link no topo da página para ir direto à área principal. WCAG 2.4.1 [^wcag241];
- [ ] Aviso de nova aba ou janela: informe quando o clique abrir novo contexto. WCAG 3.2.2 [^wcag322]; Guia UK/BR [^guiaukbr];
- [ ] Foco e ordem lógica: a navegação via teclado deve seguir ordem coerente. WCAG 2.4.3 [^wcag243], 2.4.7 [^wcag247];

## Formulários
- [ ] Mensagens de erro claras: devem aparecer próximas ao campo e indicar como corrigir. WCAG 3.3.1 [^wcag331], 3.3.3 [^wcag333];
- [ ] Autocompletar e dados persistentes: permita o uso de autocomplete e evite preenchimentos repetidos. WCAG 1.3.5 [^wcag135], 3.3.7 [^wcag337];
- [ ] Sumário de validação: exibe lista de erros no topo após o envio. WCAG 3.3.1 [^wcag331]; Guia UK/BR [^guiaukbr];
- [ ] Feedback visual e textual: deve fornecer feedback visual e textual em ações (envio, carregamento, sucesso, erro). NBR [^abnt17225];
- [ ] Campos obrigatórios: devem ser identificados textual e visualmente (ex: “*Campo obrigatório”). WCAG 3.3.2 [^wcag332];
- [ ] Evitar entrada redundante; autenticação acessível. WCAG 3.3.7 [^wcag337], 3.3.8 [^wcag338], 3.3.9 [^wcag339]; NBR [^abnt17225];

## Estrutura e Semântica
- [ ] Elementos nativos HTML: prefira `<button>`, `<ul>`, `<table>`, `<form>` em vez de divs genéricas. WCAG 1.3.1 [^wcag131], 4.1.2 [^wcag412];
- [ ] Hierarquia de títulos: não pule níveis. (ex: `<h1>` direto para `<h3>`). WCAG 1.3.1 [^wcag131]; NBR 5.3.5 [^abnt17225];
- [ ] Tabelas acessíveis: inclua `<caption>` e identifique cabeçalhos com `<th scope=“col/row”>`. WCAG 1.3.1 [^wcag131]; NBR 5.6.3, 5.6.5 [^abnt17225];
- [ ] Ordem do DOM: deve seguir a ordem lógica de leitura e de tabulação, onde a navegação por teclado deve seguir a sequência visual. WCAG 1.3.2 [^wcag132]; NBR 5.13.6, 5.10.2 [^abnt17225];

## Modais e Diálogos
- [ ] Foco no modal: o foco deve ir para o modal ao abrir e voltar ao elemento anterior ao fechar. WCAG 2.4.3 [^wcag243], 2.4.7 [^wcag247]; NBR 5.1.4 [^abnt17225];
- [ ] Fechamento Acessível (Sem Armadilhas): o usuário deve poder fechar o componente via teclado (tecla `Esc` ou `Tab`) e deve existir um botão de fechar visível. O foco não deve ficar preso. WCAG 2.1.2 [^wcag212]; NBR 5.1.6 [^abnt17225];
- [ ] Evitar sobreposição: não utilize modais dentro de outros modais ou fullscreen forçado. Guia UK/BR [^guiaukbr];

## Dispositivos Móveis e Toque
- [ ] Layout responsivo: deve ajustar-se sem rolagem horizontal e suportar zoom de até 200%. WCAG 1.4.10 [^wcag1410], 1.4.4 [^wcag144];
- [ ] Áreas de toque adequadas: botões e links devem ter tamanho e espaçamento suficientes para o toque. WCAG 2.5.8 [^wcag258];
- [ ] Orientação flexível: o conteúdo deve funcionar tanto em modo retrato quanto em paisagem. WCAG 1.3.4 [^wcag134]; NBR [^abnt17225];
- [ ] Alternativa ao arrastar; alvo mínimo. WCAG 2.5.7 [^wcag257], 2.5.8 [^wcag258]; NBR [^abnt17225];

## Teclado e Interação
- [ ] Acessibilidade total via teclado: todas as funções devem ser operáveis sem mouse. WCAG 2.1.1 [^wcag211]; NBR 5.1.13 [^abnt17225];
- [ ] Foco visível: o elemento ativo deve ter destaque claro e visível. WCAG 2.4.7 [^wcag247], 2.4.11 [^wcag2411]; NBR 5.1.1, 5.1.3 [^abnt17225];
- [ ] Equivalentes ao mouseover: toda interação por mouse deve ter equivalente no teclado. WCAG 2.1.1 [^wcag211]; NBR 5.1.8, 5.1.9 [^abnt17225];
- [ ] Atalhos de teclado: fornece atalhos quando apropriado e personalizáveis. WCAG 2.1.4 [^wcag214]; NBR 5.1.11 [^abnt17225]; Guia UK/BR [^guiaukbr];

## Referências

[^abnt17225]: **ABNT NBR 17225:2025.** Acessibilidade em comunicação na Web. Disponível em: [https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf](https://mwpt.com.br/wp-content/uploads/2025/04/ABNT-NBR-17225-Acessibilidade-Digital.pdf). Acesso em: 15 nov 2025.

[^guiaukbr]: DINIZ, V.; FERRAZ, R.; NASCIMENTO, C. M.; CREDIDIO, R. **Guia de Boas Práticas para Acessibilidade Digital**. Programa de Cooperação entre Reino Unido e Brasil em Acesso Digital, 2023. Disponível em: <https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/acessibilidade-digital/guiaboaspraaticasparaacessibilidadedigital.pdf>. Acesso em: 15 nov 2025.

[^wcag111]: WCAG 2.2 Understanding Docs. SC 1.1.1 Non-text Content (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html). Acesso em: 15 nov 2025.

[^wcag121]: WCAG 2.2 Understanding Docs. SC 1.2.1 Audio-only and Video-only (Prerecorded) (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html). Acesso em: 15 nov 2025.

[^wcag122]: WCAG 2.2 Understanding Docs. SC 1.2.2 Captions (Prerecorded) (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html). Acesso em: 15 nov 2025.

[^wcag125]: WCAG 2.2 Understanding Docs. SC 1.2.5 Audio Description (Prerecorded) (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html). Acesso em: 15 nov 2025.

[^wcag131]: WCAG 2.2 Understanding Docs. SC 1.3.1 Info and Relationships (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html). Acesso em: 15 nov 2025.

[^wcag132]: WCAG 2.2 Understanding Docs. SC 1.3.2 Meaningful Sequence (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html). Acesso em: 15 nov 2025.

[^wcag134]: WCAG 2.2 Understanding Docs. SC 1.3.4 Orientation (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/orientation.html](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html). Acesso em: 15 nov 2025.

[^wcag135]: WCAG 2.2 Understanding Docs. SC 1.3.5 Identify Input Purpose (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html). Acesso em: 15 nov 2025.

[^wcag142]: WCAG 2.2 Understanding Docs. SC 1.4.2 Audio Control (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html). Acesso em: 15 nov 2025.

[^wcag144]: WCAG 2.2 Understanding Docs. SC 1.4.4 Resize Text (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html). Acesso em: 15 nov 2025.

[^wcag1410]: WCAG 2.2 Understanding Docs. SC 1.4.10 Reflow (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/reflow.html](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html). Acesso em: 15 nov 2025.

[^wcag211]: WCAG 2.2 Understanding Docs. SC 2.1.1 Keyboard (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html). Acesso em: 15 nov 2025.

[^wcag212]: WCAG 2.2 Understanding Docs. SC 2.1.2 No Keyboard Trap (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html). Acesso em: 15 nov 2025.

[^wcag214]: WCAG 2.2 Understanding Docs. SC 2.1.4 Character Key Shortcuts (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html). Acesso em: 15 nov 2025.

[^wcag222]: WCAG 2.2 Understanding Docs. SC 2.2.2 Pause, Stop, Hide (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). Acesso em: 15 nov 2025.

[^wcag241]: WCAG 2.2 Understanding Docs. SC 2.4.1 Bypass Blocks (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html). Acesso em: 15 nov 2025.

[^wcag243]: WCAG 2.2 Understanding Docs. SC 2.4.3 Focus Order (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html). Acesso em: 15 nov 2025.

[^wcag246]: WCAG 2.2 Understanding Docs. SC 2.4.6 Headings and Labels (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html). Acesso em: 15 nov 2025.

[^wcag247]: WCAG 2.2 Understanding Docs. SC 2.4.7 Focus Visible (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html). Acesso em: 15 nov 2025.

[^wcag2411]: WCAG 2.2 Understanding Docs. SC 2.4.11 Focus Not Obscured (Minimum) (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html). Acesso em: 15 nov 2025.

[^wcag257]: WCAG 2.2 Understanding Docs. SC 2.5.7 Dragging Movements (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html). Acesso em: 15 nov 2025.

[^wcag258]: WCAG 2.2 Understanding Docs. SC 2.5.8 Target Size (Minimum) (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). Acesso em: 15 nov 2025.

[^wcag322]: WCAG 2.2 Understanding Docs. SC 3.2.2 On Input (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/on-input.html](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html). Acesso em: 15 nov 2025.

[^wcag331]: WCAG 2.2 Understanding Docs. SC 3.3.1 Error Identification (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html). Acesso em: 15 nov 2025.

[^wcag332]: WCAG 2.2 Understanding Docs. SC 3.3.2 Labels or Instructions (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html). Acesso em: 15 nov 2025.

[^wcag333]: WCAG 2.2 Understanding Docs. SC 3.3.3 Error Suggestion (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html). Acesso em: 15 nov 2025.

[^wcag337]: WCAG 2.2 Understanding Docs. SC 3.3.7 Redundant Entry (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html). Acesso em: 15 nov 2025.

[^wcag338]: WCAG 2.2 Understanding Docs. SC 3.3.8 Accessible Authentication (Minimum) (Level AA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html). Acesso em: 15 nov 2025.

[^wcag339]: WCAG 2.2 Understanding Docs. SC 3.3.9 Accessible Authentication (Enhanced) (Level AAA). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html). Acesso em: 15 nov 2025.

[^wcag412]: WCAG 2.2 Understanding Docs. SC 4.1.2 Name, Role, Value (Level A). Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html). Acesso em: 15 nov 2025.

[^wcag51]: WCAG 2.2 Understanding Docs. 5. Conformance. Disponível em: [https://www.w3.org/WAI/WCAG22/Understanding/conformance.html](https://www.w3.org/WAI/WCAG22/Understanding/conformance.html). Acesso em: 15 nov 2025.

[^wcag22aa]: WCAG 2.2 W3C Recommendation. Web Content Accessibility Guidelines (WCAG) 2.2. Disponível em: [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/). Acesso em: 15 nov 2025.