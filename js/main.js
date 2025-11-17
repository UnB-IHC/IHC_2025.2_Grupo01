document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.checklist-pie-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let chartInstance = null;

    const allCheckboxes = document.querySelectorAll('input[type="checkbox"][name^="item"]');

    const pageName = document.body.dataset.pageName || window.location.pathname.split('/').filter(Boolean).pop();
    const storageKey = `checklistProgress_${pageName}`;

function restoreProgress() {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved) return;

    allCheckboxes.forEach(cb => {
        if (cb.value === 'conforme' && saved.conformeCheckboxes?.includes(cb.name)) cb.checked = true;
        else if (cb.value === 'naoConforme' && saved.naoConformeCheckboxes?.includes(cb.name)) cb.checked = true;
        else if (cb.value === 'naoAplicavel' && saved.naoAplicavelCheckboxes?.includes(cb.name)) cb.checked = true;
    });
}

function saveProgress() {
    const itemNames = new Set(Array.from(allCheckboxes).map(cb => cb.name));
    let conforme = 0, naoConforme = 0, naoAplicavel = 0;
    const conformeCheckboxes = [], naoConformeCheckboxes = [], naoAplicavelCheckboxes = [];

    itemNames.forEach(name => {
        const checkboxesInGroup = document.querySelectorAll(`input[name="${name}"]`);
        const selected = Array.from(checkboxesInGroup).find(cb => cb.checked);

        if (selected) {
            if (selected.value === 'conforme') {
                conforme++;
                conformeCheckboxes.push(name);
            }
            else if (selected.value === 'naoConforme') {
                naoConforme++;
                naoConformeCheckboxes.push(name);
            }
            else if (selected.value === 'naoAplicavel') {
                naoAplicavel++;
                naoAplicavelCheckboxes.push(name);
            }
        }
    });

    const total = itemNames.size;
    localStorage.setItem(storageKey, JSON.stringify({ conforme, naoConforme, naoAplicavel, total, conformeCheckboxes, naoConformeCheckboxes, naoAplicavelCheckboxes }));
}

restoreProgress();
updateChart();


    function updateChart() {
        const counts = { conforme: 0, naoConforme: 0, naoAplicavel: 0, pendente: 0 };
        const itemNames = new Set(Array.from(allCheckboxes).map(cb => cb.name));

        itemNames.forEach(name => {
            const checkboxesInGroup = document.querySelectorAll(`input[type="checkbox"][name="${name}"]`);
            const selected = Array.from(checkboxesInGroup).find(cb => cb.checked);

            checkboxesInGroup.forEach(cb => { if (cb !== selected) cb.checked = false; });

            if (selected) {
                if (selected.value === 'conforme') counts.conforme++;
                else if (selected.value === 'naoConforme') counts.naoConforme++;
                else if (selected.value === 'naoAplicavel') counts.naoAplicavel++;
            } else {
                counts.pendente++;
            }
        });

        saveProgress(); 

        const data = [counts.conforme, counts.naoConforme, counts.naoAplicavel, counts.pendente];
        const labels = ['Conforme', 'Não Conforme', 'Não Aplicável', 'Nenhum item selecionado'];
        const colors = ['#4CAF50', '#F44336', '#FFB74D', '#BDBDBD'];

        if (!chartInstance) {
            chartInstance = new Chart(ctx, {
                type: 'pie',
                data: { labels, datasets: [{ data, backgroundColor: colors, hoverOffset: 4 }] },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: 'Progresso da Página' }
                    }
                }
            });
        } else {
            chartInstance.data.datasets[0].data = data;
            chartInstance.update();
        }
    }

    updateChart();
    allCheckboxes.forEach(cb => cb.addEventListener('change', updateChart));
});
