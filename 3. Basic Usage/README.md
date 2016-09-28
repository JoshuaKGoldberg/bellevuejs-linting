# Basic Usage

ESLint and TSLint are written in JavaScript and most commonly used via npm.

We'll experiment with ESLint first.
Note that ESLint and TSLint are very similar and get installed/configured/run in very similar (often the same) ways.

```
npm install -g eslint
```

*Quick recap for those not familiar with Node Package Manager (npm): it lets you install JavaScript packages (like `apt-get` and Pip and NuGet, if you've used those).*
*The `-g` flag indicates this is a "global" installation so we'll be able to run the `eslint` package from our command line wherever we want.*

ESLint, by default, requires a configuration file specifying which rules to run.
It provides a utility to generate one with recommended defaults.
I've gone ahead and added on to the repo, using the following preferences in Windows:

```
cd "3. Basic Usage"
eslint --init
```

* *? Are you using ECMAScript 6 features?* **Yes**
* *? Are you using ES6 modules?* **Yes**
* *? Where will your code run?* **Browser**
* *? Do you use CommonJS?* **No**
* *? Do you use JSX?* **No**
* *? What style of indentation do you use?* **Spaces**
* *? What quotes do you use for strings?* **Double**
* *? What line endings do you use?* **Windows**
* *? Do you require semicolons?* **Yes**
* *? What format do you want your config file to be in?* **JavaScript**

You can now run `eslint` on JS files.
Hooray!

Let's try it on `errors.js`, a modified version of the "Why Lint" code sample.

I actually had to modify the improper `return` so that ESLint would even run on the thing, since it considers such a blatant disregard for proper semantics to be unforgivable.


```
eslint errors.js

   1:10  error  'db' is defined but never used                    no-unused-vars
   3:20  error  'minA' is defined but never used                  no-unused-vars
   6:2   error  Expected indentation of 4 spaces but found 1 tab  indent
   7:2   error  Expected indentation of 4 spaces but found 1 tab  indent
   8:2   error  Expected indentation of 4 spaces but found 1 tab  indent
  17:10  error  'checkAge' is defined but never used              no-unused-vars
  26:9   error  'i' is not defined                                no-undef
  26:16  error  'i' is not defined                                no-undef
  26:35  error  'i' is not defined                                no-undef
  33:6   error  Missing semicolon                                 semi
  40:9   error  Unexpected console statement                      no-console
  42:9   error  Unexpected console statement                      no-console
  44:2   error  Missing semicolon                                 semi
```

Holy crap.

What I find very interesting is that many take the last section's code is as a personal challenge and glare at the thing until they find everything.
The point is that `eslint` takes a few milliseconds and you take seconds.
