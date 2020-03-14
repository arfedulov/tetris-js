import { KEYBOARD_KEYS_SETTINGS } from './constants';

const START_SCREEN_ELEMENT_ID = 'start-screen';
const PAUSE_SCREEN_ELEMENT_ID = 'pause-screen';
const PLAY_BUTTON_ELEMENT_ID = 'play-btn';
const CONTINUE_BUTTON_ELEMENT_ID = 'continue-btn';
const RESTART_BUTTON_ELEMENT_ID = 'restart-btn';

const mountElements = (ids: string[]) => {
  return ids.map((id) => {
    const element = document.getElementById(id);
    if (!element) {
      throw Error(`${ id } element is not found`);
    }

    return element;
  });
};

const [
  startScreen,
  pauseScreen,
  playButton,
  continueButton,
  restartButton,
] = mountElements([
  START_SCREEN_ELEMENT_ID,
  PAUSE_SCREEN_ELEMENT_ID,
  PLAY_BUTTON_ELEMENT_ID,
  CONTINUE_BUTTON_ELEMENT_ID,
  RESTART_BUTTON_ELEMENT_ID,
]);

const dispatchKeyUp = (key: string) => {
  const e = new KeyboardEvent('keyup', { key });
  window.dispatchEvent(e);
};

playButton.addEventListener('click', () => {
  const [key] = KEYBOARD_KEYS_SETTINGS.PLAY;
  dispatchKeyUp(key);
});

continueButton.addEventListener('click', () => {
  const [key] = KEYBOARD_KEYS_SETTINGS.PLAY;
  dispatchKeyUp(key);
});

restartButton.addEventListener('click', () => {
  const [key] = KEYBOARD_KEYS_SETTINGS.STOP;
  dispatchKeyUp(key);
});

const show = (screenElement: HTMLElement) => {
  screenElement.style.display = 'block';
};

const hide = (screenElement: HTMLElement) => {
  screenElement.style.display = 'none';
};

export const screens = {
  displayStartScreen: () => {
    hide(pauseScreen);
    show(startScreen);
  },
  displayPauseScreen: () => {
    hide(startScreen);
    show(pauseScreen);
  },
  hideAll: () => {
    [ startScreen, pauseScreen ].forEach(hide);
  },
};
