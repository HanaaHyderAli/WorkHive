import jwt from 'jsonwebtoken'
import User from "../models/user.js";

const authMiddleware= async (req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token= req.cookies.workhiveToken||authHeader.split(" ")[1]
    try {
        if(!token){
            return res.status(401).json({error:"new-user"});

        }

        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        const user= await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        req.user=user;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid token"})
    }
};

export {authMiddleware}


