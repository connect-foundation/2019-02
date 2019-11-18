const px = (val) => ({ theme }) => theme.typography.pxToRem(val);
const colorGray = (val) => ({ theme }) => theme.palette.dropyGray[val];
const colorYellow = (val) => ({ theme }) => theme.palette.dropyYellow[val];


export {
  px,
  colorGray,
  colorYellow,
};
