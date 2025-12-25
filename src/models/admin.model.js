const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const admin = mongoose.model("admin",adminSchema);
module.exports = admin;