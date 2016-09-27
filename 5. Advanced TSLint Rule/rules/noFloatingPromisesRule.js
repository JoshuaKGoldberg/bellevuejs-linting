"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions(), program));
    };
    Rule.FAILURE_STRING = "import statement forbidden";
    return Rule;
}(Lint.Rules.TypedRule));
exports.Rule = Rule;
// The walker takes care of all the work.
var NoImportsWalker = (function (_super) {
    __extends(NoImportsWalker, _super);
    function NoImportsWalker() {
        _super.apply(this, arguments);
    }
    /**
     * Visits a "call"" expression.
     *
     * @remarks I figured out this is the right method to use by looking at
     *          the AST node for `object.method()` and seeing it was a
     *          `CallExpression` node, then searching for "callExpression"
     *          in syntaxWalker.d.ts (under tslint's declaration files).
     */
    NoImportsWalker.prototype.visitCallExpression = function (node) {
        if (node.getSourceFile().fileName !== "index.ts") {
            return;
        }
        // TS' TypeChecker object retrieves types for nodes
        var typeChecker = this.getTypeChecker();
        var type = typeChecker.getTypeAtLocation(node);
        // We only care about "Promise" symbols, where symbol is what "type" a node is
        // In this case, the node is the call expression, so the type is what it returns
        var symbolName = type.symbol.name;
        if (symbolName !== "Promise") {
            return;
        }
        console.log("Checking", node.getFullText());
        console.log("\n\n---\n\n", node.parent);
    };
    return NoImportsWalker;
}(Lint.ProgramAwareRuleWalker));
/*
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
*/
