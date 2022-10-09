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

<!-- TODO: discuss execution contexts, communication with browser and C++ function including libuv and sockets -->