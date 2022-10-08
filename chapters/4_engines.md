# JavaScript engines

In the previous chapter we spoke mostly of `Node`, it's `C++` core, and how this enables the extension of `JavaScripts` functionality. We know that `Node` uses the `V8` engine, and we know that there are many `JavaScript` engines, but what exactly is an engine? well, much like everything else, `JavaScript` engines are simply programs whose responsibility is to execute `JavaScript` code, the most popular `JavaScript` engine being the `V8` engine. We know that this particular engine powers not only server-side applications outside of the browser via and embedded version of it within `Node`, but also in the `chrome` browser. But... what if you didn't use `chrome`? currently, the most popular browsers on the market are `chrome`, `brave`, `safari`, `edge`, and `firefox`, do all of these run the `v8` engine? the short answer is no.

Generally, a `JavaScript` engine utilises the pipeline pattern, We begin with the JS code being passed to the `parser`, the `parser` divides the code into multiple tokens, this is converted into an `abstract syntax tree` (a tree-like structure that represents functions, conditionals, scopes, etc...). The `abstract syntax tree` is  then passed to the interpreter which converts the code into `bytecode`. Concurrently (at the same time) the engine is actually running the `JavaScript` code, `bytecode` is used by optimising the compiler along with profiling data, optimisation of the compiler makes certain assumptions based on profiling data and produces highly optimised machine code. Occasionally the optimisation assumption will be incorrect, at this point the previous version is invoked by the "deoptimise" phase, usually, engines will optimise hot functions and use inline caching techniques to optimise code.

<br />

<div align="center">

<img src="../images/javascriptEngines.png">

</div>

<br />

<div align="center">

| Engine | Description |
| --- | --- |
| V8 | Open-source Engine used by Chrome and Node |
| SpiderMonkey | Engine powering Firefox |
| JavaScriptCore | Open-source Engine developed by Apple for Safari |
| Rhino | Open-source Engine for Firefox |
| Chakra | Engine for Microsoft Edge |
| JerryScript | Engine for IoT |

</div>

<br />

We have multiple engines, remember `JavaScript` is not understandable by the computer directly, it needs to be converted into a computer-understandable language, each engine handles this conversion. These engines differ slightly in how they conduct this task, but effectively solve the same problem.

<details open>
<summary>V8</summary>

V8 has an edge on other engines, there is a reason it became so popular. Not only can V8 run both on the browser and on a machine using `Node`, but as we learned previously, we have control over extending functionality ourselves due to it's open-source nature. It can also be embedded into any `C++` application we may write. `v8` also allows for `JavaScript` code to run much faster, which improves the end user experience, paves the way for the development of web applications (and SPAs), and allows smaller teams of devs specialising in `JavaScript` to operate across the entire stack.

Using it's proprietary parser, it generates an abstract syntax tree. Then ignition (the interpreter) generates bytecode from this tree using the internal `v8` bytecode format. Bytecode is then compiled into machine code by TurboFan (the optimising compiler) which also handle the memory allocation for objects. Garbage collection collects the objects which are no longer needed. It also utilises optimisation techniques such as [elision](https://www.geeksforgeeks.org/copy-elision-in-c/) (the art of omitting unnecessary objects from a copy) of expensive runtime properties, and inline caching. The garbage collector is a generational incremental collector (a collector which does not collect all unreachable objects during a cycle, all generational garbage collectors are incremental, an incremental GC does not necessarily employ a generation scheme to decide which unreachable objects to collect or not, A generational collector divides the unreachable objects into different sets, roughly according to their age. The basic theory here is that the objects most recently created will become unreachable quickly, so the set of 'young' objects are collected at an early stage. An incremental collector may be implemented with this scheme, or another alternative method, which may decide which group of objects should be sweeped in a different manner [see Wiki](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)#Generational_GC_.28ephemeral_GC.29)).

Recently, there has been a new addition to `v8` called `SparkPlug`, this is present between `Ignition` and `TurboFan`, it is also called the `Fast Compiler`.

<div align="center">

<img src="../images/javascript_journey.png" style="width: 350px">

</div>

</details>

<br />

<details open>
<summary>Chakra</summary>

Our next engine is `Chakra`, this is an engine developed by `Microsoft` as proprietary software. `Chakra` is used in the `Internet Explorer` web browser, a key feature of this is that it use `just-in-time compilation`, this is a way of executing computer code that involves compilation during the execution of the program. `Chakra` does this on a separate core parallel to the browser process.

