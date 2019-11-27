const pxToNum = (px) => +px.substring(0, px.lastIndexOf('px'));

const computeScrollEndTop = (el) => {
  const scrollerEl = el.firstElementChild;
  const wrapStyle = window.getComputedStyle(el);
  const scrollerStyle = window.getComputedStyle(scrollerEl);
  const wrapHeight = pxToNum(wrapStyle.height);
  const scrollerHeight = pxToNum(scrollerStyle.height);
  const scrollerMargin = pxToNum(scrollerStyle.marginTop) + pxToNum(scrollerStyle.marginBottom);
  const scrollerSize = scrollerHeight + scrollerMargin;

  return wrapHeight > scrollerSize ? 0 : scrollerSize - wrapHeight;
};

export {
  pxToNum,
  computeScrollEndTop,
};
