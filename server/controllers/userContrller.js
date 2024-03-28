const { safeParse } = require("valibot")
const BigPromise = require('../lib/BigPromise');
const { userValidation, userlogValidation } = require("../lib/user")
const User = require("../models/User");
const CustomError = require("../lib/CustomError");
const generateCookie = require("../lib/generateCookie");



exports.signUp = BigPromise(async (req, res, next) => {

    const result = safeParse(userValidation, req.body);

    if (!result.success) return next(new CustomError(result.issues[0].message, 400));

    const data = result.output;
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) return next(new CustomError("the user already exists", 400));

    const user = await User.create(data);

    if (!user) return next(new CustomError("user sign up failed", 422));
    user.password = undefined;

    res.status(200).json({ status: "success", message: "User created successfully", user });

})

exports.login = BigPromise(async (req, res, next) => {
    const result = safeParse(userlogValidation, req.body);

    if (!result) return next(new CustomError(result.issues[0].message, 400));

    const user = await User.findOne({ email: result.output.email });

    if (!user) return next(new CustomError("wrong email or password", 404));

    const isCorrectPassword = await user.isValidPassword(result.output.password);

    if (!isCorrectPassword) return next(new CustomError("wrong email or password", 404));
    user.password = undefined;
    generateCookie(user, res);
})

exports.logout = BigPromise(async (req, res, next) => {

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now() - 2 * 60 * 1000),
        // domain name
        // domain: '',
        sameSite: 'lax',
        // https
        // secure: true,
        httpOnly: true,
    }).json({ status: "success", message: "user logged out successfully" })
})