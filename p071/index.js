"use strict";
function gcd(a, b) {
    var _a;
    while (a !== 0 && b !== 0) {
        if (a < b) {
            _a = [b, a], a = _a[0], b = _a[1];
        }
        a %= b;
    }
    return a > b ? a : b;
}
function func(n) {
    var fractions = [];
    var previous_dist = Infinity;
    for (var i = 1; i < n; i++) {
        for (var j = 1; j < i; j++) {
            if (j / i < 3 / 7 && gcd(j, i) === 1 && (3 / 7 - j / i) < previous_dist) {
                previous_dist = (3 / 7 - j / i);
                fractions.push(j + "/" + i);
            }
        }
    }
    return fractions;
}
console.log(func(10).pop());
//console.log(func(100).pop())
//console.log(func(1000).pop())
//console.log(func(10000).pop())
//console.log(func(100000).pop())
// console.log(func(1000000).pop())
