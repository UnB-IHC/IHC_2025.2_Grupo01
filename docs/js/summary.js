const checklistsBase = [
    { page: "design", file: "design.md" },
    { page: "devweb", file: "devweb.md" },
    { page: "conteudo", file: "conteudo.md" },
    { page: "gestaodeprojetos", file: "gestaodeprojetos.md" }
];

const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
const repoPath = isLocal ? '' : '/IHC_2025.2_Grupo01';

const siteChecklists = checklistsBase.map(item => {
    return {
        path: `${repoPath}/${item.page}/`,
        fetchPath: `../${item.page}/`
    };
});

const corNA = '#9E9E9E'

document.addEventListener('DOMContentLoaded', () => {
    const doughnutContainer = document.querySelector('.doughnut-chart-container');
    const barContainer = document.querySelector('.bar-chart-container');

    if (!doughnutContainer || !barContainer) {
        return;
    }

    setLoadingMessage(doughnutContainer, barContainer, "Carregando dados dos checklists...");

    processChecklists(doughnutContainer, barContainer);
});

function setLoadingMessage(doughnutContainer, barContainer, message) {
    const loadingHTML = `<p style="text-align: center; padding: 20px;">${message}</p>`;
    if (doughnutContainer) doughnutContainer.innerHTML = loadingHTML;
    if (barContainer) barContainer.innerHTML = loadingHTML;
}

async function processChecklists(doughnutContainer, barContainer) {
    
    const labels = [];
    const originalData = [];
    const conformePercentData = [];
    const naoConformePercentData = [];
    const naPercentData = [];
    let grandTotalConforme = 0;
    let grandTotalNaoConforme = 0;
    let grandTotalNA = 0;
    let grandTotalOverall = 0;

    try {
        const fetchPromises = siteChecklists.map(page => 
            fetch(page.fetchPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Não foi possível encontrar a página: ${page.fetchPath}`);
                    }
                    return response.text();
                })
                .then(htmlContent => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlContent, 'text/html');
                    
                    const article = doc.querySelector('article');
                    const totalItems = article ? article.querySelectorAll('input[type="checkbox"]').length : 0;
                    
                    const titleEl = doc.querySelector('h1');
                    const pageTitle = titleEl ? titleEl.textContent.trim() : page.path;
                    
                    return {
                        path: page.path,
                        title: pageTitle,
                        totalItems: totalItems
                    };
                })
        );

        const checklists = await Promise.all(fetchPromises);

        checklists.forEach(page => {
            const storageKey = 'checklistProgress_' + page.path; 
            const savedData = JSON.parse(localStorage.getItem(storageKey));

            let conforme = 0;
            let naoConforme = 0;
            let na = 0;
            const total = page.totalItems;

            if (savedData && savedData.title === page.title) {
                conforme = savedData.conforme;
                naoConforme = savedData.nao_conforme;
                na = savedData.na;
            } else {

                naoConforme = total;
            }

            grandTotalConforme += conforme;
            grandTotalNaoConforme += naoConforme;
            grandTotalNA += na;
            grandTotalOverall += total;
            labels.push(page.title);
            originalData.push({ conforme: conforme, nao_conforme: naoConforme, na: na, total: total });
            const conformePercent = (total > 0) ? (conforme / total) * 100 : 0;
            const naoConformePercent = (total > 0) ? (naoConforme / total) * 100 : 0;
            const naPercent = (total > 0) ? (na / total) * 100 : 0;
            conformePercentData.push(conformePercent);
            naoConformePercentData.push(naoConformePercent);
            naPercentData.push(naPercent);
        });

        doughnutContainer.innerHTML = '<canvas id="summary-doughnut-chart"></canvas>';
        barContainer.innerHTML = '<canvas id="summary-chart-100"></canvas>';
        const ctxDoughnut = doughnutContainer.querySelector('canvas').getContext('2d');
        const ctx100 = barContainer.querySelector('canvas').getContext('2d');


        drawDoughnutChart(ctxDoughnut, grandTotalConforme, grandTotalNaoConforme, grandTotalNA, grandTotalOverall, corNA);

        const chartHeight = (labels.length * 50) + 80;
        document.querySelector('.bar-chart-container').style.height = `${chartHeight}px`;
        draw100Chart(ctx100, labels, conformePercentData, naoConformePercentData, naPercentData, originalData, corNA);
        barContainer.style.height = `${chartHeight}px`;

    } catch (error) {
        console.error("Erro ao processar checklists:", error);
        setLoadingMessage(doughnutContainer, barContainer, "Erro ao carregar dados. Verifique o console.");
    }
}

function drawDoughnutChart(ctx, conforme, naoConforme, na, totalItensSite, corNA) {
    const totalAplicavel = conforme + naoConforme;
    const percentage = (totalAplicavel > 0) ? (conforme / totalAplicavel) * 100 : 0;

    const totalNaoConformeGrafico = totalItensSite - conforme - na;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Conforme', 'Não Conforme', 'Não Aplicável'],
            datasets: [{
                data: [conforme, totalNaoConformeGrafico, na],
                backgroundColor: ['#4CAF50', '#F57C00', corNA],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                title: {
                    display: true,
                    text: `Total: ${percentage.toFixed(1)}% Concluído (dos itens aplicáveis)`,
                    font: { size: 18 }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            return `${label}: ${value} itens`;
                        }
                    }
                }
            }
        }
    });
}

function draw100Chart(ctx, labels, conformeData, naoConformeData, naData, originalData, corNA) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'Conforme', data: conformeData, backgroundColor: '#4CAF50' },
                { label: 'Não Conforme', data: naoConformeData, backgroundColor: '#F57C00' },
                { label: 'Não Aplicável', data: naData, backgroundColor: corNA }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true, min: 0, max: 100, title: { display: true, text: 'Progresso (%)' } },
                y: { stacked: true }
            },
            plugins: {
                title: { display: false },
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const percentage = context.raw.toFixed(1);
                            const i = context.dataIndex;
                            const original = originalData[i];
                            
                            let count;
                            if (label === 'Conforme') {
                                count = original.conforme;
                            } else if (label === 'Não Conforme') {
                                count = original.nao_conforme;
                            } else {
                                count = original.na;
                            }
                            
                            return `${label}: ${percentage}% (${count}/${original.total} itens)`;
                        }
                    }
                }
            }
        }
    });
}