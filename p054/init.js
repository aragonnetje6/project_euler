"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const hands_arr = fs.readFileSync('p054_poker.txt').toString().split('\n')
// let total_wins = 0
// for (let hands of hands_arr) {
//     let cards = hands.split(' ')
//     let hand_1 = cards.slice(0, 5)
//     let hand_2 = cards.slice(5)
//     if (hand_value(hand_1) > hand_value(hand_2)) {
//         total_wins++
//     }
// }
//
// function same_suit(hand: string[]): boolean {
//     return hand.every( x => x[1] === hand[0][1] )
// }
//
// function royal_flush(hand: string[]) {
//     return same_suit(hand) && ['T', 'J', 'Q', 'K', 'A'].every(y => hand.map(x => x[0]).includes(y));
// }
//
// function straight_flush(hand: string[]) {
//     return same_suit(hand) && hand.map(x => x[0]);
// }
//
// function hand_value(hand: string[]): number {
//     if (royal_flush(hand)) {
//         return ROYAL_FLUSH
//     } else if (straight_flush(hand)) {
//         return STRAIGHT_FLUSH +
//     }
// }