<div align="center">

<img src="../images/chakraJIT.png" style="width: 550px">

</div>

</details>

<details open>
<summary>Spider Monkey</summary>

Yes, this is a strange name for an engine, it sounds like some sort of `spider-man` knockoff hero, but actually, it was the actually the first `JavaScript` engine, and is currently maintained by `Mozilla`.

<div align="center">

<img src="../images/spidermonkey.png" style="width: 350px">

</div>

</details>

<details open>
<summary>Webkit</summary>

Webkit engine is developed by `Apple` and used in the `Safari` browser, as well as on all other `IOS` browsers, this includes `PlayStation` consoles from sony, and even with some `Amazon` kindles. Webkits `C++` API procides a set of classes to display web content in windows, implements browser features such as following links, manageing back-forward lists, history, and more.

</details>

<br />

## Parsing

The `v8` parser also has a preparser, but in an admission from `google` the pre-parser is actually currently useless for most modern JS. Additionally, the inner functions must be re-parsed unless they are compiled in the outer function, this means that unless we wrap out functions, they are lazy loaded, unlike variables which are eager loaded, below is a code example of this.

<pre>
<code>
// variable declarations are eager parsed
const a = 1;
const b = 2;

// functions are lazily parsed due to the cost of eager parsing
// since we don't need it right away.
function sum(...args) {
    return args.reduce(function (acc, cur) {
        return acc + cur;
    })
};

// the parser returns to parse the sum as we use it
sum(1, 2, 3);
</code>
</pre>

Here our declarations will be eager parsed, however, the function is instead lazily parsed, this is great for performance as a lazily parsed function has a cost at a `1*x` flat-rate on initial load, x being the additional unknown cost of conducting scope resolution of inner functions and serializing it. However, once this function is actually used the flat-rate goes up to `3*x`. We can instead force functions to eager load by wrapping them.

<pre>
<code>
// variable declarations are eager parsed
const a = 1;
const b = 2;

// since we wrap this in an IIFE (immediately invoked function expression)
// the function is eager loaded into memory right away.
const sum = (function(...args) {
    return args.reduce(function (acc, cur) {
        return acc + cur;
    }, 0)
})();

// we can use this right away as we have eager parsed
// alreadyarray
sum(1, 2, 3);
</code>
</pre>

The advantage of eager compilation is that we can drop the `3.x` cost to 2 for all top-level functions known to be executed immediately. It only matters from the top-level though. If we don't decide to eagerly parse as part of the main compile job
we may as well wait until it is executed, since then at least we are certain that we only pay the compile cost (2 for parse, 2 for compile) for functions we actually use. This applies to the above example where we have an accumulator function declared within our function, since the top-level is the only part which matters in this circumstance we eager-load the top-level function, however, the inner accumulator will still only be loaded as and when it is used.

The downside of this? eager compilation requires us to keep the AST around in memory between the parse and compilations steps. This increases peak memory usage significantly, if we could pre-parse inner functions of eagerly parsed functions this would properly work out better. On low-memory devices, it would be better to disable eager heuristics entirely. Theoretically the data could be serialized on a warm startup, this way we never need to look at unused code, this would make top-level compilation heuristics irrelevant.

## Interpreter

As asserted earlier, `Ignition` is the interpreter used for `V8`, as such, we will focus our discussion here particularly on `Ignition`. `Ignition` is another type of engine, this is what we would call a `Register Machine`. In terms of mathematical logic and theoretical computer science a register machine is generic classification of machine used in a manner similar to a `turing machine`. As a quick overview, once the `register machine` is created it creates a virtual bytecode which is abstracted away from any particular machine implementation, this will run through the `optimisers`, eventually this runs through the `compiler`, which produces the machine specific code for our particular processor. It is possible to view this code in any given script using the `node` flag `--print-bytecode`, additionally we may provide a `filter` flag with this to condense down our output to only display the `Machine Code` to our particular code.

<pre>
<code>
node --print-bytecode --print-bytecode-filter=[functionName] [filename]
</code>
</pre>

Remember, when we compile to `Machine Code` there can be a lot generated, for very little, it is also incredibly difficult for humans to understand if you have not been exposed to it before, to illustrate this point I have created a script with a function `return5`. This function is incredibly simplistic, but if we output the `bytecode` we get:

