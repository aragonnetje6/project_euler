const primes: Array<number> = [2]
const checked: Set<string> = new Set()

function main(): void {
    let i = 0
    let done = false
    while (!done) {
        if (primes.length <= i) {
            add_prime()
        }
        let family_strings = list_family_strings(primes[i])
        for (let family_string of family_strings) {
            if (eight_are_prime(generate_family(family_string))) {
                console.log('answer:', family_string)
            }
        }
        if (i % 1000 == 0) {
            console.log(i)
        }
        i++
    }
}

function list_family_strings(n: number): Array<string> {
    const n_str = n.toString()
    const out: Array<string> = []
    for (let number_of_stars = 1; number_of_stars < n_str.length; number_of_stars++) {
        out.push(...add_stars(n_str, number_of_stars))
    }
    const unique: Array<string> = Array.from(new Set(out)).filter(value => !checked.has(value))
    unique.forEach(x => checked.add(x))
    return unique
}

function add_stars(n_str: string, number_of_stars: number): Array<string> {
    const out: Array<string> = []
    for (let i = Math.max(0, n_str.lastIndexOf('*')); i < n_str.length; i++) {
        let partial = n_str.substr(0, i) + '*' + n_str.substr(i + 1)
        if (number_of_stars > 1) {
            out.push(...add_stars(partial, number_of_stars - 1))
        } else {
            out.push(partial)
        }
    }
    return out.filter(str => str.split('').filter(value => value == '*').length >= number_of_stars)
}

function generate_family(n: string): Array<number> {
    return Array.from(Array(10).keys()).map(i => parseInt(replaceAll(n, '*', i.toString()), 10))
}

function replaceAll(str: string, searchValue: string, replaceValue: string): string {
    while (str.includes(searchValue)) {
        str = str.replace(searchValue, replaceValue)
    }
    return str
}

function add_prime() {
    let i = primes[primes.length - 1] + 1
    while (!primes.every(x => i % x != 0)) {
        i++
    }
    primes.push(i)
}

function isPrime(n: number): boolean {
    while (primes[primes.length - 1] < n) {
        add_prime();
    }
    return primes.includes(n)
}

function eight_are_prime(arr: Array<number>): boolean {
    return arr.filter(isPrime).length >= 8
}

main()
