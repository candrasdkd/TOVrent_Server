const success = (res, message, status, result) => {
  const objectResponse = {
    message,
    status,
    result,
  };
  res.status(status).json(objectResponse);
};

const error = (res, message, status, infoError) => {
  const objectResponse = {
    message,
    infoError,
    status,
  };
  res.status(status).json(objectResponse);
};

module.exports = {
  success,
  error,
};