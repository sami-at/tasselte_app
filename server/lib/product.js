const { object, string, transform } = require('valibot');

exports.productValidation = object({
    name: string("product name should be a string", [
        transform(string(), (input) => input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""))
    ]),
    price: string("enter a valid price", [

        transform(string(), (input) => Number(input)),
    ]),
    description: string("Enter a description", [
        transform(string(), (input) => input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""))
    ]),
    category: string("enter a valid stock", [
        transform(string(), (input) => input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""))
    ])

})

