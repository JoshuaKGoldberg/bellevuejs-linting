import { db } from "./db";
import { people } from "./people";
import { minAge as minA, minHeight as minH } from "./constants";

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

    return {
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