"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint/lib/lint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.applyWithProgram = function (sourceFile, program) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions(), program));
    };
    Rule.FAILURE_STRING = "Promises must be assigned to variables";
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
     * @remarks I determined this is the right method to use by looking at
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
        // The type symbol is what the call expression returns (if anything)
        // We only care about "Promise" symbols
        if (!type.symbol || type.symbol.name !== "Promise") {
            return;
        }
        // If the node is part of a variable declaration, that means it's being captured
        if (node.parent.kind === ts.SyntaxKind.VariableDeclaration) {
            return;
        }
        // Otherwise we (for now) assume it's just being dropped
        // There are other situations (like methods) where it could be stored...
        // ...but those are out of scope for the talk
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    };
    return NoImportsWalker;
}(Lint.ProgramAwareRuleWalker));