<br />

<div align="center">

Code            |  Bytecode
:-------------------------:|:-------------------------:
 <img src="../images/return5.png" width="200px"> |  <img src="../images/return5bytecode.png" width="800px">

</div>

</div>

<br />

Taking a look at the bytecode we see that on the second line down we have the name of the function, followed by the pointer to the function. It also has a count of parameters, registers, nesting level, age, and a frame size. Then we see `LdaSmi 5` followed by a `return`. This is an interesting section, we can see that the return
outright matches to our JS, this means we already know instantly that this is the
return of our function. As for the more interesting `LdaSmi`, this is actually a
command, `Ld` stands for `load`, `a` stands for `accumulator`, `Smi` stands for `Small integer`, if we put all this together, what this is saying; "<em>load into the accumulator a small integer of the value 5</em>". This is a piece of `Assembly`, meaning it is in a human readable form, if we lookg ch is an interesting sectionto the left of this, we see `0d 05`, this is a piece of hexadecimal, `0c` being our instruction code `05` being the number value, if we change this to `return7` this number will change accordingly (give it a try!).

### The Accumulator

The accumulator is ancient in terms of computing technology. it is a register in which the intermediate arithmetic logic unit results are stored. It has similarities to the `Turing Machine` and is also a part of the `Von Neumann Architecture` pictured here:

<div align="center">

<img src="../images/vonNeumanArchitecture.png" style="width: 350px">

</div>

The accumulator is essentially the "thing" close the `CPU` in memory, it has fast access, much faster than main memory, anytime we want to conduct arithmetic via the `APU`, the results are stored by the accumulator. As stated, this is far faster to access than main memory, allowing us to conduct rapid calculations. Hence, `LdaSmi[5]` loading the value into the accumulator, specifying the value type as a `small integer` a `small integer` being an integer of roughly half the bytes of a normal `integer`, normal `integers` usually being around `4 bytes` this makes `small integers` commonly `2 bytes`.

If we consider the next statement, `Return`, we know what a `return` usually does, it ceases execution of a function and returns the value to the right in terms of JS code execution, but what does it do in the context of the `accumulator`? as you may have guessed from the fact we are talking about the `accumulator`, in this context `Return` returns the `value` which is currently stored within the `accumulator` itself. Because we `load` the integer `5`, the return value will be `5`. If we simulate the `accumulator`, the first thing which happens is we enter the function, at this point in time the `accumulator` is blank. The first instruction executed is our `LdaSmi` instruction, this `loads` our value into the accumulator, at this point the accumulator now has value, next we `Return` the value in the accumulator and `end` the below table shows the accumulator value changes.

<br />

<div align="center">

| Instruction | Accumulator |
| --- | --- |
| <strong>[begin]</strong> | - |
| LdaSmi[5] | 5 |
| Return | 5 |
| <strong>[end]<strong> | - |

</div>

<br />

Just to really cement this in your mind, we can also simulate this using `JavaScript` itself, it is often a pattern used. Go ahead and run the script provided in `scripts/accumulator`, logging to `bytecode` to the console. Take a
look at the `bytecode`, notice that this is doing exactly the same as the function previously. Notice, the interaction within the `accumulator` as to how the value changes, and understand that this is what occurs inside of your `APU` when the processor runs this `Machine code`.


<pre>
<code>
    // [] - This variable simulates our accumulator
    let accumulator;

    // LdaSmi[5] - here we set the value of the accumulator
    accumulator = 5;

    // [5] - Lastly we return the value inside the accumulator
    return accumulator;
</code>
</pre>

### Register Machines

Right, now that we know what an `accumulator` is we can head back to our original discussion `Register Machines`. `Registers` are used by the `accumulator` to store values for use at a later point of execution. If we want to define a `register` we can use the official definition "<em>A storage slot capable of storing a natural number</em>" simple right? it is somewhat like the `accumulator` in this manner, simply a piece of virtual memory for storing some value, provided that value is a natural number. When executing your code, every declaration you make is stored within a `register`. For this example we will use a slightly more complex function in `scripts/register`, you should output the `bytecode` of this function for analysis.

<br />

<div align="center">

Code            |  Bytecode
:-------------------------:|:-------------------------:
 <img src="../images/registeradd5.png" width="300px"> |  <img src="../images/add5bytecode.png" width="800px">

</div>

