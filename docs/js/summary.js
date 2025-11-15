document.addEventListener('DOMContentLoaded', () => {
    const canvasDoughnut = document.querySelector('#summary-doughnut-chart');
    const canvas100 = document.querySelector('#summary-chart-100');
    const corNA = '#9E9E9E';

    if (!canvasDoughnut || !canvas100) {
        return;
    }

    const labels = [];
    const originalData = [];
    
    const conformePercentData = [];
    const naoConformePercentData = [];
    const naPercentData = [];

    let grandTotalConforme = 0;
    let grandTotalNaoConforme = 0;
    let grandTotalNA = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith('checklistProgress_')) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                
                if (data && data.title && 
                    typeof data.conforme === 'number' && 
                    typeof data.nao_conforme === 'number' &&
                    typeof data.na === 'number') {
                    
                    const conforme = data.conforme;
                    const naoConforme = data.nao_conforme;
                    const na = data.na;
                    const total = conforme + naoConforme + na;

                    grandTotalConforme += conforme;
                    grandTotalNaoConforme += naoConforme;
                    grandTotalNA += na;

                    labels.push(data.title);
                    originalData.push({ conforme: conforme, nao_conforme: naoConforme, na: na, total: total });

                    const conformePercent = (total > 0) ? (conforme / total) * 100 : 0;
                    const naoConformePercent = (total > 0) ? (naoConforme / total) * 100 : 0;
                    const naPercent = (total > 0) ? (na / total) * 100 : 0;
                    
                    conformePercentData.push(conformePercent);
                    naoConformePercentData.push(naoConformePercent);
                    naPercentData.push(naPercent);
                }
            } catch (e) {
                console.error("Erro ao ler dados de progresso:", e);
            }
        }
    }

    if (labels.length === 0) {
        const noDataMsg = '<p style="text-align: center;">Ainda não há dados de progresso. Visite uma página de checklist e marque um item.</p>';
        canvasDoughnut.parentElement.innerHTML = noDataMsg;
        canvas100.parentElement.innerHTML = noDataMsg;
        return;
    }
    
    const ctxDoughnut = canvasDoughnut.getContext('2d');
    drawDoughnutChart(ctxDoughnut, grandTotalConforme, grandTotalNaoConforme, grandTotalNA, corNA);

    const chartHeight = (labels.length * 50) + 80;

    canvas100.parentElement.style.height = `${chartHeight}px`;
    const ctx100 = canvas100.getContext('2d');
    draw100Chart(ctx100, labels, conformePercentData, naoConformePercentData, naPercentData, originalData, corNA);
});

function drawDoughnutChart(ctx, conforme, naoConforme, na, corNA) {
    const totalAplicavel = conforme + naoConforme;
    const percentage = (totalAplicavel > 0) ? (conforme / totalAplicavel) * 100 : 0;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Conforme', 'Não Conforme', 'Não Aplicável'],
            datasets: [{
                data: [conforme, naoConforme, na],
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