const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId; // Assuming this is used for validation or later processing
        const addToCartProductId = req?.body?._id;
        const qty = req.body.quantity;

        if (!addToCartProductId || qty == null) {
            return res.status(400).json({
                message: "Missing required fields",
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

        // Perform the update
        const updateResult = await addToCartModel.updateOne(
            { _id: addToCartProductId },
            { $set: { quantity: qty } } // Ensure to use $set for updating specific fields
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({
                message: "Product not found or no changes made",
                error: true,
                success: false
            });
        }

        res.json({
            message: "Product Updated",
            data: updateResult,
            error: false,
            success: true
        });

    } catch (err) {
        console.error("Update error:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err?.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = updateAddToCartProduct;