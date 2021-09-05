class InfiniteSet {
    func: CallableFunction
    set: Set<number>
    arr: Array<number>

    constructor(func: CallableFunction) {
        this.func = func
        this.set = new Set()
        this.arr = []
        this.add_next()
    }

    includes(value: number): boolean {
        while (value > this.arr[this.arr.length - 1]) this.add_next()
        return this.set.has(value)
    }

    add_next(): void {
        let next_val = this.func(this.arr.length)
        this.set.add(next_val)
        this.arr.push(next_val)
    }

    get(index: number): number {
        while (index >= this.arr.length) this.add_next()
        return this.arr[index]
    }

    slice(lower: number, upper: number): number[] {
        while (lower >= this.arr.length || upper >= this.arr.length) this.add_next()
        return this.arr.slice(lower, upper)
    }
}

const cubes = new InfiniteSet((x: number) => x ** 3)

function permutations(input: string, final_call: boolean = true): Array<string> {
    const out: Array<string> = []
    if (input.length === 1) return [input]
    for (let i = 0; i < input.length; i++) permutations(input.slice(0, i) + input.slice(i + 1), false).map(x => input[i] + x).forEach(x => out.push(x))
    if (final_call) return Array.from(new Set(out.filter(x => parseInt(x, 10).toString(10).length === input.length)))
    return Array.from(new Set(out))
}

function cube_permutations(n: number): string[] {
    return permutations(n.toString(10)).filter(x => cubes.includes(parseInt(x, 10)))
}

function approach_1(n: number): number[] {
    console.log('starting approach 1')
    let i = 1
    while (true) {
        if (cube_permutations(i ** 3).length === n) return [i, i ** 3]
        console.log(i)
        i++
    }
}

function cube_permutations_2(n: number): string[] {
    return permutations(n.toString(10)).filter(x => (parseInt(x, 10) ** (1 / 3)) % 1 == 0)
}

function approach_2(n: number): number[] {
    console.log('starting approach 2')
    let i = 1
    while (true) {
        if (cube_permutations_2(i ** 3).length === n) return [i, i ** 3]
        console.log(i)
        i++
    }
}


function is_permutation(str_1: string, str_2: string): boolean {
    if (str_1.length !== str_2.length) return false
    const arr_1 = str_1.split('')
    const arr_2 = str_2.split('')
    for (let i = 0; i < 10; i++) if (arr_1.filter(x => x === i.toString(10)).length !== arr_2.filter(x => x === i.toString(10)).length) return false
    return true
}

function cube_permutations_up_to_index(index: number): number[] {
    const n = cubes.get(index)
    const n_str = n.toString(10)
    const out: Array<number> = []
    let val: number
    for (let i = 0; i < index; i++) if (is_permutation(n_str, (val = cubes.get(i)).toString(10))) out.push(val)
    return out.concat([n])
}

function approach_3(n: number): number[] {
    console.log('starting approach 3')
    let i = 1
    while (true) {
        let cube_permutes = cube_permutations_up_to_index(i)
        if (cube_permutes.length === n) return cube_permutes
        console.log(i)
        i++
    }

}

// console.log(approach_1(3))
// console.log(approach_2(3))
console.log(approach_3(7))

