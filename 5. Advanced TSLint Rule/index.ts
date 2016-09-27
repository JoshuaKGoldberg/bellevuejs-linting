/// <reference path="typings/runner.d.ts" />
/// <reference path="typings/es6-promise.d.ts" />

const runner = new Runner();

// Error case A: floating Promise in the body
runner.doWork();
