module.exports = { handleErrors, formatError };

async function handleErrors(err, req, res, next) {
  const errorMessage = {
    400: "bad request",
    401: "unauthorized",
    403: "forbidden",
    404: "resource not found",
    500: "internal server error",
    503: "service unavailable",
  };
  if (!err.status) next();
  res.status(err.code).json({ error: errorMessage[err.code] });
  return;
}
function formatError(status, code, message) {
  let myError = { status: status, code: code, message: message };
  return myError;
}
