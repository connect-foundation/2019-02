const px = (val) => ({ theme }) => theme.typography.pxToRem(val);
const colorGray = (val) => ({ theme }) => theme.palette.dropyGray[val];
const colorYellow = (val) => ({ theme }) => theme.palette.dropyYellow[val];
const colorPrimary = (val) => ({ theme }) => theme.palette.primary[val];

export {
  px,
  colorGray,
  colorYellow,
  colorPrimary,
};
