/* MAIN CONTROLLER */
LogicModule.init();

let timer = null;
let isRunning = false;

const startSim = (speed) => {
    if(timer) clearInterval(timer);
    isRunning = true;
    timer = setInterval(() => {
        LogicModule.nextStep();
    }, speed);
};

const stopSim = () => {
    if(timer) clearInterval(timer);
    isRunning = false;
    timer = null;
};

InputModule.setup(LogicModule, startSim, stopSim);

function loop() {
    OutputModule.render(LogicModule.getState(), isRunning);
    requestAnimationFrame(loop);
}
loop();