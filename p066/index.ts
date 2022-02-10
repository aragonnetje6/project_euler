function isSquare(num: number): boolean {
    let x = 1
    while (x ** 2 <= num) {
        if (x ** 2 == num) {
            return true;
        }
        x++
    }
    return false;
}

function findMinimum(D: number): number {
    if (isSquare(D)) {
        return 0
    } else {
        let x = 0
        while (!((x ** 2 - 1) / D > 0 && (x ** 2 - 1) / D % 1 == 0)) x++
        return x
    }
}

const solutions = Array.from(Array(10).keys()).map(x => x + 1).map(findMinimum).filter(x => x != 0)
for (let i = 0; i < solutions.length; i++) {
    console.log(i, solutions[i])
}
console.log(solutions.indexOf(solutions.reduce((x, y) => x >= y ? x : y)))

