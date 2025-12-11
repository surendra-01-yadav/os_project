/* MODULE: Input */
const InputModule = {
    setup: function(logic, start, stop) {
        
        // Scenario Switching (Header Buttons)
        const btnPC = document.getElementById('btn-scen-pc');
        const btnDP = document.getElementById('btn-scen-dp');

        const switchMode = (mode) => {
            stop();
            logic.switchScenario(mode);
            // Toggle active classes
            if(mode === 'PC') {
                btnPC.classList.add('active');
                btnDP.classList.remove('active');
            } else {
                btnPC.classList.remove('active');
                btnDP.classList.add('active');
            }
        };

        btnPC.addEventListener('click', () => switchMode('PC'));
        btnDP.addEventListener('click', () => switchMode('DP'));

        // Playback Controls
        document.getElementById('btn-start').addEventListener('click', () => {
            start(document.getElementById('inp-speed').value);
            this.toggleState(true);
        });

        document.getElementById('btn-stop').addEventListener('click', () => {
            stop();
            this.toggleState(false);
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
            stop();
            logic.reset();
            this.toggleState(false);
        });

        document.getElementById('btn-step').addEventListener('click', () => logic.nextStep());

        // Config & Actions
        document.getElementById('inp-buffer-size').addEventListener('change', (e) => logic.setBufferSize(e.target.value));
        
        const act = (id, fn) => document.getElementById(id).addEventListener('click', fn);
        act('btn-add-prod', () => logic.addProcess('prod'));
        act('btn-rem-prod', () => logic.removeProcess('prod'));
        act('btn-add-cons', () => logic.addProcess('cons'));
        act('btn-rem-cons', () => logic.removeProcess('cons'));
    },

    toggleState: function(running) {
        document.getElementById('btn-start').classList.toggle('hidden', running);
        document.getElementById('btn-stop').classList.toggle('hidden', !running);
        
        // Disable scenario switching while running
        document.getElementById('btn-scen-pc').disabled = running;
        document.getElementById('btn-scen-dp').disabled = running;
    }
};