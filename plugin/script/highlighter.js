// Módulo de Destaque Visual de Elementos
const AcessiCheckHighlighter = {
  overlayId: 'AcessiCheck-checker-overlay',
  currentHighlight: null,

  // Criar overlay 
  createOverlay() {
    let overlay = document.getElementById(this.overlayId);
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = this.overlayId;
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999999;
      `;
      document.body.appendChild(overlay);
    }
    return overlay;
  },

  // Remover todos os destaques
  removeAllHighlights() {
    const overlay = document.getElementById(this.overlayId);
    if (overlay) {
      overlay.innerHTML = '';
    }
    
    // Remover classes de destaque dos elementos
    const highlighted = document.querySelectorAll('.AcessiCheck-checker-highlighted');
    highlighted.forEach(el => {
      el.classList.remove('AcessiCheck-checker-highlighted');
      el.style.outline = '';
      el.style.outlineOffset = '';
    });

    this.currentHighlight = null;
  },

  // Destacar elemento específico
  highlightElement(selector, severity = 'high', problemInfo = null) {
    try {
      // Remover destaques anteriores
      this.removeAllHighlights();

      // Tentar encontrar o elemento
      let element = null;
      
      // Se for um seletor válido
      if (typeof selector === 'string' && selector !== 'document') {
        try {
          element = document.querySelector(selector);
        } catch (e) {
          console.warn('Seletor inválido:', selector);
        }
      }

      if (!element) {
        // Se não encontrou, mostrar mensagem
        this.showMessage('Elemento não encontrado na página atual');
        return false;
      }

      // Criar overlay
      const overlay = this.createOverlay();

      // Obter posição do elemento
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // Definir cores por severidade
      const colors = {
        'crítico': '#dc2626',
        'alto': '#f59e0b',
        'médio': '#3b82f6',
        'baixo': '#6b7280'
      };
      const color = colors[severity] || colors['alto'];

      // Adicionar outline ao elemento
      element.classList.add('AcessiCheck-checker-highlighted');
      element.style.outline = `3px solid ${color}`;
      element.style.outlineOffset = '2px';

      // Criar marcador visual no overlay
      const marker = document.createElement('div');
      marker.style.cssText = `
        position: absolute;
        top: ${rect.top + scrollTop}px;
        left: ${rect.left + scrollLeft}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        border: 3px solid ${color};
        background-color: ${color}20;
        pointer-events: none;
        box-shadow: 0 0 0 4px ${color}40;
        animation: AcessiCheck-pulse 2s infinite;
      `;

      // Criar label clicável com informações do erro
      const label = document.createElement('div');
      label.style.cssText = `
        position: absolute;
        top: ${rect.top + scrollTop - 30}px;
        left: ${rect.left + scrollLeft}px;
        background-color: ${color};
        color: white;
        padding: 4px 12px;
        border-radius: 4px;
        font-family: Arial, sans-serif;
        font-size: 12px;
        font-weight: bold;
        pointer-events: auto;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        z-index: 1000000;
        transition: transform 0.2s;
      `;
      label.textContent = '⚠️ Clique para ver detalhes';
      
      // Adicionar hover effect
      label.addEventListener('mouseenter', () => {
        label.style.transform = 'scale(1.05)';
      });
      label.addEventListener('mouseleave', () => {
        label.style.transform = 'scale(1)';
      });
      
      // Criar tooltip com informações do erro
      if (problemInfo) {
        label.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showTooltip(problemInfo, rect.left + scrollLeft, rect.top + scrollTop, color);
        });
      }

      overlay.appendChild(marker);
      overlay.appendChild(label);

      // Adicionar animação CSS
      this.addAnimationStyles();

      // Scroll suave até o elemento
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      });

      this.currentHighlight = selector;
      return true;

    } catch (error) {
      console.error('Erro ao destacar elemento:', error);
      this.showMessage('Erro ao localizar elemento');
      return false;
    }
  },

  // Adicionar estilos de animação
  addAnimationStyles() {
    if (!document.getElementById('AcessiCheck-checker-styles')) {
      const style = document.createElement('style');
      style.id = 'AcessiCheck-checker-styles';
      style.textContent = `
        @keyframes AcessiCheck-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.02);
          }
        }
        
        .AcessiCheck-checker-highlighted {
          scroll-margin: 100px;
        }
      `;
      document.head.appendChild(style);
    }
  },

  // Mostrar mensagem temporária
  showMessage(text) {
    const overlay = this.createOverlay();
    
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #1f2937;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1000001;
      pointer-events: auto;
    `;
    message.textContent = text;
    
    overlay.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  },

  // Mostrar tooltip com informações do erro
  showTooltip(problemInfo, x, y, color) {
    // Remover tooltip anterior se existir
    const existingTooltip = document.getElementById('AcessiCheck-checker-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.id = 'AcessiCheck-checker-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      top: ${y + 40}px;
      left: ${x}px;
      max-width: 400px;
      background-color: white;
      color: #1f2937;
      padding: 16px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      z-index: 1000001;
      pointer-events: auto;
      border-left: 4px solid ${color};
    `;
    
    tooltip.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
        <div style="font-weight: bold; font-size: 16px; color: ${color};">
          ${problemInfo.title}
        </div>
        <button id="AcessiCheck-tooltip-close" style="
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #6b7280;
          padding: 0;
          margin-left: 12px;
          line-height: 1;
        " aria-label="Fechar">&times;</button>
      </div>
      
      <div style="margin-bottom: 8px;">
        <strong style="color: #374151;">Categoria:</strong> 
        <span style="color: #6b7280;">${problemInfo.category} > ${problemInfo.subcategory}</span>
      </div>
      
      <div style="margin-bottom: 8px;">
        <strong style="color: #374151;">Severidade:</strong> 
        <span style="
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          background-color: ${color}20;
          color: ${color};
          font-weight: 600;
          text-transform: capitalize;
        ">${problemInfo.severity}</span>
      </div>
      
      <div style="margin-bottom: 12px; line-height: 1.5; color: #4b5563;">
        ${problemInfo.description}
      </div>
      
      <div style="
        background-color: #f3f4f6;
        padding: 12px;
        border-radius: 6px;
        margin-top: 12px;
      ">
        <strong style="color: #047857; display: block; margin-bottom: 4px;">✓ Recomendação:</strong>
        <span style="color: #374151; line-height: 1.5;">${problemInfo.recommendation}</span>
      </div>
      
      ${problemInfo.criteria && problemInfo.criteria.length > 0 ? `
        <div style="margin-top: 12px; font-size: 12px; color: #6b7280;">
          <strong>Critérios:</strong> ${problemInfo.criteria.join(', ')}
        </div>
      ` : ''}
    `;
    
    const overlay = this.createOverlay();
    overlay.appendChild(tooltip);
    
    // Botão de fechar
    const closeBtn = document.getElementById('AcessiCheck-tooltip-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        tooltip.remove();
      });
    }
    
    // Fechar ao clicar fora
    setTimeout(() => {
      document.addEventListener('click', function closeTooltip(e) {
        if (!tooltip.contains(e.target)) {
          tooltip.remove();
          document.removeEventListener('click', closeTooltip);
        }
      });
    }, 100);
  },

  // Destacar múltiplos elementos
  highlightMultiple(problems) {
    this.removeAllHighlights();
    
    const overlay = this.createOverlay();
    let count = 0;

    problems.forEach((problem, index) => {
      try {
        const selector = problem.element;
        if (selector === 'document' || !selector) return;

        const element = document.querySelector(selector);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        const colors = {
          'crítico': '#dc2626',
          'alto': '#f59e0b',
          'médio': '#3b82f6',
          'baixo': '#6b7280'
        };
        const color = colors[problem.severity] || colors['alto'];

        // Adicionar outline
        element.classList.add('AcessiCheck-checker-highlighted');
        element.style.outline = `2px solid ${color}`;
        element.style.outlineOffset = '1px';

        // Criar marcador numerado clicável
        const marker = document.createElement('div');
        marker.style.cssText = `
          position: absolute;
          top: ${rect.top + scrollTop - 12}px;
          left: ${rect.left + scrollLeft - 12}px;
          width: 24px;
          height: 24px;
          background-color: ${color};
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
          font-size: 12px;
          font-weight: bold;
          pointer-events: auto;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          z-index: 1000000;
          transition: transform 0.2s;
        `;
        marker.textContent = index + 1;
        marker.title = 'Clique para ver detalhes do erro';
        
        // Adicionar hover effect
        marker.addEventListener('mouseenter', () => {
          marker.style.transform = 'scale(1.2)';
        });
        marker.addEventListener('mouseleave', () => {
          marker.style.transform = 'scale(1)';
        });
        
        // Adicionar click para mostrar tooltip
        marker.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showTooltip(problem, rect.left + scrollLeft, rect.top + scrollTop, color);
        });

        // Também tornar o elemento clicável
        element.style.cursor = 'pointer';
        element.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.showTooltip(problem, rect.left + scrollLeft, rect.top + scrollTop, color);
        });
        
        overlay.appendChild(marker);
        count++;

      } catch (error) {
        console.warn('Erro ao destacar elemento:', error);
      }
    });

    this.addAnimationStyles();
    
    if (count > 0) {
      this.showMessage(`${count} problema(s) destacado(s) na página`);
    } else {
      this.showMessage('Nenhum elemento pôde ser destacado');
    }
  }
};

// Expor globalmente
window.AcessiCheckHighlighter = AcessiCheckHighlighter;