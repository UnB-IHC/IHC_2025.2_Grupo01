document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.checklist-pie-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let chartInstance = null;

    const allCheckboxes = document.querySelectorAll('input[type="checkbox"][name^="item"]');

    function updateChart() {
        let counts = { conforme: 0, naoConforme: 0, naoAplicavel: 0, pendente: 0 };
        
        const itemNames = new Set(Array.from(allCheckboxes).map(cb => cb.name));

        itemNames.forEach(name => {
            const checkboxesInGroup = document.querySelectorAll(`input[type="checkbox"][name="${name}"]`);
            
            let selected = Array.from(checkboxesInGroup).find(cb => cb.checked);

            checkboxesInGroup.forEach(cb => {
                if (cb !== selected) {
                    cb.checked = false;
                }
            });

            if (selected) {
                if (selected.value === 'conforme') counts.conforme++;
                else if (selected.value === 'naoConforme') counts.naoConforme++;
                else if (selected.value === 'naoAplicavel') counts.naoAplicavel++;
            } else {
                counts.pendente++;
            }
        });

        
        let data = [counts.conforme, counts.naoConforme, counts.naoAplicavel, counts.pendente];
        let labels = ['Conforme', 'Não Conforme', 'Não Aplicável', 'Nenhum item'];
        let colors = ['#4CAF50', '#F57C00', '#9E9E9E', '#BDBDBD']; 
        const total = data.reduce((a, b) => a + b, 0);

        if (total === 0) {
             data = [1];
             labels = ['Nenhum item'];
             colors = ['#E0E0E0'];
        }

        if (!chartInstance) {
            chartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: colors,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: 'Progresso da Página' },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    if (total === 0) return `0 itens`;
                                    const value = context.parsed;
                                    const percent = total > 0 ? (value / total * 100).toFixed(1) : 0;
                                    return `${context.label}: ${value} (${percent}%)`;
                                }
                            }
                        }
                    }
                }
            });
        } else {
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = data;
            chartInstance.data.datasets[0].backgroundColor = colors;
            chartInstance.update();
        }
    }

    updateChart();

    allCheckboxes.forEach(cb => cb.addEventListener('change', updateChart));
});