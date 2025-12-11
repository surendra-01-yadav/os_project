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



/* ========== PART 5: RENDER PC – PROCESS LIST (Commit 5) ========== */
        const mkItem = (p, role) => `
            <div class="proc-box ${p.state}">
                <span>${role} ${p.id}</span>
                <small>${p.state.toUpperCase()}</small>
            </div>
        `;

        this.els.listProd.innerHTML = state.producers.map(p => mkItem(p, 'Producer')).join('');
        this.els.listCons.innerHTML = state.consumers.map(c => mkItem(c, 'Consumer')).join('');
    },


/* ========== PART 6: RENDER DP – TABLE + PHILOSOPHERS (Commit 6) ========== */
    renderDP: function(state) {
        // UI toggles
        this.els.viewPC.classList.add('hidden');
        this.els.viewDP.classList.remove('hidden');
        this.els.pcActions.classList.add('hidden');
        this.els.legPC.classList.add('hidden');
        this.els.legDP.classList.remove('hidden');
        this.els.grpBuff.style.visibility = 'hidden';

        this.els.title.innerText = "Dining Philosophers Problem";
        this.els.desc.innerHTML = `
            <strong>How it works:</strong> Philosophers need two forks to eat.
            If forks aren't available, they wait (starvation possible).
        `;

        this.els.table.innerHTML = '';
        const cx = 125, cy = 125, r = 90;

        state.philosophers.forEach((p, i) => {
            const ang = (i * 72 - 90) * Math.PI / 180;
            const x = cx + r * Math.cos(ang) - 35;
            const y = cy + r * Math.sin(ang) - 35;

            const div = document.createElement('div');
            div.className = `phil ${p.state}`;
            div.style.left = `${x}px`;
            div.style.top = `${y}px`;

            let icon = 'brain';
            if (p.state === 'hungry') icon = 'utensils';
            if (p.state === 'eat') icon = 'face-grin-stars';

            div.innerHTML = `<i class="fas fa-${icon}"></i><br>P${i+1}`;
            this.els.table.appendChild(div);
        });

/* ========== PART 7: RENDER DP – FORKS + COUNTERS (Commit 7) ========== */
        state.forks.forEach((av, i) => {
            const ang = (i * 72 - 54) * Math.PI / 180;
            const fr = r * 0.7;
            const x = cx + fr * Math.cos(ang) - 4;
            const y = cy + fr * Math.sin(ang) - 45;

            const div = document.createElement('div');
            div.className = `fork ${!av ? 'taken' : ''}`;
            div.style.left = `${x}px`;
            div.style.top = `${y}px`;
            div.style.transform = `rotate(${ang * (180/Math.PI) + 90}deg)`;
            this.els.table.appendChild(div);
        });

        this.els.valForks.innerText = state.forks.filter(f => f).length;
    }
};

