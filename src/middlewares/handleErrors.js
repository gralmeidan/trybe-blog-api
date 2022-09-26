module.exports = (error, _req, res, _next) => {
  if (error.isJoi) {
    return res.status(422).json({
      message: error.message,
    });
  }

  if (error.statusCode) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  res.status(500).json({
    message: 'Erro interno',
  });
};
