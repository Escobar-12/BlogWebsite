import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {userModel} from "../model/userInfo.js"
import { allowedRoles } from "../config/allowedRoles.js";

export const register = async(req,res)=>
{
    const {name,email,password} = req.body;
    if(!name || !email || !password)
    {
        return res.status(400).json({success:false, message:"Missing Data"});
    }

    try
    {
        const userFoundWithEmail = await userModel.findOne({email});
        const userFoundWithName = await userModel.findOne({name});
        if (userFoundWithEmail || userFoundWithName) {
            return res.status(409).json({ success: false, message: "User already exists." });
        }

        const hashedPwd = await(bcrypt.hash(password,10));
        const role = allowedRoles.User; 
        const newUser = await userModel.create({name,email,password:hashedPwd,role});

        // generate JWT token
        const Access_token = jwt.sign(
            { id: newUser._id, name: newUser.name, role: newUser.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        const Refresh_token = jwt.sign(
            { id: newUser._id, name: newUser.name, role: newUser.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        
        res.cookie("jwt", Refresh_token, { 
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: "None", 
            secure: false
        });
        
        
        res.status(201).json({ success: true, Access_token, role:newUser.role });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

export const login = async(req,res)=>
{
    const {name,email,password} = req.body;
    if ((!email && !name) || !password) {
        return res.status(400).json({ success: false, message: "Missing credentials." });
    }
    try
    {
        const userFound = await userModel.findOne({name});
        if (!userFound) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const pwdMatch = await bcrypt.compare(password,userFound.password);
        if (!pwdMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password." });
        }
        // generate JWT token
        const Access_token = jwt.sign(
            { name: userFound.name,id: userFound._id, role: userFound.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        const Refresh_token = jwt.sign( 
            {name: userFound.name,id: userFound._id, role: userFound.role},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        
        res.cookie("jwt", Refresh_token, { 
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000, 
            sameSite: "None", 
            secure: false
        });
        
        
        return res.status(200).json({ success: true, Access_token,role:userFound.role});
        
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

export const refresh = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    
    if (!refreshToken) 
    {
        return res.status(401).json({ success: false, message: "No refresh token" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign(
            { id: decoded.id, name: decoded.name, role: decoded.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );

        res.json({ 
            user: decoded.name,  
            Access_token: newAccessToken, 
            roles: decoded.role 
        });

    } catch (err) {
        console.error("Error verifying refresh token:", err);
        res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { 
            httpOnly: true, 
            expires: new Date(0),
            sameSite: "None", 
            secure: false
        });

        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } 
    catch (err) {
        return res.status(500).json({ success: false, message: "Error while logging out" });
    }
};