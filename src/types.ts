
export interface IPoint {
  x: number;
  y: number;
}

export interface ITetrominoElement {
  x: number;
  y: number;
  color: string;
}

export interface ITetromino {
  getElements() : ITetrominoElement[];
  isStuck(): boolean;

  moveLeft(): void;
  moveRight(): void;
  moveDown(): void;
  rotate(): void;
}

export interface IBoard {
  isPositionFilled(position: IPoint): boolean;
  isPositionInsideBoard(position: IPoint): boolean;

  destroyRow(rowIndex: number): void;
}
