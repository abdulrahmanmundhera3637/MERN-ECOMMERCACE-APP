const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
    try {
        const categoryList = req?.body?.category || [];

        const products = await productModel.find({
            category: {
                "$in": categoryList
            }
        });

        res.json({
            data: products,
            message: "Products retrieved successfully",
            error: false,
            success: true
        });
    } catch (err) {
        res.json({
            message: err.message || "An error occurred",
            error: true,
            success: false
        });
    }
};

module.exports = filterProductController;