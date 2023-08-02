
const util = {
    /**
     * Determine whether the board architecture and values are valid to play Sudoku.
     * @param {character[][]} board
     * @returns {boolean}
     */
    isValidBoard: function (board) {
        const SIZE = 9;
        if (!Array.isArray(board) || board.length != SIZE) {
            return false;
        }

        const VALID_VALUES = new Set([".", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

        for (let row = 0; row < SIZE; row += 1) {             
            if (board[row].length != SIZE) {              // Control column length is equal to SIZE(9)
                return false;
            }
            for (let col = 0; col < SIZE; col += 1) {         
                if (!VALID_VALUES.has(board[row][col])) {   // If the board has an invalid character in a cell, return `false`.
                    return false;
                }
            }
        }
        return true;
    }
};


/**
 * Determine if a board is valid to play sudoku.
 *  
 * @param {character[][]} board
 * @return {boolean}
 */
function isValidSudoku(board) {
    if (!util.isValidBoard(board)) { // Input validation
        return false;
    }
    const SIZE = 9;
    const EMPTY_CELL = ".";
    let visitedRow = new Set(); 
    let visitedCol = new Set();
    let visitedSubBox = new Set();

    let rowValue;
    let colValue;
    let subBoxValue;

    for (let i = 0; i < SIZE; i += 1) {             
        for (let j = 0; j < SIZE; j += 1) {         

            rowValue = board[i][j]; 
            colValue = board[j][i];
            subBoxValue = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)] 

            
            // If the value is already defined in the related set, that means a duplicate value has occurred.
            if (visitedRow.has(rowValue) || visitedCol.has(colValue) || visitedSubBox.has(subBoxValue)) {
                return false;
            }

            // If the cell is empty, skip it. Otherwise, add the related set.
            if (rowValue !== EMPTY_CELL) visitedRow.add(rowValue);  
            if (colValue !== EMPTY_CELL) visitedCol.add(colValue);
            if (subBoxValue !== EMPTY_CELL) visitedSubBox.add(subBoxValue);
        }

        // Removes all elements from sets.
        visitedRow.clear()
        visitedCol.clear()
        visitedSubBox.clear()
    }

    return true; // Board is valid
};

module.exports = { isValidSudoku: isValidSudoku, util }  
