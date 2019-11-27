const px = (val) => ({ theme }) => theme.typography.pxToRem(val);
const colorGray = (val) => ({ theme }) => theme.palette.dropyGray[val];
const colorYellow = (val) => ({ theme }) => theme.palette.dropyYellow[val];
const colorMain = () => ({ theme }) => theme.palette.primary.main;
const colorLightMain = () => ({ theme }) => theme.palette.primary.light;

export {
  px,
  colorGray,
  colorYellow,
  colorMain,
  colorLightMain,
};
