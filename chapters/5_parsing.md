# Node & JavaScript Parsing

When writing code it is important to understand how `parsing` takes place.
If we blindly follow the code it can make it particularly difficult to `debug`,
and if we are not `thinking` in the same manner that the computer is interpreting our
code, we are not really understanding what our code is doing. Many newer devs make this
mistake; they get bug in their code, they either A. `panic` and look for help, or B. follow the
code through line by line. Panicking does nothing to help, in fact it actually hinders your thought
process so first of all don't panic. Second of all, whilst reading through line by line can be beneficial,
when I say this I mean, they will literally read the code line by line even if this is not how the code
is being executed.

I believe this comes from a misunderstanding, often, bootcamps and even University professors will teach
that code is read line by line. This is true, to an extent, but neglects concepts such as `hoisting` and
`execution contexts`. Not everything we write is equal. Take this code for instance:

<br />

<pre>
<code>

let x = 1;

while (x < 10) {
    x++;
}

const print = 'Hello';

console.log(x, print);
</code>
</pre>

Here, we are utilising only a single `execution context`, this is what is known as the `global` execution context.
As such, reading line by line is absolutely fine, it is exactly how this code is parsed, however, what happens
if we have function declarations? what happens if we have multiple contexts? this is what we are going to explore.

## Execution Contexts & Scope

When we execute code in `JavaScript` it is a misconception that the code is read line by line straight down the page. In reality, we have multiple concepts at work as the `engine` parses the code. The first of these is the `Execution Context (EC)`, this is to say the `environment` in which the code is executed. This `environment` consists of the value of `this` (the keyword), variables, objects, and functions, within the `scope` of that particular context.

Having spent any amount of time with `JavaScript` you will have run into issues before regarding `scope` or the execution of your code. If we attempt to access something out of `scope` JS will complain, if we attempt to declare two items of the same name in `scope` JS will once again complain. Logic errors can be some of the more difficult to diagnose, when you have an issue with syntax your editor will often point you to the exact line of the problem, but with logic errors we must do much of the work ourselves. Understanding how `JavaScript` executes, and therefore "sees", your code is important for building an adequate mental model for the purpose debugging.

Multiple "types" of `Execution Contexts` exist. The first of which is the one you have worked in even with simple `JavaScript` code known as the `Global Execution Context (GEC)`. The GEC is the default `Execution Context`, as such, any code we write will begin within the EC, it contains all `global` code which is not within a function or object. The GEC may only ever have a single instance, this is due to the fact JS itself is `single threaded`; this means JS may only contain the execution of instructions in a single sequence. Alternatively, something languages like `Java` may enable multithreading processes in which multiple process sequences may be executed in `parallel` on different threads, they may share resources. `Single Threaded` languages are blocking, this is why in JS we use asynchronous calls such as `promises` to trigger `callbacks` which are run once all other processes have completed (we will delve into this further when we talk more about the `Node Event Loop` later), just know that whilst `multithreading` sounds great, and can be advantageous depending on your usage, it can also greatly increase complexity. We also have the `Functional Execution Context`, as the name implies this is the context created by the JS `engine` whenever it finds a `function` call. Each `function` has it's own EC and it also retains access to all of the code defined in the GEC. Lastly we have the `Execution Context Stack (ECS)`, once again implied by it's name, the `ECS` is actually a stack data structure which stores all of the execution stacks created during the life-cycle of the script. The `GEC` is present by default within the `ECS` at the bottom of the stack. Whilst executing code in the `GEC` if the JS `engine` finds a function call the created `FEC` for that function is pushed to the top of the stack, the `engine` then executes the function whose `EC` is at the top of the `ECS`. Once all the code in the function has been executed the JS engine will `pop` that call off the stack and begin execution of the next item in the stack. When all functions are done executing the `engine` will the keep waiting for `callback` functions to arrive, these are provided by the `Event Loop`.

<pre>
<code>
debugger;

var msg = 'Hello';

function functionA() {
    console.log("Start function A");

    function functionB() {
        console.log("In function B");
    }
}

functionA();

console.log("GlobalContext");
</code>
</pre>

Lets take a look at the above code, copy this into the `Snippets` of your browser `devtools`, the debugger is included so you can step through the code. What is the first thing that happens when running the `script`? the moment that the code loads the JS engine pushes the `GEC` onto the `ECS`. the `ECS` is also known as the `Call Stack`, you should be able to see this in your devtools. Step through to the first function declaration, you will notice that the function is not added to the stack right away, we will cover this in more detail in a second, for now just know that the first pass of a `function` creates a reference in `memory`, only when the function is executed is it added to the stack, at which point we enter the function and begin execution of that function. The key takeaway here is that we are not going from the `var msg = hello;` line straight to the function and then inside the function, this is a common mistake juniors fall prey to when debugging, instead, we should follow the code through the execution process in the same manner it is processed.

