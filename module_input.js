/* ========== PART 1: MODULE SETUP WRAPPER (Commit 1) ========== */
const InputModule = {
    setup: function(logic, start, stop) {

        /* ========== PART 2: SCENARIO SWITCH BUTTON SETUP (Commit 2) ========== */
        const btnPC = document.getElementById('btn-scen-pc');
        const btnDP = document.getElementById('btn-scen-dp');

        const switchMode = (mode) => {
            stop();
            logic.switchScenario(mode);

            // UI Active State Toggle
            if (mode === 'PC') {
                btnPC.classList.add('active');
                btnDP.classList.remove('active');
            } else {
                btnPC.classList.remove('active');
                btnDP.classList.add('active');
            }
        };

        btnPC.addEventListener('click', () => switchMode('PC'));
        btnDP.addEventListener('click', () => switchMode('DP'));

        /* ========== PART 3: PLAYBACK CONTROL – START (Commit 3) ========== */
        document.getElementById('btn-start').addEventListener('click', () => {
            const speed = document.getElementById('inp-speed').value;
            start(speed);
            this.toggleState(true);
        });

        
/* ========== PART 4: PLAYBACK CONTROL – STOP & RESET (Commit 4) ========== */
        document.getElementById('btn-stop').addEventListener('click', () => {
            stop();
            this.toggleState(false);
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
            stop();
            logic.reset();
            this.toggleState(false);
        });

        /* ========== PART 5: SINGLE STEP EXECUTION (Commit 5) ========== */
        document.getElementById('btn-step')
            .addEventListener('click', () => logic.nextStep());

        /* ========== PART 6: CONFIG INPUTS (BUFFER SIZE) (Commit 6) ========== */
        document.getElementById('inp-buffer-size')
            .addEventListener('change', (e) => logic.setBufferSize(e.target.value));

        /* ========== PART 7: PROCESS ACTION BUTTONS (Commit 7) ========== */
        const act = (id, fn) => document.getElementById(id).addEventListener('click', fn);

        act('btn-add-prod', () => logic.addProcess('prod'));
        act('btn-rem-prod', () => logic.removeProcess('prod'));
        act('btn-add-cons', () => logic.addProcess('cons'));
        act('btn-rem-cons', () => logic.removeProcess('cons'));
    },



    

