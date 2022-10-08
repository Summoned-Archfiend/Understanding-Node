const a = 1;
const b = 2;

const sum = (function(...args) {
    return args.reduce(function (acc, cur) {
        return acc + cur;
    })
})();

sum(1, 2, 3);