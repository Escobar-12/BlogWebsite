import jwt from "jsonwebtoken";
import { userModel } from "../model/userInfo.js";

export const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No Token Provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden: Invalid or Expired Token" });
        console.log(decoded)
        req.user = decoded;
        next();
    });
};
