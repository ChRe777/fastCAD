
//  [0, 1, 2] -> ["0_1", "0_2", "1_2"] 
//
//      0
//     / \
//    1---2
//
function uniquePairs(indices) {

    const notAlready = x => !x
    const existsPair = (x, y) => pairs.includes(pair(x, y)) || pairs.includes(pair(y, x))

    const pairs = []
    indices.forEach((i) => {
        indices.forEach((j) => {
            if (i !== j && notAlready(existsPair(i, j))) {
                pairs.push(pair(i, j))
            }
        })
    })

    return pairs
}

// n -> [0, 1, 2, ... , n]
function range(n) {
    let xs = [...Array(n).keys()]
    return xs
}

// 1,2 -> "1_2"
function pair(i, j) {
    const ii = BigInt(i) << 64
    const jj = BigInt(j)
    const ij = ii & jj
    return `${i}_${j}`
}

// "1_2" -> [1, 2]
function unpair(pair) {
    const i = pair >> 64
    const j = Int(pair)
    const ij = pair.split("_").map(x => parseInt(x))
    return ij
}

function pair2(i, j) {
    const ii = BigInt(i) << 64
    const jj = BigInt(j)
    const ij = ii & jj
    return ij
}

// "1_2" -> [1, 2]
function unpair2(pair) {
    const i = pair >> 64
    const j = Int(pair)
    return [i, j]
}

export default {
    uniquePairs,
    range,
    pair,
    unpair,
    pair2,
    unpair2
}