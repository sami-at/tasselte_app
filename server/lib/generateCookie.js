module.exports = async function (user, res) {

    const token = await user.generateJwtToken();
    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        // domain name
        // domain: '',
        sameSite: 'lax',
        // https
        // secure: true,
        httpOnly: true,
    }

    res.status(200).cookie("token", token, options).json({ status: "success", message: "user logged in successfully", user, token });

}