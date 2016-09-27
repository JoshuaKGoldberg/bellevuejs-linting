/// <reference path="runner.d.ts" />
/// <reference path="es6-promise.d.ts" />
var runner = new Runner();
// Error case A: floating Promise in the body
runner.doWork();
// Error case B: floating Promise in some function
(function () {
    runner.doWork();
})();
// Happy case A: captured Promise in the body
var work = runner.doWork();
// Happy case B: captured Promise in some function
(function () {
    var work = runner.doWork();
})();
