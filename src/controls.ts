import { KEYBOARD_KEYS_SETTINGS } from './constants';

const isLeftKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.LEFT.includes(event.key);

const isRightKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.RIGHT.includes(event.key);

const isDownKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.DOWN.includes(event.key);

const isRotateKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.ROTATE.includes(event.key);

const isPauseKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.PAUSE.includes(event.key);

const isStopKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.STOP.includes(event.key);

const isPlayKey = (event: KeyboardEvent) => KEYBOARD_KEYS_SETTINGS.PLAY.includes(event.key);

export interface IControls {
  left: boolean;
  right: boolean;
  down: boolean;
  rotate: boolean;
  play: boolean;
  stop: boolean;
  pause: boolean;
}

class Controls implements IControls {
  private buttons: Record<string, boolean> = {
    right: false,
    left: false,
    down: false,
    rotate: false,
  };
  private switches: Record<string, boolean> = {
    stop: true,
    play: false,
    pause: false,
  };

  constructor() {
    this.setupListeners();
  }

  get right() {
    return this.buttons.right;
  }

  get left() {
    return this.buttons.left;
  }

  get down() {
    return this.buttons.down;
  }

  get rotate() {
    return this.buttons.rotate;
  }

  get stop() {
    return this.switches.stop;
  }

  get play() {
    return this.switches.play;
  }

  get pause() {
    return this.switches.pause;
  }

  private setupListeners() {
    window.addEventListener('keydown', this.onButtonPress);
    window.addEventListener('keyup', this.onButtonPress);
    window.addEventListener('keyup', this.onSwitchPress);
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

  private onSwitchPress = (event: KeyboardEvent) => {
    Object.keys(this.switches).forEach((key) => {
      this.switches[key] = false;
    });
    if (isPauseKey(event)) {
      this.switches.pause = true;
    } else if (isStopKey(event)) {
      this.switches.stop = true;
    } else if (isPlayKey(event)) {
      this.switches.play = true;
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
