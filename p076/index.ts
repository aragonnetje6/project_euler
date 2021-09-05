const cache: { [id: string]: number[][] } = {}

function all_ways_to_sum_to(n: number, max?: number): number[][] {
    if (max === undefined || max >= n) {
        max = n
    }
    if (n == 0) {
        return [[]]
    }
    if (n == 1) {
        return [[1]]
    } else if (cache[n.toString() + ' ' + max.toString()] !== undefined) {
        return cache[n.toString() + ' ' + max.toString()]
    } else {
        const possibilities: number[][] = []
        for (let i = 1; i < max + 1; i++) {
            let new_possibilities: number[][] = all_ways_to_sum_to(n - i, i)
            new_possibilities.forEach(x => x.push(i))
            new_possibilities.forEach(x => x.sort())
            possibilities.push(...new_possibilities)
        }
        cache[n.toString() + ' ' + max.toString()] = possibilities
        return possibilities
    }
}


console.log(all_ways_to_sum_to(100))
console.log(all_ways_to_sum_to(100).length)

/*
2:
[1, 1]
3:
[1, 1, 1]
[1, 2]
4:
[1, 1, 1, 1]
[1, 1, 2]
[2, 2]
[1, 3]
5:
[1, 1, 1, 1, 1]
[1, 1, 1, 2]
[1, 2, 2]
[1, 1, 3]
[2, 3]
[1, 4]
6:
[1, 1, 1, 1, 1, 1]
[1, 1, 1, 1, 2]
[1, 1, 2, 2]
[2, 2, 2]
[1, 1, 1, 3]
[1, 2, 3]
[3, 3]
[1, 1, 4]
[2, 4]
[1, 5]
 */
