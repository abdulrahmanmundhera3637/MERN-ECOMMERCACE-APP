const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId; // Assuming this is used for validation or later processing
        const addToCartProductId = req.body._id;

        if (!addToCartProductId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            });
        }

        // Check if the product exists
        const existingProduct = await addToCartModel.findById(addToCartProductId);
        if (!existingProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        // Perform the deletion
        const deleteResult = await addToCartModel.deleteOne({ _id: addToCartProductId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({
                message: "Product not found or already deleted",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Product Deleted From Cart",
            error: false,
            success: true,
            data: deleteResult
        });

    } catch (err) {
        console.error("Delete error:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err?.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = deleteAddToCartProduct;