class FlyingEmojiFactory {
  constructor(emoji, coordinates, friction, isFullScreen) {
    this.emoji = this.setEmoji(emoji);
    this.steps = document.querySelector('body').offsetHeight / 2;
    this.item = null;
    this.friction = friction;
    this.coordinates = coordinates;
    this.position = -(this.coordinates.y);
    this.isFullScreen = isFullScreen;
    this.dimensions = this.render();
    this.rotation = Math.random() > 0.8 ? '-' : '+';
    this.scale = 2 + Math.random();
    this.siner = 50 * Math.random();
    this.opacity = 1.0;
    this.appHeight = document.querySelector('body').offsetHeight;
  }

  destroyEmoji() {
    this.item.parentNode.removeChild(this.item);
  }

  // eslint-disable-next-line class-methods-use-this
  setEmoji(type) {
    const flyingEmoji = document.createElement('div');
    flyingEmoji.innerText = type;
    flyingEmoji.style.opacity = this.opacity;
    flyingEmoji.style.zIndex = 999;
    flyingEmoji.style.userSelect = 'none';
    flyingEmoji.style.position = 'absolute';

    return flyingEmoji;
  }

  isAchieve() {
    return this.position < -(this.appHeight);
  }

  getPosition() {
    this.position = this.position - this.friction;
  }

  setOpacity() {
    this.opacity -= 0.008;
  }

  getDirection() {
    return this.coordinates.x + Math.sin((this.position * Math.PI) / this.steps) * this.siner;
    // return this.coordinates.x;
  }

  flying() {
    this.getPosition();
    this.setOpacity();
    const height = this.position;
    const direction = this.getDirection();
    this.item.style.transform = `translateX(${direction}px) translateY(${height}px) scale(${this.scale})`;
    this.item.style.opacity = this.opacity;
    if (this.isAchieve()) {
      this.destroyEmoji();
      return false;
    }
    return true;
  }

  render() {
    const background = document.querySelector('body');
    const fullScreen = document.querySelector('.fullscreen');
    this.item = this.emoji;
    if (this.isFullScreen) {
      fullScreen.appendChild(this.item);
    } else {
      background.appendChild(this.item);
    }

    return {
      width: this.item.offsetWidth,
      height: this.item.offsetHeight,
    };
  }
}

export default FlyingEmojiFactory;
