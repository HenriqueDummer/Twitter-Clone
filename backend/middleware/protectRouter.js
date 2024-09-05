import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({error: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json({error: "Unauthorized: Invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return  res.status(400).json({error: "Unauthorized: User not found"})
        }

        req.user = user
        next()
    } catch(err){
        res.status(500).json({message: "Internal server error"})
    }
}