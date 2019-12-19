import React from 'react';
import DrawingCanvas from './DrawingCanvas';
import {
  addHandlerToEvent,
  removeHandlerFromEvent,
  getRatioCoordinate,
} from './utils';

class DropyCanvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.drawingCanvas = new DrawingCanvas();
  }

  init() {
    this.drawingCanvas.init();
    this.prevPosition = { x: 0, y: 0 };
    this.history = [];
    this.newLineHistory = [];
    this.eventAndHandlerList = [
      ['mousemove', this.handleMouseMove.bind(this)],
      ['mouseup', this.handleMouseUp.bind(this)],
      ['mousedown', this.handleMouseDown.bind(this)],
      ['mouseleave', this.handleMouseLeave.bind(this)],
      ['mouseenter', this.handleMouseEnter.bind(this)],
    ];
    this.customMouseUpHandler = null;
  }

  handleMouseDown({ offsetX, offsetY }) {
    this.resetNewLineHistory();
    this.prevPosition.x = offsetX;
    this.prevPosition.y = offsetY;
  }

  handleMouseMove({ buttons, offsetX, offsetY }) {
    if (buttons !== 1) return;
    const curPosition = { x: offsetX, y: offsetY };

    this.drawingCanvas.drawContent(this.prevPosition, curPosition);
    this.saveMousePosition(offsetX, offsetY);
    this.addCanvasHistory(curPosition);
  }

  handleMouseEnter({ offsetX, offsetY }) {
    this.prevPosition.x = offsetX;
    this.prevPosition.y = offsetY;
  }

  handleMouseUp() {
    this.pushHistoryToHistoryList([]);
    if (this.customMouseUpHandler) this.customMouseUpHandler();
  }

  handleMouseLeave() {
    this.pushHistoryToHistoryList([]);
  }

  getToolOptions() {
    return this.drawingCanvas.getToolOptions();
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

  setHistory(history) {
    this.history = history;
  }

  setContext(context) {
    this.drawingCanvas.setContext(context);
  }

  setToolStyle(toolOptions) {
    this.drawingCanvas.setToolStyle(toolOptions);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  setCustomMouseUpHandler(customHandler) {
    this.customMouseUpHandler = customHandler;
  }

  resetHistory() {
    this.history = [];
  }

  resetNewLineHistory() {
    this.newLineHistory = [];
  }

  addEventListener(canvasElement) {
    addHandlerToEvent(canvasElement, this.eventAndHandlerList);
  }

  removeEventListener(canvasElement) {
    removeHandlerFromEvent(canvasElement, this.eventAndHandlerList);
  }

  addCanvasHistory(curPosition) {
    const { ratioX, ratioY } = getRatioCoordinate(
      curPosition,
      this.width,
      this.height,
    );

    this.pushHistoryToHistoryList([ratioX, ratioY]);
  }

  pushHistoryToHistoryList(canvasHistory) {
    this.history.push(canvasHistory);
    this.newLineHistory.push(canvasHistory);
  }

  saveMousePosition(x, y) {
    this.prevPosition.x = x;
    this.prevPosition.y = y;
  }

  clearCanvas() {
    this.drawingCanvas.clearCanvas(this.width, this.height);
    this.resetHistory();
  }

  reDrawContent() {
    this.drawingCanvas.reDrawContent(
      this.history,
      this.width,
      this.height,
    );
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
