# Writing a TSLint Rule

This is the most exciting part!

We'll switch to TSLint for this because it gives us the power of the TypeScript AST.

## What's an AST?

Let's get into that, since it's the core thing that drives linters and language services in general.

An AST is an Abstract Syntax Tree.

> Wikipedia: In computer science, an abstract syntax tree (AST), or just syntax tree, is a tree representation of the abstract syntactic structure of source code written in a programming language.

It's confusing as all heck when you don't know what you're doing. Fortunately some kind souls made [astexplorer.net](https://astexplorer.net/), which allows us to see what the AST looks like.

Given the following TypeScript *(under the menu that initially says "acorn")*:

```typescript
console.log("Hello world!");
```

We're shown that within the file, we have an `ExpressionStatement` from position 0 to 28 (so the text `console.log("Hello world!");`), which has a `CallExpression` from 0 to 27 (`console.log("Hello world!");`).
That in turn has a `PropertyAccessExpression` from 0 to 11 (`console.log`) with the expression `console` and name `log`, and an `arguments` array with just one `StringLiteral` equal to `"Hello world!");`...

Yup, that sounds a bit convoluted. Let's look at it visually.

```
            console.log("Hello world!");
                    /                  \
          console.log("Hello world!")   ;
              /            \
        console.log    "Hello world!"
       /     |     \
    console  .     log
```

Much better.

## Making a Rule

Rules are created using "walkers", which are objects that are fed the AST and contain logic for specific kinds of nodes in the tree.

Directly quoting the TSLint README:

> Rule names are always camel-cased and must contain the suffix Rule. Let us take the example of how to write a new rule to forbid all import statements (you know, for science). Let us name the rule file noImportsRule.ts. Rules can be referenced in tslint.json in their kebab-case forms, so "no-imports": true would turn on the rule.

> Now, let us first write the rule in TypeScript. A few things to note:

> * We import tslint/lib/lint to get the whole Lint namespace instead of just the Linter class.
> * The exported class must always be named Rule and extend from Lint.Rules.AbstractRule.

```typescript
import * as ts from "typescript";
import * as Lint from "tslint/lib/lint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "import statement forbidden";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    }
}

// The walker takes care of all the work.
class NoImportsWalker extends Lint.RuleWalker {
    public visitImportDeclaration(node: ts.ImportDeclaration) {
        // create a failure at the current position
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));

        // call the base version of this visitor to actually parse this node
        super.visitImportDeclaration(node);
    }
}
```

The `Lint.RuleWalker` class is a nifty example of why Object Oriented Programming and nicely named functions are so nice.
We don't know how the class actually works on the inside, but we can surmise from this code snippet that the `visitImportDeclaration` is what's called when we visit an `import` declaration.

So, going over the whole shebang:

* We create and export a `Rule`
* The rule's `apply` method takes in a source file and applies a new `RuleWalker` to it 
* That walker is a `NoImportsWalker`, which has logic for the `ts.ImportDeclaration` type
* Whenever the walker is given an import node, it complains

*(insert White Walker image here)*

I've included the rule file as `noImportsRule.ts` here and made a small `tslint.json`:

```json
{
    "rules": {
        "no-imports": true
    }
}
```

Since the rule's compiled JavaScript requires the TSLint Node module, which requires TypeScript, install those first.

```
npm install typescript tslint
tslint --rules-dir "4. Writing a TSLint Rule" "4. Writing a TSLint Rule\sample.ts"
```

...and the result:

```
4. Writing a TSLint Rule/sample.ts[1, 1]: import statement forbidden
```

Nice.
