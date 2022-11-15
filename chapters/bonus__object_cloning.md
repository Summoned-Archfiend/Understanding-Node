# Object Cloning

This chapter is more of an `aside` than anything. Recently in my workplace I worked on a large project which involved the need to clone `objects`. This is quite an overlooked principle in JS that can actually lead to many issues if you don't realise how JS handles objects under the hood. You are likely wondering at this stageL "can't we just use the `spread` operator to clone an object?" well... yes and no.

So... lets say we have an `Object`, we want to clone the `Object` and have an exact copy. First of all we need to be sure that we are passing by `value` as `Objects` are passing a `reference`. This can be somewhat strange in JS as many languages offer alternative syntax for passing by reference vs passing by value, for instance `PHP` uses the `&` operator when passing by reference. In JS whether something is passed by `reference` or by `value` is determined by the `type`. Generally, primitive types are all passed by `value`, anything that is not a primitive value is an `Object` in JS and thus is passed by `reference`. If we want to clone something we actually want to create an entirely separate entity not simply a label referring to the same location in memory.

For a quick example of this we can use an array, notice how we push to the original array and yet the value increases on our "copy". This is because our `Object` reference in memory is passed to `arr2` therefore although there are two labels they refer to the same location in memory, hence are actually referring to exactly the same data.

<br />

<pre>
<code>
const arr = [1, 2, 3];

let arr2 = arr;

arr.push(8);

console.log(arr2);
</code>
</pre>

<br />

Due to this the output we receive from this is actually an array containing the items `[1, 2, 3, 8]`, thus we don't actually have a "clone" but two references. Similarly here is an example using object syntax:

<br />

<pre>
<code>
const baseTheme = {
    appBar: {
        color: 'blue',
        height: '200px',
    },
    navigation: {
        color: 'green',
        height: '100px',
    },
}

let darkTheme = baseTheme;

baseTheme.test = {
    hello: 'world',
}

console.log(darkTheme);
</code>
</pre>

<br />

Our console log of `darkTheme` contains our `test` update even though we added the property to the `baseTheme`. This is a problem if we want to create a generation system where we override aspects of one object with the properties of another. We need the objects to be treated as separate entities, and thus, we cannot simply create a reference. This is where any JS dev that has been working with JS for some time will likely think to use `Object.assign` or even the more modern `spread` syntax. We can do this as such:

<br />

<pre>
<code>
const baseTheme = {
    appBar: {
        color: 'blue',
        height: '200px',
    },
    navigation: {
        color: 'green',
        height: '100px',
    },
}

let darkTheme = { ...baseTheme };

baseTheme.test = {
    hello: 'world',
}

console.log(darkTheme);
console.log(baseTheme);

/** baseTheme output **/

{
    "appBar": {
        "color": "blue",
        "height": "200px"
    },
    "navigation": {
        "color": "green",
        "height": "100px"
    },
    "test": {
        "hello": "world"
    }
}

/** darkTheme output **/

{
    "appBar": {
        "color": "blue",
        "height": "200px"
    },
    "navigation": {
        "color": "green",
        "height": "100px"
    },
}

</code>
</pre>

<br />

Hey presto! it works! we have a totally separate clone of our `Object` so whats the problem? Well, this is all well and good when we have only one layer of nested objects, but what if we want a deeply nested construct? What if I want the structure to be representative of our actual DOM structure to make the `theme` easier to work with? well, why don't we try simply adding some extra nested objects?

<br />

<pre>
<code>

const baseTheme = {
    appBar: {
        color: 'blue',
        height: '200px',
    },
    navigation: {
        color: 'green',
        height: '100px',
        list: {
            color: 'purple',
            height: '100%',
            listItem: {
                color: 'green',
                height: '50%',
            }
        }
    },
}

let darkTheme = { ...baseTheme };

baseTheme.test = {
    hello: 'world',
}

console.log(darkTheme);
console.log(baseTheme);

/** baseTheme output **/

{
    "appBar": {
        "color": "blue",
        "height": "200px"
    },
    "navigation": {
        "color": "green",
        "height": "100px",
        "list": {
            "color": "purple",
            "height": "100%",
            "listItem": {
                "color": "green",
                "height": "50%"
            }
        }
    },
    "test": {
        "hello": "world"
    }
}

/** darkTheme output **/

{
    "appBar": {
        "color": "blue",
        "height": "200px"
    },
    "navigation": {
        "color": "green",
        "height": "100px",
        "list": {
            "color": "purple",
            "height": "100%",
            "listItem": {
                "color": "green",
                "height": "50%"
            }
        }
    }
}

</code>
</pre>


<br />

This all looks good! what are you talking about, the `Object` looks exactly as we want! ah, but what if we now update one of the child objects properties? lets try updatnig our `listItem` color on the `baseTheme`.

<br />

<pre>
<code>

baseTheme.navigation.list.color = 'green';

console.log(darkTheme.navigation.list.color)

/** output **/
green

</code>
</pre>

<br />

Ah, we have a problem! notice how our object is now copying the `base` object again? this is because our nested children are now being passed by `reference` even though we have used the spread operator. Our first level of `Objects` are passed as values, yes, but anything deeper nested is now a `reference`. This is because the spread operator, and Object.assign, only conduct what is known as a `shallow merge`. Often this is quite alright, but in my particular case where we wanted to store a lot of structure, and data, with the ability to override it from multiple other `Objects` this just doesn't cut it. We need the ability to update any one of these `Objects`, we want a fallback to the base but if there are other values we want them to merge and overwrite our base. Thus, what we actually want is something that JS does not support through these methods, we want a `deep merge`. Now, full disclaimer, there are plenty of robust libraries out there for conducting `deep merge` in a manner that we can be sure works, that are well tested, and that enable us to have confidence in our code. I took this approach in our official solution, as such, I had used the `lodash` merge method which also allows us to pass a `customiser`. I decided this because of the level of complexity we were dealing with in the feature and would recommend a similar approach if you can, often tested libraries are far more reliable than what we can come up with ourselves due to the sheer number of users using them. Saying that, it is not actually completely necessary to take this approach.

We have a bit of a trick in JS, if we want to replace the `Object` we can convert our `object` to a `string` and then convert it back to an `object`. In this manner JS will pass a `string` by value (as it is a primitive type), hence, converting that string back to an object will yield a deep cloned object:

<br />

<pre>
<code>

const baseTheme = {
    appBar: {
        color: 'blue',
        height: '200px',
    },
    navigation: {
        color: 'green',
        height: '100px',
        list: {
            color: 'purple',
            height: '100%',
            listItem: {
                color: 'green',
                height: '50%',
            }
        }
    },
}

let darkTheme = JSON.parse(JSON.stringify(baseTheme));

baseTheme.test = {
    hello: 'world',
}

console.log(darkTheme);
console.log(baseTheme);

</code>
</pre>

<br />

And if we then update our list color again:

<br />

<pre>
<code>


baseTheme.navigation.list.color = 'red';

console.log(darkTheme.navigation.list.color);

/** output **/
purple

</code>
</pre>

<br />

As you can see, this method works, and can be done in a pinch if you either do not have the ability to use an external library, lack the time to write a deep merge function, or simply need a quick deep clone of a particular object. However, if there is any kind of complexity you would be far better off using a library like `lodash`. For instance, in our circumstance we have multiple objects merging together, `lodash merge` supports this by merging each of the `sources` into a base `object`, we can also use `mergeWith` to pass a customiser function which gives us a lot of control over our merge. Bear in mind this kind of complexity would very quickly deliver unwieldly, and frankly revolting, code as we would need to repeat our string to object conversion multiple times.