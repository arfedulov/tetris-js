
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
  isOutOfBoard(): boolean;

  moveLeft(): void;
  moveRight(): void;
  moveDown(): void;
  rotate(): void;
}

export interface IBoard {
  isPositionFilled(position: IPoint): boolean;
  isPositionInsideBoardOrAbove(position: IPoint): boolean;

  destroyRow(rowIndex: number): void;
  getRowToDestroy(): number | undefined;

  getElements(): Iterable<ITetrominoElement>;
  addElements(elements: Iterable<ITetrominoElement>): void;

  clear(): void;
}

export interface IRenderer {
  render(...models: IElementsContainer[]): void;
  clear(): void;
}

export interface IElementsContainer {
  getElements(): Iterable<ITetrominoElement>;
}

export interface IColorTheme {
  background: string;
  tetrominos: string[];
}
