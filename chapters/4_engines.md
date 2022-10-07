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

___

<div style="font-size: 12px">

If you'd like to learn <br /> more about parsing <br />
digital ocean have a <br /> great article available <br /> [here](https://www.digitalocean.com/community/tutorials/js-v8-engine).

</div>

___

<div align="right">

[<< prev](./3_nodecore.md) | [next >>]()