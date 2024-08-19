const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        if (!productId || !currentUser) {
            return res.status(400).json({
                message: "Product ID and user ID are required.",
                success: false,
                error: true
            });
        }

        // Check if the product is already in the cart for the current user
        const isProductAvailable = await addToCartModel.findOne({
            productId,
            userId: currentUser
        });

        if (isProductAvailable) {
            return res.status(400).json({
                message: "Product already exists in the cart.",
                success: false,
                error: true
            });
        }

        // Create a new cart item
        const payload = {
            productId,
            quantity: 1,
            userId: currentUser
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.status(201).json({
            data: saveProduct,
            message: "Product added to cart.",
            success: true,
            error: false
        });
    } catch (err) {
        console.error(err); // Log the error for server-side debugging
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;