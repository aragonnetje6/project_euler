"use strict";
// x ** 2 - x - 1 / 2 * (y * (y - 1)) = 0
function blue_from_total(total_disks) {
    var D = 1 + 2 * Math.pow(total_disks, 2) - 2 * total_disks;
    if (Math.pow(Math.sqrt(D), 2) == D) {
        return (1 + Math.sqrt(D)) / 2;
    }
    else {
        return .5;
    }
}
function probability(total, blue) {
    return blue / total * (blue - 1) / (total - 1);
}
function find_first_valid_total_after_n(n) {
    while (true) {
        var blue_1 = blue_from_total(n);
        if (blue_1 % 1 === 0 && probability(n, blue_1) == .5) {
            return n;
        }
        else {
            n++;
        }
    }
}
var total = find_first_valid_total_after_n(1000000000000);
console.log('total:', total);
var blue = blue_from_total(total);
console.log('blue:', blue);
console.log('probability:', probability(total, blue));
// let arr: Array<pair> = []
// let x = 1
// for (let i = 0; i < 1000; i++) {
//     x = find_first_valid_total_after_n(x + 1)
//     arr.push([x, blue_from_total(x)])
// }
// console.table(arr)
