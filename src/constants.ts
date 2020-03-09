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
  width: 10,
  height: 30,
};

export const KEYBOARD_KEYS_SETTINGS = {
  RIGHT: ['ArrowRight', 'd'],
  LEFT: ['ArrowLeft', 'a'],
  DOWN: ['ArrowDown', 's'],
  ROTATE: [' ', 'Shift'],
  PAUSE: ['Escape', 'p'],
  STOP: ['CustomStop'],
  PLAY: ['CustomPlay'],
};
