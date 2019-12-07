class FlyingEmojiFactory {
  constructor(emoji, coordinates, friction) {
    this.emoji = this.emojiMaker(emoji);
    this.steps = screen.height / 2;
    this.item = null;
    this.friction = friction;
    this.coordinates = coordinates;
    this.position = this.coordinates.y;
    this.dimensions = this.render();
    this.rotation = Math.random() > 0.8 ? '-' : '+';
    this.scale = 0.8 + Math.random();
    this.siner = 150 * Math.random();
    this.flying = null;
  }

  destroy() {
    const oldEmoji = this.item;
    oldEmoji.parentNode.removeChild(oldEmoji);
  }

  emojiMaker(type) {
    const flyingEmoji = document.createElement('div');
    flyingEmoji.innerText = type;
    return flyingEmoji;
  }

  move() {
    this.position = this.position - this.friction;
    const top = this.position;
    const left = this.coordinates.x + Math.sin((this.position * Math.PI) / this.steps) * this.siner;
    this.item.style.transform = `translateX(${left}px) translateY(${top}px) scale(${this.scale})`;
    if (this.position < -(this.dimensions.height)) {
      this.destroy();
      return false;
    }
    return true;
  }

  render() {
    const background = document.querySelector('body');
    this.item = this.emoji;
    console.log(this.item);
    background.appendChild(this.item);
    return {
      width: this.item.width,
      height: this.item.height,
    };
  }
}

export default FlyingEmojiFactory;
