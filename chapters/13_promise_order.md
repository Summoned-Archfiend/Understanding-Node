# Continuing Promises

In the previous chapter we explored the `rules` or precedence along with the `rules` governing at which point our `callback` functions are run, along with "how" our functions are mapped, when they trigger, and how our request data is passed back to JS from our browser. We covered a lot, and you'd be forgiven for thinking we had finished with `promises`, yet there is so much more to learn in regards to promises. First we must realise we are missing a key component of our execution, when does our deferred function in the fulfillment array, given that it is automatically invoked, end up on the `call stack` exactly? To explore this we are going to look at a more complex piece of code, here we will see the order of which our deferred functionality returns to JS to be pushed to our `call stack` and executed.

<pre>
function print(data) { console.log(data); }
function sayHello() { console.log('Hello!'); }
function blockFor300ms() { ... }

setTimeout(sayHello, 0);

const futureData = fetch(SOME_API_ENDPOINT);
futureData.then(print);

blockFor300ms();

console.log('Me First!');
</pre>

Let us first consolidate what we already know. On initial analysis we instantly know that in our `GVE` 3 functions are about to be declared, one with the label `print`, another with the label `sayHello`, and another with the label `blockFor300ms`.  We also know that when we use our `setTimeout` facade we will be utilising a `browser feature` in which a timer will be set up with the duration of `0ms` and a `callback` prepared referencing our `sayHello` function code.

We then know that our `fetch` facade will also instantiate another `browser feature` which will set up a `network request`, we wont know exactly when this will complete as it is determined by when the data is returned, but we do know that until it is, after each line, the JS engine will check our `onComplete` in the same manner as the `timer`. We also know that at the same time our `promise` object will be created in JS with our `value` and `onFulfilled` fields, initially blank and empty. When we call `then` we add our `print` function to the `onFulfilled` array, and this will be run when our `value` is updated in the `object`. Finally we call know that `Me First` will be logged, presumably first, not simply because of the string itself, instead we can deduce this from the fact we know that our `timer` will be deferred, although it is `0ms` experience tells us that this will be added to the `callback queue` which will not be popped until all other code is executed. we can also assume that this will be similar for our `fetch` facade as it is not only also a `browser feature`, it is a `blocking` call which would other wise hang our application whilst we await data, from the previous example we know that this does not occur, therefore it must be deferred to allow JS to continue execution.

So how about we parse through this and determine whether or not our predictions are correct? remember `computing` is a `science`, although many don't see development that way it really is, this means you should always be looking to implement the scientific method where you can. This means beginning with a problem, analysing said problem, determining a hypothesis, testing the hypothesis, observing the effects, condensing the hypothesis into a coherent theory, and then testing said theory once again with observational data. A mistake many junior devs make is either not starting at the beginning of a problem, being unwilling to take a step back, or blindly trying things without any methodology, this increases the time it may take to solve a problem and decreases your chances of ever even solving it, let alone understanding where it went wrong in the first place. Be methodical, be a scientist.

## Exploring Call Precedence