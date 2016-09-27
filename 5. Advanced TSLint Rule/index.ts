/// <reference path="typings/runner.d.ts" />
/// <reference path="typings/es6-promise.d.ts" />

const runner = new Runner();

// Error case A: floating Promise in the body
runner.doWork();

// Error case B: floating Promise in some function
(() => {
    runner.doWork();
})();

// Happy case A: captured Promise in the body
const work = runner.doWork();

// Happy case B: captured Promise in some function
(() => {
    const work = runner.doWork();
})();
