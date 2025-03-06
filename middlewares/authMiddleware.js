const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                message: "No token provided",
                success: false
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                message: "Malformed token",
                success: false
            });
        }

        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                console.error("JWT Verification Error:", err); // Log the error for debugging
                return res.status(401).send({
                    message: "Auth Failed: " + err.message,
                    success: false
                });
            }

            req.body.userId = decode.id;
            req.body.userType = decode.userType;
            req.body.bloodType = req.query.bloodType;
            req.body.city = req.query.city;

            next();
        });
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).send({
            message: "Auth Failed (Middleware Error)",
            success: false
        });
    }
};