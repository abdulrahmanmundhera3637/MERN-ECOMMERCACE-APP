const productModel = require('../../models/productModel');

const getProductController = async (req, res) => {
try {
    const allProducts = await productModel.find().sort({ createdAt: -1 });
    
    res.status(200).json({
        message: 'All Products fetched successfully',
        error: false,
        success: true,
        data: allProducts
    });
} catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({
        message: 'Failed to fetch products',
        error: true,
        success: false,
        data: []
    });
}
};

module.exports = getProductController;
