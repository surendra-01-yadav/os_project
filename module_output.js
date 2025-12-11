/* ========== PART 1: ELEMENT REFERENCES (Commit 1) ========== */
const OutputModule = {
    els: {
        viewPC: document.getElementById('view-pc'),
        viewDP: document.getElementById('view-dp'),
        pcActions: document.getElementById('pc-actions-panel'),
        legPC: document.getElementById('legend-pc'),
        legDP: document.getElementById('legend-dp'),
        grpBuff: document.getElementById('grp-buffer-size'),
        title: document.getElementById('sim-title'),
        desc: document.getElementById('sim-description'),
        status: document.getElementById('status-badge'),
        log: document.getElementById('log-text'),

        // PC elements
        buffer: document.getElementById('buffer-track'),
        valM: document.getElementById('val-mutex'),
        valE: document.getElementById('val-empty'),
        valF: document.getElementById('val-full'),
        listProd: document.getElementById('list-producers'),
        listCons: document.getElementById('list-consumers'),

        // DP elements
        table: document.getElementById('dining-table'),
        valForks: document.getElementById('val-forks')
    },

/* ========== PART 2: MAIN RENDER FUNCTION (Commit 2) ========== */
    render: function(state, isRunning) {
        this.els.log.innerText = state.log;
        this.els.status.innerText = isRunning ? "Running" : "Idle";
        this.els.status.style.color = isRunning ? "var(--success)" : "#666";

        if(state.scenario === 'PC') this.renderPC(state);
        else this.renderDP(state);
    },

/* ========== PART 3: RENDER PC – UI SETUP (Commit 3) ========== */
    renderPC: function(state) {
        // Show PC view, hide DP
        this.els.viewPC.classList.remove('hidden');
        this.els.viewDP.classList.add('hidden');
        this.els.pcActions.classList.remove('hidden');
        this.els.legPC.classList.remove('hidden');
        this.els.legDP.classList.add('hidden');
        this.els.grpBuff.style.visibility = 'visible';

        this.els.title.innerText = "Producer-Consumer Problem";
        this.els.desc.innerHTML = `
            <strong>How it works:</strong> Producers create data and put it in 
            the buffer. Consumers remove data. They wait if buffer is full/empty.
        `;

/* ========== PART 4: RENDER PC – BUFFER + SEMAPHORES (Commit 4) ========== */
        this.els.buffer.innerHTML = '';
        for (let i = 0; i < state.bufferSize; i++) {
            const slot = document.createElement('div');
            slot.className = 'buffer-slot' + (i < state.buffer.length ? ' filled' : '');
            slot.innerText = i < state.buffer.length ? 'Data' : i + 1;
            this.els.buffer.appendChild(slot);
        }

        this.els.valM.innerText = state.mutex;
        this.els.valE.innerText = state.empty;
        this.els.valF.innerText = state.full;


