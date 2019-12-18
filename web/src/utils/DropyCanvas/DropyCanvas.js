import React from 'react';
import {
  ratioToRealPosition,
  addHandlerToEvent,
  removeHandlerFromEvent,
} from './utils';

class DropyCanvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  init() {
    this.prevPosition = { x: 0, y: 0 };
    this.history = [];
    this.newLineHistory = [];
    this.lineWidth = null;
    this.lineCap = null;
    this.strokeStyle = null;
    this.eventAndHandlerList = [
      ['mousemove', this.handleMouseMove.bind(this)],
      ['mouseup', this.handleMouseUp.bind(this)],
      ['mousedown', this.handleMouseDown.bind(this)],
      ['mouseleave', this.handleMouseLeave.bind(this)],
      ['mouseenter', this.handleMouseEnter.bind(this)],
    ];
    this.customMouseUpHandler = null;
  }

  setCustomMouseUpHandler(customHandler) {
    this.customMouseUpHandler = customHandler;
  }

  handleMouseDown(event) {
    this.resetNewLineHistory();
    this.prevPosition.x = event.offsetX;
    this.prevPosition.y = event.offsetY;
  }

  handleMouseMove(event) {
    if (event.buttons !== 1) return;

    this.context.beginPath();

    this.context.lineWidth = this.lineWidth;
    this.context.lineCap = this.lineCap;
    this.context.strokeStyle = this.strokeStyle;

    this.context.moveTo(this.prevPosition.x, this.prevPosition.y);
    this.context.lineTo(event.offsetX, event.offsetY);
    this.context.stroke();

    this.saveMousePosition(event.offsetX, event.offsetY);
    this.addCanvasHistory(event.offsetX, event.offsetY);
  }

  handleMouseEnter(event) {
    this.prevPosition.x = event.offsetX;
    this.prevPosition.y = event.offsetY;
  }

  handleMouseUp() {
    this.history.push([]);
    this.newLineHistory.push([]);

    if (this.customMouseUpHandler) this.customMouseUpHandler();
  }

  handleMouseLeave() {
    this.history.push([]);
    this.newLineHistory.push([]);
  }

  addEventListener(canvasElement) {
    addHandlerToEvent(canvasElement, this.eventAndHandlerList);
  }

  removeEventListener(canvasElement) {
    removeHandlerFromEvent(canvasElement, this.eventAndHandlerList);
  }

  addCanvasHistory(mousePositionX, mousePositionY) {
    const ratioX = this.width / mousePositionX;
    const ratioY = this.height / mousePositionY;

    this.history.push([ratioX, ratioY]);
    this.newLineHistory.push([ratioX, ratioY]);
  }

  saveMousePosition(x, y) {
    this.prevPosition.x = x;
    this.prevPosition.y = y;
  }

  setContext(context) {
    this.context = context;
  }

  setToolStyle(toolOptions) {
    const {
      lineWidth,
      lineCap,
      lineColor,
    } = toolOptions;

    this.lineWidth = lineWidth;
    this.lineCap = lineCap;
    this.strokeStyle = lineColor;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  getToolOptions() {
    return {
      lineWidth: this.lineWidth,
      lineCap: this.lineCap,
      lineColor: this.strokeStyle,
    };
  }

  getHistory() {
    return this.history;
  }

  getNewLineHistory() {
    return this.newLineHistory;
  }

  getContext() {
    return this.context;
  }

  resetHistory() {
    this.history = [];
  }

  setHistory(history) {
    this.history = history;
  }

  resetNewLineHistory() {
    this.newLineHistory = [];
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.resetHistory();
  }

  reDrawContent() {
    const newPosition = [];
    this.history.forEach(([ratioX, ratioY], index) => {
      const { currPositionX, currPositionY } = ratioToRealPosition(
        ratioX,
        ratioY,
        this.width,
        this.height,
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

  render(canvasRef) {
    return (
      <canvas
        ref={canvasRef}
        width={this.width}
        height={this.height}
      />
    );
  }
}

export default DropyCanvas;
