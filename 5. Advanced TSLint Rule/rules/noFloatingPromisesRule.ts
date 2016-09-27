import * as ts from "typescript";
import * as Lint from "tslint/lib/lint";

export class Rule extends Lint.Rules.TypedRule {
    public static FAILURE_STRING = "import statement forbidden";

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions(), program));
    }
}

// The walker takes care of all the work.
class NoImportsWalker extends Lint.ProgramAwareRuleWalker {
    /**
     * Visits a "call"" expression.
     * 
     * @remarks I figured out this is the right method to use by looking at
     *          the AST node for `object.method()` and seeing it was a
     *          `CallExpression` node, then searching for "callExpression"
     *          in syntaxWalker.d.ts (under tslint's declaration files).
     */
    public visitCallExpression(node: ts.CallExpression): void {
        if (node.getSourceFile().fileName !== "index.ts") {
            return;
        }

        // TS' TypeChecker object retrieves types for nodes
        const typeChecker = this.getTypeChecker();
        const type = typeChecker.getTypeAtLocation(node);

        // We only care about "Promise" symbols, where symbol is what "type" a node is
        // In this case, the node is the call expression, so the type is what it returns
        const symbolName = type.symbol.name;
        if (symbolName !== "Promise") {
            return;
        }

        console.log("Checking", node.getFullText());
        console.log("\n\n---\n\n", node.parent);
    }
}

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
