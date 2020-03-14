import {
  IColorTheme,
} from './types';

export const COLOR_THEMES: Record<string, IColorTheme> = {
  DEFAULT: {
    background: '#FFFFFF',
    tetrominos: [
      '#D9E5D6',
      '#5FAD56',
      '#FFA630',
      '#F15946',
      '#254E70',
    ],
  },
};

export const BOARD_SIZES = {
  width: 12,
  height: 22,
};

export const BLOCK_SIZE = 30;
export const GAP_SIZE = 1;

export const KEYBOARD_KEYS_SETTINGS = {
  RIGHT: ['ArrowRight', 'd'],
  LEFT: ['ArrowLeft', 'a'],
  DOWN: ['ArrowDown', 's'],
  ROTATE: ['ArrowUp', 'w'],
  PAUSE: ['Escape', 'p'],
  STOP: ['CustomStop'],
  PLAY: ['CustomPlay'],
};

export const DOM_ELEMENT_IDS = {
  CANVAS_ELEMENT: 'canvas',
};
