"use strict";
var InfiniteSet = /** @class */ (function () {
    function InfiniteSet(func) {
        this.func = func;
        this.set = new Set();
        this.arr = [];
    }
    InfiniteSet.prototype.includes = function (value) {
        while (value > this.arr[this.arr.length - 1])
            this.add_next();
        return this.set.has(value);
    };
    InfiniteSet.prototype.add_next = function () {
        var next_val = this.func(this.arr.length - 1);
        this.set.add(next_val);
        this.arr.push(next_val);
    };
    InfiniteSet.prototype.get = function (i) {
        while (this.arr.length <= i)
            this.add_next();
        return this.arr[i];
    };
    return InfiniteSet;
}());
var triangle = new InfiniteSet(function (n) { return n * (n + 1) / 2; });
var square = new InfiniteSet(function (n) { return Math.pow(n, 2); });
var pentagonal = new InfiniteSet(function (n) { return n * (3 * n - 1) / 2; });
var hexagonal = new InfiniteSet(function (n) { return n * (2 * n - 1); });
var heptagonal = new InfiniteSet(function (n) { return n * (5 * n - 3) / 2; });
var octagonal = new InfiniteSet(function (n) { return n * (3 * n - 2); });
function types_represented(numbers) {
    for (var i in numbers)
        if (triangle.includes(numbers[i]))
            for (var j in numbers)
                if (i < j && square.includes(numbers[j]))
                    for (var k in numbers)
                        if (j < k && pentagonal.includes(numbers[k]))
                            for (var l in numbers)
                                if (k < l && hexagonal.includes(numbers[l]))
                                    for (var m in numbers)
                                        if (l < m && heptagonal.includes(numbers[m]))
                                            for (var n in numbers)
                                                if (m < n && octagonal.includes(numbers[n]))
                                                    return true;
    return false;
}
function approach_1() {
    var b, c, d, e, f;
    for (var a = 1000; a < 10000; a++) {
        for (var b_end = 10; b_end < 100; b_end++)
            if ((b = (a % 100) * 100 + b_end) > 999 && b !== a)
                for (var c_end = 10; c_end < 100; c_end++)
                    if ((c = (b % 100) * 100 + c_end) > 999 && c !== a && c !== b)
                        for (var d_end = 10; d_end < 100; d_end++)
                            if ((d = (c % 100) * 100 + d_end) > 999 && d !== a && d !== b && d !== c)
                                for (var e_end = 10; e_end < 100; e_end++)
                                    if (((e = (d % 100) * 100 + e_end)) > 999 && (f = (e % 100) * 100 + Math.floor(a / 100)) > 999 && ![a, b, c, d].includes(e) && ![a, b, c, d, e].includes(f) && types_represented([a, b, c, d, e, f])) {
                                        console.log([a, b, c, d, e, f], [a, b, c, d, e, f].reduce(function (x, y) { return x + y; }));
                                        return;
                                    }
        console.log('a:', a);
    }
}
function cyclical(arr) {
    var index1 = 0;
    var val1 = arr[index1];
    var val2, val3, val4, val5, val6;
    for (var index2 = 0; index2 < arr.length; index2++)
        if (index1 !== index2 && val1 % 100 === Math.floor((val2 = arr[index2]) / 100))
            for (var index3 = 0; index3 < arr.length; index3++)
                if (![index1, index2].includes(index3) && val2 % 100 === Math.floor((val3 = arr[index3]) / 100))
                    for (var index4 = 0; index4 < arr.length; index4++)
                        if (![index1, index2, index3].includes(index4) && val3 % 100 === Math.floor((val4 = arr[index4]) / 100))
                            for (var index5 = 0; index5 < arr.length; index5++)
                                if (![index1, index2, index3, index4].includes(index5) && val4 % 100 === Math.floor((val5 = arr[index5]) / 100))
                                    for (var index6 = 0; index6 < arr.length; index6++)
                                        if (![index1, index2, index3, index4, index5].includes(index6) && val5 % 100 === Math.floor((val6 = arr[index6]) / 100) && val6 % 100 === Math.floor(val1 / 100))
                                            return true;
    return false;
}
function approach_2() {
    var max_index = 0;
    var num1, num2, num3, num4, num5, num6;
    while (true) {
        for (var index1 = 0; index1 <= max_index; index1++)
            if ((num1 = triangle.get(index1)) > 999 && num1 < 10000)
                for (var index2 = 0; index2 <= max_index; index2++)
                    if ((num2 = square.get(index2)) > 999 && num2 < 10000)
                        for (var index3 = 0; index3 <= max_index; index3++)
                            if ((num3 = pentagonal.get(index3)) > 999 && num3 < 10000)
                                for (var index4 = 0; index4 <= max_index; index4++)
                                    if ((num4 = hexagonal.get(index4)) > 999 && num4 < 10000)
                                        for (var index5 = 0; index5 <= max_index; index5++)
                                            if ((num5 = heptagonal.get(index5)) > 999 && num5 < 10000)
                                                for (var index6 = 0; index6 <= max_index; index6++)
                                                    if ((num6 = octagonal.get(index6)) > 999 && num6 < 10000 && [index1, index2, index3, index4, index5, index6].includes(max_index) && cyclical([num1, num2, num3, num4, num5, num6])) {
                                                        console.log([num1, num2, num3, num4, num5, num6], [num1, num2, num3, num4, num5, num6].reduce(function (x, y) { return x + y; }));
                                                        return;
                                                    }
        max_index++;
        console.log(max_index);
    }
}
function all_results_between(func, lower, upper) {
    if (lower === void 0) { lower = 1000; }
    if (upper === void 0) { upper = 10000; }
    var i = 0;
    var out = [];
    while (func(i) < lower)
        i++;
    var result;
    while ((result = func(i)) < upper) {
        out.push(result);
        i++;
    }
    return out;
}
var valid_triangle = all_results_between(function (n) { return n * (n + 1) / 2; });
var valid_square = all_results_between(function (n) { return Math.pow(n, 2); });
var valid_pentagonal = all_results_between(function (n) { return n * (3 * n - 1) / 2; });
var valid_hexagonal = all_results_between(function (n) { return n * (2 * n - 1); });
var valid_heptagonal = all_results_between(function (n) { return n * (5 * n - 3) / 2; });
var valid_octagonal = all_results_between(function (n) { return n * (3 * n - 2); });
function approach_3() {
    for (var _i = 0, valid_triangle_1 = valid_triangle; _i < valid_triangle_1.length; _i++) {
        var num1 = valid_triangle_1[_i];
        for (var _a = 0, valid_square_1 = valid_square; _a < valid_square_1.length; _a++) {
            var num2 = valid_square_1[_a];
            for (var _b = 0, valid_pentagonal_1 = valid_pentagonal; _b < valid_pentagonal_1.length; _b++) {
                var num3 = valid_pentagonal_1[_b];
                for (var _c = 0, valid_hexagonal_1 = valid_hexagonal; _c < valid_hexagonal_1.length; _c++) {
                    var num4 = valid_hexagonal_1[_c];
                    for (var _d = 0, valid_heptagonal_1 = valid_heptagonal; _d < valid_heptagonal_1.length; _d++) {
                        var num5 = valid_heptagonal_1[_d];
                        for (var _e = 0, valid_octagonal_1 = valid_octagonal; _e < valid_octagonal_1.length; _e++) {
                            var num6 = valid_octagonal_1[_e];
                            if (cyclical([num1, num2, num3, num4, num5, num6])) {
                                console.log([num1, num2, num3, num4, num5, num6], num1 + num2 + num3 + num4 + num5 + num6);
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
}
approach_1();
// approach_2()
// approach_3()
