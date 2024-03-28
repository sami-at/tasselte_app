const BigPromise = require("../lib/BigPromise");
const CustomError = require("../lib/CustomError");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isLoggedIn = BigPromise(async (req, res, next) => {

    const token = req.cookies.token || req.headers?.['Authorization']?.replace('Bearer ', '');

    if (!token) return next(new CustomError("unotorized", 401));

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById({ _id: decoded.id });

    if (!user) return next(new CustomError("Invalid token", 401));

    user.password = undefined;
    req.user = user;
    next();
})

exports.isAuthorized = (...roles) => {

    return async function (req, res, next) {
        if (!roles.includes(req.user.role)) return next(new CustomError("unauthorized", 401));

        next();
    }
}