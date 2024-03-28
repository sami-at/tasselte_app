class CustomError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOpeerational = true;
        Error.captureStackTrace(this, this.contructor)
    }

}

module.exports = CustomError;