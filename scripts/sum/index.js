// variable declarations are eager parsed
const a = 1;
const b = 2;

// since we wrap this in an IIFE (immediately invoked function expression)
// the function is eager loaded into memory right away.
const sum = (function(...args) {
    return args.reduce(function (acc, cur) {
        return acc + cur;
    }, 0)
})();

// we can use this right away as we have eager parsed
// alreadyarray
sum(1, 2, 3);