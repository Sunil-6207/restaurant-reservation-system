const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

        let token;

        // Check if Authorization header exists
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user without password
            req.user = await User.findById(decoded.id).select("-password");

            next();

        } else {

            return res.status(401).json({
                success: false,
                message: "Not authorized. No token provided."
            });

        }

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }
};


const authorize = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });

        }

        next();

    };

};

module.exports={
    protect,
    authorize
}