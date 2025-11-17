const checklistsBase = [
    { page: "design", title: "Design" },
    { page: "devweb", title: "Desenvolvimento Web" },
    { page: "conteudo", title: "Conteúdo e Redação" },
    { page: "gestaodeprojetos", title: "Gestão de Projetos" }
];

document.addEventListener('DOMContentLoaded', () => {
    const doughnutContainer = document.querySelector('.doughnut-chart-container');
    const barContainer = document.querySelector('.bar-chart-container');
    if (!doughnutContainer || !barContainer) return;

    renderSummaryCharts(doughnutContainer, barContainer);
});

function renderSummaryCharts(doughnutContainer, barContainer) {
    const labels = [];
    const conformePercent = [];
    const naoConformePercent = [];
    const pendentePercent = [];
    const naPercent = [];
    const originalData = [];

    let totalConforme = 0, totalNaoConforme = 0, totalPendente = 0, totalNA = 0;

    checklistsBase.forEach(item => {
        const storageKey = `checklistProgress_${item.page}`;
        const saved = JSON.parse(localStorage.getItem(storageKey)) || {};
        const total = saved.total || 0;
        const conforme = saved.conforme || 0;
        const naoConforme = saved.naoConforme || 0;
        const naoAplicavel = saved.naoAplicavel || 0;
        const pendente = total - (conforme + naoConforme + naoAplicavel);

        totalConforme += conforme;
        totalNaoConforme += naoConforme;
        totalPendente += pendente;
        totalNA += naoAplicavel;

        labels.push(item.title);
        originalData.push({ conforme, naoConforme, pendente, na: naoAplicavel, total });

        conformePercent.push(total ? (conforme / total) * 100 : 0);
        naoConformePercent.push(total ? (naoConforme / total) * 100 : 0);
        pendentePercent.push(total ? (pendente / total) * 100 : 0);
        naPercent.push(total ? (naoAplicavel / total) * 100 : 0);
    });

    const chartLabels = ['Conforme', 'Não conforme', 'Não aplicável', 'Nenhum item selecionado'];

    doughnutContainer.innerHTML = '<canvas id="summary-doughnut-chart"></canvas>';
    const ctxDoughnut = doughnutContainer.querySelector('canvas').getContext('2d');
    new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: chartLabels,
            datasets: [{
                data: [totalConforme, totalNaoConforme, totalNA, totalPendente],
                backgroundColor: ['#4CAF50', '#F44336', '#FFB74D', '#9E9E9E'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                title: { display: true, text: 'Progresso Geral', font: { size: 18 } },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label;
                            const value = context.raw;
                            const breakdown = originalData.map((d, i) => {
                                let v = 0;
                                if (label === 'Conforme') v = d.conforme;
                                else if (label === 'Não conforme') v = d.naoConforme;
                                else if (label === 'Não aplicável') v = d.na;
                                else if (label === 'Nenhum item selecionado') v = d.pendente;
                                return `${labels[i]}: ${v}`;
                            }).join(', ');
                            return `${label}: ${value} (${breakdown})`;
                        }
                    }
                }
            }
        }
    });

    barContainer.innerHTML = '<canvas id="summary-chart-100"></canvas>';
    const ctx100 = barContainer.querySelector('canvas').getContext('2d');
    const chartHeight = labels.length * 50 + 80;
    barContainer.style.height = `${chartHeight}px`;
    new Chart(ctx100, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'Conforme', data: conformePercent, backgroundColor: '#4CAF50' },
                { label: 'Não conforme', data: naoConformePercent, backgroundColor: '#F44336' },
                { label: 'Não aplicável', data: naPercent, backgroundColor: '#FFB74D' },
                { label: 'Nenhum item selecionado', data: pendentePercent, backgroundColor: '#9E9E9E' }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { stacked: true, min: 0, max: 100 }, y: { stacked: true } },
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label;
                            const i = context.dataIndex;
                            const perc = context.raw.toFixed(1);
                            const dataItem = originalData[i];
                            let count = 0;
                            if (label === 'Conforme') count = dataItem.conforme;
                            else if (label === 'Não conforme') count = dataItem.naoConforme;
                            else if (label === 'Não aplicável') count = dataItem.na;
                            else if (label === 'Nenhum item selecionado') count = dataItem.pendente;
                            return `${label}: ${perc}% (${count} de ${dataItem.total} itens)`;
                        }
                    }
                }
            }
        }
    });
}
