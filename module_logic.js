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
