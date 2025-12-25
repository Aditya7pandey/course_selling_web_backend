const courseModel = require('../models/course.model')
const {z} = require('zod')

const create = async(req,res)=>{
    try{
        const adminId = req.adminId;
        const {courseName,description,price} = req.body;
        const data = z.object({
            courseName:z.string().min(5).max(100),
            price:z.number().min(0).max(50000),
            description:z.string().min(10).max(300)
        })

        const result = data.safeParse({
            courseName,
            price,
            description
        })

        if(!result.success){
            // console.log(result.error)
            return res.json({
                error:result.error.format()
            })
        }

        const course = await courseModel.create({
            adminId,
            courseName,
            description,
            price
        })

        course.save();

        return res.json({
            message:"course created successfully",
            adminId,
            courseId:course._id
        })
    }
    catch(err){
        return res.json({
            error:err.message
        })
    }
}

const deleteCourse = async(req,res) =>{
    try{
        const {courseId} = req.params;

        await courseModel.findByIdAndDelete(courseId);

        return res.json({
            message:"course deleted successfully"
        })
    }
    catch(err){
        return res.json({
            error:err.message
        })
    }
}

const updateCourse = async(req,res) =>{
    try{
        const adminId = req.adminId;
        const {courseId} = req.params;
        const {courseName,description,price} = req.body;
        const data = z.object({
            courseName:z.string().min(5).max(100),
            price:z.number().min(0).max(50000),
            description:z.string().min(10).max(300)
        })

        const result = data.safeParse({
            courseName,
            price,
            description
        })

        if(!result.success){
            // console.log(result.error)
            return res.json({
                error:result.error.format()
            })
        }

        if(!courseId){
            return res.json({
                message:"Invalid request"
            })
        }

        await courseModel.findByIdAndUpdate(courseId,{
            courseName,
            price,
            description
        },{new:true})

        return res.json({
            message:"course updated",
            courseId
        })
    }
    catch(err){
        return res.json({
            error:err.message
        })
    }
}

// get courses

const getAllCourses = async(req,res) =>{
    try{
        const course = await courseModel.find();

        return res.json({
            message:"All courses",
            course
        })
    }
    catch(err){
        return res.json({
            error:err.message
        })
    }
}

const getCourse = async(req,res) =>{
    try{
        const {courseId} = req.params;

        if(!courseId){
            return res.json({
                message:"Invalid request"
            })
        }
        
        const course = await courseModel.findById(courseId);

        return res.json({
            message:"get course",
            course
        })
    }
    catch(err){
        return res.json({
            error:err.message
        })
    }
}

module.exports = {
    create,
    deleteCourse,
    updateCourse,
    getAllCourses,
    getCourse
}