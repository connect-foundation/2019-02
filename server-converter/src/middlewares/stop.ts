const stop = ({ req, res, next }, stage, converter = req.converter) => {
  req.stage = stage;
  const handleNext = (err?) => (err ? next(err) : next());
  const stopConverter = (err?) => (converter.isStop ? res.end() : handleNext(err));
  return stopConverter;
};
export default stop;
