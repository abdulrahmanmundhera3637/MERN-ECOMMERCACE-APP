const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "User Not Logged In",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log("error auth", err);
                return res.status(401).json({
                    message: "Invalid Token",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded?._id;
            next();
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || "Authentication Error",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
