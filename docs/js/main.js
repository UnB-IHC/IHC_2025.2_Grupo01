document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.checklist-pie-chart');
    if (!canvas) { return; }

    const checkboxes = document.querySelectorAll('article input[type="checkbox"]');
    if (checkboxes.length === 0) {
        if (canvas) canvas.parentElement.style.display = 'none';
        return;
    }

    const storageKey = 'checklistProgress_' + window.location.pathname;
    const ctx = canvas.getContext('2d');
    let chartInstance = null;
    const corNA = '#9E9E9E';

    function getCheckboxKey(checkbox) {
        return checkbox.parentElement.textContent.trim();
    }

    function handleTriStateMouseDown(event) {
        event.stopImmediatePropagation();
        
        const cb = event.target;

        if (cb.checked) { 
            cb.checked = false;
            cb.indeterminate = true;
        } else if (cb.indeterminate) {
            cb.checked = false;
            cb.indeterminate = false;
        } else {
            cb.checked = true;
            cb.indeterminate = false;
        }
        
        applyStyle(cb);
        
        updateChartAndSave();
    }

    function killClickEvent(event) {
        event.preventDefault(); 
        event.stopPropagation();
        event.stopImmediatePropagation();
    }

    function applyStyle(checkbox) {
        const li = checkbox.closest('li');
        if (!li) return;
        
        if (checkbox.indeterminate) {
            li.classList.add('na-item');
        } else {
            li.classList.remove('na-item');
        }
    }

    function updateChartAndSave() {
        let conformeCount = 0;
        let naoConformeCount = 0;
        let naCount = 0;
        let itemsState = {};

        checkboxes.forEach(cb => {
            const key = getCheckboxKey(cb);
            let state;

            applyStyle(cb); 

            if (cb.checked) {
                state = 'conforme';
                conformeCount++;
            } else if (cb.indeterminate) {
                state = 'nao_aplicavel';
                naCount++;
            } else {
                state = 'nao_conforme';
                naoConformeCount++;
            }
            itemsState[key] = state;
        });

        const data = [conformeCount, naoConformeCount, naCount];
        if (chartInstance) {
            chartInstance.data.datasets[0].data = data;
            chartInstance.update();
        } else {
            chartInstance = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Conforme', 'Não Conforme', 'Não Aplicável'],
                    datasets: [{
                        data: data,
                        backgroundColor: ['#4CAF50', '#F57C00', corNA], 
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
            conforme: conformeCount,
            nao_conforme: naoConformeCount,
            na: naCount,
            items: itemsState
        };
        localStorage.setItem(storageKey, JSON.stringify(progressData));
    }

    function loadProgress() {
        const savedData = localStorage.getItem(storageKey);
        if (!savedData) return;

        try {
            const data = JSON.parse(savedData);
            if (!data.items) return;

            checkboxes.forEach(cb => {
                const key = getCheckboxKey(cb);
                const state = data.items[key];
                
                if (state === 'conforme') {
                    cb.checked = true;
                    cb.indeterminate = false;
                } else if (state === 'nao_aplicavel') {
                    cb.checked = false;
                    cb.indeterminate = true;
                } else {
                    cb.checked = false;
                    cb.indeterminate = false;
                }
                
                applyStyle(cb); 
            });

        } catch (e) {
            console.error('Erro ao carregar progresso do checklist:', e);
        }
    }
 
    loadProgress();
    updateChartAndSave(); 

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('mousedown', handleTriStateMouseDown, { capture: true });
        
        checkbox.addEventListener('click', killClickEvent, { capture: true });
    });
});