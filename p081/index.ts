import * as fs from "fs";

type dijkstra_entry = [node, number]

const matrix_string: string = fs.readFileSync('p081_matrix.txt').toString()
const matrix: Array<Array<number>> = matrix_string.split('\n').slice(0, -1).map((x: string) => x.split(',').map(y => parseInt(y, 10)))
console.assert(matrix.every(x=>x.every(y=>!isNaN(y))))
const nodes: { [id: string] : node } = {}

class node {
    value: number
    right: node | null
    down: node | null
    x: number
    y: number

    constructor(matrix: Array<Array<number>>, x: number, y: number) {
        nodes[x.toString()+' '+y.toString()] = this
        this.value = matrix[x][y]
        this.x = x
        this.y = y
        this.right = x < 79 ? getNode(matrix, x+1, y) : null
        this.down = y < 79 ? getNode(matrix, x, y+1) : null
    }

    dijkstra_to(x:number, y:number): number {
        let entries: dijkstra_entry[] = [[this, this.value]]
        let explored: node[] = []
        while (true) {
            let current_entry = entries.shift()
            if (current_entry === undefined) {
                return -1
            } else if (current_entry[0].x == x && current_entry[0].y == y) {
                return current_entry[1]
            } else {
                if (current_entry[0].right !== null && !explored.includes(current_entry[0].right)) {
                    entries.push([current_entry[0].right, current_entry[1] + current_entry[0].right.value])
                }
                if (current_entry[0].down !== null && !explored.includes(current_entry[0].down)) {
                    entries.push([current_entry[0].down, current_entry[1] + current_entry[0].down.value])
                }
                entries = entries.sort((a, b) => a[1] - b[1])
                explored.push(current_entry[0])
            }
        }
    }
}

function getNode(matrix: number[][], x: number, y: number): node {
    if (nodes[x.toString()+' '+y.toString()]) {
        return nodes[x.toString()+' '+y.toString()]
    } else {
        return new node(matrix, x, y)
    }
}

const start_node = new node(matrix,0,0)
console.log(start_node.dijkstra_to(79, 79))
