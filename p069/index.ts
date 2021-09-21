function gcd(a: number, b: number): number {
    while (a !== 0 && b !== 0) {
        if (a < b) {
            [a, b] = [b, a]
        }
        a %= b
    }
    return a > b ? a : b
}

function relative_primes(n: number): Array<number> {
    return Array.from(Array(n).keys()).filter(x => gcd(n, x) === 1)
}

function phi(n: number): number {
    return relative_primes(n).length
}

function table(max: number): void {
    for (let i = 2; i < max + 1; i++) {
        console.log(i, relative_primes(i))
    }
}
table(20)
