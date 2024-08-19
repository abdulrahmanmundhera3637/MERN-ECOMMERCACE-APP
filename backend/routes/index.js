const express = require("express");
const userSignUpController = require("../controllers/user/userSignUp");
const userSignInController = require("../controllers/user/userSignin");
const userDetailsControllers = require("../controllers/user/userDetails");
const userLogout = require("../controllers/user/userLogout");
const allUsersControllers = require("../controllers/user/AllUsers");
const updateUserConroller = require("../controllers/user/updateUser");
const uploadProductController = require("../controllers/product/uploadProduct");
const getProductController = require("../controllers/product/getProduct");
const updateProductController = require("../controllers/product/updateProduct");
const authToken = require("../middleware/authToken");
const getCategoryProductController = require("../controllers/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controllers/product/getCategoryWiseProduct");
const getProductDetails = require("../controllers/product/getProductDetails");
const addToCartController = require("../controllers/user/addToCartController");
const countAddToCartProduct = require("../controllers/user/countAddToCartProduct");
const addToCartViewProduct = require("../controllers/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controllers/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controllers/user/deleteAddToCartProduct");
const searchProduct = require("../controllers/product/searchProduct");
const filterProductController = require("../controllers/product/filterProduct");
const forgotPasswordController = require("../controllers/user/forgotPasswordController");


const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsControllers);
router.get("/userLogout", userLogout);

// Admin Panel
router.get("/all-users", authToken, allUsersControllers);
router.post("/update-user", authToken, updateUserConroller);

// Products
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-Product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProductController);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// User add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// Forgot Password Routes
router.post("/forgot-password", forgotPasswordController);

module.exports = router;
