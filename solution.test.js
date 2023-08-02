const { isValidSudoku, util } = require('./solution')
const { getValidBoard, getBoardHasDuplicateValuesInFirstColumn, getBoardHasDuplicateValuesInRow,
    getBoardHasDuplicateValuesInSubBox, getBoardWhichRowSizeLessThanNine, getBoardWhichRowSizeGreaterThanNine,
    getBoardHasInvalidCharacters, getBoardWhichColumnSizeLessThanNine, getBoardWhichColumnSizeGreaterThanNine } = require('./factory')


afterAll(() => {
    console.log("OK!");
});


describe('when board architecture and values are valid', () => {
    
    beforeEach(() => {
        boardValidationMock = jest.spyOn(util, 'isValidBoard').mockImplementation(() => true);
    });

    afterEach(() => {
        expect(boardValidationMock).toHaveBeenCalledTimes(1);
        jest.restoreAllMocks();
    });

    test('should return true when board is valid', () => {
        expect(isValidSudoku(getValidBoard())).toBeTruthy();
    })

    test('should return false when values are duplicated in a column', () => {
        expect(isValidSudoku(getBoardHasDuplicateValuesInFirstColumn())).toBeFalsy();
    })

    test('should return false when values are duplicated in a row', () => {
        expect(isValidSudoku(getBoardHasDuplicateValuesInRow())).toBeFalsy()
    })


    test('should return false when values are duplicated in a sub-box', () => {
        expect(isValidSudoku(getBoardHasDuplicateValuesInSubBox())).toBeFalsy()
    })

});


describe('when board architecture or/and values are not valid', () => {

    test('should return false when board row size is less than 9', () => {
        expect(util.isValidBoard(getBoardWhichRowSizeLessThanNine())).toBeFalsy()
    })

    test('should return false when board row size is greater than 9', () => {
        expect(util.isValidBoard(getBoardWhichRowSizeGreaterThanNine())).toBeFalsy()
    })

    test('should return false when board is undefined', () => {
        const board = undefined;
        expect(util.isValidBoard(board)).toBeFalsy()
    })

    test('should return false when board has invalid character(s)', () => {
        expect(util.isValidBoard(getBoardHasInvalidCharacters())).toBeFalsy()
    })

    test('should return false when boards column size is less than 9', () => {
        expect(util.isValidBoard(getBoardWhichColumnSizeLessThanNine())).toBeFalsy()
    })

    test('should return false when board column size is greater than 9', () => {
        expect(util.isValidBoard(getBoardWhichColumnSizeGreaterThanNine())).toBeFalsy()
    })
});