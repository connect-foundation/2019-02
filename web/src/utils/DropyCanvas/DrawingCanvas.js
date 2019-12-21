import { ratioToRealPosition } from './utils';

class DrawingCanvas {
  init() {
    this.lineWidth = 2;
    this.lineCap = 'round';
    this.strokeStyle = 'red';
    this.context = null;
  }

  clearCanvas(canvasWidth, canvasHeight) {
    this.context.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  setContext(context) {
    this.context = context;
  }

  getContext() {
    return this.context;
  }

  getToolOptions() {
    return {
      lineWidth: this.lineWidth,
      lineCap: this.lineCap,
      lineColor: this.strokeStyle,
    };
  }

  drawContent(prevPosition, curPosition) {
    this.context.beginPath();

    this.context.lineWidth = this.lineWidth;
    this.context.lineCap = this.lineCap;
    this.context.strokeStyle = this.strokeStyle;

    this.context.moveTo(prevPosition.x, prevPosition.y);
    this.context.lineTo(curPosition.x, curPosition.y);
    this.context.stroke();
  }

  reDrawContent(lineHistory, canvasWidth, canvasHeight) {
    const newPosition = [];

    lineHistory.forEach(([ratioX, ratioY], index) => {
      const { currPositionX, currPositionY } = ratioToRealPosition(
        ratioX,
        ratioY,
        canvasWidth,
        canvasHeight,
      );

      newPosition.push([currPositionX, currPositionY]);

      if (index === 0) return;

      const [prevNewPositionX, prevNewPositionY] = newPosition[index - 1];

      this.context.lineWidth = this.lineWidth;
      this.context.lineCap = this.lineCap;
      this.context.strokeStyle = this.strokeStyle;

      this.context.beginPath();
      this.context.moveTo(prevNewPositionX, prevNewPositionY);
      this.context.lineTo(currPositionX, currPositionY);
      this.context.stroke();
    });
  }
}

export default DrawingCanvas;
