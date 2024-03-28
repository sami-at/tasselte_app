const { object, string, transform, email } = require('valibot');

exports.userValidation = object({
    name: string("product name should be a string", [
        transform(string(), (input) => input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""))
    ]),
    email: string([
        email('The email is badly formatted.'),
    ]),
    password: string("Enter a valid password"),


})
exports.userlogValidation = object({
    email: string([
        email('The email is badly formatted.'),
    ]),
    password: string("Enter a valid password"),
})

