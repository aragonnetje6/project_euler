class Fraction {
    get denominator(): bigint {
        return this._denominator;
    }

    get numerator(): bigint {
        return this._numerator;
    }

    private _numerator: bigint;
    private _denominator: bigint;

    constructor(numerator: bigint, denominator: bigint) {
        this._numerator = numerator;
        this._denominator = denominator;
        // this.simplify()
    }

    simplify(): void {
        const gcd = Fraction.getGCD(this._numerator, this._denominator)
        this._numerator /= gcd
        this._denominator /= gcd
    }

    private static getGCD(a: bigint, b: bigint): bigint {
        while (b != 0n) {
            let t = b
            b = a % b
            a = t
        }
        return a
    }

    add(other: bigint | Fraction): Fraction {
        if (!(other instanceof Fraction)) {
            other = new Fraction(other, 1n)
        }
        return new Fraction(this._numerator * other._denominator + other._numerator * this._denominator,
            this._denominator * other._denominator)
    }

    sub(other: bigint | Fraction): Fraction {
        if (!(other instanceof Fraction)) {
            other = new Fraction(other, 1n)
        }
        return new Fraction(this._numerator * other._denominator - other._numerator * this._denominator,
            this._denominator * other._denominator)
    }

    mul(other: bigint | Fraction): Fraction {
        if (!(other instanceof Fraction)) {
            other = new Fraction(other, 1n)
        }
        return new Fraction(this._numerator * other._numerator, this._denominator * other._denominator)
    }

    div(other: bigint | Fraction): Fraction {
        if (!(other instanceof Fraction)) {
            other = new Fraction(other, 1n)
        }
        return new Fraction(this._numerator * other._denominator, this._denominator * other._numerator)
    }

    inv(): Fraction {
        return new Fraction(this._denominator, this._numerator)
    }

    toString(): string {
        return `(${this.numerator}/${this.denominator})`
    }
}

function generateFraction(factors: bigint[]): Fraction {
    if (factors.length == 1) {
        return new Fraction(factors[0], 1n)
    } else {
        return generateFraction(factors.slice(1)).inv().add(factors[0]);
    }
}

function getConvergents(n: number): bigint[] {
    let out = [2n]
    let k = 1n
    while (out.length < n) {
        out.push(1n)
        out.push(2n * k)
        out.push(1n)
        k++
    }
    return out.slice(0, n)
}

for (let i = 0; i < 100; i++) {
    console.log(generateFraction(getConvergents(i + 1)))
    console.log(generateFraction(getConvergents(i + 1)).numerator.toString().split('').map(x => parseInt(x, 10)).reduce((x, y) => x + y))
}
