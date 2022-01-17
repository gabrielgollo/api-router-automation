class Exception extends Error {
    constructor(error, statusCode) {
        super(error);
        this.message = error?.message ? error.message : error;
        this.statusCode = statusCode ? statusCode : 500;
    }
}

module.exports = Exception;