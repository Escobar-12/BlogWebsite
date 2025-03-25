import { AllowedOrigins } from "../config/allowedOrigins.js";

export const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (!origin || AllowedOrigins.includes(origin)) { 
        res.setHeader("Access-Control-Allow-Credentials", true);
    }
    next();
};
