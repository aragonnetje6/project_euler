"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var matrix_string = fs.readFileSync('p082_matrix.txt').toString();
var matrix = matrix_string.split('\n').slice(0, -1).map(function (x) { return x.split(',').map(function (y) { return parseInt(y, 10); }); });
console.assert(matrix.every(function (x) { return x.every(function (y) { return !isNaN(y); }); }));
var nodes = {};
var node = /** @class */ (function () {
    function node(matrix, x, y) {
        nodes[x.toString() + ' ' + y.toString()] = this;
        this.value = matrix[y][x];
        this.x = x;
        this.y = y;
        this.right = x < 79 ? getNode(matrix, x + 1, y) : undefined;
        this.down = y < 79 ? getNode(matrix, x, y + 1) : undefined;
        this.up = y > 0 ? getNode(matrix, x, y - 1) : undefined;
    }
    node.prototype.dijkstra_to = function (x, y) {
        var entries = [[this, this.value]];
        var explored = [];
        while (true) {
            var current_entry = entries.shift();
            if (current_entry === undefined) {
                return -1;
            }
            else if ((current_entry[0].x == x || x === undefined) && (current_entry[0].y == y || y === undefined)) {
                return current_entry[1];
            }
            else {
                if (current_entry[0].right !== undefined && !explored.includes(current_entry[0].right)) {
                    entries.push([current_entry[0].right, current_entry[1] + current_entry[0].right.value]);
                }
                if (current_entry[0].down !== undefined && !explored.includes(current_entry[0].down)) {
                    entries.push([current_entry[0].down, current_entry[1] + current_entry[0].down.value]);
                }
                if (current_entry[0].up !== undefined && !explored.includes(current_entry[0].up)) {
                    entries.push([current_entry[0].up, current_entry[1] + current_entry[0].up.value]);
                }
                entries.sort(function (a, b) { return a[1] - b[1]; });
                explored.push(current_entry[0]);
            }
        }
    };
    return node;
}());
function getNode(matrix, x, y) {
    if (nodes[x.toString() + ' ' + y.toString()]) {
        return nodes[x.toString() + ' ' + y.toString()];
    }
    else {
        return new node(matrix, x, y);
    }
}
var current = new node(matrix, 0, 0);
var results = [];
while (current.down !== undefined) {
    results.push(current.dijkstra_to(79));
    current = current.down;
}
console.log(Math.min.apply(Math, results));
