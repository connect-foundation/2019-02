const checkFileTypeValidation = (file) => {
  const validFileTypes = ['application/pdf'];
  const fileType = file.type;

  return validFileTypes.includes(fileType);
};

export default checkFileTypeValidation;
