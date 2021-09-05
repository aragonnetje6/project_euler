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
    return fraction;
}());
var x = new fraction(1, 2);
var results = [];
for (var i = 0; i < 1001; i++) {
    results.push(x.add(1));
    x = x.add(2).invert();
}
console.log(results.filter(function (x) { return x.numerator_longer(); }).length);
