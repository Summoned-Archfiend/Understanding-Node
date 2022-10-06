# Node

To solve a problem, we must first see the problem, we must first understand it at it's most fundamental level. The same goes for the tools we use, to use a tool effectively we need to understand our tools, `Node` is no exception.

`Node` is a `JavaScript` runtime, running on the `V8` enigne. It is an environment which contains everything we need to run `JavaScript` programs, this means we can now use `JavaScript` like any other scripting language, to do operations in a `terminal`, as a `Command Line Interface` (CLI), application, via the `Read Eval Print Loop` (REPL), we can do Input/Output operations (I/O), spin up servers, serve content, perform `networking` tasks, and even `filesystem` operations.

<br />

<div align="center" >
<img src="../images/environment.png" width="400px">
</div>

<br />

In order to understand `Node` we must first be familiar with the `CLI`. The `CLI` is where we enter commands to interact with our `Kernel`, which in turn interacts with our `OS` and `hardware` devices (if you'd like to learn more about the `Kernel` click [here](https://github.com/Summoned-Skali/LinuxInDepth/blob/master/chapters/18_kernel.md)). In `Linux` this is `Bash`, Mac it is our `Terminal`, Windows the `Command Prompt` and so forth...

The `CLI` is how much of computing was done prior to `graphical user interfaces` (GUIs) taking over. When working with `Node` however, we may often be working with the `CLI`. If you are unfamiliar with the `CLI` I would take a diversion here to learn at least the basics of using the `CLI` on your particular `Shell`. If you are unsure where to go from here; focus on `bash`, `bash` is the most common you will find no matter where you work, but also, in our wonderful modern world, it is a standard which has been applied to MAC (as it now has a `Linux`core), and Windows via `powershell` or the `windows subsystem for Linux` (WSL). Once you have a the basics down come back and we shall continue.

## V8 Engine

In order to understand `Node` we need an understanding of what it is at it's core; thus the `V8 Engine`. To understand `V8` we need to delve into even lower level than that, the very thing that is driving our whole system right now, the `Microprocessor`. We wont go into too much detail, this is only for our own mental model, if you want to delve into the technicalities of `Microprocessors` I can recommend some great books in my [Learning Resources](https://github.com/Code-Of-The-Crescent/LearningResources) section, I may also cover this in a future document, but for now, just think of our `Microprocessor` as a tiny machine, the organisational `brain` of our system, that takes and outputs electrical `inputs` and `signals`, manipulates electrons passed through `switches` to represent on/off signals, ultimately resulting in the completion of some task. We give the `Microprocessor` instructions, the `Microprocessor` itself "speaks" a language, note that not all `Microprocessors` "speak" the same language mind you. When we give the `processor` instructions to run a program, it must receive those instructions in it's particular language so that it may run that task. There are a variety of languages that `processors` may be designed to understand; `IA-32`, `x86-64`, `ARM`, `MIPS`, etc...

The instructions we provide to the `processor` are provided in a format called `Machine Code`. `Machine Code` encapsulates the programming languages understood by computer `processors`. Every program you run on your computer is compiled into `Machine Code` in order to run on your processor.

<br />

<div align="center" >
<img src="../images/simplifiedDiagram.png" width="400px">
</div>

<br />

The exception to this are `interpreted` languages, which, rather than compiling down to machine code are read and interpreted by another program (the interpreter) which carries out the actions, obviously, at some point this program follows the same process. Another alternative to this is languages which compile to `bytecode` such as `Java`, this `bytecode` is then run by a virtual machine which makes the translation from `bytecode` to machine code.

The main take away here is that, ultimately, when we are writing a program there is always some other process converting what we write into something the `processor` can understand. Sometimes, this is even multiple languages, so that the program may run on many different `processors`. It is possible to write `Machine Code` directly, and some people do, but we don't write much of it in the modern world, this is because machine code is notoriously difficult to write and understand at a glance. Take the example below:

<br />

<div align="center" >
<img src="../images/machineCode.png" width="400px">
</div>

<br />

It is important to understand, we don't write code for the benefit `processors` at all, yes the processor must understand the instruction set at the end of the line, but primarily we write code for humans (other developers) to make our programs readable, simpler to write, and easier to debug. This is why programming languages are much closer to natural language than `Machine Code`, if we were writing to optimise `processors`, and didn't need to worry about human understanding, we would just write `binary` and cut out the processing needing to compile our code down at all (if you haven't already worked out, this would be a nightmare for a human to do with the size and complexity of modern programs especially).

So,what does each line of that machine code do you ask? it manipulates memory addresses, we wont go into detail here, but if you have an interest in delving into some machine code, you can checkout out my [Atari Repo](https://github.com/LukeMcCann/Atari_AssemblyProjects) which uses Assembly 6502/6507, this isn't quite machine code and is slightly easier to understand, but is a good starting point if you want to get into it. In modern codebases, you will notice that as time has moved forward, we have moved further away from this code, and it seems like we continue to do so, with further and further abstractions in higher level languages.


<br />

<div align="center" >
<img src="../images/languages.png" width="400px">
</div>

<br />

Whilst abstraction is great, and helps us to concentrate on our particular application features, rather than low level memory management, garbage collection, and handling, we also pay a price for that abstraction. Due to being so far removed from how our processor actually handles the requests it receives, we can develop an inaccurate mental model of how a tool such as `Node` is actually working.