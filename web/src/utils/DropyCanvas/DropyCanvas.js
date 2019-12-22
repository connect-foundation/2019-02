import React from 'react';
import DrawingCanvas from './DrawingCanvas';
import {
  addHandlerToEvent,
  removeHandlerFromEvent,
  getRatioCoordinate,
} from './utils';

class DropyCanvas {
  constructor(width, height, page) {
    this.width = width;
    this.height = height;
    this.page = page;
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
    this.customMouseLeaveHandler = null;
    this.customMouseEnterHandler = null;
    this.customMouseMoveHandler = null;
    this.customMouseDownHandler = null;
  }

  handleMouseDown({ offsetX, offsetY }) {
    this.resetNewLineHistory();
    this.prevPosition.x = offsetX;
    this.prevPosition.y = offsetY;
    if (this.customMouseDownHandler) this.customMouseDownHandler();
  }

  handleMouseMove({ buttons, offsetX, offsetY }) {
    if (buttons !== 1) return;
    const curPosition = { x: offsetX, y: offsetY };

    this.drawingCanvas.drawContent(this.prevPosition, curPosition);
    this.saveMousePosition(offsetX, offsetY);
    this.addCanvasHistory(curPosition);
    if (this.customMouseMoveHandler) this.customMouseMoveHandler();
  }

  handleMouseEnter({ offsetX, offsetY }) {
    this.prevPosition.x = offsetX;
    this.prevPosition.y = offsetY;
    if (this.customMouseEnterHandler) this.customMouseEnterHandler();
  }

  handleMouseUp() {
    this.pushHistoryToHistoryList([]);
    if (this.customMouseUpHandler) this.customMouseUpHandler();
  }

  handleMouseLeave({ buttons }) {
    if (buttons !== 1) return;
    this.pushHistoryToHistoryList([]);
    if (this.customMouseLeaveHandler) this.customMouseLeaveHandler();
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
    return this.drawingCanvas.getContext();
  }

  getSlidePage() {
    return this.page;
  }

  setHistory(history) {
    this.history = history;
  }

  setContext(context) {
    this.drawingCanvas.setContext(context);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  setCustomMouseUpHandler(customHandler) {
    this.customMouseUpHandler = customHandler;
  }

  setCustomMouseLeaveHandler(customHandler) {
    this.customMouseLeaveHandler = customHandler;
  }

  setCustomMouseEnterHandler(customHandler) {
    this.customMouseEnterHandler = customHandler;
  }

  setCustomMouseMoveHandler(customHandler) {
    this.customMouseMoveHandler = customHandler;
  }

  setCustomMouseDownHandler(customHandler) {
    this.customMouseDownHandler = customHandler;
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

  render(canvasRef, canvasWidth, canvasHeight) {
    return (
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    );
  }
}

export default DropyCanvas;
