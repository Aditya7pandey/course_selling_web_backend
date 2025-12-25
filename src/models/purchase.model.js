const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course',
        require:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true,
    }
},{
    timestamps:true
})

const purchase = mongoose.model('purchase',purchaseSchema);
module.exports = purchase;