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
const promise = new Promise((res, rej) => {
    const x = 1;
    const y = 1;

    if (x === y) {
        res();
    } else {
        rej();
    }
});

promise
    .then(() => console.log('Success!'))
    .catch(() => console.log('Uh-oh! Error!'));
</pre>

<br />

So do `promises` function in pure JS? no, they are using another of our `browser features`. When create a `promise` in JS within our `browser features` a network request is created under the hood, but rather than simply doing this and JS have no means of interacting with it until later a `promise` will have a consequence in JS immediately, the point at which our `fetch` label triggers our `network request` within the `browser` JS will simultaneously receive a `promise` object. This is a "special" type of object in such that it will begin with an empty argument which will be updated by our `browser` features. This object will sit in our `GVE`, when our background processes complete, the data returned will fill in the blank space in our objects data argument.

## Promises in Action

It's all well and good defining `promises` but to really understand them you need to see them in action. Lets run through an example as we have with `callbacks`. This will be somewhat more complex than previous examples due to the sheer amount that occurs with `promises` under the hood. This small five letter word is going to be responsible for the concurrent management of our `promise` object in JS and the configuration of our `network` communication in the browser.

<pre>
function print(data) {
    console.log(data);
}

const futureData = fetch(SOME_API_ENDPOINT);
futureData.then(print);

console.log('Me First!');
</pre>

We begin with out first line where we declare a function `print`. This creates a `label` in the `GVE` in which the entirety of our `code` is stored just as we have seen a number of times before. We then declare a constant of the label `futureData`. This is, as usual, uninitialized at first, however, we know that the value of this constant will be the `evaluation` of the function call (or `facade` call in this case). To the right we see we are calling our `fetch` facade function, and we know that this will set up our `network request` in JS, we also know this must have a consequence immediately in JS.

### JS Consequence

The first consequence we will discuss is the one that happens within JS itself. At this moment in our code we receive our special `promise` object, this is just a normal `Object` like any other JS object, created automatically in JS by `fetch`. This `Object` comes bundled with two `properties`:

1. Value -
2. OnFulfilled -

Value at this point is undefined as it has yet to have any value set to it. `OnFulfilled` is actually a hidden property which holds the value of an empty array. This whole `Object` is stored in the `futureData` label in the `GVE` to which it is assigned. Now, when we head off to the `web browser features` to set up our `network request` we have an `Object` kept in memory.

### Web Browser Consequence

Our second consequence occurs within the `web browser`. This is where we set up our `network request`, usually an `XHR` request (`XML HTTP Request`). We will keep this generic and refer to this here as simply a `network request`. Upon creating our `promise` the `browser` sets up our `network request` which requires the knowledge of the `address`, consisting of a `domain` (the address of the computer we are communicating with) and `path` (the path to the `endpoint` we are calling), passed to it from our arguments supplied to `fetch`. `Fetch` will also send a third argument, this will be the `HTTP` method we are using, the `HTTP verb`, which specifies our action. `Fetch` defaults to a `GET` request, if we wanted to send a `POST` request we could supply a secondary argument to `fetch` in the form of an `options` object to specify information about our intended request.

<br />

<div align="center">
    <img src="../images/networkConsequence.png">
</div>

<br />

This is already a lot considering the small amount of code we have thus far, but even now, our `web browser` still isn't done yet. Consider what ocurred inside our `browser` when we were using `callbacks`, we have set up our `network request`, but we have not yet checked for `completion` of our `callback`.  Unlike when we used the `timer` there is no definite time at which our `callback` will be pushed to the `callback queue`, instead, we are reliant on the `x` amount of time it may or may not take to retrieve data from the endpoint we provided. As such, our `network request` will first begin its work. It will henceforth send a request to our data source, when our browser performs it's first complete check at `0ms` it will however be incomplete as, althoguh we have sent the request, we are still waiting on a response from our source.

<br />

<div align="center">
    <img src="../images/externalRequest.png">
</div>

<br />

When we used `callbacks` we passed in a function to run when our `onComplete` completes. However, we don't have any `function` passed into `fetch` here, so how do we know what to do on completion anyway? this is where our special `promsie `object comes back in. On completion, when our response data is received, it will instead be passed back into JS within the empty `value` property of our `promise` object. This raises a new problem, we don't know when this data will be returned, we have no inclination as to when it will be received, but when it is we need JS to automatically run some code to use the request at perform whatever task we might want to perform with it. This is where the `onFulfilled` property comes in. The `onFulfilled` property is an array, and there is a very good reason for this, this proeprty will store all our functions that we want to have automatically run when the `value` property is updated, which happens to be when our `fetch` task completes hopefully returning the data back from our source successfully. As such, we need a way to placing our `print` function within this array. This would mean that when our data is received the `show` function would automatically be run when `value` is updated with our response data. We do this by utilising our consumer function `then`, this function pushes the provided arguments to our `onFulfilled` array, we cannot do this directly as `onFulfilled` is a hidden property.

As such we move to our next line where we call `then` we call it on our special promise object `futureData` which is currently saved in our `GVE` under this label. We pass to it our entire function definition of `print`, `then` pushes this into our `onFulfilled` array.

<br />

<div align="center">
    <img src="../images/pushThen.png">
</div>

<br />

Take a moment to appreciat that all of this setup came from simply 2 lines of code. In the background we have all of our setup completed, we are awaiting a response, talking to an external source, we have a callback waiting to run, and we have our special `Object` which gives us a connection from our `browser` back to JS, remember, when our response data comes in through our `network response` the `value` of this object will update triggering all `callbacks` within our hidden `onFullfilled` property, also note that `fetch` that we have been using is merely a `label` for interacting with our `network response` feature in the `browser`, as with all these features this is actually running in another language which supports the ability to communicate accross a network as JS does not. This means we can now move on with executing out code, recall that as we do on each line our `Event Loop` will check our `complete` status.

So, we move on, and thus at `1ms` of execution time we log the string "`Me First!`" to our console.

---

<div align="right">

[<< prev](./11_web_api_interface.md) | [next >>](./)

</div>