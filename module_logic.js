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

   
