import config from "config";
import jwt from "jsonwebtoken";

export const authMiddleware = () => {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({
                message: "Access denied, no token provided"
            });
        }
        try {
            const decoded = jwt.verify(token, config.get("jwtPrivateKey"))
            req.user = decoded;
            next();

        } catch (error) {
            res.status(400).send("Invalid token, please login again")
        }

    }
}
