/* ============================================================
   PART 1: MODULE INITIALIZATION  (Commit #1)
   Handles: Base object, state storage, init/reset trigger
   ============================================================ */
const LogicModule = {
    state: {
        scenario: 'PC', // 'PC' or 'DP'
        log: 'System Ready',

        // Producer–Consumer State
        bufferSize: 5,
        buffer: [],
        mutex: 1,
        empty: 5,
        full: 0,
        producers: [{id:1, state:'idle'}, {id:2, state:'idle'}],
        consumers: [{id:1, state:'idle'}, {id:2, state:'idle'}],

        // Dining Philosophers State
        philosophers: [],
        forks: []
    },

    init: function() { 
        this.reset(); 
    },

   /* ============================================================
   PART 2: SCENARIO MANAGEMENT  (Commit #2)
   Handles: Switching PC ↔ DP, buffer size changes
   ============================================================ */

   switchScenario: function(newScen) {
        this.state.scenario = newScen;
        this.reset();
    },

    setBufferSize: function(size) {
        this.state.bufferSize = parseInt(size);
        this.reset();
    },

   /* ============================================================
   PART 3: SYSTEM RESET LOGIC  (Commit #3)
   Handles: Reinitialization of both scenarios
   ============================================================ */
    reset: function() {
        this.state.log = `Scenario: ${
            this.state.scenario === 'PC' ? 'Producer-Consumer' : 'Dining Philosophers'
        } Reset.`;

        if (this.state.scenario === 'PC') {
            // Reset Producer–Consumer
            this.state.buffer = [];
            this.state.mutex = 1;
            this.state.full = 0;
            this.state.empty = this.state.bufferSize;
            this.state.producers = this.state.producers.map(p => ({...p, state:'idle'}));
            this.state.consumers = this.state.consumers.map(c => ({...c, state:'idle'}));
        } 
        else {
            // Reset Dining Philosophers
            this.state.philosophers = Array.from(
                { length: 5 }, 
                (_, i) => ({ id: i, state: 'think' })
            );
            this.state.forks = [true, true, true, true, true];
        }
    },

   /* ============================================================
   PART 4: PROCESS MANAGEMENT (PC ONLY)  (Commit #4)
   Handles: Adding/removing producers/consumers
   ============================================================ */
    addProcess: function(type) {
        if(this.state.scenario !== 'PC') return;
        const list = type === 'prod' ? this.state.producers : this.state.consumers;
        const id = list.length > 0 ? list[list.length - 1].id + 1 : 1;
        list.push({ id: id, state: 'idle' });
    },

    removeProcess: function(type) {
        if(this.state.scenario !== 'PC') return;
        const list = type === 'prod' ? this.state.producers : this.state.consumers;
        if (list.length > 0) list.pop();
    },
   
   /* ============================================================
   PART 5: STEP CONTROLLER  (Commit #5)
   Handles: Next state update for PC / DP
   ============================================================ */
    nextStep: function() {
        if (this.state.scenario === 'PC') this.tickPC();
        else this.tickDP();
    },

   /* ============================================================
   PART 6 — PRODUCER–CONSUMER ALGORITHM  (Commit #6)
   ============================================================ */
    tickPC: function() {

        const isProd = Math.random() > 0.5;

        // ---------- PRODUCER ----------
        if (isProd && this.state.producers.length) {
            const p = this.state.producers[
                Math.floor(Math.random() * this.state.producers.length)
            ];

            if (p.state === 'idle' || p.state === 'wait') {
                if (this.state.mutex === 1 && this.state.empty > 0) {

                    // Enter critical section
                    this.state.mutex = 0;
                    this.state.empty--;
                    p.state = 'crit';

                    this.state.log = `Producer ${p.id} is producing data...`;

                    setTimeout(() => {
                        this.state.buffer.push('D');
                        this.state.mutex = 1;
                        this.state.full++;
                        p.state = 'idle';
                    }, 500);

                } else {
                    p.state = 'wait';
                    this.state.log = `Producer ${p.id} waiting (Buffer Full).`;
                }
            }
        }

        // ---------- CONSUMER ----------
        else if (this.state.consumers.length) {
            const c = this.state.consumers[
                Math.floor(Math.random() * this.state.consumers.length)
            ];

            if (c.state === 'idle' || c.state === 'wait') {
                if (this.state.mutex === 1 && this.state.full > 0) {

                    // Enter critical section
                    this.state.mutex = 0;
                    this.state.full--;
                    c.state = 'crit';

                    this.state.log = `Consumer ${c.id} is consuming data...`;

                    setTimeout(() => {
                        this.state.buffer.pop();
                        this.state.mutex = 1;
                        this.state.empty++;
                        c.state = 'idle';
                    }, 500);

                } else {
                    c.state = 'wait';
                    this.state.log = `Consumer ${c.id} waiting (Buffer Empty).`;
                }
            }
        }
    },

   
