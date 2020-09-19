"use strict";
function translateError(err) {
	if (Number.isInteger(err)) {
		err = {
			statusCode: err
		}
	}
	let error = {
		message: err.message,
		httpStatusCode: err.statusCode || 500,
		errors: err.errors || [],
		origin : err.origin ? err.origin : "myfrontier"
	}
	return error;
}

module.exports = exports = {
	/**
	 * Since Error object does not jsonify as expected, just manage regular object here for now
	 * @param message
	 * @param statusCode
	 * @returns {{message: *, httpStatusCode: (*|number)}}
	 */
	createError:  function(message, statusCode, origin, errors){
		let finalMessage = message;
		try {finalMessage =JSON.stringify(message)} catch(e){}
		return {
			message:finalMessage,
			statusCode: statusCode || 500,
			origin: origin || "fizzbuzz",
			errors: errors || [],
		}
	},

	errorHandlingMiddleware: async function (error, req, res, next) {
		let mappedError = translateError(error) || {};
		let httpStatusCode = mappedError.httpStatusCode || mappedError.statusCode ||  500;
		let message = mappedError
		if (httpStatusCode >= 500 && !config.showErrorDetails) {
			message = "There was an internal server error"
		}
		res.status(httpStatusCode).send(message)
	}
}
