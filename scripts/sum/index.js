// variable declarations are eager parsed
const a = 1;
const b = 2;

// functions are lazily parsed due to the cost of eager parsing
// since we don't need it right away.
const sum = (function(...args) {
    return args.reduce(function (acc, cur) {
        return acc + cur;
    })
})();

// the parser returns to parse the sum as we use it
sum(1, 2, 3);