</div>

<br />

From our `bytecode` we can see the same command `LdaSmi` as we previously saw. From this we now know that we are loading a value of the type small integer into the `accumulator`. The next line down from this however, we see a new command `Star0`. Since we are talking about registers you can probably guess the `r` stands for `register`, `St` stands for `store` and, as before, `a` stands for accumulator. If we put this together we are saying "<em>Store the value in the accumulator at register 0</em>". Notice, we also have the `register count` which is no set to `1`.

Next we see `AddSmi [5]`, the `Add` part is a mathematical operation, here we are saying to `add` the value provided to whatever `value` is stored in the `accumulator`, in this case `10`. Every identifier/declaration you make in `JavaScript` will have a representation mapped to a virtual register for it. In this case we assign `10` to `x`, this means that `x` will be mapped to virtual register `r0`. This may seem quite inefficient, we are assigning a value to `r0` but we don't actually do anything with it. This is where `compilation` and `optimisation` phases come in after we compile down to the virtual `bytecode`.

<div align="center">

| Instruction | Accumulator | Register0 |
| --- | --- | --- |
| <strong>[begin]</strong> | - | - |
| LdaSmi[10] | 10 | - |
| Star0 | 10 | 10 |
| AddSmi[5] | 15  | 10 |
| Return | 15 | 10 |
| <strong>end</strong> | - | - |

</div>

If you want an adequate JS representation of this behaviour, like we did previously, take a look at the following code:

<pre>
<code>
function add5() {
    let accumulator;
    let r0;

    accumulator = 10;
    r0 = accumulator;

    accumulator += 5;

    return accumulator;
}
</code>
</pre>

Try out some different functions, check the `bytecode` for them, what happens if instead of setting a variable we simply return the result of the calculation for instance? to answer this question in particular you should write a simple function where to numbers are added, you will notice i the bytecode we only get one command run `LdaSmi`. This is because the `interpreter` is optimising our code, it knows we are taking two numbers and adding them together, so rather than waste the operation it just sets the result to the `accumulator`.

Lets get a little more complex, how about adding two numbers.

<br />

<div align="center">

Code            |  Bytecode
:-------------------------:|:-------------------------:
 <img src="../images/add2num.png" width="300px"> |  <img src="../images/add2numBytecode.png" width="800px">

</div>

</div>

Here we see much of the same, except our `register count` is now `2` rather than `1` as before.
This is because, as mentioned previously, every declaration we make will be associated with it's own
virtual register. If we trace this through we first find that we have our `LdaSmi` loading the small integer
`10` into the `accumulator`. The next line down we `store` the value currently in the `accumulator`, currently `10`,
into `r0`.  We then load our second value (`5`) into the `accumulator`, this replaces the `accumulator` value.
Next `Star1` runs, this looks familiar, we can deduce that this command is storing the current accumulator value
again, but, notice it is going to `r1` rather than `r0`. In the next step we see another new command `Ldar` we
know that `Ld` will load a value, we also know that `a` is the `accumulator` and `r` is `register`, thus;
"<em>Load the current register1 value back into the accumulator</em>". After this we run the `Add` command on `r0`, which, as
discussed previously, will add the value, this time in `r0`. Finally, we `return` the `accumulator` value.

<br />

<div align="center">

| Instruction | Accumulator | Register0 | Register1 |
| --- | --- | --- | --- |
| <strong>[begin]</strong> | - | - | - |
| LdaSmi[10] | 10 | - | - |
| Star0 | 10 | 10 | - |
| LdaSmi[5] | 5 | 10 | - |
| Star1 | 5 | 10 | 5 |
| Ldar r1 | 5 | 10 | 5 |
| Add r0 | 15 | 10 | 5 |
| Return | 15 | 10 | 5 |
| <strong>[end]</strong> | - | - | - |

</div>

<br />

___

<div style="font-size: 12px">

<div align="left">

If you'd like to learn <br /> more about parsing <br />
digital ocean have a <br /> great article available <br /> [here](https://www.digitalocean.com/community/tutorials/js-v8-engine).

<div>

If you'd like to learn <br /> more about the <br />
Von Neumann Architecture <br /> [click here](https://www.sciencedirect.com/topics/computer-science/von-neumann-architecture).

</div>

</div>

</div>

<br />

___

<div align="right">

[<< prev](./3_nodecore.md) | [next >>]()