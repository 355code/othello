
const board = document.createElement('div');
board.style.display = 'grid'
board.style.gridTemplateColumns = 'repeat(8, 20px)'
board.style.gridTemplateRows = 'repeat(8, 20px)'
board.style.gap = '3px'
board.style.backgroundColor = 'green'
board.style.width = 'fit-content'
board.style.padding = '5px'
board.style.cursor = 'pointer'

document.body.appendChild(board)

let GAME_TURN = 'white'
//seperate into different edges
let TOP_EDGE = [0, 1, 2, 3, 4, 5, 6, 7]
let BOTTOM_EDGE = [56, 57, 58, 59, 60, 61, 62, 63]
let LEFT_EDGE = [0, 8, 16, 24, 32, 40, 48, 56]
let RIGHT_EDGE = [7, 15, 23, 31, 39, 47, 55, 63]

let GAME = [];

for (let i = 0; i < 64; i++) {
    let edgeArray = [];
    [[BOTTOM_EDGE, 'bottom'], [TOP_EDGE, 'top'], [LEFT_EDGE, 'left'], [RIGHT_EDGE, 'right']].forEach((edge) => {
        if (edge[0].includes(i)) {
            edgeArray.push(edge[1])
        }
    })
    let toPush = {
        gridNum: i,
        color: 'blank',
        edge: edgeArray
    }
    GAME.push(toPush);
}

console.log(GAME)

for (let i = 0; i < 64; i++) {
    const grid = document.createElement('div');
    grid.style.height = '20px'
    grid.style.width = '20px'
    grid.style.border = 'solid'
    grid.setAttribute('id', 'grid-' + i)
    board.appendChild(grid)
    grid.addEventListener('click', () => {
        // console.log(grid.children)
        if (grid.children.length === 0) {
            // console.log(GAME_TURN)
            const piece = document.createElement('div');
            piece.style.height = '15px'
            piece.style.width = '15px'
            piece.style.border = 'solid'
            piece.style.margin = '1.5px'
            piece.style.borderRadius = '50%'
            piece.setAttribute('id', 'piece-' + i)
            piece.style.backgroundColor = GAME_TURN;
            GAME[i].color = GAME_TURN

            grid.appendChild(piece)
            if (GAME_TURN === 'white') {
                GAME_TURN = 'black'
            }
            else {
                GAME_TURN = 'white'
            }
            let gridIndex = Number(grid.getAttribute('id').substring(5))

            //flip under
            let checkDown = gridIndex + 8;
            flip(gridIndex, checkDown, 8, ['bottom','bottom'])
            //flip above
            let checkUp = gridIndex - 8;
            flip(gridIndex, checkUp, -8, ['top','top'])
            //flip right
            let checkRight = gridIndex + 1;
            flip(gridIndex, checkRight, 1, ['right','right'])
            //flip left
            let checkLeft = gridIndex - 1;
            flip(gridIndex, checkLeft, -1, ['left','left'])
            //flip bottom right
            let checkBottomRight = gridIndex + 9;
            flip(gridIndex, checkBottomRight, 9, ['bottom', 'right'])
            //flip bottom left
            let checkBottomLeft = gridIndex + 7;
            flip(gridIndex, checkBottomLeft, 7, ['bottom', 'left'])
            //flip top right
            let checkTopRight = gridIndex - 7;
            flip(gridIndex, checkTopRight, -7, ['top', 'right'])
            //flip top left
            let checkTopLeft = gridIndex - 9;
            flip(gridIndex, checkTopLeft, -9, ['top', 'left'])

            //check if game is over
            let gameOver = 0;
            let blacks = 0;
            let whites = 0;
            for (let i = 0; i < 64; i++) {
                if (GAME[i].color !== 'blank') {
                    if (GAME[i].color == 'white') {
                        whites++
                    }
                    else {
                        blacks++
                    }
                    gameOver++
                }
            }
            if (gameOver === 64) {
                console.log(`Game Over! Whites: ${whites} Blacks ${blacks} - ${(whites > blacks) ? 'Whites' : 'Blacks'} Win!`)
            }

        }
    })
}

function flip(gridIndex, direction, increment, edge) {
        // console.log(direction, increment)
if(GAME[direction]){
        while (GAME[direction].color !== 'blank' && GAME[direction].color !== GAME[gridIndex].color && !GAME[gridIndex].edge.includes(edge[0]) && !GAME[gridIndex].edge.includes(edge[1]) && !GAME[direction].edge.includes(edge[0]) && !GAME[direction].edge.includes(edge[1])) {
            direction += increment
            // console.log(gridIndex, direction)
        }
        if (GAME[direction]){
            if (GAME[direction].color === GAME[gridIndex].color) {
                for (let i = direction; i !== gridIndex; i -= increment) {
                    GAME[i].color = GAME[gridIndex].color;
                    let pieceToChange = document.getElementById('piece-' + i);
                    pieceToChange.style.backgroundColor = GAME[i].color;
                }
            }
        }
}
}
