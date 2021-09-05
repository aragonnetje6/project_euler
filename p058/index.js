"use strict";
class SuperSet {
    constructor(input) {
        this.sets = [new Set()];
        if (typeof (input) === 'undefined')
            return;
        else if (Array.isArray(input))
            for (let value of input)
                this.add(value);
        else
            this.add(input);
    }
    has(value) {
        return this.sets.some(x => x.has(value));
    }
    add(value) {
        if (!this.has(value)) {
            try {
                this.sets[this.sets.length - 1].add(value);
            }
            catch (RangeError) {
                this.sets.push(new Set([value]));
            }
        }
    }
}
const primes = [2];
const primes_set = new SuperSet([2]);
function add_prime() {
    let i = primes[primes.length - 1] + 1;
    while (primes.slice(0, primes.findIndex(x => x > i ** .5 + 1) + 1).some(x => !(i % x))) {
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
let prime_count = 0;
let total = 0;
let i = 1;
let step_size = 2;
while (prime_count / total >= 0.1 || i < 50) {
    for (let j = 0; j < 4; j++) {
        if (isPrime(i)) {
            prime_count++;
        }
        total++;
        i += step_size;
    }
    step_size += 2;
    if (total % 1000 == 0) {
        console.log(total, prime_count, prime_count / total, primes.length);
    }
}
console.log(step_size - 1);
