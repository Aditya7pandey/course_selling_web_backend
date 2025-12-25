const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admin',
        require:true,
    },
    courseName:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    }
},{timestamps:true})

const course = mongoose.model("course",courseSchema);
module.exports = course