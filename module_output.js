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

