import {
  IBoard,
  ITetrominoElement,
  IPoint,
} from './types';
import {
  BOARD_SIZES,
} from './constants';

const getKey = (point: IPoint) => `${point.x},${point.y}`;

const parseKey = (key: string) => {
  const [x, y] = key.split(',').map(Number);

  return { x, y };
};

class ElementsTable {
  private table: Map<string, ITetrominoElement>;

  constructor() {
    this.table = new Map();
  }

  addElements(elements: Iterable<ITetrominoElement>): void {
    for (const element of elements) {
      const { x, y } = element;
      const key = getKey({ x, y });

      if (this.table.has(key)) {
        throw Error(`The position (${x}, ${y}) on the board is not empty`);
      }

      this.table.set(key, element);
    }
  }

  destroyRowAndMoveDown(rowIndex: number) {
    this.destroyRow(rowIndex);
    this.moveAllDown(rowIndex);
  }

  isPositionEmpty(point: IPoint): boolean {
    return !this.table.has(getKey(point));
  }

  getElements() {
    return this.table.values();
  }

  getFirstFullRow(rowWidth: number) {
    const keysSortedByRow = Array.from(this.table.keys()).sort((a, b) => parseKey(a).y - parseKey(b).y);

    let count = 0;
    let [prevKey] = keysSortedByRow;
    for (const key of keysSortedByRow) {
      if (key === prevKey) {
        count += 1;
      }
      prevKey = key;
      if (count >= rowWidth) {
        return parseKey(key).y;
      }
    }
  }

  private moveAllDown(rowIndex: number) {
    const keys = Array.from(this.table.keys()).filter((key) => parseKey(key).y < rowIndex);
    const elements = keys.map((key) => {
      return this.table.get(key);
    }) as ITetrominoElement[];
    keys.forEach((key) => {
      this.table.delete(key);
    });
    elements.forEach((element) => {
      element.y += 1;
      this.table.set(getKey(element), element);
    });
  }

  private destroyRow(rowIndex: number) {
    const keys = Array.from(this.table.keys()).filter((key) => parseKey(key).y === rowIndex);
    keys.forEach((key) => {
      this.table.delete(key);
    });
  }
}

class Board implements IBoard {
  private readonly width: number;
  private readonly height: number;
  private readonly elements: ElementsTable;

  constructor() {
    this.width = BOARD_SIZES.width;
    this.height = BOARD_SIZES.height;
    this.elements = new ElementsTable();
  }

  addElements(elements: Iterable<ITetrominoElement>) {
    this.elements.addElements(elements);
  }

  getElements() {
    return this.elements.getElements();
  }

  isPositionFilled(point: IPoint) {
    return !this.elements.isPositionEmpty(point);
  }

  isPositionInsideBoard(point: IPoint) {
    const { x, y } = point;

    return x >= 0 && x <= this.width - 1 && y >= 0 && y <= this.height - 1;
  }

  destroyRow(rowIndex: number) {
    this.elements.destroyRowAndMoveDown(rowIndex);
  }

  getRowToDestroy() {
    return this.elements.getFirstFullRow(this.width);
  }
}

let board: IBoard;

export const getBoard = () => {
  if (!board) {
    board = new Board();
  }

  return board;
};
