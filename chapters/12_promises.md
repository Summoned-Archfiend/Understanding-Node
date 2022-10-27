# Promises

`ES2015` (aka ES6) introduced new features for handling `asynchronous` code in JS. Promises enable a two pronged `facade` functions which do two things.

1. They set up our background web browser work much like `callbacks`
2. They immediately return a `placeholder` object

This differs from our initial use of `callbacks`, when we used our `facade` to set up a `timer` we didn't really get any means of tracking the our code in the `browser`. True we can log out the value when we begin setup and when the function is eventually called, but in-between the initial and end states there is no means of knowing the status of our `callback`, we are left merely waiting and hoping that at some point it will be pushed onto the `call stack` and complete it's execution. We can defined a `callback` as a function which is called within another function, in the case of our previous examples the `browser` handles taking our function and attaching the parentheses later in order to `push` to function to our `call stack`. On the other hand `promises` are used much in the same way as `callbacks` yet reduce the complexity of the code by removing he necessity for nested callbacks to handle data injected via the function arguments.

`Promises` not only improve upon `callbacks` in providing a more manageable means of working with `asynchronous` code, they also actively improve the means by which we are able to handle errors, the benefits of which include:

1. Readability - Promises are far more readable than callbacks
2. Handling - Asynchronous operations and error handling improved
3. Flow Control - How asynchronous logic flows through the cod
4. Error Handling - More elegant error handling

`Promises` are named in such a manner that they are explicit as to what it is without the need to understand what it is. What do we mean by this? well... what do you think a `promise` is? what is a `promise` in any given context? you may say, it is an indication from another person of something yet to come, or a declaration, assuring that something will occur in the future. I think the best way we may define a promise is as such:

<div align="center" >
<BlockQuote style="margin: auto; width: 500px;">
<em>
"A vow or oath that one will attempt to fulfill some obligation in the future."
</BlockQuote>
</div>

We don't necessarily need to act on a `promise` right away, but we know that at some point the `promise` will either be fulfilled or broken. In fact, in the case of JS, our promises have four potential states:

1. Fulfilled - Action related to the promise succeeded
2. Rejected - Action related to the promise failed
3. Pending - Promise is still pending - it is neither fulfilled nor rejected
4. Settled - Promise has been either Fulfilled or Rejected

As such, we declare promises via a `Promise Constructor`. The `Promise` constructor takes a single argument which is itself a `callback` function. This `callback` function takes two arguments; `resolve` and `reject`, we use these by performing operations within our `callback`, if everything in the `callback` succeeds we then call `resolve` otherwise we call `reject`. `Promises` can then be `consumed` by the consumer functions `then` and `catch`. `then()` is invoked when a promise is either `resolved` or `rejected`, whilst `catch()` will be triggered when we reach an `error` state or again if our `promise` is `rejected`.

Again this raises a question. If our `rejected` promise triggers both `then` and `catch` in what order will be execute? `then` will always be ran first, followed by `catch` if the `promise` resolved successfully and a result is received. `catch` will always run first followed by `then` if the `promise` is `rejected` or an `error` is received. So what is different about these functions? nothing really, it is simply for readability, `catch` is actually just shorthand for `.then(null, errorHandler))`.

<br />

<pre>
const promise = Promise((res, rej) => {
    const x = 1;
    const y = 1;

    if (x === y) {
        resolve();
    } else {
        reject();
    }
});

promise
    .then(() => console.log('Success!'))
    .catch(() => console.log('Uh-oh! Error!'));
</pre>

<br />

So do `promises` function in pure JS? no, they are using another of our `browser features`. When create a `promise` in JS within our `browser features` a network request is created under the hood, but rather than simply doing this and JS have no means of interacting with it until later a `promise` will have a consequence in JS immediately, the point at which our `fetch` label triggers our `network request` within the `browser` JS will simultaneously receive a `promise` object. This is a "special" type of object in such that it will begin with an empty argument which will be updated by our `browser` features. This object will sit in our `GVE`, when our background processes complete, the data returned will fill in the blank space in our objects data argument.

---

<div align="right">

[<< prev](./11_web_api_interface.md) | [next >>](./)

</div>