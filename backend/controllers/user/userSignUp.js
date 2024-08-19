const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Check if email is provided
        if (!email) {
            throw new Error("Please Provide Email");
        }

        // Check if password is provided
        if (!password) {
            throw new Error("Please Provide Password");
        }

        // Check if name is provided
        if (!name) {
            throw new Error("Please Provide Name");
        }

        // Check if confirmPassword is provided
        if (confirmPassword === undefined) {
            throw new Error("Please Provide Confirm Password");
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            throw new Error("Password and Confirm Password do not match");
        }

        // Check if user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            throw new Error("User already exists");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong with password hashing");
        }

        // Create the user payload
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword,
        };

        // Create a new user document and save it
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        // Send success response
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User Created Successfully",
        });

    } catch (err) {
        // Send error response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
