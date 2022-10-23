# Synchronicity

As we already know JS is a `synchronous` language. This means that code must be run `lexically`, line-by-line, and in order, no line of code may execute until the previous line as completed. if we think about this for more than a second however it becomes clear that this cannot possibly be the case? we know from experience that JS apps do not simply pause their execution and wait on a long process, lest any kind of timely process would cause our applications to hang. This would certainly be problematic for large scale applications with many concurrent users, and yet, it is true, JS is a `synchronous` language, it is `single-threaded`, and `blocking`, meaning that when we can only run one process at a time and that process will block execution until it completes. If we run the following code however:

<pre>
<code>
function printHello () {
    console.log("Hello");
}

setTimeout(printHello, 100);

console.log("Me first!");
</code>
</pre>

JS seems to contradict everything we have just stated, for the response returns `Me first!` followed by `Hello` which seems to be the absolute reverse of what we would expect. Atop of this we can even change our timeout to `0` and we still retain this same behaviour. What is happening here? in which realm is it that a single-threaded blocking language could possibly apparently skip a line of code, run the next line, and then come back to the skipped line to run it again? In order to understand this we must explore further into areas of our JS execution which are not even actually JS at all. The JS `engine` has three core sections; `memory`, `thread of execution`, and the `call stack`, this is not enough, in order to use JS effectively we must also include `browser` features, `promises`, the `event loop`, `callback/task queue`, and the `microtask queue`.

First we posit the question, where does JS run? if you have read the previous chapters you will know at least one of the potential answers to this question; JS is run by a `C++` program, the JS `engine`. This is how we run `node` applications but what about `vanilla` JS? it is run in the `browser` which, again as discussed in previous chapters, has an embedded version of a `JavaScript engine`, if you are using chrome for instance this is `V8` just like `node`. In this section we are going to focus more so on `vanilla`, we will cover `node` in later chapters but it is important to have a foundational understanding of how JS is using the additional tools it accesses in the context of the browser as `node` will work similarly.

So, we know JS is run by the JS `engine`, we know the browser houses an `engine`, but what other features does the browser house that we have access to? well, for one it has our `console` that we use all the time, `devtools`, `websockets`, `networking`, `rendering (DOM)`,`timer`, `local storage`. As we learned earlier JS does not have feautres like `networking` or `websockets` in itself. JS cannot itself `speak` to the internet, nor access filsystems, or any other lower level processes for that matter. In `node` this is performed by `C++` extensions from the `V8` engine which we are able to extend, in the `browser` this comes form features built in to our `broswer` itself, we don't code for these directly, but JS does allow us to interface with these features within the `browser`.

So the next question you should be asking; if these features are not a part of JS itself then how to we interact with them? well... if we look back to our `node` knowledge we know that when we interact with the `V8` engine we utilise `C++` functions, that is, functions that written in `C++` as `labels` which the engine will seek out in our JS code. Similarly, the `browser` uses `facade functions` in the `browser` i.e. functions that look like JS but are actually functions from the browser itself, in whatever language it may be written in, which allow us to interface with these features. For each of these features we get `labels` which allow us to interact with them. If we want to set a `Timer` for example we would use the `setTimeout` label, this means that the `setTimeout` function is doing nothing of note in JS but, much like in `node`, it is performing all of it's interesting functionality in another language, `C++` if we are using `chrome`. Take a moment to really consider this, head back to the earlier [chapter](../chapters/2_node.md) if you need a refresher, but understand, this is exactly the same process we use to interface with `C++` in `node`, we have labels which the `engine` will look for as it parses our JS code, should it find one of these labels it will then run the corresponding function within the `engine` code. Another example would be `Document`, this is again doing nothing in JS, it is simply a command to tell the `engine` we are going to be using the `Document` feature in the `web browser`, we do this via the label `XHR/fetch`, for `console` it is `console` and so on...

The biggest takeaway here is 1. the similarity of `vanilla` JS in your browser to `node`, and 2. the understanding that when we are using JS we are not just using JS as we believe we have been thus far, instead, we are interfacing with many different external pieces. We will walk through some examples of JS execution using this newfound knowledge to see how our `engine` interacts with the `browser` when we use these labels.

<br />

---

<div align="right">

[<< prev](./9_backpacks.mdd) | [next >>](./11_web_api_interface.md)

</div>