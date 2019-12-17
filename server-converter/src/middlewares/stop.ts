const handleResponse = (req, res, next) => {
  const handleErrNext = (err?) => (err ? next(err) : next());
  const response = (err?) => (req.isStop ? res.end() : handleErrNext(err));

  return response;
};
export default handleResponse;
