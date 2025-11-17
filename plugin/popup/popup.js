// Elementos do DOM
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const problemsList = document.getElementById('problemsList');
const noProblems = document.getElementById('noProblems');

// Armazenar problemas e tab ID
let currentProblems = [];
let currentTabId = null;

// Contadores
const criticalCount = document.getElementById('criticalCount');
const highCount = document.getElementById('highCount');
const mediumCount = document.getElementById('mediumCount');
const lowCount = document.getElementById('lowCount');

// Event Listener para o botão de análise
analyzeBtn.addEventListener('click', async () => {
  try {
    // Mostrar loading
    loadingSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    analyzeBtn.disabled = true;

    // Obter a aba ativa
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    currentTabId = tab.id;

    // Injetar e executar o content script
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['scripts/analyzer.js', 'content/content.js']
    });

    // Processar resultados
    if (results && results[0] && results[0].result) {
      displayResults(results[0].result);
    } else {
      throw new Error('Nenhum resultado retornado');
    }

  } catch (error) {
    console.error('Erro ao analisar página:', error);
    alert('Erro ao analisar a página. Verifique se a página permite extensões.');
  } finally {
    loadingSection.classList.add('hidden');
    analyzeBtn.disabled = false;
  }
});

// Função para agrupar problemas idênticos
function groupIdenticalProblems(problems) {
  const grouped = {};
  
  problems.forEach(problem => {
    // Criar chave única baseada no tipo de problema (não no elemento específico)
    const key = `${problem.category}|${problem.subcategory}|${problem.title}`;
    
    if (!grouped[key]) {
      grouped[key] = {
        ...problem,
        occurrences: [],
        count: 0
      };
    }
    
    // Adicionar esta ocorrência
    grouped[key].occurrences.push({
      element: problem.element,
      description: problem.description
    });
    grouped[key].count++;
  });
  
  return Object.values(grouped);
}

// Função para exibir resultados
function displayResults(problems) {
  // Salvar problemas originais
  currentProblems = problems;
  
  // Agrupar problemas idênticos
  const groupedProblems = groupIdenticalProblems(problems);
  
  // Limpar resultados anteriores
  problemsList.innerHTML = '';
  
  // Contar problemas por severidade (total de ocorrências)
  const counts = {
    crítico: 0,
    alto: 0,
    médio: 0,
    baixo: 0
  };

  problems.forEach(problem => {
    counts[problem.severity]++;
  });

  // Atualizar contadores
  criticalCount.textContent = counts.crítico;
  highCount.textContent = counts.alto;
  mediumCount.textContent = counts.médio;
  lowCount.textContent = counts.baixo;

  // Mostrar seção de resultados
  resultsSection.classList.remove('hidden');

  // Se não houver problemas
  if (problems.length === 0) {
    noProblems.classList.remove('hidden');
    document.querySelector('.problems-container').classList.add('hidden');
    return;
  }

  noProblems.classList.add('hidden');
  document.querySelector('.problems-container').classList.remove('hidden');

  // Agrupar por categoria
  const byCategory = groupByCategory(groupedProblems);

  // Renderizar problemas agrupados
  Object.keys(byCategory).forEach(category => {
    const categoryProblems = byCategory[category];
    
    categoryProblems.forEach((problem, index) => {
      const problemElement = createProblemElement(problem, index);
      problemsList.appendChild(problemElement);
    });
  });
}

// Função para agrupar problemas por categoria
function groupByCategory(problems) {
  return problems.reduce((acc, problem) => {
    if (!acc[problem.category]) {
      acc[problem.category] = [];
    }
    acc[problem.category].push(problem);
    return acc;
  }, {});
}

