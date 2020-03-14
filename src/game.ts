import {
  IColorTheme, IBoard, ITetromino, IPoint, IRenderer,
} from './types';
import { getBoard } from './board';
import { createTetromino } from './tetromino';
import { BOARD_SIZES } from './constants';
import { getControls, IControls } from './controls';
import { COLOR_THEMES, KEYBOARD_KEYS_SETTINGS } from './constants';
import { screens } from './screens';
import { getRenderer } from './renderer';

type GameStatus = 'running' | 'stopped' | 'paused';

const SPAWN_POINT: IPoint ={
  x:  Math.floor(BOARD_SIZES.width / 2),
  y: -3,
};

class Game {
  status: GameStatus = 'stopped';
  score: number = 0;
  colorTheme: IColorTheme = COLOR_THEMES.DEFAULT;

  board: IBoard;
  controls: IControls;
  renderer: IRenderer;
  tetromino?: ITetromino;

  private lastGameCycle: number;
  private lastRender: number;

  constructor() {
    this.setupControlsListeners();

    this.renderer = getRenderer();
    this.controls = getControls();
    this.board = getBoard();
    this.spawnTetromino();

    this.lastGameCycle = performance.now();
    this.lastRender = performance.now();

    screens.displayStartScreen();
  }

  private setupControlsListeners() {
    window.addEventListener('keyup', (event) => {
      const { key } = event;
      if (KEYBOARD_KEYS_SETTINGS.PLAY.includes(key)) {
        this.play();
      }
      if (KEYBOARD_KEYS_SETTINGS.STOP.includes(key)) {
        this.stop();
      }
      if (KEYBOARD_KEYS_SETTINGS.PAUSE.includes(key)) {
        this.pause();
      }
    });
  }

  private run() {
    this.status = 'running';
    window.requestAnimationFrame(this.step);
  }

  private step = (timestamp: number) => {
    this.execMovementListeners();
    const runNextCycle = (timestamp - this.lastGameCycle) > 800 && this.status === 'running';
    if (runNextCycle) {
      this.lastGameCycle = timestamp;
      this.cycle();
    }
    const makeNextRender = (timestamp - this.lastRender) > 0 && this.status === 'running';
    if (makeNextRender) {
      this.lastRender = timestamp;
      if (this.tetromino) {
        this.renderer.render(this.tetromino, this.board);
      } else {
        this.renderer.render(this.board);
      }
    }

    if (this.status === 'running') {
      window.requestAnimationFrame(this.step);
    }
  }

  private addScore(score: number) {
    this.score += score;
  }

  private pause() {
    if (this.status === 'running') {
      this.status = 'paused';
      screens.displayPauseScreen();
    }
  }

  private play() {
    screens.hideAll();
    this.run();
  }

  private stop() {
    this.status = 'stopped';
    this.resetGame();
    screens.displayStartScreen();
  }

  private resetGame() {
    this.board.clear();
    this.renderer.clear();
    this.spawnTetromino();
  }

  private spawnTetromino() {
    this.tetromino = createTetromino(SPAWN_POINT, this.colorTheme.tetrominos, this.board);
  }

  private cycle() {
    if (this.tetromino && this.tetromino.isStuck()) {
      this.board.addElements(this.tetromino.getElements());
      this.spawnTetromino();
    }
    this.moveTetrominoDown();
    this.destroyFullRows();
    if (this.isGameOver()) {
      this.stop();
    }
  }

  private execMovementListeners() {
    if (this.tetromino) {
      if (this.controls.left) {
        this.tetromino.moveLeft();
      }
      if (this.controls.right) {
        this.tetromino.moveRight();
      }
      if (this.controls.down) {
        this.tetromino.moveDown();
      }
      if (this.controls.rotate) {
        this.tetromino.rotate();
      }
    }
  }

  private isGameOver() {
    return this.tetromino && this.tetromino.isStuck() && this.tetromino.isOutOfBoard();
  }

  private destroyFullRows() {
    let toDestroyRowIndex = this.board.getRowToDestroy();
    while(toDestroyRowIndex !== undefined) {
      this.board.destroyRow(toDestroyRowIndex);
      toDestroyRowIndex = this.board.getRowToDestroy();
    }
  }

  private moveTetrominoDown() {
    if (this.tetromino && !this.tetromino.isStuck()) {
      this.tetromino.moveDown();
    }
  }
}

let game: Game;

export const loadGame = () => {
  if (!game) {
    game = new Game();
  }
};
