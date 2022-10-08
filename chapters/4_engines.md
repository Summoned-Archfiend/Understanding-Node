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
st a = 1;
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

___

<div style="font-size: 12px">

If you'd like to learn <br /> more about parsing <br />
digital ocean have a <br /> great article available <br /> [here](https://www.digitalocean.com/community/tutorials/js-v8-engine).

</div>

___

<div align="right">

[<< prev](./3_nodecore.md) | [next >>]()