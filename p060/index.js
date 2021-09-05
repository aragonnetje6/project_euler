"use strict";
var SuperSet = /** @class */ (function () {
    function SuperSet(input) {
        this.sets = [new Set()];
        if (typeof (input) === 'undefined') {
            return;
        }
        else if (Array.isArray(input)) {
            for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
                var value = input_1[_i];
                this.add(value);
            }
        }
        else {
            this.add(input);
        }
    }
    SuperSet.prototype.has = function (value) {
        return this.sets.some(function (x) { return x.has(value); });
    };
    SuperSet.prototype.add = function (value) {
        if (!this.has(value)) {
            try {
                this.sets[this.sets.length - 1].add(value);
            }
            catch (RangeError) {
                this.sets.push(new Set([value]));
            }
        }
    };
    return SuperSet;
}());
var primes = [2];
var primes_set = new SuperSet([2]);
// function sieve_of_atkin(upto: number, initial?: Array<number>): Array<number> {
//     const results = (typeof(initial) !== 'undefined') ? initial : [2, 3, 5]
//
//     const sieve: Array<boolean> = Array(upto + 1).fill(false)
//     const keys = Array.from(sieve.keys())
//     for (let r of keys.map(x => x % 60)) {
//         if ([1, 13, 17, 29, 37, 41, 49, 53].includes(r)) {
//             let set: Set<number> = new Set()
//             for (let x = 1; 4*x**2 < upto; x++) {
//                 for (let y = 1; 4*x**2+y**2 < upto; y++) {
//                     set.add(4*x**2+y**2)
//                 }
//             }
//             Array.from(set).forEach(i => sieve[i] = !sieve[i])
//         } else if ([7, 19, 31, 43].includes(r)) {
//             let set: Set<number> = new Set()
//             for (let x = 1; 3*x**2 < upto; x++) {
//                 for (let y = 1; 3*x**2+y**2 < upto; y++) {
//                     set.add(3*x**2+y**2)
//                 }
//             }
//             Array.from(set).forEach(i => sieve[i] = !sieve[i])
//         } else if ([11, 23, 47, 59].includes(r)) {
//             let set: Set<number> = new Set()
//             for (let x = 1; 4*x**2 < upto; x++) {
//                 for (let y = 1; 3*x**2-y**2 < upto && x > y; y++) {
//                     set.add(3*x**2-y**2)
//                 }
//             }
//             Array.from(set).forEach(i => sieve[i] = !sieve[i])
//         }
//     }
//
//     let new_prime = sieve.indexOf(true)
//     results.push(new_prime)
// }
function add_prime() {
    var i = primes[primes.length - 1] + 1;
    while (primes.slice(0, primes.findIndex(function (x) { return x > Math.pow(i, .5) + 1; }) + 1).some(function (x) { return !(i % x); })) {
        i++;
    }
    primes.push(i);
    primes_set.add(i);
}
function isPrime(n) {
    while (primes[primes.length - 1] < n) {
        add_prime();
    }
    return primes_set.has(n);
}
function valid_set(prime_arr) {
    for (var i in prime_arr) {
        for (var j in prime_arr) {
            if (i !== j) {
                if (!isPrime(parseInt(prime_arr[i].toString(10) + prime_arr[j].toString(10), 10))) {
                    return false;
                }
            }
        }
    }
    return true;
}
function main() {
    var index1 = 4;
    while (primes.length < 5) {
        add_prime();
    }
    while (true) {
        for (var index2 = index1 - 1; index2 > 2; index2--) {
            if (valid_set([primes[index1], primes[index2]])) {
                for (var index3 = index2 - 1; index3 > 1; index3--) {
                    if (valid_set([primes[index1], primes[index2], primes[index3]])) {
                        for (var index4 = index3 - 1; index4 > 0; index4--) {
                            if (valid_set([primes[index1], primes[index2], primes[index3], primes[index4]])) {
                                for (var index5 = index4 - 1; index5 > -1; index5--) {
                                    var tuple = [primes[index1], primes[index2], primes[index3], primes[index4], primes[index5]];
                                    if (valid_set(tuple)) {
                                        console.log(tuple, tuple.reduce(function (x, y) { return x + y; }, 0));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (index1 % 10 == 0) {
            console.log(index1, primes[index1], primes[primes.length - 1], primes.length);
        }
        index1++;
    }
}
main();
