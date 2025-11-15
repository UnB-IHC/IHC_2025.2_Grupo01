# Ferramentas de Acessibilidade

Para apoiar a avaliação de sites e facilitar o desenvolvimento de soluções acessíveis, selecionamos um conjunto de **ferramentas essenciais** voltadas para análise, diagnóstico, simulação e verificação de conformidade com WCAG, eMAG e boas práticas internacionais.

---

## 1. Lighthouse (Google)
**Link:** https://developer.chrome.com/docs/lighthouse  
**Propósito:** Auditar páginas web quanto a **acessibilidade, desempenho, SEO e PWA**.  
**Como usar:** Abra o Chrome → **F12 (DevTools)** → “Lighthouse” → selecione **Accessibility** → gerar relatório. Ele destaca erros, contrastes inadequados, problemas de navegação por teclado e boas práticas faltantes.

---

## 2. Axe DevTools – Web Accessibility Testing  
**Link:** https://www.deque.com/axe/devtools/  
**Propósito:** Ferramenta profissional que identifica **erros de acessibilidade WCAG** diretamente no navegador.  
**Como usar:** Instale a extensão no Chrome/Firefox → abra DevTools → aba “Axe DevTools” → “Scan all of my page”. Ela lista violações, severidade, localização no código e como corrigir.

---

## 3. WAVE – Web Accessibility Evaluation Tool  
**Link:** https://wave.webaim.org/  
**Propósito:** Avaliar páginas usando regras de acessibilidade da WCAG, com marcação visual no próprio site.  
**Como usar:** Acesse o site do WAVE e insira a URL desejada ou instale a extensão. O relatório apresenta erros, alertas e sugestões diretamente sobre a página analisada.

---

## 4. ASES Web (eMAG) – Governo Federal  
**Link:** https://ases.gov.br/  
**Propósito:** Validar páginas conforme o **eMAG**, modelo brasileiro de acessibilidade digital.  
**Como usar:** Insira a URL no site do ASES ou faça upload de arquivos HTML. Ele gera relatórios com erros, avisos e recomendações conforme a legislação brasileira.

---

## 5. AccessMonitor  
**Link:** https://accessmonitor.acessibilidade.gov.pt/  
**Propósito:** Avaliar acessibilidade de acordo com as **WCAG 2.1**, gerando pontuação e lista de erros detalhados.  
**Como usar:** Insira a URL e aguarde o relatório. O sistema classifica o nível de conformidade e exibe problemas agrupados por tipo (percebilidade, robustez, navegabilidade etc.).

---

## 6. WebAIM Contrast Checker  
**Link:** https://webaim.org/resources/contrastchecker/  
**Propósito:** Verificar se o **contraste de cores entre texto e fundo** atende aos requisitos WCAG AA/AAA.  
**Como usar:** Insira as cores (HEX/RGB) do texto e fundo → o verificador mostra a razão de contraste e se está “Pass” ou “Fail”.

---

## 7. WCAG Color Contrast Checker  
**Link:** https://accessible-colors.com  
**Propósito:** Checar contraste e sugerir automaticamente ajustes de luminosidade para atingir conformidade AA/AAA.  
**Como usar:** Insira as cores e veja sugestões de alternativas acessíveis que preservam a paleta.

---

## 8. HeadingsMap  
**Link:** Extensão do Chrome/Firefox (“HeadingsMap”)  
**Propósito:** Mostrar a **estrutura de títulos (h1, h2, h3...)** usada no site, essencial para navegação por leitores de tela.  
**Como usar:** Instale a extensão → clique no ícone → visualize a hierarquia de headings e identifique problemas como ausência de h1 ou salto de níveis.

---

## 9. Image Alt Text Viewer  
**Link:** Extensão: "Image Alt Text Viewer"  
**Propósito:** Visualizar rapidamente os **texts alternativos (alt text)** de todas as imagens de uma página.  
**Como usar:** Abra o site → clique na extensão → ela exibe sobre cada imagem o texto alternativo ou indica quando está ausente.

---

## 10. Let's Get Color Blind  
**Link:** https://letsgetcolorblind.com/  
**Propósito:** **Simular daltonismo** no navegador para verificar acessibilidade visual.  
**Como usar:** Instale a extensão → escolha o tipo de daltonismo (protanopia, deuteranopia, tritanopia etc.) → veja como o site fica para diferentes usuários.

---

## 11. NVDA – Leitor de Tela (Windows)  
**Link:** https://www.nvaccess.org/  
**Propósito:** Leitor de tela gratuito que permite testar **acessibilidade por leitura textual**, navegação por teclado e estrutura semântica.  
**Como usar:** Instale o NVDA → navegue pelo site usando **Tab, Shift+Tab e setas** → verifique ordem de leitura, headings, links e descrições.

---

## 12. JAWS – Leitor de Tela (Windows)  
**Link:** https://www.tecassistiva.com.br/catalogo/jaws/  
**Propósito:** Leitor de tela avançado, comercial, com ampla compatibilidade com softwares e recursos de navegação.  
**Como usar:** Após instalar, ative comandos como **Insert+F7** (lista de links) e **Insert+F6** (lista de headings) para validar estrutura semântica do site.

---

## 13. TalkBack – Android  
**Link:** https://support.google.com/accessibility/android  
**Propósito:** Leitor de tela nativo do Android.  
**Como usar:** Ative em **Configurações → Acessibilidade → TalkBack**. Navegue pelo site no celular e teste foco, ordem de leitura e descrições alternativas.

---

## 14. VoiceOver – iOS (iPhone/iPad/Mac)  
**Link:** https://support.apple.com/voiceover  
**Propósito:** Leitor de tela da Apple, usado para testes de navegação em dispositivos iOS/macOS.  
**Como usar:** iPhone: Ajustes → Acessibilidade → VoiceOver. Use gestos de navegação para identificar problemas de foco, anúncios invisíveis e falta de alt text.

---

## 15. Pa11y – Testes Automatizados  
**Link:** https://pa11y.org/  
**Propósito:** Rodar **testes automatizados** de acessibilidade em páginas web via linha de comando ou dashboard.  
**Como usar:** Instale com `npm install -g pa11y` → execute `pa11y https://seusite.com` → analise lista de erros agrupados por regra violada.

---

## 16. Funkify – Simulador de Deficiências  
**Link:** https://www.funkify.org/  
**Propósito:** Simular diferentes deficiências visuais, motoras, cognitivas e disléxicas diretamente no navegador.  
**Como usar:** Instale a extensão → escolha o simulador (ex.: visão tremida, leitura disléxica, baixa visão) → observe como usuários reais experimentam a página.

---

# Como utilizar essas ferramentas na avaliação
Ao avaliar o portal desejado, recomendamos:

1. **Testes automatizados:** Axe, Lighthouse, Pa11y, ASES, AccessMonitor  
2. **Testes manuais:** WAVE, HeadingsMap, Contrast Checkers  
3. **Testes de simulação:** Funkify, Let's Get Color Blind  
4. **Testes com leitores de tela:** NVDA, JAWS, VoiceOver, TalkBack  
5. **Análise de semântica e alt text:** Image Alt Text Viewer  

Essas ferramentas combinadas fornecem uma boa avaliação da acessibilidade do portal escolhido.

---