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

## Execution Contexts

When we execute code in `JavaScript` it is a misconception that the code is read line by line straight down the page. In reality, we have multiple concepts at work as the `engine` parses the code. The first of these is the `Execution Context (EC)`, this is to say the `environment` in which the code is executed. This `environment` consists of the value of `this` (the keyword), variables, objects, and functions, within the `scope` of that particular context.

Having spent any amount of time with `JavaScript` you will have run into issues before regarding `scope` or the execution of your code. If we attempt to access something out of `scope` JS will complain, if we attempt to declare two items of the same name in `scope` JS will once again complain. Logic errors can be some of the more difficult to diagnose, when you have an issue with syntax your editor will often point you to the exact line of the problem, but with logic errors we must do much of the work ourselves. Understanding how `JavaScript` executes, and therefore "sees", your code is important for building an adequate mental model for the purpose debugging.

Multiple "types" of `Execution Contexts` exist. The first of which is the one you have worked in even with simple `JavaScript` code known as the `Global Execution Context (GEC)`. The GEC is the default `Execution Context`, as such, any code we write will begin within the EC, it contains all `global` code which is not within a function or object. The GEC may only ever have a single instance, this is due to the fact JS itself is `single threaded`; this means JS may only contain the execution of instructions in a single sequence. Alternatively, something languages like `Java` may enable multithreading processes in which multiple process sequences may be executed in `parallel` on different threads, they may share resources. `Single Threaded` languages are blocking, this is why in JS we use asynchronous calls such as `promises` to trigger `callbacks` which are run once all other processes have completed (we will delve into this further when we talk more about the `Node Event Loop` later), just know that whilst `multithreading` sounds great, and can be advantageous depending on your usage, it can also greatly increase complexity. We also have the `Functional Execution Context`, as the name implies this is the context created by the JS `engine` whenever it finds a `function` call. Each `function` has it's own EC and it also retains access to all of the code defined in the GEC. Lastly we have the `Execution Context Stack (ECS)`, once again implied by it's name, the `ECS` is actually a stack data structure which stores all of the execution stacks created during the life-cycle of the script. The `GEC` is present by default within the `ECS` at the bottom of the stack. Whilst executing code in the `GEC` if the JS `engine` finds a function call the created `FEC` for that function is pushed to the top of the stack, the `engine` then executes the function whose `EC` is at the top of the `ECS`. Once all the code in the function has been executed the JS engine will `pop` that call off the stack and begin execution of the next item in the stack. 
