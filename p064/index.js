"use strict";
function gcd(a, b) {
    var _a;
    while (a !== BigInt(0) && b !== BigInt(0)) {
        if (a < b) {
            _a = [b, a], a = _a[0], b = _a[1];
        }
        a %= b;
    }
    return a > b ? a : b;
}
var fraction = /** @class */ (function () {
    function fraction(n, d) {
        this.n = BigInt(n);
        this.d = BigInt(d);
        this.value = Number(n) / Number(d);
        this.simplify();
    }
    fraction.prototype.simplify = function () {
        var div = gcd(this.n, this.d);
        this.n /= div;
        this.d /= div;
    };
    fraction.prototype.add = function (a, b) {
        if (b === void 0) { b = 1; }
        return new fraction(this.n * BigInt(b) + BigInt(a) * this.d, BigInt(b) * this.d);
    };
    fraction.prototype.invert = function () {
        return new fraction(this.d, this.n);
    };
    fraction.prototype.numerator_longer = function () {
        return this.n.toString(10).length > this.d.toString(10).length;
    };
    fraction.prototype.multiply = function (a, b) {
        if (b === void 0) { b = 1; }
        return new fraction(this.n * BigInt(a), BigInt(b) * this.d);
    };
    return fraction;
}());
function repeating(sequence) {
    if (sequence.length < 3 || sequence.length % 2 !== 1)
        return false;
    return sequence.slice(1, Math.ceil(sequence.length / 2)).every(function (value, index) { return value === sequence.slice(Math.ceil(sequence.length / 2))[index]; });
}
function list_factors(n) {
    var r = Math.sqrt(n);
    var sequence = [];
    for (var j = 0; j < 20; j++) {
        var i = Math.floor(r);
        sequence.push(i);
        r = 1 / (r - i);
        if (repeating(sequence)) {
            console.log('symmetric', sequence);
            break;
        }
    }
    return sequence;
}
console.log(list_factors(13));
