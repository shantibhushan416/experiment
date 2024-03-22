export const adminMiddleware = () => {
    return (req, res, next) => {

        if (!req.user.isAdmin) {
            return res.status(403).json({
                message: "Forbidden ."
            });
        }
        next();

    }
}