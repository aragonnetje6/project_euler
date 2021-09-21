import * as fs from "fs";

const numbers = fs.readFileSync('p079_keylog.txt').toString().split('\n').filter((value, index, array) => !array.slice(0, index).includes(value))
console.log(numbers.length)

function check_if_valid(attempt: string, checks: string[] = numbers): boolean {
    for (let check of checks) {
        let index1 = attempt.indexOf(check[0])
        let index2 = attempt.slice(index1 + 1).indexOf(check[1])
        let index3 = attempt.slice(index2 + 1).includes(check[2])
        if (index1 == -1 || index2 == -1 || !index3) return false
    }
    return true
}

function attempt_1(): void {
    let i = 100
    while (true) {
        if (check_if_valid(i.toString(10))) {
            console.log('solution found', i)
            return
        }
        if (i % 10000000 == 0) console.log(i)
        i++
    }
}

function attempt_2(): void {
    const nevers: string[] = []
    for (let i = 0; i < 10; i++) if (!numbers.some(x => x.includes(i.toString(10)))) nevers.push(i.toString(10))
    console.log(nevers)
    let i = 0
    while (true) {
        let str_i = i.toString(10)
        if (!str_i.includes('4') && !str_i.includes('5') && !str_i.includes('7') && !str_i.slice(0, -1).includes('0') && check_if_valid('7' + str_i, numbers.slice(0, 5))) {
            console.log('solution found', '7' + str_i)
            return
        }
        if (i % 100000000 == 0) console.log('7'+str_i)
        i += 10
    }
}

attempt_2()
