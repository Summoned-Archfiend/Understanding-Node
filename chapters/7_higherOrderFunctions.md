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