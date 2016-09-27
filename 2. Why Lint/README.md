# Why Lint?

How many issues can you spot in this JavaScript code?

*(it's syntactically correct, and I'm not looking for "you should use dependency injection!"-style meta complaints)*

```javascript
var db = require("./db");
var people = require("./people");
var constants = require("./constants");
var minA = constants.minAge;
var minH = constants.minHeight;

var person = {
	age: 23,
	height: 73,
	name: "Josh"
};

function checkHeight(person) {
    if (person.height < minH) {
        return person.name + " is not tall enough to ride!";
    }
}

function checkAge(person) {
    if (person.age < minH) {
        return person.name + " is not old enough to ride!";
    }
}

function checkAllPeople(people) {
    var errors = [];

    for(i = 0; i < people.length; i++) {
        errors.push(checkHeight(person));
    }

    return
    {
        "errors": errors,
        "checked": new Date().getTime()
    }
}

module.exports.main = function () {
    var errors = checkAllPeople(people);

    if (errors) {
        console.log("Errors!", errors);
    } else {
        console.log("All is well!");
    }
}
```

## For Correctness

The "no unused variable" classification of rules is perhaps the most powerful of linting.
They catch variables that aren't being used, such as declared variables, imports, and (in TypeScript) private things.

A variable being unused is very commonly a symptom of a larger problem.
Did you do extra work that you didn't need to?
Did you forget to call a function?
Are you calling the wrong function somewhere?

Oftentimes, refactoring code will end up with stuff that used to be used but is no longer.

JavaScript is especially sensitive to unused variables because web apps care about the size of the generated code.
When we turned on TSLint's `no-unused-variable` for Sway, we found *hundreds* of unused imports and *hundreds* of unused variables.


## For Education

JavaScript has subleties.
Its platforms have subleties.

Did you know that JavaScript will silently add a semicolon after `return` if there's nothing after it on the same line?

```javascript
// What it comes out to
return;
{
    // ...
}
```

Adding lint rules to a codebase for lesser-known subleties is an extremely efficient way to educate less-experienced developers about new things.
It's better to force them to learn things than to silently introduce heisenbugs.


## For Cleaner Code

Out of respect for your annoyance levels, I didn't include something like:

```javascript
for(var i=0,len=arr.length; i<len; ++i) { i > initialResult(arr[i]) && otherResult(arr[i + 1 % arr.length]); }
```

...or...

```javascript
var timestamp;
var record=this.getLastInvalidRecord();
while(timestamp=this.getTimestamp() && !this.isValid(record) && record=this.rememberInvalidity())
{
    this.retry(timestamp);
}
```

*(Are we setting record to `this.rememberInvalidity()`? Are we checking if it's the same?)*


### It's faster to read

Code that doesn't stick to a standard set of presentation rules is what I call *jagged*.
It's a little *rough* around the edges.
It's a little *tougher* to read.

Ugh.

This is why people get all whiny about tabs verses spaces, and where to put spaces, and naming conventions, and whether to put brackets on the next line, and ...
Consistently styled codebases facilitate faster reading and fewer *"how should I write this?"* decisions; therefore, it's in our best interest to choose the best style within the options and stick with it.

Cleaning your darn code up and forcing it to adhere to a set of standards gives smoothes the roughness out.
It formalizes the your code into a standard presentation of ideas, such that reading any part gives the user the same experience as any other.
Devs no longer have to struggle (actively or passively) to wrap their heads around how code is work, or switch their mental model to some new way of scanning every other file.

...and so help me God if one more person tries to blather on about how *c*amel*C*ase isn't inherently worse than *P*ascal*C*ase I will literally explode.
