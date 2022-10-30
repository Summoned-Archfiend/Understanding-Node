# Event Loop

In the previous chapters we focused extensively on `promises`. Due to the sheer amount
handled under the hood when dealing with `promises` we traversed a lot of ground over
the course of the previous two chapters and introduced a few new concepts which we
have not yet had chance to really delve into. In this chapter we will cover these
concepts in more detail starting with what the `event loop` is, how it functions
and then down to each of the individual queues which exist in JS. This will be
essential for when we delve back into `Node`.

So, what is the `event loop`? we have seen it in action already, essentially the `event loop` is the secret behind JS `asynchronous` code. Whilst JS is a `blocking` single-threaded language the `event loop` allows it to masquerade as a multi-threaded language via a few data structures and clever tricks. Let us first take a look at a quick visualisation of the JS `event loops` as provided by [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) themselves.

<br />

<div align="center">
    <img src="../images/jsRuntime.svg">
</div>

<br />

This is a very simplified visual mode, as we can see we have three concepts, the `stack`, the `heap`, and the `queue`. Objects are allocated in the `heap` which denotes a large unstructured region of memory. The queue specifically refers to our `message queue` which lists messages to be processed. Each message has a function associated which is called to handle message data. At some point during the `event loops` the runtime begins handling messages from the `queue` and its corresponding function is called. This creates a new `stack frame` for the functions use.

If we apply this to our previous examples we can see that the `event loops` is constructed of our `call stack`, our `queues`, and our `heap` memory. Lets take a look at an example beginning with `synchronous` JS.

## Synchronous Event Loop

JS is a blocking single-threaded language. As such we can imagine this as a restaurant with a single waiter. Now, this may not be a problem if there are few guests, or if the tasks are spaced out. In this case the waiter has no issue serving the guests in the order at which they raise their hands. However, if the restaurant becomes busy and another guest raises their hand whilst the waiter is still serving another he cannot serve them both at once. instead he must make a note to got to that customer next after he completes the current task. This analogy is similar to a simple JS application, every task we tell JS to conduct must be performed in order. These tasks are added to the `event queue` which is how JS keeps track of all of the tasks which are requested. As we receive events they are added to the `queue`, should the thread be busy with a particular task the other tasks will remain on the queue until the `thread` has completed the current task and pops the next one into the `call stack`. You can imagine the `event loop` simply as a `while` loop which runs whilst the `event queue` is not empty. This is our main thread of execution, our global context. As we learned previously no `asynchronous` code will run until all `synchronous` code in this context completes. If the process currently being executed happens to call another process the `thread` has no choice but to follow these calls in the order that they are called until the execution completes even if other tasks require resources.

## Asynchronous Event Loop

Much like our prior example of the `synchronous` event loop our `asynchronous` example works in exactly the same way. The difference here is when we come across an `asynchronous` task such as a `callback` or a `promise` which utilises our browser features. In this case our browser setup will configure whatever may need to be configured, for `promises` we receive our special `promise` object, for a `timer` we simply get a `timer` added to the `callback queue`. After each line of code the `event loop` will check our queues. This includes the `callback` and `microtask` queue, note that our items will not be added to the `callback` until they have completed (for instance the `timer` will await a duration and a `promise` will await the response). If the `event loop` finds an item in our `callback queue` it will be popped from the `callback` or `microtask` queue respectively. Once all `synchronous` code has completed the `event loop` will pop these tasks from our `queues` pushing them unto the `call stack`.

Now that we have a basic level of understanding of the concept of the `event loop` we will take a look at the individual concepts starting with the `call stack`.


## Call Stack

When execution of a JS application begins the `JVE` sets up a global execution context. This is instantly pushed unto the `call stack` and will remain as such until all code is completed. When we are running in our global execution context this is the code which is being run. If I write everything in the `GVE` then this will remain on the `call stack` until the entirety of the script ceases execution.

<br />

<img src="../images/callStack.png">

<br />

If we have another function call within our global context we defer to a function execution context. This `FEC` also gets pushed to the `call stack`, this is how JS keeps track of our execution order, along with function `scope` (note that in these examples we have omitted the execution contexts, we know how these work at this point, this is simply to illustrate the `call stack` itself).

<br />

<img src="../images/callStackAdd.png">

<br />