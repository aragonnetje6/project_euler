function gcd(a: number, b: number): number {
    while (a !== 0 && b !== 0) {
        if (a < b) {
            [a, b] = [b, a]
        }
        a %= b
    }
    return a > b ? a : b
}


function func(n: number): Array<string> {
    let fractions: Array<string> = []
    let previous_dist: number = Infinity
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < i; j++) {
            if (j / i < 3 / 7 && gcd(j, i) === 1 && (3 / 7 - j / i) < previous_dist) {
                previous_dist = (3 / 7 - j / i)
                fractions.push(`${j}/${i}`)
            }
        }
    }
    return fractions
}

console.log(func(10).pop())
//console.log(func(100).pop())
//console.log(func(1000).pop())
//console.log(func(10000).pop())
//console.log(func(100000).pop())
// console.log(func(1000000).pop())
