module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.code && err.massage) {
    return res.status(err.code).json({
      error: true,
      url: req.url,
      method: req.method,
      massage: err.massage,
    });
  }
  return res.status(500).json({
    error: true,
    massage: "Internal Server Error",
  });
};
