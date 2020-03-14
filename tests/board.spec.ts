import {
  ITetrominoElement,
} from '../src/types';
import { BOARD_SIZES } from '../src/constants';
import { getBoard } from '../src/board';

const createElementComparator = (a: ITetrominoElement) => (b: ITetrominoElement) => a.x === b.x
  && a.y === b.y && a.color === b.color;

describe('Board', () => {
  const board = getBoard();

  beforeEach(() => {
    board.clear();
  });

  describe('addElements', () => {
    it('add elements to the board', () => {
      const ELEMENTS: ITetrominoElement[] = [
        { x: 0, y: 0, color: '' },
        { x: 1, y: 1, color: '' },
        { x: 2, y: 2, color: '' },
        { x: 0, y: 3, color: '' },
        { x: 1, y: 4, color: '' },
        { x: 2, y: 5, color: '' },
        { x: 1, y: 6, color: '' },
        { x: 4, y: 7, color: '' },
        { x: 3, y: 8, color: '' },
        { x: 1, y: 9, color: '' },
      ];

      board.addElements(ELEMENTS);
      const actual = Array.from(board.getElements());
      expect(actual.length).toBe(ELEMENTS.length);
      actual.forEach((element) => {
        expect(ELEMENTS.find(createElementComparator(element))).toEqual(element);
      });
    });
  });

  describe('isPositionFilled', () => {
    it('return true if the positon is filled', () => {
      const ELEMENT: ITetrominoElement = { x: 4, y: 15, color: '' };
      board.addElements([ELEMENT]);

      expect(board.isPositionFilled(ELEMENT)).toBe(true);
    });

    it('return false if the positon is not filled', () => {
      const ELEMENT: ITetrominoElement = { x: 4, y: 15, color: '' };

      expect(board.isPositionFilled(ELEMENT)).toBe(false);
    });
  });

  describe('getRowToDestroy', () => {
    it('return undefined if there is no full rows', () => {
      expect(board.getRowToDestroy()).toBeUndefined();
    });

    it('return undefined if there is almost full row (full minus one element)', () => {
      const ALMOST_FULL_ROW: ITetrominoElement[] = [];
      const BOARD_WIDTH = BOARD_SIZES.width;
      for (let i = 0; i < BOARD_WIDTH - 1; i++) {
        ALMOST_FULL_ROW.push({ x: i, y: 5, color: '' });
      }
      board.addElements(ALMOST_FULL_ROW);

      expect(board.getRowToDestroy()).toBeUndefined();
    });

    it('return first full row index if there is a full row', () => {
      const FIRST_FULL_ROW_INDEX = 8;
      const SECOND_FULL_ROW_INDEX = 9;
      const BOARD_WIDTH = BOARD_SIZES.width;
      const ELEMENTS: ITetrominoElement[] = [
        { x: 0, y: 0, color: '' },
        { x: 0, y: 1, color: '' },
        { x: 0, y: 2, color: '' },
        { x: 0, y: 3, color: '' },
        { x: 1, y: 3, color: '' },
        { x: 2, y: 3, color: '' },
        { x: 3, y: 10, color: '' },
        { x: 4, y: 11, color: '' },
      ];
      const FIRST_FULL_ROW: ITetrominoElement[] = [];
      for (let i = 0; i < BOARD_WIDTH; i++) {
        FIRST_FULL_ROW.push({ x: i, y: FIRST_FULL_ROW_INDEX, color: '' });
      }
      const SECOND_FULL_ROW: ITetrominoElement[] = [];
      for (let i = 0; i < BOARD_WIDTH; i++) {
        SECOND_FULL_ROW.push({ x: i, y: SECOND_FULL_ROW_INDEX, color: '' });
      }
      board.addElements(ELEMENTS);
      board.addElements(SECOND_FULL_ROW);
      board.addElements(FIRST_FULL_ROW);

      expect(board.getRowToDestroy()).toBe(FIRST_FULL_ROW_INDEX);
    });
  });

  describe('destroyRow', () => {
    it('destroy all elements on the row and move all the above elements one step down', () => {
      const DESTROY_ROW_INDEX = 5;
      const ELEMENTS: ITetrominoElement[] = [
        { x: 0, y: 1, color: '' },
        { x: 1, y: 1, color: '' },
        { x: 3, y: 2, color: '' },
        { x: 4, y: 2, color: '' },
        { x: 5, y: 3, color: '' },
        { x: 6, y: 3, color: '' },
      ];
      const ELEMENTS_TO_BE_DESTROYED: ITetrominoElement[] = [
        { x: 0, y: DESTROY_ROW_INDEX, color: '' },
        { x: 1, y: DESTROY_ROW_INDEX, color: '' },
        { x: 2, y: DESTROY_ROW_INDEX, color: '' },
        { x: 3, y: DESTROY_ROW_INDEX, color: '' },
        { x: 4, y: DESTROY_ROW_INDEX, color: '' },
        { x: 5, y: DESTROY_ROW_INDEX, color: '' },
      ];
      const EXPECT_ELEMENTS: ITetrominoElement[] = [
        { x: 0, y: 2, color: '' },
        { x: 1, y: 2, color: '' },
        { x: 3, y: 3, color: '' },
        { x: 4, y: 3, color: '' },
        { x: 5, y: 4, color: '' },
        { x: 6, y: 4, color: '' },
      ];
      board.addElements(ELEMENTS);
      board.addElements(ELEMENTS_TO_BE_DESTROYED);

      board.destroyRow(DESTROY_ROW_INDEX);

      const actual = Array.from(board.getElements());
      expect(actual.length).toBe(EXPECT_ELEMENTS.length);
      actual.forEach((element) => {
        expect(EXPECT_ELEMENTS.find(createElementComparator(element))).toEqual(element);
      });
    });
  });
});
