const userModel = require("../models/user.model");
const Jwt = require('jsonwebtoken')


const requireAuth = async(req, res, next) => {
    const authHeader = req.header('Authorization')

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: "Access denied, no token"})
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const payload = Jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(payload.userId)

        if(!user) {
            return res.status(404).json({message: "user not found"})
        }

        req.user = user // this makes every route know who is logged in
        next();
        
    } catch (error) {
        return res.status(401).json({error: "Invalid or expired token"})
    }

}

module.exports = requireAuth;