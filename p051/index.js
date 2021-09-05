"use strict";
var primes = [2];
var checked = new Set();
function main() {
    var i = 0;
    var done = false;
    while (!done) {
        if (primes.length <= i) {
            add_prime();
        }
        var family_strings = list_family_strings(primes[i]);
        for (var _i = 0, family_strings_1 = family_strings; _i < family_strings_1.length; _i++) {
            var family_string = family_strings_1[_i];
            if (eight_are_prime(generate_family(family_string))) {
                console.log('answer:', family_string);
            }
        }
        if (i % 1000 == 0) {
            console.log(i);
        }
        i++;
    }
}
function list_family_strings(n) {
    var n_str = n.toString();
    var out = [];
    for (var number_of_stars = 1; number_of_stars < n_str.length; number_of_stars++) {
        out.push.apply(out, add_stars(n_str, number_of_stars));
    }
    var unique = Array.from(new Set(out)).filter(function (value) { return !checked.has(value); });
    unique.forEach(function (x) { return checked.add(x); });
    return unique;
}
function add_stars(n_str, number_of_stars) {
    var out = [];
    for (var i = Math.max(0, n_str.lastIndexOf('*')); i < n_str.length; i++) {
        var partial = n_str.substr(0, i) + '*' + n_str.substr(i + 1);
        if (number_of_stars > 1) {
            out.push.apply(out, add_stars(partial, number_of_stars - 1));
        }
        else {
            out.push(partial);
        }
    }
    return out.filter(function (str) { return str.split('').filter(function (value) { return value == '*'; }).length >= number_of_stars; });
}
function generate_family(n) {
    return Array.from(Array(10).keys()).map(function (i) { return parseInt(replaceAll(n, '*', i.toString()), 10); });
}
function replaceAll(str, searchValue, replaceValue) {
    while (str.includes(searchValue)) {
        str = str.replace(searchValue, replaceValue);
    }
    return str;
}
function add_prime() {
    var i = primes[primes.length - 1] + 1;
    while (!primes.every(function (x) { return i % x != 0; })) {
        i++;
    }
    primes.push(i);
}
function isPrime(n) {
    while (primes[primes.length - 1] < n) {
        add_prime();
    }
    return primes.includes(n);
}
function eight_are_prime(arr) {
    return arr.filter(isPrime).length >= 8;
}
main();
