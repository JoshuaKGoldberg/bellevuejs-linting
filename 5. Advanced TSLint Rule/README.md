# Advancing TSLint Usage

Any talk on TSLint today would be incomplete without mentioning the true power of the TypeScript AST.

Does anybody remember Promises?

## Promises

> A Promise represents a unit of work that may be completed asynchronously.

For example:

```typescript
$.get("/api")
    .then(result => console.log("Got", result));

// or

let promise = $.get("/api");
promise.then(result => console.log("Got", result));
```

One common bad thing people do with Promises is the "fire and forget" pattern (or, as I call it, mistake).
It's a real bad thing to start a Promise and not react to it being finished - this lets random asynchronous calls float around through your code without anybody controlling them.

You particularly don't want floating Promises with tests: if a Promise from test A waits to error until after test B has started, you'll start getting nondeterministic test failures that take forever to debug.

## Linting Promises

Any person or group of people faced with this kind of "we're doing it wrong!" problem should take at least a few steps to correct it.

1. **Educate** how and why something is a problem
2. **Fix** any instances of it in existing code
3. **Prevent** it from happening in the future

Linting helps with all of them.
Let's make a rule that works on preventing the floating Promises problem by ensuring all Promises are stored in variables.

*(This doesn't completely solve the problem, but it's a great way to limit it.)*

### Setup

I love Gulp so I've made a basic setup with `build`, `lint`, and `watch` tasks in this folder.

```
cd "5. Advanced TSLint Rule"
npm install -g gulp
npm install
gulp watch
```

The rule we're developing is located at `rules/noFloatingPromisesRule.ts`.
You might notice that it extends a different class and has a few different things: that's because it specifically uses type checkins APIs, which is a special kind of rule.

I copied code off a pre-packaged type-aware rule from tslint, [no-for-in-array](https://github.com/palantir/tslint/blob/master/src/rules/noForInArrayRule.ts), then replaced all the functionality for this talk.

```
index.ts[7, 1]: Promises must be assigned to variables
```

Yippee!

By the way, a Sway team member has an issue open on Microsoft's contributed TSLint rules (we make a bunch of them) to implement a full version of this.
https://github.com/Microsoft/tslint-microsoft-contrib/issues/174

I will buy you a full Can Am pizza if you improve this rule and submit it to the repository.

### Type Checking Caveats

TSLint's type checking features are both new and scary; most of their rules are older and don't use them (or need to).
You can look through their list of rules at http://palantir.github.io/tslint/rules/.
