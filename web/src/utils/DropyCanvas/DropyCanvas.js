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
    this.tempCanvasHistory = [];
    this.toolType = null;
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
  }

  handleMouseDown(event) {
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
    this.tempCanvasHistory.push([]);
  }

  handleMouseLeave() {
    this.tempCanvasHistory.push([]);
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

    this.tempCanvasHistory.push([ratioX, ratioY]);
  }

  saveMousePosition(x, y) {
    this.prevPosition.x = x;
    this.prevPosition.y = y;
  }

  setContext(context) {
    this.context = context;
  }

  setTool(toolOption) {
    const {
      toolType,
      toolStyleOption: {
        lineWidth,
        lineCap,
        lineColor,
      },
    } = toolOption;

    this.toolType = toolType;
    this.lineWidth = lineWidth;
    this.lineCap = lineCap;
    this.strokeStyle = lineColor;
  }

  getTempCanvasHistory() {
    return this.tempCanvasHistory;
  }

  resetTempCanvasHistory() {
    this.tempCanvasHistory = [];
  }

  reDrawContent(canvasHistory, context) {
    const newPosition = [];
    canvasHistory.forEach((history, index) => {
      const ratioX = history[0];
      const ratioY = history[1];
      const { currPositionX, currPositionY } = ratioToRealPosition(
        ratioX,
        ratioY,
        this.width,
        this.height,
      );

      newPosition.push([currPositionX, currPositionY]);

      if (index === 0) return;

      const prevNewPosition = newPosition[index - 1];
      const prevNewPositionX = prevNewPosition[0];
      const prevNewPositionY = prevNewPosition[1];

      context.lineWidth = this.lineWidth;
      context.lineCap = this.lineCap;
      context.strokeStyle = this.strokeStyle;

      context.beginPath();
      context.moveTo(prevNewPositionX, prevNewPositionY);
      context.lineTo(currPositionX, currPositionY);
      context.stroke();
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
