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
this is because function declarations are not actually added to the `global` object due to their intent as being used atop of our function scopes. The takeaway from this is that `this` is not determined by where the function is declared, but instead from whence the function itself is invoked. This is an important distinction to understand as in JS it is perfectly legal to reuse the functions we define, we can share functions between objects using `this` to refer to the particular object which invoked said function.

<br />

<pre>
<code>

'use strict';

const person = {
    name: 'Kenny',
    greeting() {
        console.log(`Hello from ${this.name}`)
    },
};

let obj2 = {
    name: 'Cartman',
    greeting: obj.greeting,
};

obj2.greeting();

</code>
</pre>

<br />

In this case what would you expect `obj2` to output if we call the `greeting` method? if you answered "Hello Cartmen" you would be correct, this is because although we are referencing the function code within our `obj` object the object which is actually invoking the function is `obj2`. If we were to instead invoke the greeting on our `obj` then we would receive the output "Hello Kenny" instead. It is important to be wary of parentheses when using this as invoking the method unintentionally could potentially lead to the output of unexpected results.

One of the best examples I have come across showcases some of the complexity we are introduced to when using the keyword `this` comes from [Steven Hancock](https://www.udemy.com/user/stevenhancock/) who i think has some of the most concise videos on the more complex topics in JS on the internet, lets take a look:

<br />

<pre>
<code>

const outer = function() {
  console.log(1, this);
  const inner1 = function() {
      console.log(2, this);
      let obj = {
          name: 'Steven',
          insideObj() {
              console.log(3, this);
              const withinInsideObj = function() {
                  console.log(4, this);
              };
              withinInsideObj();
          }
      };
      obj.insideObj();
  };

  inner1();
};

outer();

</code>
</pre>

<br />

Take a look at this and try to make a prediction of what `this` will equate to in each part of the code. Once you have take a look at the dropdown below.

<details>
    <summary>Answer</summary>

<pre>
<code>

const outer = function() {
  console.log(1, this); // Object [global]
  const inner1 = function() {
      console.log(2, this); // Object [global]
      let obj = {
          name: 'SomeFunction',
          insideObj() {
              console.log(3, this); // [Object object]
              const withinInsideObj = function() {
                  console.log(4, this); // Object [global]
              };
              withinInsideObj();
          }
      };
      obj.insideObj();
  };

  inner1();
};

outer();

</code>
</pre>

</details>

This should demonstrate rather well how the value of `this` differs throughout JS and more importantly why it does so. Notice how those functions which are simply called defer to the global object whilst those called on a particular object have `this` bound to that object instance. If we activate strict mode at the top of our code we see that the functions which returned the `global` reference will instead be `undefined`. Now we understand the rules of `this` we can see clearly how `this` will behave in any circumstance, however, it may not always be how we want. There are methods for changing the binding of `this` to reference exactly the object we want to which can be useful in these circumstances. Look at the above code again, whilst we can rationalize why `this` within the `withinInsideObj` function would return the `global` object it does not necessarily make any sense. Why would we be using `this` at all within this context unless we were intending to reference the `obj` of which the function itself belongs to?

Another problem we have with `this` is when the `object` it was bound to is removed, in other words when we lose our reference `object`. If we have a function which uses the `this` keyword to return some data from an `object` we see that our data is returned as we would expect:

<br />

<pre>
<code>
const displayName = function() {
    console.log(this.name);
}

let person = {
    name: 'Connor',
    displayName,
}


person.displayName();
</code>
</pre>

<br />

However, what if we them want to reuse our function outside of our object? what if we re-assign our function to another variable? lets add some code to the bottom of the above code:

<br />

<pre>
<code>
console.log(person.displayName());

const showName = person.displayName;
console.log(showName);
</code>
</pre>

<br />

In this case we have now reassigned our function and thus lost reference to our `object` and so receive an error `Cannot read property 'name' of undefined as displayName`, you can see that this might be an issue if we want the ability to create shortened versions of our functions but it gets worse, we can also lose this reference in `callbacks`.

<br />

<pre>
<code>
const person = {
    name: 'Edward',
    displayName() {
        console.log(this.name);
    }
};

const someCallback = function(callback) {
    if (typeof callback === 'function') {
        callback();
    }
};

someCallback(obj.displayName);
</code>
</pre>

<br />

This is because our reference of `this` is now pointing to the `global` object since it is being called from our `callback`. As you can imagine this is exactly the same when using any of our `async` function calls in the `Web API` such as `setTimeout`, `setInterval`, and so on. Since this is handled by the browser it is not called directly, instead being added to our `callback queue` where it is eventually invoked by the JS engine attaching parentheses to it when either our timer completes, or we receive our data, dependent on the process which has been queued. Interestingly, because of this browser handling strict mode will not set this reference to `undefined`, we instead receive the `global` object still.

A third, somewhat stranger, issue can be seen when creating old JS applications. When we build modern JS applications we don't often have to select elements in the `DOM` ourselves anymore, however, this is a frequently undertaken task we complete within vanilla JS and applications which use some other frameworks differing from `componentised` methodologies like `React`.

<br />

<pre>
<code>
const person = {
    name: 'Ezio',
    displayName() {
        console.log(this.name);
    }
};

const button = document.getElementById('btn');
button.addEventListener('click', person.displayName);
</code>
</pre>

<br />

In this example when we click our hypothetical button we would receive a reference to the `HTML` element. This would likely be completely unexpected from our understanding of JS but if we think about it it begins to make sense. Bear in mind what is happening here, we are calling the function `addEventListener` which is on our `EventTarget` object. The second function provided is a callback which is our `listener` function. When we enter the function execution context our function code will be assigned to a `listener` label, but when it is called it is called upon our `EventTarget` object, hence the reference that `this` is bound to is our `EventTarget` which happens to be our `HTMLElement`.

So, in these cases how do we get around using `this` whilst still having it reference the `object` we want it to? after all, if we want reusable functions `this` can be incredibly useful for making our code more generic. Luckily JS provides us with a few methods for dealing with this.

<details>
    <summary>Call</summary>

The first methods we have is the `call` method. This method lives on the `Function` objects prototype chain, it allows us to call any given function with a given `this` value. Lets take a look at an example of this:

<br />

<pre>
<code>

const assassin1 = {
    name: 'Altaïr',
    displayName() {
        console.log(this.name);
    },
};

const assassin2 = {
    name: 'Eivor',
};

assassin1.displayName.call(assassin2);
assassin1.displayName.apply(assassin2);

</code>
</pre>

<br />

In this case we invoke the `call` method which provides a reference to `this`. In doing so the function we call `call` on is invoked with the `object` reference we pass to the `call` function. A similar function is also available called `apply`, the only difference being that `apply` allows you to invoke a function with arguments as an array whilst `call` requires the arguments to be passed explicitly.

</details>

<br />

<details>
    <summary>Bind</summary>

Bind is very different from `call` and `apply`. Rather than immediately invoking a function `bind` allows us to determine the reference of `this` but instead returns a `function` for us to invoke manually:

<br />

<pre>
<code>

const assassin1 = {
    name: 'Bayek',
    displayName() {
        console.log(this.name);
    },
};

const assassin2 = {
    name: 'Jacob',
};

assassin1.displayName.bind(assassin2)();

</code>
</pre>

<br />

Notice how call the function returned from `bind` using an immediately invoked function expression. Commonly you will more than likely set this to a variable which will then contain the function code returned from `bind`. Bind also offers the ability to `bind` parameters which would mean every time we call the function the bound arguments would be passed.


</details>

<br />


---

<div align="right">

[<< prev](./15_execution_contexts.md) | [next >>]()

</div>