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

const scrollToEnd = (el, filter) => {
  const targetTop = computeScrollEndTop(el);

  if (filter && !filter(targetTop)) return;

  el.scrollTop = targetTop;
};

const scrollToTop = (el, filter) => {
  const targetTop = 0;

  if (filter && !filter(targetTop)) return;

  el.scrollTop = targetTop;
};

/**
 * @description param으로 들어온 값을 클립보드에 복사해주는 유틸함수
 * @param {String} textToCopy
 */
const copyToClipboard = (textToCopy) => {
  const element = document.createElement('textarea');
  element.value = textToCopy;
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
};

export {
  pxToNum,
  computeScrollEndTop,
  scrollToEnd,
  scrollToTop,
  copyToClipboard,
};
