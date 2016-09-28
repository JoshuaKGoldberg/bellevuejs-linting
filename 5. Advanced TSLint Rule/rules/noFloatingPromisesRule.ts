import * as ts from "typescript";
import * as Lint from "tslint/lib/lint";

export class Rule extends Lint.Rules.TypedRule {
    public static FAILURE_STRING = "Promises must be assigned to variables";

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoFloatingPromisesWalker(sourceFile, this.getOptions(), program));
    }
}

class NoFloatingPromisesWalker extends Lint.ProgramAwareRuleWalker {
    /**
     * Visits a "call"" expression.
     * 
     * @remarks I determined this is the right method to use by looking at
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
    }
}
