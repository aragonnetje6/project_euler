class InfiniteSet {
    func: CallableFunction
    set: Set<number>
    arr: Array<number>

    constructor(func: CallableFunction) {
        this.func = func
        this.set = new Set()
        this.arr = []
    }

    includes(value: number) {
        while (value > this.arr[this.arr.length - 1])
            this.add_next()
        return this.set.has(value)
    }

    add_next() {
        let next_val = this.func(this.arr.length - 1)
        this.set.add(next_val)
        this.arr.push(next_val)
    }

    get(i: number): number {
        while (this.arr.length <= i)
            this.add_next()
        return this.arr[i]
    }
}

const triangle = new InfiniteSet((n: number) => n * (n + 1) / 2)
const square = new InfiniteSet((n: number) => n ** 2)
const pentagonal = new InfiniteSet((n: number) => n * (3 * n - 1) / 2)
const hexagonal = new InfiniteSet((n: number) => n * (2 * n - 1))
const heptagonal = new InfiniteSet((n: number) => n * (5 * n - 3) / 2)
const octagonal = new InfiniteSet((n: number) => n * (3 * n - 2))

function types_represented(numbers: number[]): boolean {
    for (let i in numbers)
        if (triangle.includes(numbers[i]))
            for (let j in numbers)
                if (i < j && square.includes(numbers[j]))
                    for (let k in numbers)
                        if (j < k && pentagonal.includes(numbers[k]))
                            for (let l in numbers)
                                if (k < l && hexagonal.includes(numbers[l]))
                                    for (let m in numbers)
                                        if (l < m && heptagonal.includes(numbers[m]))
                                            for (let n in numbers)
                                                if (m < n && octagonal.includes(numbers[n]))
                                                    return true
    return false
}

function approach_1(): void {
    let b: number, c: number, d: number, e: number, f: number
    for (let a = 1000; a < 10000; a++) {
        for (let b_end = 10; b_end < 100; b_end++)
            if ((b = (a % 100) * 100 + b_end) > 999 && b !== a)
                for (let c_end = 10; c_end < 100; c_end++)
                    if ((c = (b % 100) * 100 + c_end) > 999 && c !== a && c !== b)
                        for (let d_end = 10; d_end < 100; d_end++)
                            if ((d = (c % 100) * 100 + d_end) > 999 && d !== a && d !== b && d !== c)
                                for (let e_end = 10; e_end < 100; e_end++)
                                    if (((e = (d % 100) * 100 + e_end)) > 999 && (f = (e % 100) * 100 + Math.floor(a / 100)) > 999 && ![a, b, c, d].includes(e) && ![a, b, c, d, e].includes(f) && types_represented([a, b, c, d, e, f])) {
                                        console.log([a, b, c, d, e, f], [a, b, c, d, e, f].reduce((x, y) => x + y))
                                        return
                                    }
        console.log('a:', a)
    }
}

function cyclical(arr: Array<number>): boolean {
    const index1 = 0
    const val1 = arr[index1]
    let val2: number, val3: number, val4: number, val5: number, val6: number
    for (let index2 = 0; index2 < arr.length; index2++)
        if (index1 !== index2 && val1 % 100 === Math.floor((val2 = arr[index2]) / 100))
            for (let index3 = 0; index3 < arr.length; index3++)
                if (![index1, index2].includes(index3) && val2 % 100 === Math.floor((val3 = arr[index3]) / 100))
                    for (let index4 = 0; index4 < arr.length; index4++)
                        if (![index1, index2, index3].includes(index4) && val3 % 100 === Math.floor((val4 = arr[index4]) / 100))
                            for (let index5 = 0; index5 < arr.length; index5++)
                                if (![index1, index2, index3, index4].includes(index5) && val4 % 100 === Math.floor((val5 = arr[index5]) / 100))
                                    for (let index6 = 0; index6 < arr.length; index6++)
                                        if (![index1, index2, index3, index4, index5].includes(index6) && val5 % 100 === Math.floor((val6 = arr[index6]) / 100) && val6 % 100 === Math.floor(val1 / 100))
                                            return true
    return false
}

function approach_2(): void {
    let max_index = 0
    let num1: number, num2: number, num3: number, num4: number, num5, num6
    while (true) {
        for (let index1 = 0; index1 <= max_index; index1++)
            if ((num1 = triangle.get(index1)) > 999 && num1 < 10000)
                for (let index2 = 0; index2 <= max_index; index2++)
                    if ((num2 = square.get(index2)) > 999 && num2 < 10000)
                        for (let index3 = 0; index3 <= max_index; index3++)
                            if ((num3 = pentagonal.get(index3)) > 999 && num3 < 10000)
                                for (let index4 = 0; index4 <= max_index; index4++)
                                    if ((num4 = hexagonal.get(index4)) > 999 && num4 < 10000)
                                        for (let index5 = 0; index5 <= max_index; index5++)
                                            if ((num5 = heptagonal.get(index5)) > 999 && num5 < 10000)
                                                for (let index6 = 0; index6 <= max_index; index6++)
                                                    if ((num6 = octagonal.get(index6)) > 999 && num6 < 10000 && [index1, index2, index3, index4, index5, index6].includes(max_index) && cyclical([num1, num2, num3, num4, num5, num6])) {
                                                        console.log([num1, num2, num3, num4, num5, num6], [num1, num2, num3, num4, num5, num6].reduce((x, y) => x + y))
                                                        return
                                                    }
        max_index++
        console.log(max_index)
    }
}

function all_results_between(func: CallableFunction, lower: number = 1000, upper: number = 10000): Array<number> {
    let i = 0
    const out: Array<number> = []
    while (func(i) < lower)
        i++
    let result: number
    while ((result = func(i)) < upper) {
        out.push(result)
        i++
    }
    return out
}

const valid_triangle = all_results_between((n: number) => n * (n + 1) / 2)
const valid_square = all_results_between((n: number) => n ** 2)
const valid_pentagonal = all_results_between((n: number) => n * (3 * n - 1) / 2)
const valid_hexagonal = all_results_between((n: number) => n * (2 * n - 1))
const valid_heptagonal = all_results_between((n: number) => n * (5 * n - 3) / 2)
const valid_octagonal = all_results_between((n: number) => n * (3 * n - 2))

function approach_3(): void {
    for (let num1 of valid_triangle)
        for (let num2 of valid_square)
            for (let num3 of valid_pentagonal)
                for (let num4 of valid_hexagonal)
                    for (let num5 of valid_heptagonal)
                        for (let num6 of valid_octagonal)
                            if (cyclical([num1, num2, num3, num4, num5, num6])) {
                                console.log([num1, num2, num3, num4, num5, num6], num1 + num2 + num3 + num4 + num5 + num6)
                                return
                            }
}

approach_1()
// approach_2()
// approach_3()
