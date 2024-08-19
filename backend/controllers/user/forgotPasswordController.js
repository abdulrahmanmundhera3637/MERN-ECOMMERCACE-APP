const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { email, answer, newPassword } = req.body;

        if (!email || !answer || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).json({ message: "User not found or invalid answer" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

        return res.status(200).json({
            message: "Password reset successfully",
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message || "Internal server error",
            success: false
        });
    }
};
