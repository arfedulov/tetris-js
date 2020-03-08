import {
  IPoint,
  IBoard,
  ITetrominoElement,
  ITetromino,
} from './types';
import {
  computeRotatedPoint,
  computeTranslatedPoint,
} from './utils';

type TetrominoMovementDirection = 'left' | 'right' | 'down';

type TetrominoType = 0 | 1 | 2 | 3 | 4;

interface ITetrominoInitOptions {
  type: TetrominoType;
  initialPosition: IPoint;
  initialRotation: number;
  color: string;
  board: IBoard;
}

interface ITranslation {
  tx: number;
  ty: number;
}

const buildTypeZeroElements = (initialPosition: IPoint, color: string) => {
  const { x: pivotX, y: pivotY } = initialPosition;

  return [
    { x: pivotX - 2, y: pivotY, color },
    { x: pivotX - 1, y: pivotY, color },
    { x: pivotX - 0, y: pivotY, color },
    { x: pivotX + 1, y: pivotY, color },
  ];
};

const buildTypeOneElements = (initialPosition: IPoint, color: string) => {
  const { x: pivotX, y: pivotY } = initialPosition;

  return [
    { x: pivotX - 1, y: pivotY, color },
    { x: pivotX - 0, y: pivotY, color },
    { x: pivotX - 1, y: pivotY + 1, color },
    { x: pivotX - 0, y: pivotY + 1, color },
  ];
};

const buildTypeTwoElements = (initialPosition: IPoint, color: string) => {
  const { x: pivotX, y: pivotY } = initialPosition;

  return [
    { x: pivotX - 0, y: pivotY - 1, color },
    { x: pivotX - 0, y: pivotY - 0, color },
    { x: pivotX - 0, y: pivotY + 1, color },
    { x: pivotX + 1, y: pivotY + 1, color },
  ];
};

const buildTypeThreeElements = (initialPosition: IPoint, color: string) => {
  const { x: pivotX, y: pivotY } = initialPosition;

  return [
    { x: pivotX - 1, y: pivotY - 1, color },
    { x: pivotX - 1, y: pivotY - 0, color },
    { x: pivotX - 0, y: pivotY - 0, color },
    { x: pivotX - 0, y: pivotY + 1, color },
  ];
};

const buildTypeFourElements = (initialPosition: IPoint, color: string) => {
  const { x: pivotX, y: pivotY } = initialPosition;

  return [
    { x: pivotX - 1, y: pivotY - 0, color },
    { x: pivotX - 0, y: pivotY - 0, color },
    { x: pivotX + 1, y: pivotY - 0, color },
    { x: pivotX - 0, y: pivotY + 1, color },
  ];
};

const elementFactories = [
  buildTypeZeroElements,
  buildTypeOneElements,
  buildTypeTwoElements,
  buildTypeThreeElements,
  buildTypeFourElements,
];

const TRANSLATIONS_MAP: Record<TetrominoMovementDirection, ITranslation> = {
  'down': { tx: 0, ty: 1 },
  'left': { tx: -1, ty: 0 },
  'right': { tx: 1, ty: 0 },
};

class Tetromino implements ITetromino {
  private pivot: IPoint;
  private stuck: boolean;
  private elements: ITetrominoElement[];
  private board: IBoard;

  constructor(options: ITetrominoInitOptions) {
    const {
      initialPosition,
      color,
      initialRotation,
      board,
      type,
    } = options;

    this.pivot = { ...initialPosition };
    this.board = board;
    this.stuck = false;
    this.elements = elementFactories[type](initialPosition, color);

    this.applyRotation(initialRotation);
  }

  isStuck() {
    return this.stuck;
  }

  getElements() {
    return [ ...this.elements ];
  }

  moveRight() {
    this.move('right');
  }

  moveLeft() {
    this.move('left');
  }

  moveDown() {
    this.move('down');
  }

  rotate() {
    this.applyRotation(Math.PI / 2);
  }

  private applyRotation(angle: number): void {
    this.elements = this.elements.map((element) => {
      const { x, y } = element;
      const computed = computeRotatedPoint({ x, y }, this.pivot, angle);

      return { ...element, ...computed };
    });
  }

  private getMovedElements(direction: TetrominoMovementDirection): ITetrominoElement[] {
    return this.elements.map((element) => {
      const { x, y } = element;
      const { tx, ty } = TRANSLATIONS_MAP[direction];
      const computed = computeTranslatedPoint({ x, y }, tx, ty);

      return { ...element, ...computed };
    });
  }

  private canMove(direction: TetrominoMovementDirection): boolean {
    const moved = this.getMovedElements(direction);

    for (const element of moved) {
      const { x, y } = element;
      if (!this.board.isPositionInsideBoard({ x, y }) || this.board.isPositionFilled({ x, y })) {
        return false;
      }
    }

    return true;
  }

  private move(direction: TetrominoMovementDirection): void {
    if (!this.canMove(direction)) {
      if (direction === 'down') {
        this.stuck = true;
      }

      return;
    }

    this.elements = this.getMovedElements(direction);
  }
}

const TETROMINO_TYPES: TetrominoType[] = [ 0, 1, 2, 3, 4 ];

const getRandomColor = (colors: string[]) => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomRotation = (): number => {
  const TETROMINO_ROTATION_ANGLES = [ 0, Math.PI / 2, Math.PI, -Math.PI / 2 ];

  return TETROMINO_ROTATION_ANGLES[Math.floor(Math.random() * TETROMINO_ROTATION_ANGLES.length)];
};

export const createTetromino = (initialPosition: IPoint, colors: string[], board: IBoard): ITetromino => {
  const color = getRandomColor(colors);
  const initialRotation = getRandomRotation();
  const type = TETROMINO_TYPES[Math.floor(Math.random() * TETROMINO_TYPES.length)];

  return new Tetromino({ type, initialPosition, initialRotation, color, board });
};
