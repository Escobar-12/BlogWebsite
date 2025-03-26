import jwt from "jsonwebtoken";

export const verifyAccessToken = (req, res, next) => {
    const cookie = req.cookies;
    if(!cookie?.jwt) return res.status(401).json({success:false, message: "cookie missing or invalid"});

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No Token Provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden: Invalid or Expired Token" });
        req.user = decoded;
        next();
    });
};
