const httpStatus = require("http-status");
const errors = require("../utils/errosmessage");
const logger = require("../config/logger");

const globalErrorHandler = (err, req, res, next) => {
  process.env.NODE_ENV !== "TEST" && console.log(err.message);

  switch (err.message) {
    case errors.INTERNAL_SERVER_ERROR:
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);

    case errors.API_NOT_FOUND:
      return res
        .status(httpStatus.NOT_FOUND)
        .send(httpStatus[httpStatus.NOT_FOUND]);

    case errors.BAD_REQUEST:
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(httpStatus[httpStatus.BAD_REQUEST]);

    case errors.UNAUTHORIZED:
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send(httpStatus[httpStatus.UNAUTHORIZED]);

    case errors.FORBIDDEN:
      return res
        .status(httpStatus.FORBIDDEN)
        .send(httpStatus[httpStatus.FORBIDDEN]);

    default:
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

module.exports = globalErrorHandler;
