import { IRenderer, IElementsContainer, ITetrominoElement } from './types';
import { DOM_ELEMENT_IDS, BOARD_SIZES } from './constants';

const BLOCK_SIZE = 30;
const GAP_SIZE = 1;

const boardToCanvasCoord = (coord: number): number => {
  return coord * BLOCK_SIZE;
};

const drawElement = (ctx: CanvasRenderingContext2D, element: ITetrominoElement): void => {
  const { x, y } = element;
  const { color } = element;

  ctx.fillStyle = color;
  ctx.fillRect(
    boardToCanvasCoord(x) + GAP_SIZE,
    boardToCanvasCoord(y) + GAP_SIZE,
    BLOCK_SIZE - GAP_SIZE * 2,
    BLOCK_SIZE - GAP_SIZE * 2,
  );
};

class Renderer implements IRenderer {
  private renderingContext: CanvasRenderingContext2D;

  constructor() {
    const canvas = document.getElementById(DOM_ELEMENT_IDS.CANVAS_ELEMENT) as HTMLCanvasElement;
    if (!canvas) {
      throw Error('Canvas element is not found');
    }

    this.renderingContext = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  render(model: IElementsContainer) {
    this.renderingContext.clearRect(0, 0, boardToCanvasCoord(BOARD_SIZES.width), boardToCanvasCoord(BOARD_SIZES.height));
    for (const element of model.getElements()) {
      drawElement(this.renderingContext, element);
    }
  }
}

let renderer: IRenderer;

export const getRenderer = () => {
  if (!renderer) {
    renderer = new Renderer();
  }

  return renderer;
};
