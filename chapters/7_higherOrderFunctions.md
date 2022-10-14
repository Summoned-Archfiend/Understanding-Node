# Higher Order Functions

In `JavaScript` functions are far more versatile than most languages, hence the rise of functional programming. This is greatly due to the fact that JS functions are `first-class`, meaning can be used just as any other data type in JS. This enables us to assign functions as values to variables, pass them around to other functions, and more. When we use the term `Higher Order Functions` we are referring to a process in which we can pass functions to other functions, this can be simplified as "<em>A function which accepts and/or returns another function</em>". We refer to these functions as <em>higher-order</em> because contrary to strings, numbers, and booleans, it goes <em>higher</em> to operate on functions. A `Higher Order Function` does not necessarily have to return a function to be considered higher-order, but must meet one of the following criteria:

1. The function takes one or more functions as an argument.
2. The function returns a function as a result.

In JS `first-class` functions can:

1. be stored as variables.
2. be used in arrays.
3. be assigned as object properties.
4. be passed as arguments.
5. be returns from other functions.

There is an important concept to grasp prior to us delving into the execution of `HoF`s. Everything we use in JS is an `Object`, we can tell this using `instanceof`, try it yourself, set a `function` to a variable, an `array`, and `Object`, or anything else for that matter and use `<var> instanceof Object` to determine whether or not the item is an object. This can seem strange coming from other languages, however, it means we always have access to the Prototype chain of the object, following on from this, we also have access to Object methods, even when working with arrays etc... however, it can complicate validation and type checking as we need to learn to distinguish between arrays and Objects using alternative methods as to what we might be used to, or additional checks. Now lets take a look at the execution of a script using `HoF`s.

## Higher Order Function Execution

So, what happens when we have a function that does almost the same as another function and we want to add another case? (e.g. `copyArrayAndDivideBy2` and `copyArrayAndDivideBy3`) in this circumstance we may find ourself writing another function with the same logic twice. This breaks our `philosophy` we should be keeping out code `DRY` (Don't Repeat Yourself!). This is where a `HoF` would be useful, would it not be better to have a function `copyArray` that could take in some code as a parameter? that could then execute that code as part of it's own execution? in that sense we could reuse this function and decide on part of it's functionality at runtime.

<pre>
<code>
function copyArray(array, instructions) {
    const output = [];
    for (let i = 0; i < array.length; i++) {
        output.push(instructions(array[i]));
    }
    return output;
}

function multiplyBy2(input) { return input * 2; }
const result = copyArray([1, 2, 3], multiplyBy2);
</code>
</pre>

Lets step through this, on the first line we store the definition of our function to the `GVE`. The next line down we also store the definition of `multiplyBy2` in the `GVE`. So far so good, we then defined the parameter `result` in the `GVE`, which is assigned the `evaluated` value of `copyArray`. At this point the JS `engine` creates a new `FEC` and we enter the context of the `copyArray` function with the first argument as our array, and the secondary argument of our entire function definition for whatever code we want to inject, in this case `multiplyBy2`. Until this evaluates `result` itself id `undefined` in memory.

Within our `FEC` we first set our arguments in the local memory to their parameter "labels". In this case we have an interesting case, the first case is `array` which has the argument set `[1, 2, 3]`, the second is our `instructions`. What do you expect `instructions`argument to be? well, given we have passed the entire function definition, and we know that JS will not return here later, we can deduce that the argument set to `instructions` here is the entire function definition of `multiplyBy2`.