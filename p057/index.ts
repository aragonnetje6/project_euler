function gcd(a: bigint, b: bigint): bigint {
    while (a !== BigInt(0) && b !== BigInt(0)) {
        if (a < b) {
            [a, b] = [b, a]
        }
        a %= b
    }
    return a > b ? a : b
}

class fraction{
    n: bigint
    d: bigint
    value: number

    constructor(n: number|bigint, d: number|bigint) {
        this.n = BigInt(n)
        this.d = BigInt(d)
        this.value = Number(n) / Number(d)
        this.simplify()
    }

    simplify(): void {
        let div = gcd(this.n, this.d)
        this.n /= div
        this.d /= div
    }

    add(a: bigint|number, b: bigint|number = 1): fraction {
        return new fraction(this.n * BigInt(b) + BigInt(a) * this.d, BigInt(b) * this.d)
    }

    invert(): fraction {
        return new fraction(this.d, this.n)
    }

    numerator_longer(): boolean {
        return this.n.toString(10).length > this.d.toString(10).length
    }
}

let x = new fraction(1, 2)
const results: Array<fraction> = []
for (let i = 0; i < 1001; i++) {
    results.push(x.add(1))
    x = x.add(2).invert()
}
console.log(results.filter(x => x.numerator_longer()).length)

