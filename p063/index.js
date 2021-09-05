"use strict";
function get_count(power) {
    let result;
    let total = 0n;
    for (let base = 1n; (result = BigInt((base ** power).toString(10).length)) <= power; base++)
        if (result == power)
            total++;
    return total;
}
let totalest = 0n;
for (let i = 1n; i < 100n; i++) {
    let count = get_count(i);
    console.log(i, count);
    totalest += count;
}
console.log(totalest);
