import express from "express"
import { login, logout, register, refresh } from "../controller/authControllers.js";
import { userModel } from "../model/userInfo.js";
import { verifyAccessToken } from "../middleware/VerifyAuth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/refresh",refresh);
router.post("/logout",logout);
router.get("/me",verifyAccessToken, async (req, res)=>
{
    try
    {
        const user = await userModel.findOne({ _id: req.user.id }).select("-password");
        if(!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ 
            user: user.name, 
            roles: user.role,
        });
        
    }
    catch(err)
    {
        res.status(500).json({ message: "Server error", error: err.message });
    }
})

export default router;