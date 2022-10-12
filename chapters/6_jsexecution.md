# JavaScript Execution

To truly understand `JavaScript` execution we must understand a few concepts. First of all, that JS holds a data store, this store is what we call the `Global Variable Environment (GVE)`, it is where we store all of our declarations in JS, or in more simplistic terms "Memory". This is opposed to our `Execution Context (EC)` it is available throughout our script throughout the whole time of our execution, unlike our `EC`s created when we run a function which store data inside the function itself which is lost upon the completion of the `EC`. Whatever terminology we may use, be it `declare`, `register`, `define`, `assign`, all mean the same thing, they mean <em>"Take the item and save it in memory"</em> or as a function <em>"Take the code, and it's arguments, don't execute it now, save it in memory for later"</em>, this terminology can be somewhat misleading as it suggests the `engine` is vaguely aware of the function at this point, however, it is not, JS does not "go back" to the line, it holds onto the data in memory to use when the function is run. In this sense we can think of a function as a means of bundling up code to run at a later time. This implies that any time we want to save code to run later we can simply wrap it in a function to attain this behaviour.

We will begin by looking at an example in which we are going to follow the `thread of execution`. This is the method in which JS reads the code line-by-line, however, in doing so we will see just how JS is interacting with the `GVE`, later this will assist us in understanding how `Node` helps JS interact with the OS. Below is the code we will execute, this is an example from one of my favourite online lecturerers [Will Sentence](https://frontendmasters.com/courses/servers-node-js/executing-javascript-code-review/) who explains all of this in excrutiating detail with multiple series of videos covering the subject in differing contexts.

<pre>
<code>
    let num = 3;

    // Save the function to GVE
    function multiplyBy2 (inputNumber) {
        const result = inputNumber*2;
        return result;
    }

    // Invoke function and insert argument
    const output = multiplyBy2(num);
    const newOutput = multiplyBy2(10);
</code>
</pre>

We begin reading the code `lexically`, as such, we begin at the top just as JS does and our firstline: declaring a variable and assigning it a value of `3`. This is simple enough, I am pretty sure most of you have covered this already. The interesting part here is what actually happens under the hood when we write this, if you look at the `GVE` diagram below, you will see that upon execution a value is stored in the `GVE` with an assigned `label` and the `value` we assigned to it.

Not too difficult yet right? so what happens when we read the next line? this is where some more junior devs might get confused, it can be instinctive that because we are executing the script line-by-line that the function declaration will begin and start executing what is inside of the function. This is incorrect, at this point the `engine` does not care what is inside of this function, it sees the keyword function and creates a copy of the function in the `GVE`. This is JS `saving` the code for later, don't get confused, JS doesn't come back to this code, it doesn't somehow magically jump back up to here during execution, though in the `debugger` it can give this illusion, no, it saves this function to the `GVE`, including any variables packaged with it in the functions little backpack store, known as the `Persistent Lexical Scope Referenced Data ` which all functions in JS have (this is how `closures` work), of variables for later use, it is never coming back here, so it needs to make sure it has this saved.