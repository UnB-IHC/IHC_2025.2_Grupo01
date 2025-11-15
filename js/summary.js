document.addEventListener('DOMContentLoaded', () => {
    const canvasDoughnut = document.querySelector('#summary-doughnut-chart');
    const canvas100 = document.querySelector('#summary-chart-100');

    if (!canvasDoughnut || !canvas100) {
        return;
    }

    const labels = []; 
    const originalData = [];
    
    const checkedPercentData = [];
    const uncheckedPercentData = [];

    let grandTotalChecked = 0;
    let grandTotalOverall = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key.startsWith('checklistProgress_')) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                
                if (data && data.title && typeof data.checked === 'number' && typeof data.total === 'number') {
                    
                    const total = data.total;
                    const checked = data.checked;
                    
                    grandTotalChecked += checked;
                    grandTotalOverall += total;

                    labels.push(data.title);
                    originalData.push({ checked: checked, total: total });

                    const checkedPercent = (total > 0) ? (checked / total) * 100 : 0;
                    const uncheckedPercent = (total > 0) ? ((total - checked) / total) * 100 : 0;
                    checkedPercentData.push(checkedPercent);
                    uncheckedPercentData.push(uncheckedPercent);
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
    drawDoughnutChart(ctxDoughnut, grandTotalChecked, grandTotalOverall);

    const chartHeight = (labels.length * 50) + 80;

    canvas100.parentElement.style.height = `${chartHeight}px`;
    const ctx100 = canvas100.getContext('2d');
    draw100Chart(ctx100, labels, checkedPercentData, uncheckedPercentData, originalData);
});

function drawDoughnutChart(ctx, checked, total) {
    const unchecked = total - checked;
    const percentage = (total > 0) ? (checked / total) * 100 : 0;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Conforme', 'Não Conforme'],
            datasets: [{
                data: [checked, unchecked],
                backgroundColor: ['#4CAF50', '#F57C00'],
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
                    text: `Total: ${percentage.toFixed(1)}% Concluído`,
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

function draw100Chart(ctx, labels, checkedData, uncheckedData, originalData) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'Conforme', data: checkedData, backgroundColor: '#4CAF50' },
                { label: 'Não Conforme', data: uncheckedData, backgroundColor: '#F57C00' }
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
                            
                            let countLabel;
                            if (label === 'Conforme') {
                                countLabel = `${original.checked}/${original.total} itens`;
                            } else {
                                const uncheckedCount = original.total - original.checked;
                                countLabel = `${uncheckedCount}/${original.total} itens`;
                            }
                            return `${label}: ${percentage}% (${countLabel})`;
                        }
                    }
                }
            }
        }
    });
}