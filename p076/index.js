"use strict";
var cache = {};
function all_ways_to_sum_to(n, max) {
    if (max === undefined || max >= n) {
        max = n;
    }
    if (n == 0) {
        return [[]];
    }
    if (n == 1) {
        return [[1]];
    }
    else if (cache[n.toString() + ' ' + max.toString()] !== undefined) {
        return cache[n.toString() + ' ' + max.toString()];
    }
    else {
        var possibilities = [];
        var _loop_1 = function (i) {
            var new_possibilities = all_ways_to_sum_to(n - i, i);
            new_possibilities.forEach(function (x) { return x.push(i); });
            new_possibilities.forEach(function (x) { return x.sort(); });
            possibilities.push.apply(possibilities, new_possibilities);
        };
        for (var i = 1; i < max + 1; i++) {
            _loop_1(i);
        }
        cache[n.toString() + ' ' + max.toString()] = possibilities;
        return possibilities;
    }
}
console.log(all_ways_to_sum_to(100));
console.log(all_ways_to_sum_to(100).length);
/*
2:
[1, 1]
3:
[1, 1, 1]
[1, 2]
4:
[1, 1, 1, 1]
[1, 1, 2]
[2, 2]
[1, 3]
5:
[1, 1, 1, 1, 1]
[1, 1, 1, 2]
[1, 2, 2]
[1, 1, 3]
[2, 3]
[1, 4]
6:
[1, 1, 1, 1, 1, 1]
[1, 1, 1, 1, 2]
[1, 1, 2, 2]
[2, 2, 2]
[1, 1, 1, 3]
[1, 2, 3]
[3, 3]
[1, 1, 4]
[2, 4]
[1, 5]
 */