We almost have the basics down, just a little more. We know what `Scope` is at this point, however, one must also understand the `Scope Chain`. For clarity we will redefine what we mean when we discuss `Scope`, a `Scope` refers to the accessibility or visibility of variables, it determines in which spaces we may access defined items, as such, when we enter a `FEC` we are in the `scope` of that block and therefore have access to everything within the `block`. However, when we are in the `GEC` we do not have access to the items within the `FEC`. `Scope` is important as it makes our code flow, it helps prevent unintended modifications to declared variables from other spaces in our script. `Scope` also reduces namespace collisions.

Much like we have multiple types of `Execution Contexts` we also have multiple `Scopes`, this includes the `Global Scope`, `Local Scope`, and `Block Scope`.

1. Global Scope
    - Contains any variable not inside any function or block.
    - Can be accessed from anywhere
2. Local Scope
    - Variables declared within the function
    - May only be accessed from within the function
3. Block Scope
    - ES6 introduction via `let` and `const`
    - Scoped to nearest `curly` braces
    - cannot be accessed from outside their scope
4. Nested Scope
    - Scopes can be nested within other scopes
5. Lexical Scope
    - AKA Static Scope
    - Scope determined at [lexing time](https://en.wikipedia.org/wiki/Lexical_analysis)

Lexical scoping is common, the alternative is dynamic scoping. When we have lexical scoping our scopes are as they appear, every inner scope can access outer levels via the `Scope Chain`. These can be deduced at compile-time unlike dynamic scope, as a dynamic scope requires access to the outside chain call of the functions. So what exactly is this `Scope Chain`? In JS whenever a variable is used the `engine` will attempt to find the `variables` value within the current scope. If it is unable to find it in the `current scope` it will look within the `outer scope`, should it still not find it it will continue throughout all the outer scopes until it reaches the `global scope`, if it is still not found the variable will either be declared implicitly within the `global scope` or, should we be in `strict mode`, return an error.

<pre>
<code>
const n = 10;

function x() {

    return function y() {

        return function z() {
            return n + 5;

            console.log(n);
        }
    }
}

x()()();
</code>
</pre>

Here we declare `n` in our `Global Scope` using `const`, what will be logged in function `z`? if you answered `15` you would be correct. In this instance JS starts in the `GEC`, it sets the variable in memory, and assigns it the value of `10`. Next, the `engine` comes across a function declaration `x`, a reference is set in memory of the whole function and we move onto the next line. In the next line `x` is called, this is where the engine will create a new `FEC` and enter the function. I will skip repeating this as the concept is the same for `y and z` calls, the interesting part is when we get to `z`,as we enter we have a `return` with a mathematical operation, interestingly we utilise `n` from the `global context`, it is not declare within the `local scope`, yet, we are using it, in this case the `engine` will first check our current `scope` in the function `z`, it will not find the variable `n`, instead, it will seek it out in `y`'s context, does it find it? no! hence it will seek it out in x(), still, it has not been found! so it lastly checks the `GEC` in which case it does find `n` and therefore uses the value.

<pre>
<code>
let i = 0;

function x() {

    i = 10;

    return function y() {

        i = 3;

        return function z() {
            return i + 5;

            console.log(i);
        }
    }
}

x()()();
</code>
</pre>

What about this one? what will the result of this be? the answer: 8, much of what we described will happen again
in exactly the same manner, only this time `i` is discovered in the `scope` of `y`. Hence, the `engine` finds
our variable within `y` and uses the value.

You may be wondering does the JS `engine` do all this? it uses what we call a `Lexical Environment`, this is a structure that holds identified-variable mapping, where identifier refers to the name of variable/functions and variable is the references to the actual object, it is simply the place where variables and references to the objects are stored, this differs from `Lexical Scope` such that the `Lexical Scope` is determined at `compile time ` whilst the environment is a place where these items are stored during program `execution`.

<pre>
<code>
lexicalEnvironment = {
  a: 25,
  obj: [ref. to the object]
}
</code>
</pre>

A new `Lexical Environment` is created for each `Lexical Scope` but only when the code in the `scope` is executed, you may notice these are exactly the same concepts we have already been discussing simply under a different name. This is because the `GEC` itself is our `Global lexical Environment`, just as other `Lexical Environments` are created at each function call AKA our `FEC`.