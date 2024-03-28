const CustomError = require('../lib/CustomError');
const customError = require('../lib/CustomError');

const productionErrors = (err, res) => {

    err.isOparationally ? res.status(err.statusCode).json({ message: err.message, success: false }) : res.status(500).json({ success: false, message: "Something Went Wrong Please try Later" })
}

const handleCastError = (err) => {
    const message = `Invalid Value for ${err.path}`;
    return new customError(message, 400);
}

const handleDuplicateError = (err) => {

    const keyValue = Object.entries(err.keyValue);
    const message = `The ${keyValue[0][0]}: ${keyValue[0][1]} is already used`;

    return new CustomError(message, 400);
}

const handleValidateError = (err) => {
    const errors = Object.values(err.errors);
    const message = errors[0].message;

    return new CustomError(message, 400);
}

const handleTokenError = (err) => {
    return new customError("Expired or Invalid Token", 400);
};


module.exports = (error, req, res, next) => {

    if (process.env.NODE_ENV == 'development') {

        const statusCode = error.statusCode || 500;
        const message = error.message || "server error";

        res.status(statusCode).json({
            message, status: 'fail', "error": {
                stackError: error.stack
            }
        })
    } else if (process.env.NODE_ENV == 'production') {
        const err = { ...error, name: error.name, message: error.message };

        if (err.name === "castError") err = handleCastError(err);
        if (err.code === 11000) err = handleDuplicateError(err);
        if (err.name === "ValidationError") err = handleValidateError(err);
        if (err.name === "TokenExpiredError") err = handleTokenError(err);
        if (err.name === "JsonWebTokenError") err = handleTokenError(err);
        productionErrors(err, res)
    }
};