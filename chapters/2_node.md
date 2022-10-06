# Node

To solve a problem, we must first see the problem, we must first understand it at it's most fundamental level. The same goes for the tools we use, to use a tool effectively we need to understand our tools, `Node` is no exception.

`Node` is a `JavaScript` runtime, running on the `V8` enigne. It is an environment which contains everything we need to run `JavaScript` programs, this means we can now use `JavaScript` like any other scripting language, to do operations in a `terminal`, as a `Command Line Interface` (CLI), application, via the `Read Eval Print Loop` (REPL), we can do Input/Output operations (I/O), spin up servers, serve content, perform `networking` tasks, and even `filesystem` operations.

<br />

<div align="center" >
<img src="../images/environment.png" width="400px">
</div>

<br />

In order to understand `Node` we must first be familiar with the `CLI`. The `CLI` is where we enter commands to interact with our `Kernel`, which in turn interacts with our `OS` and `hardware` devices (if you'd like to learn more about the `Kernel` click [here](https://github.com/Summoned-Skali/LinuxInDepth/blob/master/chapters/18_kernel.md)). In `Linux` this is `Bash`, Mac it is our `Terminal`, Windows the `Command Prompt` and so forth...

The `CLI` is how much of computing was done prior to `graphical user interfaces` (GUIs) taking over. When working with `Node` however, we may often be working with the `CLI`. If you are unfamiliar with the `CLI` I would take a diversion here to learn at least the basics of using the `CLI` on your particular `Terminal Emulator`, if you are unsure what to learn here, focus on `bash`, `bash` is the most common you will find no matter where you work, but also, in our wonderful modern world, it is a standard which has been applied to MAC (as it now has a `Linux`core), and Windows via `powershell` or the `windows subsystem for Linux` (WSL).