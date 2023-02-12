class ValidationError extends Error {}

const handleError = (err, req, res, next) => {
    console.error(err)

    res
        .status(err instanceof ValidationError ? '400': '500')
        .render('error', {
            message: err instanceof ValidationError ? err.message : 'Przepraszamy za utrudnienia. Sprobuj za kilka min.'
        })
}

module.exports = {
    handleError,
    ValidationError
}