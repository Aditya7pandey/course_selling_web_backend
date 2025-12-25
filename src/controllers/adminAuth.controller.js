const adminModel = require('../models/admin.model')
const {z} = require('zod');
const func = require('../configs/passFunct.configs')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const register = async(req,res)=>{
    try{
        const data = z.object({
            fullName:z.string().min(3).max(50),
            email:z.string().min(3).max(50).email(),
            password:z.string().min(3).max(50)
            .refine((val)=>{
                if(func.lowerCase(val)){
                    return true
                }
            },{
                message:"enter atleast 1 lowercase letter"
            })
            .refine((val)=>{
                if(func.upperCase(val)){
                    return true;
                }
            },{
                message:"enter atleast 1 upperrcase letter"
            })
        })

        const result = data.safeParse({
            fullName:req.body.fullName,
            email:req.body.email,
            password:req.body.password
        })

        if(!result.success){
            return res.json({
                error:result.error.format()
            })
        }
        
        const fullName = req.body.fullName;
        const email = req.body.email;
        const password = req.body.password;
        
        const emailExists = await adminModel.findOne({email});

        if(emailExists){
            return res.json({
                message:"Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await adminModel.create({
            fullName,
            email,
            password:hashedPassword
        })

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.cookie("token",token);

        return res.json({
            userId:user._id,
            message:"account created successfully"
        })
    }
    catch(error){
        return res.json({
            error:error.message
        })
    }
}

const login = async (req,res)=>{
    try{
        const data = z.object({
            email:z.string().min(3).max(50).email(),
            password:z.string().min(3).max(50)
            .refine((val)=>{
                if(func.lowerCase(val)){
                    return true
                }
            },{
                message:"enter atleast 1 lowercase letter"
            })
            .refine((val)=>{
                if(func.upperCase(val)){
                    return true;
                }
            },{
                message:"enter atleast 1 upperrcase letter"
            })
        })

        const result = data.safeParse({
            email:req.body.email,
            password:req.body.password
        })

        if(!result.success){
            return res.json({
                error:result.error.format()
            })
        }
        
        const email = req.body.email;
        const password = req.body.password;

        const user = await adminModel.findOne({email});

        if(!user){
            return res.json({
                message:"user not registered"
            })
        }

        const compare = await bcrypt.compare(password,user.password);
        
        if(!compare){
            return res.json({
                message:"Invalid credentials"
            })
        }

        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET);

        res.cookie("token",token);

        res.json({
            userId:user._id,
            message:"user logged in successfully"
        })
    }
    catch(err){
        return res.json({
            error:err.message
        })
    }
}

module.exports = {
    register,
    login
}