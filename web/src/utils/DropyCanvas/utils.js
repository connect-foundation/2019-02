const ratioToRealPosition = (ratioX, ratioY, width, height) => {
  const currPositionX = width / ratioX;
  const currPositionY = height / ratioY;

  return { currPositionX, currPositionY };
};

const addHandlerToEvent = (canvasElement, eventAndHandlerList) => {
  eventAndHandlerList.forEach((eventAndHandler) => {
    const eventName = eventAndHandler[0];
    const eventHandler = eventAndHandler[1];

    canvasElement.addEventListener(eventName, eventHandler);
  });
};

const removeHandlerFromEvent = (canvasElement, eventAndHandlerList) => {
  eventAndHandlerList.forEach((eventAndHandler) => {
    const eventName = eventAndHandler[0];
    const eventHandler = eventAndHandler[1];

    canvasElement.removeEventListener(eventName, eventHandler);
  });
};

const getRatioCoordinate = (curPosition, canvasWidth, canvasHeight) => {
  const { x, y } = curPosition;
  const ratioX = canvasWidth / x;
  const ratioY = canvasHeight / y;

  return { ratioX, ratioY };
};

export {
  ratioToRealPosition,
  addHandlerToEvent,
  removeHandlerFromEvent,
  getRatioCoordinate,
};
