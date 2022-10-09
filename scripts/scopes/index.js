function add2numbers() {
    const n1 = 10;
    const n2 = 20;

    return n1 + n2;
}

function letAdd2numbers() {
    let n1 = 10;
    let n2 = 10;

    return n1 + n2;
}

// Uncomment to experiment, recomment to run rest
// function funAdd2numbers() {
//     let n1 = 20;
//     let result = n1 + n2;
//     let n2;
//     return n1 + n2;
// }

function validFunAdd2numbers() {
    let n1 = 20;
    let result = n1 + n2;
    var n2;
    return n1 + n2;
}

function scopeAdd2numbers() {
    const n1 = 10;
    const n2 = 20;
    const result = n1 + n2;
    // New Scope
    {
        const n1 = 30;
        const n2 = 40;
        const result = n1 + n2;
    }

    return result;
}

add2numbers();
letAdd2numbers();
// funAdd2numbers();
validFunAdd2numbers();
scopeAdd2numbers();