const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required.",
                error: true,
                success: false
            });
        }

        const count = await addToCartModel.countDocuments({ userId });

        return res.status(200).json({
            data: { count },
            message: "Successfully retrieved cart item count.",
            error: false,
            success: true
        });
    } catch (error) {
        console.error('Error counting cart items:', error); // Log the error for server-side debugging
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: true,
            success: false
        });
    }
};

module.exports = countAddToCartProduct;