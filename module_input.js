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


    

