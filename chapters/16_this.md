# This Keyword

This in JS is an incredibly frustrating concept of `Javascript` mostly for the fact it works differently to the `this` you are used to in other languages. For example in languages like `PHP` and `Java` the `this` keyword refers to the current instance of the class. This is not so in JS, JS is not a class based language, it is a prototypal language, therefore there is no instance of the class for it to reference as such. As we discussed earlier JS scopes also differ in the fact that JS uses `global` and `function` contexts, these are the contexts to which we bind our `this` keyword.

Generally speaking `this` in JS refers to the `object` to which the property belongs. It is the `object` of which is currently calling the function:

<br />

<pre>
<code>

let x = {
    count: 0,
    increment: function () {
        return ++this.count;
    },
};

x.increment();

</code>
</pre>

<br />

In this example since the `increment` function is a property of `counter` `this` is bound to our `counter` object. Should we have no reference to an `object` as such, such as in the `global` context, `this` is instead bound to the `global` object. This can cause issues if we call a function expecting it to refer to a particular object but instead find that our keyword is bound to the `global` object.

<br />

<pre>
<code>

var x = function () {
    return this;
}

x();

</code>
</pre>

<br />

This is one of the reasons using `strict mode` is a good idea. If we use `strict mode` the `this` keyword would then be bound as `undefined`, unless it is invoked from an `object`, meaning that we wont accidentally access our `global` object. It should be noted that `strict mode` can be activated on a per file, or even per function, basis.
`this` is not bound until function invocation. Upon calling a function the JS engine binds `this` to the `global` object in the `global context`, this is because by default all functions are added to the global object, thus, are invoked by the `global object`, therefore the `global object` is the `object` which invokes our function even if we don't provide the object specifically:

<br />

<pre>
<code>
var getThis = function() {
    return this;
};

getThis();

</code>
</pre>

If we take a look at our `global` object we see that the function itself is a property of the `global object`. We can look at this object via the `globalThis` variable, this references the `global` object despite whether we are running in `node` or the `browser`, or any other JS implementation.

Now, those of you who are paying attention might take note that we are using `var` to declare our variable here, so what happens if we create a function using `let` or `const` instead?

<br />

<pre>
<code>
const getThis = function () {
    return this;
};

getThis();
</code>
</pre>

<br />

We see that the `global` object is still output. However, if we now check our `global` object there is no function assigned to it of the label `getThis`. So why is it that `window` is still considered the `object` invoking this function?
this is because function declarations are not actually added to the `global` object due to their intent as being used atop of our function scopes. The takeaway from this is that `this` is not determined by where the function is declared, but instead from whence the function itself is invoked.

---

<div align="right">

[<< prev](./15_execution_contexts.md) | [next >>]()

</div>