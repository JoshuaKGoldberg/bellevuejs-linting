/// <reference path="typings/runner.d.ts" />
/// <reference path="typings/es6-promise.d.ts" />
var runner = new Runner();
// Error case: floating Promise
runner.doWork();
// Happy case: captured Promise
var work = runner.doWork();
