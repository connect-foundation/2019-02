const body = document.querySelector('body');

export const FULL_SCREEN_POSITION = { x: body.offsetWidth - 150, y: 0 };
export const NORMAL_SCREEN_POSITION = (event) => ({
  x: event.clientX,
  y: body.offsetHeight - event.clientY,
});
export const GET_FLYING_EMOJI_SPEED = () => 3 + Math.random() * 8;
export const FULL_SCREEN_SCALE = () => 4.5 + Math.random();
export const NORMAL_SCREEN_SCALE = () => 3 + Math.random();
export const OPACITY = 1.0;
export const ROTATION = () => (Math.random() > 0.8 ? '-' : '+');
export const SINER = () => 50 * Math.random();
export const BACKGROUND = body;
export const FULL_SCREEN = document.querySelector('.fullscreen');
