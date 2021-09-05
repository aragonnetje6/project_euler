"use strict";
var InfiniteSet = /** @class */ (function () {
    function InfiniteSet(func) {
        this.func = func;
        this.set = new Set();
        this.arr = [];
        this.add_next();
    }
    InfiniteSet.prototype.includes = function (value) {
        while (value > this.arr[this.arr.length - 1])
            this.add_next();
        return this.set.has(value);
    };
    InfiniteSet.prototype.add_next = function () {
        var next_val = this.func(this.arr.length);
        this.set.add(next_val);
        this.arr.push(next_val);
    };
    InfiniteSet.prototype.get = function (index) {
        while (index >= this.arr.length)
            this.add_next();
        return this.arr[index];
    };
    InfiniteSet.prototype.slice = function (lower, upper) {
        while (lower >= this.arr.length || upper >= this.arr.length)
            this.add_next();
        return this.arr.slice(lower, upper);
    };
    return InfiniteSet;
}());
var cubes = new InfiniteSet(function (x) { return Math.pow(x, 3); });
function permutations(input, final_call) {
    if (final_call === void 0) { final_call = true; }
    var out = [];
    if (input.length === 1)
        return [input];
    var _loop_1 = function (i) {
        permutations(input.slice(0, i) + input.slice(i + 1), false).map(function (x) { return input[i] + x; }).forEach(function (x) { return out.push(x); });
    };
    for (var i = 0; i < input.length; i++) {
        _loop_1(i);
    }
    if (final_call)
        return Array.from(new Set(out.filter(function (x) { return parseInt(x, 10).toString(10).length === input.length; })));
    return Array.from(new Set(out));
}
function cube_permutations(n) {
    return permutations(n.toString(10)).filter(function (x) { return cubes.includes(parseInt(x, 10)); });
}
function approach_1(n) {
    console.log('starting approach 1');
    var i = 1;
    while (true) {
        if (cube_permutations(Math.pow(i, 3)).length === n)
            return [i, Math.pow(i, 3)];
        console.log(i);
        i++;
    }
}
function cube_permutations_2(n) {
    return permutations(n.toString(10)).filter(function (x) { return (Math.pow(parseInt(x, 10), (1 / 3))) % 1 == 0; });
}
function approach_2(n) {
    console.log('starting approach 2');
    var i = 1;
    while (true) {
        if (cube_permutations_2(Math.pow(i, 3)).length === n)
            return [i, Math.pow(i, 3)];
        console.log(i);
        i++;
    }
}
function is_permutation(str_1, str_2) {
    if (str_1.length !== str_2.length)
        return false;
    var arr_1 = str_1.split('');
    var arr_2 = str_2.split('');
    var _loop_2 = function (i) {
        if (arr_1.filter(function (x) { return x === i.toString(10); }).length !== arr_2.filter(function (x) { return x === i.toString(10); }).length)
            return { value: false };
    };
    for (var i = 0; i < 10; i++) {
        var state_1 = _loop_2(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return true;
}
function cube_permutations_up_to_index(index) {
    var n = cubes.get(index);
    var n_str = n.toString(10);
    var out = [];
    var val;
    for (var i = 0; i < index; i++)
        if (is_permutation(n_str, (val = cubes.get(i)).toString(10)))
            out.push(val);
    return out.concat([n]);
}
function approach_3(n) {
    console.log('starting approach 3');
    var i = 1;
    while (true) {
        var cube_permutes = cube_permutations_up_to_index(i);
        if (cube_permutes.length === n)
            return cube_permutes;
        console.log(i);
        i++;
    }
}
// console.log(approach_1(3))
// console.log(approach_2(3))
console.log(approach_3(7));
