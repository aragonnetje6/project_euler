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

    multiply(a: bigint|number, b: bigint|number = 1): fraction {
        return new fraction(this.n * BigInt(a), BigInt(b) * this.d)
    }
}

function repeating(sequence: Array<number>) {
    if (sequence.length < 3 || sequence.length % 2 !== 1) return false
    return sequence.slice(1, Math.ceil(sequence.length / 2)).every((value, index) => value === sequence.slice(Math.ceil(sequence.length / 2))[index])
}

function list_factors(n: number): number[] {
    let r: number = Math.sqrt(n)
    const sequence: Array<number> = []
    for (let j = 0; j < 20; j++) {
        let i = Math.floor(r)
        sequence.push(i)
        r = 1 / (r - i)
        if (repeating(sequence)) {
            console.log('symmetric', sequence)
            break
        }
    }
    return sequence
}

console.log(list_factors(13))
