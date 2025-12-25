const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

const userMiddleware = async(req,res,next) =>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.json({
                message:"Invalid request"
            })
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findById(decode.id);

        if(!user){
            return res.json("Invalid user");
        }

        req.userId = decode.id;
        next();
    }
    catch(err){
        return res.json({
            error:err.message
        })
    }
}

module.exports = userMiddleware