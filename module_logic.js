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
