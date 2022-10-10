# The Node Core

`The Node Core`, no, it isn't the galactic police force from `Guardians of The Galaxy`, though that is a great film. Nor is it the latest spinoff metal `genre`, perhaps you could invent it? `The Node Core` entails the foundational aspects of `Node`. Within this chapter we are going to explore exactly what this means. As mentioned previously; `Node` is a `C++` program, we can use `C++` to `bind` functions to `keywords` which `Node` will then look for in our `JavaScript`, it will then run the associated `C++` function. We are going to take a look at the `core` `C++` code which relates to adding features to our `JavaScript`, building the foundational knowledge of the features which allow `Node.js` to be a web sever. We can access the `Node.js` codebase through [github](https://github.com/nodejs/node), just like `V8` it is open-source, you should clone this repository, maybe even follow `nodejs` and star the official repo if you wish!

You may also want to visit the [joyent](https://github.com/joyent) repository, here you will find the original `libuv`, which will get into later (for now just know that [libuv (new repository)](https://github.com/libuv) is the library through which `Node` interacts with the OS to perform tasks such as opening `websockets`). The interest of `Joyent` stems from their history as the original location of the `Node` repository, they remain involved in the development of `Node.js` to date.

Okay, so lets put on our investigative hat, and get to work. Open the `Node` repository in your text editor of choice. In the file explorer there are a number of folders of interest (`FoIs`). We will start by looking at the `deps` folder.

<br />

<div align="center">

| Folder | Description |
| --- | --- |
| deps | Dependencies built outside of Node that are part of Node |
| src | Source files |

</div>

<br />


<div align="center">

<details open>
<summary>Dependencies</summary>

Upon opening the `dependencies` folder we can see various `folders` including `npm`, `openssl`, `uv`, and `V8`. Huzzah! this is where our `V8` engine lives, enter the `V8` folder and you will notice this is an entire project of it's own, in fact, every one of these dependencies is. When we have external libraries in our projects, we are using code that someone else has written (usually installed via a package manager). We may also add them manually (though I wouldn't recommend it as it becomes difficult to manage/maintain). These `dependencies` are simply that; external `libraries`, though ones that are actually built-in to `Node` itself. Take this time to navigate some of these directories, familiarise yourself with a few, look them up if need be, just try to understand one or two in their simplest form.

</details>

<details open>
<summary>Source</summary>

The `src` folder contains all `Nodes` source files, and there are a-lot. One file of particular interest is `src/node.h`, this is the header file for `Node`, the `cpp` file of which would be the main entry point for `Node`. In `C++` we split our files into `headers` and `source`, `.h` files contain our `headers`, these tell us what is required, it acts as a blueprint of abstracted functionality, allowing other devs to easily see how they can use, extend, and implement our classes without having to understand our concrete implementation in it's entirety. In this particular header, about 70 lines in, you will see that `V8` is imported, exactly as we would expect.`V8` is used throughout `Node` to process and execute JS code. Understand that the `Node core` (or the `C++ core`) is a core of utilities built in `C++`, but made available to JS via hooks within the `V8` engine.

<br />

<div style="width: 500px">

![Node Header](../images/nodeh.png)
</div>


</details>

</div>

<br />

So what is the point of this? the point here is to understand that `Node` is not a language, but it does extend `JavaScript`s functionality, adding a huge quantity of features that we simply don't get in vanilla JS. The mental model you should have is not that `Node` IS `JavaScript`, but that `Node` ACCEPTS `JavaScript`; extending the utilities of `JavaScript` via the power of `C++`. Explore a few new files of the `src`, try to understand at least parts, and cement the understanding that THIS is `Node`, these are our utilities that we interact with. Hopefully this has already helped you in developing some new insights into `Node`, in the next chapter we will do a deep dive into `JavaScript Engines` and investigate how `Node` interacts with our machines `processor`.

___

<div align="right">

[<< prev](./2_node.md) | [next >>](./4_engines.md)