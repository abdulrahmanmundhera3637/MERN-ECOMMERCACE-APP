const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email) {
            return res.status(400).json({
                message: "Please Provide Email",
                error: true,
                success: false
            });
        }
        
        if (!password) {
            return res.status(400).json({
                message: "Please Provide Password",
                error: true,
                success: false
            });
        }

        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None'
            };

            res.cookie("token", token, tokenOptions).json({
                message: "Login Successfully",
                data: token,
                success: true,
                error: false,
            });
        } else {
            return res.status(401).json({
                message: "Wrong Password",
                error: true,
                success: false
            });
        }

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = userSignInController;
