
export interface IControlsOptions {
  playControl: EventTarget;
  pauseControl: EventTarget;
  stopControl: EventTarget;
  leftControl: EventTarget;
  rightControl: EventTarget;
  downControl: EventTarget;
  rotateControl: EventTarget;
}

type ButtonName = 'right' | 'left' | 'down' | 'rotate';

type SwitchName = 'play' | 'pause' | 'stop';

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
  private buttons: Record<ButtonName, boolean> = {
    right: false,
    left: false,
    down: false,
    rotate: false,
  };
  private switches: Record<SwitchName, boolean> = {
    stop: true,
    play: false,
    pause: false,
  };

  constructor(options: IControlsOptions) {
    const {
      playControl,
      pauseControl,
      stopControl,
      leftControl,
      rightControl,
      downControl,
      rotateControl,
    } = options;

    [ leftControl, rightControl, downControl, rotateControl ].forEach((element) => {
      element.addEventListener('keydown', this.onButtonDown);
      element.addEventListener('keyup', this.onButtonUp);
    });

    [ playControl, pauseControl, stopControl ].forEach((element) => {
      element.addEventListener('click', this.onSwitchClick);
    });
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

  private onButtonDown = (e: any) => {
    const name = e.target.name as ButtonName;
    this.buttons[name] = true;
  }

  private onButtonUp = (e: any) => {
    const name = e.target.name as ButtonName;
    this.buttons[name] = false;
  }

  private onSwitchClick = (e: any) => {
    const name = e.target.name as SwitchName;
    Object.keys(this.switches).forEach((key) => {
      this.switches[key as SwitchName] = false;
    });
    this.switches[name] = true;
  }
}

let controls: Controls;

export const getControls = (options: IControlsOptions) => {
  if (!controls) {
    controls = new Controls(options);
  }

  return controls;
};
