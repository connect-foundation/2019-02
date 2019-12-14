const body = document.querySelector('body');

export const LOVE = ['LOVE', '❤️'];
export const LIKE = ['LIKE', '👍'];
export const WONDERING = ['WONDERING', '🤔'];
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
export const GET_EMOJI_POSITION = (type) => {
  const EMOJI_TYPE = {
    LOVE: () => document.querySelector('.emoji-love'),
    LIKE: () => document.querySelector('.emoji-like'),
    WONDERING: () => document.querySelector('.emoji-wondering'),
  };
  const emoji = EMOJI_TYPE[type]();
  const clientRect = emoji.getBoundingClientRect();

  return {
    x: clientRect.left,
    y: body.offsetHeight - clientRect.top,
  };
};
