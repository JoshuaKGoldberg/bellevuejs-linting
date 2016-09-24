# What is Linting?

https://en.wikipedia.org/wiki/Lint_(software)

> "In computer programming, lint is a Unix utility that flags some suspicious and non-portable constructs (likely to be bugs) in C language source code; generically, **lint or a linter is any tool that flags suspicious usage in software written in any computer language.**"

> "The term was derived from the name of the undesirable bits of fiber and fluff found in sheep's wool."

Basically, it finds places where you *probably* messed up.

## Relevent History

* **1979** - Lint appears. People start using it for better C code. The world rejoices (not really).
* **1995** - Netscape Communications hires Brendan Eich to write JavaScript, which he does in 10 days. Whoa.
* **2002** - Douglas Crockford releases JSLint, a linter for JavaScript. JavaScript devs everywhere continue to realize how bad their code really is.
* **2010** - JSHint is created with support from Crockford as a more *configurable*, less grumpy fork of JSLint.
* **2013** - ESLint is released by Nicholas C. Zakas as a modern, *extensible* JSHint. It's now part of the jQuery Foundation.
* **2013** - TSLint is released by Palantir as an equivalent to (J|E)SLint for TypeScript.

By now (2016), ESLint and TSLint both have integrations/extensions for all the major editors, such as Atom, Eclipse, Emacs, Vim, Visual Studio, and Visual Studio Code. 