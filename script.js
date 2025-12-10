// script.js - main connector file

import { setupInputHandlers } from "./module_input.js";
import { simulateTick } from "./module_logic.js";
import { render } from "./module_output.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// GLOBAL STATE OBJECT
const state = {
    scenario: "producer",
    producers: [],
    consumers: [],
    philosophers: [],
    forks: [],
    buffer: [],
    bufferSize: 5,
    semEmpty: null,
    semFull: null,
    semMutex: null,
    nextItem: 1,

    setRunning(pid) {
        const all = [...this.producers, ...this.consumers, ...this.philosophers];
        const p = all.find(x => x.id === pid);
        if (p) p.state = "RUN";
    }
};

// UI references
const refs = {
    ctx,
    scenarioEl: document.getElementById("scenario"),
    startPauseBtn: document.getElementById("startPause"),
    stepBtn: document.getElementById("step"),
    resetBtn: document.getElementById("reset"),
    tickInput: document.getElementById("tick"),
    bufSizeInput: document.getElementById("bufSize"),

    addProducerBtn: document.getElementById("addProducer"),
    removeProducerBtn: document.getElementById("removeProducer"),
    addConsumerBtn: document.getElementById("addConsumer"),
    removeConsumerBtn: document.getElementById("removeConsumer"),

    incSemBtn: document.getElementById("incSem"),
    decSemBtn: document.getElementById("decSem"),

    stateInfo: document.getElementById("stateInfo")
};

// APP CONTROLLER
const app = {
    refs,
    state,
    timer: null,
    tickMs: 700,

    toggleRun() {
        if (this.timer) this.stop();
        else this.start();
    },

    start() {
        this.stop();
        this.timer = setInterval(() => this.tick(), this.tickMs);
        this.refs.startPauseBtn.textContent = "Pause";
    },

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.refs.startPauseBtn.textContent = "Start";
    },

    singleStep() {
        this.tick();
    },

    updateTick(ms) {
        this.tickMs = ms || 700;
        if (this.timer) this.start();
    },

    updateBufferSize(size) {
        this.state.bufferSize = size;
    },

    addProducer() {
        this.state.producers.push({ id: Date.now(), label: "Producer", state: "IDLE" });
    },
    removeProducer() {
        this.state.producers.pop();
    },

    addConsumer() {
        this.state.consumers.push({ id: Date.now(), label: "Consumer", state: "IDLE" });
    },
    removeConsumer() {
        this.state.consumers.pop();
    },

    incSemaphore() {},
    decSemaphore() {},

    tick() {
        simulateTick(this.state);
        render(this.state, this.refs);
    },

    resetScenario() {
        this.state.buffer = [];
        render(this.state, this.refs);
    }
};

// Initialize
setupInputHandlers(app);
render(state, refs);
