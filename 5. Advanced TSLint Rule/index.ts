/// <reference path="typings/runner.d.ts" />
/// <reference path="typings/es6-promise.d.ts" />

const runner = new Runner();

// Error case: floating Promise
runner.doWork();

// Happy case: captured Promise
const work = runner.doWork();
