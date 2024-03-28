const mongoose = require('mongoose');
const { email, parse } = require('valibot');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your Last name "],
        trim: true,
        minLength: [3, "Last name should be at least 3 characters"],
        maxLength: [15, "Last name max length is 15 characters"]
    },
    email: {
        type: String,
        required: [true, "The email address is required"],
        unique: true,
        validate: {
            validator: function (v) {
                return parse(email(), v);
            },
            message: () => `The email address is baddly formatted!`
        },
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "The password should be at least 8 characters"],
        maxLength: [15, "The password should be at most 10 characters"],
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isValidPassword = async function (entredPassword) {

    return await bcrypt.compare(entredPassword, this.password);
}

userSchema.methods.generateJwtToken = async function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: "3d" })
}

module.exports = mongoose.model('User', userSchema);