// Função para criar elemento de problema
function createProblemElement(problem, index) {
  const item = document.createElement('div');
  item.className = 'problem-item';

  const header = document.createElement('button');
  header.className = 'problem-header';
  header.setAttribute('aria-expanded', 'false');
  header.setAttribute('aria-controls', `problem-details-${index}`);

  const badge = document.createElement('div');
  badge.className = `severity-badge ${problem.severity}`;
  badge.setAttribute('aria-label', `Severidade: ${problem.severity}`);

  const info = document.createElement('div');
  info.className = 'problem-info';

  const titleContainer = document.createElement('div');
  titleContainer.style.display = 'flex';
  titleContainer.style.alignItems = 'center';
  titleContainer.style.gap = '8px';

  const title = document.createElement('div');
  title.className = 'problem-title';
  title.textContent = problem.title;

  // Badge de contador de ocorrências
  if (problem.count > 1) {
    const countBadge = document.createElement('span');
    countBadge.className = 'occurrence-badge';
    countBadge.textContent = `${problem.count}x`;
    countBadge.setAttribute('aria-label', `${problem.count} ocorrências`);
    titleContainer.appendChild(title);
    titleContainer.appendChild(countBadge);
  } else {
    titleContainer.appendChild(title);
  }

  const meta = document.createElement('div');
  meta.className = 'problem-meta';

  const category = document.createElement('span');
  category.className = 'problem-category';
  category.textContent = `${problem.category} › ${problem.subcategory}`;

  meta.appendChild(category);
  info.appendChild(titleContainer);
  info.appendChild(meta);

  header.appendChild(badge);
  header.appendChild(info);

  const details = document.createElement('div');
  details.className = 'problem-details';
  details.id = `problem-details-${index}`;

  const description = document.createElement('p');
  description.className = 'problem-description';
  description.textContent = problem.description;

  // Mostrar lista de elementos afetados se houver múltiplas ocorrências
  if (problem.count > 1) {
    const occurrencesTitle = document.createElement('div');
    occurrencesTitle.className = 'occurrences-title';
    occurrencesTitle.innerHTML = `<strong>Elementos afetados (${problem.count}):</strong>`;
    
    const occurrencesList = document.createElement('div');
    occurrencesList.className = 'occurrences-list';
    
    problem.occurrences.slice(0, 5).forEach((occurrence, idx) => {
      const occItem = document.createElement('div');
      occItem.className = 'occurrence-item';
      occItem.textContent = `${idx + 1}. ${occurrence.element}`;
      occurrencesList.appendChild(occItem);
    });
    
    if (problem.count > 5) {
      const moreText = document.createElement('div');
      moreText.className = 'occurrence-item';
      moreText.style.fontStyle = 'italic';
      moreText.style.color = '#6b7280';
      moreText.textContent = `... e mais ${problem.count - 5} elemento(s)`;
      occurrencesList.appendChild(moreText);
    }
    
    details.appendChild(description);
    details.appendChild(occurrencesTitle);
    details.appendChild(occurrencesList);
  } else {
    const element = document.createElement('div');
    element.className = 'problem-element';
    element.textContent = problem.element;
    
    details.appendChild(description);
    details.appendChild(element);
  }

  const criteria = document.createElement('div');
  criteria.className = 'problem-criteria';
  criteria.innerHTML = '<strong>Critérios WCAG/NBR:</strong>';

  const criteriaTags = document.createElement('div');
  criteriaTags.className = 'criteria-tags';

  problem.wcagCriteria.forEach(criterion => {
    const tag = document.createElement('span');
    tag.className = 'criteria-tag';
    tag.textContent = `WCAG ${criterion}`;
    criteriaTags.appendChild(tag);
  });

  if (problem.nbrCriteria && problem.nbrCriteria.length > 0) {
    problem.nbrCriteria.forEach(criterion => {
      const tag = document.createElement('span');
      tag.className = 'criteria-tag';
      tag.textContent = `NBR ${criterion}`;
      criteriaTags.appendChild(tag);
    });
  }

  criteria.appendChild(criteriaTags);

  const recommendation = document.createElement('div');
  recommendation.className = 'problem-recommendation';
  recommendation.innerHTML = `<strong>Recomendação:</strong> ${problem.recommendation}`;

  // Botão de localizar elemento(s)
  const locateButton = document.createElement('button');
  locateButton.className = 'locate-button';
  
  if (problem.count > 1) {
    locateButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="5" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="11" cy="11" r="3" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="5" cy="5" r="1" fill="currentColor"/>
        <circle cx="11" cy="11" r="1" fill="currentColor"/>
      </svg>
      <span>Destacar Todas (${problem.count})</span>
    `;
    locateButton.setAttribute('aria-label', `Destacar todas as ${problem.count} ocorrências de ${problem.title} na página`);
  } else {
    locateButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2"/>
        <circle cx="8" cy="8" r="2" fill="currentColor"/>
      </svg>
      <span>Localizar na Página</span>
    `;
    locateButton.setAttribute('aria-label', `Localizar ${problem.title} na página`);
  }
  
  locateButton.addEventListener('click', async (e) => {
    e.stopPropagation();
    await highlightAllOccurrences(problem);
  });

  details.appendChild(criteria);
  details.appendChild(recommendation);
  details.appendChild(locateButton);

  item.appendChild(header);
  item.appendChild(details);

  // Toggle de expansão
  header.addEventListener('click', () => {
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    header.setAttribute('aria-expanded', !isExpanded);
    details.classList.toggle('expanded');
  });

  // Click no item inteiro para destacar
  item.addEventListener('click', async (e) => {
    if (e.target === item || e.target === header || e.target.closest('.problem-header')) {
      await highlightAllOccurrences(problem);
    }
  });

  return item;
}

// Função para destacar todas as ocorrências de um problema
async function highlightAllOccurrences(problem) {
  if (!currentTabId) return;
  
  try {
    // Injetar o highlighter se ainda não foi injetado
    await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      files: ['scripts/highlighter.js']
    });
    
    if (problem.count > 1) {
      // Destacar múltiplas ocorrências
      await chrome.scripting.executeScript({
        target: { tabId: currentTabId },
        func: (occurrences, severity, problemTitle) => {
          if (window.A11yHighlighter) {
            // Criar array de problemas para o highlighter
            const problems = occurrences.map((occ, index) => ({
              element: occ.element,
              severity: severity,
              title: problemTitle,
              description: occ.description,
              index: index
            }));
            
            window.A11yHighlighter.highlightMultiple(problems);
          }
        },
        args: [problem.occurrences, problem.severity, problem.title]
      });
    } else {
      // Destacar única ocorrência
      await chrome.scripting.executeScript({
        target: { tabId: currentTabId },
        func: (selector, severity, problemInfo) => {
          if (window.A11yHighlighter) {
            window.A11yHighlighter.highlightElement(selector, severity, problemInfo);
          }
        },
        args: [problem.element, problem.severity, problem]
      });
    }
    
  } catch (error) {
    console.error('Erro ao destacar elemento:', error);
    alert('Erro ao localizar elementos na página');
  }
}
