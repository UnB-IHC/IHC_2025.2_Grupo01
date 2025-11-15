document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.checklist-pie-chart');
    if (!canvas) {
        return; 
    }

    const checkboxes = document.querySelectorAll('article input[type="checkbox"]');
    const totalCheckboxes = checkboxes.length;
    
    if (totalCheckboxes === 0) {
        canvas.parentElement.style.display = 'none';
        return;
    }

    const storageKey = 'checklistProgress_' + window.location.pathname;

    const ctx = canvas.getContext('2d');
    let chartInstance = null;

    function getCheckboxKey(checkbox) {
        return checkbox.parentElement.textContent.trim();
    }

        function updateChartAndSave() {
        let checkedCount = 0;
        let itemsState = {};

        checkboxes.forEach(cb => {
            const key = getCheckboxKey(cb);
            const isChecked = cb.checked;
            
            itemsState[key] = isChecked; 
            if (isChecked) {
                checkedCount++;
            }
        });

        const uncheckedCount = totalCheckboxes - checkedCount;

        const data = [checkedCount, uncheckedCount];
        if (chartInstance) {
            chartInstance.data.datasets[0].data = data;
            chartInstance.update();
        } else {
            chartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Conforme', 'Não Conforme'],
                    datasets: [{
                        data: data,
                        backgroundColor: ['#4CAF50', '#F57C00'], 
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                        title: { display: true, text: 'Progresso da Página' }
                    }
                }
            });
        }

        const pageTitle = document.querySelector('article h1')?.textContent.trim() || 'Página Sem Título';

        const progressData = {
            title: pageTitle,
            checked: checkedCount,
            total: totalCheckboxes,
            items: itemsState
        };
        localStorage.setItem(storageKey, JSON.stringify(progressData));
    }

    function loadProgress() {
        const savedData = localStorage.getItem(storageKey);
        if (!savedData) {
            return;
        }

        try {
            const data = JSON.parse(savedData);
            if (!data.items) {
                return;
            }

            checkboxes.forEach(cb => {
                const key = getCheckboxKey(cb);
                if (data.items[key] === true) {
                    cb.checked = true;
                }
            });

        } catch (e) {
            console.error('Erro ao carregar progresso do checklist:', e);
        }
    }

    loadProgress();
    
    updateChartAndSave(); 

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateChartAndSave);
    });
});