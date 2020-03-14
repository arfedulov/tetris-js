import { KEYBOARD_KEYS_SETTINGS } from './constants';

const isLeftKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.LEFT.includes(event.key);

const isRightKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.RIGHT.includes(event.key);

const isDownKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.DOWN.includes(event.key);

const isRotateKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.ROTATE.includes(event.key);

export interface IControls {
  left: boolean;
  right: boolean;
  down: boolean;
  rotate: boolean;
}

class Controls implements IControls {
  private buttons: Record<string, boolean> = {
    right: false,
    left: false,
    down: false,
    rotate: false,
  };

  constructor() {
    window.addEventListener('keydown', this.onButtonPress);
    window.addEventListener('keyup', this.onButtonPress);
  }

  get right() {
    const val = this.buttons.right;
    this.buttons.right = false;

    return val;
  }

  get left() {
    const val = this.buttons.left;
    this.buttons.left = false;

    return val;
  }

  get down() {
    const val = this.buttons.down;
    this.buttons.down = false;

    return val;
  }

  get rotate() {
    const val = this.buttons.rotate;
    this.buttons.rotate = false;

    return val;
  }

  private onButtonPress = (event: KeyboardEvent) => {
    const value = event.type === 'keydown';

    if (isLeftKey(event)) {
      this.buttons.left = value;
    } else if (isRightKey(event)) {
      this.buttons.right = value;
    } else if (isDownKey(event)) {
      this.buttons.down = value;
    } else if (isRotateKey(event)) {
      this.buttons.rotate = value;
    }
  }
}

let controls: Controls;

export const getControls = () => {
  if (!controls) {
    controls = new Controls();
  }

  return controls;
};
