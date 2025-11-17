// Módulo de Análise de Acessibilidade
const AcessiCheck = {
  problems: [],

  // Função principal de análise
  analyze() {
    this.problems = [];

    // Executar todas as verificações
    this.checkImages();
    this.checkTextContrast();
    this.checkHeadingHierarchy();
    this.checkFormLabels();
    this.checkLinks();
    this.checkButtons();
    this.checkLanguage();
    this.checkTables();
    this.checkVideos();
    this.checkHiddenContent();
    this.checkTabindex();
    this.checkAriaLabels();
    this.checkTouchTargets();
    this.checkAutoplay();

    return this.problems;
  },

  // Adicionar problema à lista
  addProblem(problem) {
    this.problems.push(problem);
  },

  // 1. Verificar imagens sem alt
  checkImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
      const alt = img.getAttribute('alt');
      const role = img.getAttribute('role');
      const ariaHidden = img.getAttribute('aria-hidden');

      // Verificar se é decorativa
      const isDecorative = role === 'presentation' || role === 'none' || ariaHidden === 'true';

      // Se não é decorativa e não tem alt
      if (!isDecorative && (alt === null || alt === undefined)) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Imagens',
          severity: 'crítico',
          title: 'Imagem sem atributo alt',
          description: 'Imagens informativas devem ter atributo alt com descrição breve e significativa do conteúdo.',
          element: this.getElementSelector(img),
          wcagCriteria: ['1.1.1', '2.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Adicione um atributo alt descritivo à imagem. Se a imagem for decorativa, use alt="" ou role="presentation".'
        });
      }

      // Se tem alt vazio mas não é marcada como decorativa
      if (alt === '' && !isDecorative) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Imagens',
          severity: 'alto',
          title: 'Imagem com alt vazio sem marcação decorativa',
          description: 'Imagem possui alt vazio mas não está marcada como decorativa (role="presentation").',
          element: this.getElementSelector(img),
          wcagCriteria: ['1.1.1', '2.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Se a imagem for decorativa, adicione role="presentation". Caso contrário, forneça um alt descritivo.'
        });
      }

      // Verificar imagens em links/botões
      const parentLink = img.closest('a');
      const parentButton = img.closest('button');
      
      if ((parentLink || parentButton) && (!alt || alt.trim() === '')) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Imagens',
          severity: 'crítico',
          title: 'Imagem em link/botão sem descrição da ação',
          description: 'Imagens dentro de links ou botões devem ter alt que descreva a ação (ex: "Pesquisar").',
          element: this.getElementSelector(img),
          wcagCriteria: ['1.1.1', '2.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Adicione um alt que descreva a ação do link/botão, não apenas a imagem.'
        });
      }
    });
  },

  // 2. Verificar contraste de texto (simplificado)
  checkTextContrast() {
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label, li');
    
    textElements.forEach((element) => {
      const style = window.getComputedStyle(element);
      const color = style.color;
      const backgroundColor = style.backgroundColor;
      const fontSize = parseFloat(style.fontSize);
      
      // Verificar se o elemento tem texto visível
      if (element.textContent.trim() === '') return;

      // Calcular contraste (simplificado)
      const contrast = this.calculateContrast(color, backgroundColor);
      
      // Determinar se é texto grande (18pt+ ou 14pt+ bold)
      const isLargeText = fontSize >= 24 || (fontSize >= 18.66 && style.fontWeight >= 700);
      
      // WCAG AA: 4.5:1 para texto normal, 3:1 para texto grande
      const minContrast = isLargeText ? 3 : 4.5;
      
      if (contrast > 0 && contrast < minContrast) {
        this.addProblem({
          category: 'Design',
          subcategory: 'Contraste de cores',
          severity: 'alto',
          title: 'Contraste de texto inadequado',
          description: `O contraste entre o texto e o fundo é ${contrast.toFixed(2)}:1, abaixo do mínimo recomendado de ${minContrast}:1.`,
          element: this.getElementSelector(element),
          wcagCriteria: ['1.4.3'],
          nbrCriteria: ['5.11.3', '5.11.2'],
          recommendation: `Ajuste as cores para atingir pelo menos ${minContrast}:1 de contraste. Use ferramentas como o WebAIM Contrast Checker.`
        });
      }
    });
  },

  // 3. Verificar hierarquia de títulos
  checkHeadingHierarchy() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    headings.forEach((heading) => {
      const currentLevel = parseInt(heading.tagName.substring(1));
      
      // Verificar se pulou níveis
      if (previousLevel > 0 && currentLevel > previousLevel + 1) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Estrutura e Semântica',
          severity: 'médio',
          title: 'Hierarquia de títulos pulou níveis',
          description: `O título ${heading.tagName} aparece após ${previousLevel > 0 ? 'h' + previousLevel : 'nenhum título'}, pulando níveis na hierarquia.`,
          element: this.getElementSelector(heading),
          wcagCriteria: ['1.3.1', '2.2'],
          nbrCriteria: ['5.3.5'],
          recommendation: 'Não pule níveis na hierarquia de títulos. Use h1, h2, h3, etc. em ordem sequencial.'
        });
      }
      
      previousLevel = currentLevel;
    });

    // Verificar se existe h1
    const h1Count = document.querySelectorAll('h1').length;
    if (h1Count === 0) {
      this.addProblem({
        category: 'Desenvolvimento Web',
        subcategory: 'Estrutura e Semântica',
        severity: 'alto',
        title: 'Página sem título h1',
        description: 'A página não possui um título principal (h1).',
        element: 'document',
        wcagCriteria: ['1.3.1', '2.4.6'],
        nbrCriteria: ['5.3.5'],
        recommendation: 'Adicione um título h1 que descreva o conteúdo principal da página.'
      });
    } else if (h1Count > 1) {
      this.addProblem({
        category: 'Desenvolvimento Web',
        subcategory: 'Estrutura e Semântica',
        severity: 'médio',
        title: 'Múltiplos h1 na página',
        description: `A página possui ${h1Count} títulos h1. Recomenda-se apenas um h1 por página.`,
        element: 'document',
        wcagCriteria: ['1.3.1'],
        nbrCriteria: ['5.3.5'],
        recommendation: 'Use apenas um h1 por página para o título principal. Use h2-h6 para subtítulos.'
      });
    }
  },

  // 4. Verificar labels em formulários
  checkFormLabels() {
    const inputs = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), select, textarea');
    
    inputs.forEach((input) => {
      const id = input.getAttribute('id');
      const ariaLabel = input.getAttribute('aria-label');
      const ariaLabelledby = input.getAttribute('aria-labelledby');
      const title = input.getAttribute('title');
      const placeholder = input.getAttribute('placeholder');
      
      // Verificar se tem label associado
      let hasLabel = false;
      
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) hasLabel = true;
      }
      
      // Verificar se está dentro de um label
      if (input.closest('label')) hasLabel = true;
      
      // Verificar ARIA
      if (ariaLabel || ariaLabelledby) hasLabel = true;
      
      if (!hasLabel) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Formulários',
          severity: 'crítico',
          title: 'Campo de formulário sem label',
          description: 'Campo de entrada não possui label associado, dificultando a identificação por leitores de tela.',
          element: this.getElementSelector(input),
          wcagCriteria: ['1.3.1', '3.3.2', '4.1.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Associe um <label> ao campo usando o atributo "for" ou envolva o campo com <label>. Alternativamente, use aria-label.'
        });
      }
      
      // Verificar se usa apenas placeholder como label
      if (!hasLabel && placeholder && !title) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Formulários',
          severity: 'alto',
          title: 'Campo usando apenas placeholder como label',
          description: 'O placeholder não substitui um label adequado. Leitores de tela podem não anunciá-lo corretamente.',
          element: this.getElementSelector(input),
          wcagCriteria: ['3.3.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Adicione um <label> visível ou use aria-label além do placeholder.'
        });
      }

      // Verificar campos obrigatórios
      if (input.hasAttribute('required')) {
        const labelElement = id ? document.querySelector(`label[for="${id}"]`) : input.closest('label');
        const ariaRequired = input.getAttribute('aria-required');
        
        if (labelElement && !labelElement.textContent.includes('*') && !labelElement.textContent.includes('obrigatório') && ariaRequired !== 'true') {
          this.addProblem({
            category: 'Desenvolvimento Web',
            subcategory: 'Formulários',
            severity: 'médio',
            title: 'Campo obrigatório sem indicação visual/textual',
            description: 'Campo obrigatório deve ser identificado textual e visualmente (ex: "*Campo obrigatório").',
            element: this.getElementSelector(input),
            wcagCriteria: ['3.3.2'],
            nbrCriteria: ['17225:2025'],
            recommendation: 'Adicione indicação visual (asterisco) e textual ("obrigatório") ao label, ou use aria-required="true".'
          });
        }
      }
    });
  },

  // 5. Verificar links
  checkLinks() {
    const links = document.querySelectorAll('a');
    
    links.forEach((link) => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim();
      const ariaLabel = link.getAttribute('aria-label');
      const title = link.getAttribute('title');
      const hasImage = link.querySelector('img');
      
      // Link sem href
      if (!href || href === '#' || href === '') {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Navegação e Controles',
          severity: 'alto',
          title: 'Link sem href válido',
          description: 'Link não possui um href válido. Use <button> para ações que não navegam.',
          element: this.getElementSelector(link),
          wcagCriteria: ['1.3.1', '4.1.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Adicione um href válido ou use <button> se for uma ação JavaScript.'
        });
      }
      
      // Link sem texto
      if (!text && !ariaLabel && !title && !hasImage) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Navegação e Controles',
          severity: 'crítico',
          title: 'Link sem texto descritivo',
          description: 'Link não possui texto, aria-label, title ou imagem com alt.',
          element: this.getElementSelector(link),
          wcagCriteria: ['2.4.4', '4.1.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Adicione texto descritivo ao link ou use aria-label para descrever o destino.'
        });
      }
      
      // Link com texto genérico
      const genericTexts = ['clique aqui', 'saiba mais', 'leia mais', 'aqui', 'mais'];
      if (genericTexts.includes(text.toLowerCase()) && !ariaLabel) {
        this.addProblem({
          category: 'Conteúdo',
          subcategory: 'Links, botões e microtextos',
          severity: 'médio',
          title: 'Link com texto genérico',
          description: `Link usa texto genérico "${text}" que não descreve o destino.`,
          element: this.getElementSelector(link),
          wcagCriteria: ['2.4.4', '2.4.6'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Use texto descritivo que explique o destino do link (ex: "Acessar relatório de vendas").'
        });
      }

      // Link que abre em nova aba sem aviso
      const target = link.getAttribute('target');
      if (target === '_blank' && !ariaLabel && !text.includes('nova aba') && !text.includes('nova janela')) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Navegação e Controles',
          severity: 'baixo',
          title: 'Link abre em nova aba sem aviso',
          description: 'Link abre em nova aba/janela mas não informa o usuário.',
          element: this.getElementSelector(link),
          wcagCriteria: ['3.2.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Adicione indicação visual/textual de que o link abre em nova aba (ex: ícone ou texto).'
        });
      }
    });
  },

  // 6. Verificar botões
  checkButtons() {
    const buttons = document.querySelectorAll('button, [role="button"]');
    
    buttons.forEach((button) => {
      const text = button.textContent.trim();
      const ariaLabel = button.getAttribute('aria-label');
      const title = button.getAttribute('title');
      const hasImage = button.querySelector('img');
      const hasSvg = button.querySelector('svg');
      
      // Botão sem texto
      if (!text && !ariaLabel && !title) {
        // Se tem imagem ou SVG, verificar se tem alt/aria-label
        if (hasImage || hasSvg) {
          const img = button.querySelector('img');
          if (img && !img.getAttribute('alt')) {
            this.addProblem({
              category: 'Desenvolvimento Web',
              subcategory: 'Navegação e Controles',
              severity: 'crítico',
              title: 'Botão sem texto descritivo',
              description: 'Botão contém apenas imagem/ícone sem texto alternativo.',
              element: this.getElementSelector(button),
              wcagCriteria: ['1.1.1', '4.1.2'],
              nbrCriteria: ['17225:2025'],
              recommendation: 'Adicione aria-label ao botão ou alt à imagem descrevendo a ação (ex: "Enviar formulário").'
            });
          }
        } else {
          this.addProblem({
            category: 'Desenvolvimento Web',
            subcategory: 'Navegação e Controles',
            severity: 'crítico',
            title: 'Botão sem texto descritivo',
            description: 'Botão não possui texto, aria-label ou title.',
            element: this.getElementSelector(button),
            wcagCriteria: ['4.1.2'],
            nbrCriteria: ['17225:2025'],
            recommendation: 'Adicione texto descritivo ao botão ou use aria-label para descrever a ação.'
          });
        }
      }
    });

    // Verificar divs com onclick (deveria ser button)
    const clickableDivs = document.querySelectorAll('div[onclick], span[onclick]');
    clickableDivs.forEach((div) => {
      const role = div.getAttribute('role');
      if (role !== 'button') {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Estrutura e Semântica',
          severity: 'alto',
          title: 'Elemento clicável não semântico',
          description: 'Elemento div/span com onclick deveria ser um <button> ou ter role="button".',
          element: this.getElementSelector(div),
          wcagCriteria: ['4.1.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Use <button> para elementos clicáveis ou adicione role="button" e suporte a teclado.'
        });
      }
    });
  },

  // 7. Verificar idioma da página
  checkLanguage() {
    const html = document.documentElement;
    const lang = html.getAttribute('lang');
    
    if (!lang || lang.trim() === '') {
      this.addProblem({
        category: 'Desenvolvimento Web',
        subcategory: 'Estrutura e Semântica',
        severity: 'alto',
        title: 'Página sem atributo lang',
        description: 'O elemento <html> não possui atributo lang definindo o idioma da página.',
        element: '<html>',
        wcagCriteria: ['3.1.1'],
        nbrCriteria: ['17225:2025'],
        recommendation: 'Adicione o atributo lang ao elemento <html> (ex: lang="pt-BR").'
      });
    }
  },

  // 8. Verificar tabelas
  checkTables() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach((table) => {
      // Verificar caption
      const caption = table.querySelector('caption');
      if (!caption) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Estrutura e Semântica',
          severity: 'médio',
          title: 'Tabela sem caption',
          description: 'Tabelas devem incluir <caption> para descrever seu conteúdo.',
          element: this.getElementSelector(table),
          wcagCriteria: ['1.3.1'],
          nbrCriteria: ['5.6.3', '5.6.5'],
          recommendation: 'Adicione um <caption> descrevendo o propósito da tabela.'
        });
      }
      
      // Verificar headers (th)
      const headers = table.querySelectorAll('th');
      if (headers.length === 0) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Estrutura e Semântica',
          severity: 'alto',
          title: 'Tabela sem cabeçalhos (th)',
          description: 'Tabelas devem usar <th> para identificar cabeçalhos de colunas/linhas.',
          element: this.getElementSelector(table),
          wcagCriteria: ['1.3.1'],
          nbrCriteria: ['5.6.3', '5.6.5'],
          recommendation: 'Use <th scope="col"> para cabeçalhos de coluna e <th scope="row"> para cabeçalhos de linha.'
        });
      } else {
        // Verificar se th tem scope
        headers.forEach((th) => {
          const scope = th.getAttribute('scope');
          if (!scope) {
            this.addProblem({
              category: 'Desenvolvimento Web',
              subcategory: 'Estrutura e Semântica',
              severity: 'médio',
              title: 'Cabeçalho de tabela sem scope',
              description: 'Elementos <th> devem ter atributo scope="col" ou scope="row".',
              element: this.getElementSelector(th),
              wcagCriteria: ['1.3.1'],
              nbrCriteria: ['5.6.3'],
              recommendation: 'Adicione scope="col" para cabeçalhos de coluna ou scope="row" para cabeçalhos de linha.'
            });
          }
        });
      }
    });
  },

  // 9. Verificar vídeos
  checkVideos() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach((video) => {
      // Verificar autoplay
      if (video.hasAttribute('autoplay')) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Vídeos e Mídia',
          severity: 'alto',
          title: 'Vídeo com autoplay',
          description: 'Vídeos não devem iniciar automaticamente. Ofereça controles de pausa, stop e volume.',
          element: this.getElementSelector(video),
          wcagCriteria: ['1.4.2', '2.2.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Remova o atributo autoplay e forneça controles acessíveis para o usuário.'
        });
      }
      
      // Verificar controles
      if (!video.hasAttribute('controls')) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Vídeos e Mídia',
          severity: 'alto',
          title: 'Vídeo sem controles',
          description: 'Vídeos devem ter controles acessíveis (play, pause, volume).',
          element: this.getElementSelector(video),
          wcagCriteria: ['2.1.1'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Adicione o atributo controls ao vídeo ou forneça controles personalizados acessíveis.'
        });
      }
      
      // Verificar legendas (track)
      const tracks = video.querySelectorAll('track[kind="captions"], track[kind="subtitles"]');
      if (tracks.length === 0) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Vídeos e Mídia',
          severity: 'crítico',
          title: 'Vídeo sem legendas',
          description: 'Vídeos com áudio devem possuir legendas sincronizadas.',
          element: this.getElementSelector(video),
          wcagCriteria: ['1.2.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Adicione <track kind="captions"> com arquivo de legendas em formato WebVTT.'
        });
      }
    });

    // Verificar áudio
    const audios = document.querySelectorAll('audio');
    audios.forEach((audio) => {
      if (audio.hasAttribute('autoplay')) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Vídeos e Mídia',
          severity: 'alto',
          title: 'Áudio com autoplay',
          description: 'Áudios não devem iniciar automaticamente.',
          element: this.getElementSelector(audio),
          wcagCriteria: ['1.4.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Remova o atributo autoplay e forneça controles para o usuário.'
        });
      }
    });
  },

  // 10. Verificar conteúdo oculto
  checkHiddenContent() {
    const hiddenElements = document.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"]');
    
    if (hiddenElements.length > 5) {
      this.addProblem({
        category: 'Design',
        subcategory: 'Aparência',
        severity: 'baixo',
        title: 'Múltiplos elementos com display:none/visibility:hidden',
        description: `Encontrados ${hiddenElements.length} elementos ocultos. Verifique se o conteúdo importante não está sendo ocultado inadequadamente.`,
        element: 'document',
        wcagCriteria: ['1.3.1', '2.4.3', '4.1.2'],
        nbrCriteria: ['17225:2025'],
        recommendation: 'Revise elementos ocultos. Use técnicas adequadas para ocultar conteúdo apenas visualmente se necessário (clip, off-screen).'
      });
    }
  },

  // 11. Verificar tabindex
  checkTabindex() {
    const tabindexElements = document.querySelectorAll('[tabindex]');
    
    tabindexElements.forEach((element) => {
      const tabindex = parseInt(element.getAttribute('tabindex'));
      
      if (tabindex > 0) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Teclado e Interação',
          severity: 'médio',
          title: 'Tabindex positivo detectado',
          description: 'Uso de tabindex positivo pode quebrar a ordem natural de navegação por teclado.',
          element: this.getElementSelector(element),
          wcagCriteria: ['2.4.3'],
          nbrCriteria: ['5.13.6', '5.10.2'],
          recommendation: 'Evite tabindex positivo. Use tabindex="0" para incluir elementos na ordem natural ou tabindex="-1" para remover.'
        });
      }
    });
  },

  // 12. Verificar ARIA labels
  checkAriaLabels() {
    // Verificar elementos com role mas sem aria-label
    const roleElements = document.querySelectorAll('[role]');
    
    roleElements.forEach((element) => {
      const role = element.getAttribute('role');
      const ariaLabel = element.getAttribute('aria-label');
      const ariaLabelledby = element.getAttribute('aria-labelledby');
      const text = element.textContent.trim();
      
      // Roles que geralmente precisam de label
      const rolesNeedingLabel = ['button', 'link', 'menuitem', 'tab', 'checkbox', 'radio'];
      
      if (rolesNeedingLabel.includes(role) && !ariaLabel && !ariaLabelledby && !text) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Estrutura e Semântica',
          severity: 'alto',
          title: `Elemento com role="${role}" sem label`,
          description: 'Elemento com role ARIA não possui aria-label, aria-labelledby ou texto.',
          element: this.getElementSelector(element),
          wcagCriteria: ['4.1.2'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Adicione aria-label, aria-labelledby ou texto descritivo ao elemento.'
        });
      }
    });
  },

  // 13. Verificar tamanho de alvos de toque
  checkTouchTargets() {
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input[type="checkbox"], input[type="radio"]');
    
    interactiveElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // WCAG 2.5.8: Alvo mínimo de 24x24 pixels
      if (width > 0 && height > 0 && (width < 24 || height < 24)) {
        this.addProblem({
          category: 'Desenvolvimento Web',
          subcategory: 'Dispositivos Móveis e Toque',
          severity: 'médio',
          title: 'Área de toque menor que o recomendado',
          description: `Elemento interativo tem ${Math.round(width)}x${Math.round(height)}px. O mínimo recomendado é 24x24px.`,
          element: this.getElementSelector(element),
          wcagCriteria: ['2.5.8'],
          nbrCriteria: ['17225:2025'],
          recommendation: 'Aumente o tamanho ou padding do elemento para pelo menos 24x24 pixels.'
        });
      }
    });
  },

  // 14. Verificar autoplay em geral
  checkAutoplay() {
    const autoplayElements = document.querySelectorAll('[autoplay]');
    
    if (autoplayElements.length > 0) {
      autoplayElements.forEach((element) => {
        if (element.tagName !== 'VIDEO' && element.tagName !== 'AUDIO') {
          this.addProblem({
            category: 'Design',
            subcategory: 'Animação',
            severity: 'médio',
            title: 'Elemento com autoplay',
            description: 'Elemento possui atributo autoplay que pode iniciar conteúdo automaticamente.',
            element: this.getElementSelector(element),
            wcagCriteria: ['2.2.2'],
            nbrCriteria: ['17225:2025'],
            recommendation: 'Remova autoplay e forneça controles para o usuário iniciar o conteúdo.'
          });
        }
      });
    }
  },

  // Função auxiliar: Calcular contraste (simplificado)
  calculateContrast(color1, color2) {
    try {
      const rgb1 = this.parseColor(color1);
      const rgb2 = this.parseColor(color2);
      
      if (!rgb1 || !rgb2) return 0;
      
      const l1 = this.getLuminance(rgb1);
      const l2 = this.getLuminance(rgb2);
      
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      
      return (lighter + 0.05) / (darker + 0.05);
    } catch (e) {
      return 0;
    }
  },

  parseColor(color) {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return null;
    return {
      r: parseInt(rgb[0]),
      g: parseInt(rgb[1]),
      b: parseInt(rgb[2])
    };
  },

  getLuminance(rgb) {
    const rsRGB = rgb.r / 255;
    const gsRGB = rgb.g / 255;
    const bsRGB = rgb.b / 255;

    const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  },

  // Função auxiliar: Obter seletor CSS do elemento
  getElementSelector(element) {
    if (typeof element === 'string') return element;
    
    try {
      if (element.id) {
        return `#${element.id}`;
      }
      
      let selector = element.tagName.toLowerCase();
      
      if (element.className && typeof element.className === 'string') {
        const classes = element.className.trim().split(/\s+/).slice(0, 2);
        selector += classes.map(c => `.${c}`).join('');
      }
      
      // Adicionar posição se necessário
      const parent = element.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(e => e.tagName === element.tagName);
        if (siblings.length > 1) {
          const index = siblings.indexOf(element) + 1;
          selector += `:nth-of-type(${index})`;
        }
      }
      
      return selector;
    } catch (e) {
      return element.tagName ? element.tagName.toLowerCase() : 'unknown';
    }
  }
};
