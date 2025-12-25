const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin.model')

const adminMiddleware =async (req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.json({
                message:"Invalid access"
            })
        }

        const decodeId = jwt.verify(token,process.env.JWT_ADMIN_SECRET);

        const admin = await adminModel.findById(decodeId.id);

        if(!admin){
            return res.json({
                message:"Invalid access"
            })
        }

        req.adminId = admin._id;
        next();
    }
    catch(err){
        return res.json({
            error:err.message
        })
    }
}

module.exports = adminMiddleware