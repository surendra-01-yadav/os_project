/* MODULE: Logic */
const LogicModule = {
    state: {
        scenario: 'PC', // 'PC' or 'DP'
        log: 'System Ready',
        
        // PC State
        bufferSize: 5,
        buffer: [],
        mutex: 1,
        empty: 5,
        full: 0,
        producers: [{id:1, state:'idle'}, {id:2, state:'idle'}],
        consumers: [{id:1, state:'idle'}, {id:2, state:'idle'}],

        // DP State
        philosophers: [],
        forks: []
    },

    init: function() { this.reset(); },

    switchScenario: function(newScen) {
        this.state.scenario = newScen;
        this.reset();
    },

    setBufferSize: function(size) {
        this.state.bufferSize = parseInt(size);
        this.reset();
    },

    reset: function() {
        this.state.log = `Scenario: ${this.state.scenario === 'PC' ? 'Producer-Consumer' : 'Dining Philosophers'} Reset.`;
        
        if (this.state.scenario === 'PC') {
            this.state.buffer = [];
            this.state.mutex = 1;
            this.state.full = 0;
            this.state.empty = this.state.bufferSize;
            this.state.producers = this.state.producers.map(p => ({...p, state:'idle'}));
            this.state.consumers = this.state.consumers.map(c => ({...c, state:'idle'}));
        } else {
            // Init 5 Philosophers
            this.state.philosophers = Array.from({length: 5}, (_, i) => ({id: i, state: 'think'}));
            this.state.forks = [true, true, true, true, true]; // 5 forks available
        }
    },

    addProcess: function(type) {
        if(this.state.scenario !== 'PC') return;
        const list = type === 'prod' ? this.state.producers : this.state.consumers;
        const id = list.length > 0 ? list[list.length-1].id + 1 : 1;
        list.push({id: id, state: 'idle'});
    },

    removeProcess: function(type) {
        if(this.state.scenario !== 'PC') return;
        const list = type === 'prod' ? this.state.producers : this.state.consumers;
        if(list.length > 0) list.pop();
    },

    nextStep: function() {
        if(this.state.scenario === 'PC') this.tickPC();
        else this.tickDP();
    },

    // --- PRODUCER CONSUMER ALGORITHM ---
    tickPC: function() {
        const isProd = Math.random() > 0.5;
        if(isProd && this.state.producers.length) {
            const p = this.state.producers[Math.floor(Math.random() * this.state.producers.length)];
            if(p.state === 'idle' || p.state === 'wait') {
                if(this.state.mutex === 1 && this.state.empty > 0) {
                    this.state.mutex = 0; this.state.empty--; p.state = 'crit';
                    this.state.log = `Producer ${p.id} is producing data...`;
                    setTimeout(() => {
                        this.state.buffer.push('D');
                        this.state.mutex = 1; this.state.full++; p.state = 'idle';
                    }, 500);
                } else { p.state = 'wait'; this.state.log = `Producer ${p.id} waiting (Buffer Full).`; }
            }
        } else if (this.state.consumers.length) {
            const c = this.state.consumers[Math.floor(Math.random() * this.state.consumers.length)];
            if(c.state === 'idle' || c.state === 'wait') {
                if(this.state.mutex === 1 && this.state.full > 0) {
                    this.state.mutex = 0; this.state.full--; c.state = 'crit';
                    this.state.log = `Consumer ${c.id} is consuming data...`;
                    setTimeout(() => {
                        this.state.buffer.pop();
                        this.state.mutex = 1; this.state.empty++; c.state = 'idle';
                    }, 500);
                } else { c.state = 'wait'; this.state.log = `Consumer ${c.id} waiting (Buffer Empty).`; }
            }
        }
    },

    // --- DINING PHILOSOPHERS ALGORITHM ---
    tickDP: function() {
        const i = Math.floor(Math.random() * 5);
        const phil = this.state.philosophers[i];
        const left = i;
        const right = (i + 1) % 5;

        if(phil.state === 'think') {
            phil.state = 'hungry';
            this.state.log = `Philosopher ${i+1} is hungry.`;
        } else if(phil.state === 'hungry') {
            if(this.state.forks[left] && this.state.forks[right]) {
                this.state.forks[left] = false;
                this.state.forks[right] = false;
                phil.state = 'eat';
                this.state.log = `Philosopher ${i+1} starts eating.`;
            } else {
                this.state.log = `Philosopher ${i+1} is waiting for forks.`;
            }
        } else if(phil.state === 'eat') {
            this.state.forks[left] = true;
            this.state.forks[right] = true;
            phil.state = 'think';
            this.state.log = `Philosopher ${i+1} finished eating and is thinking.`;
        }
    },

    getState: function() { return this.state; }
};