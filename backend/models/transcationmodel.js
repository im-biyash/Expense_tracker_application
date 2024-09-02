const mongoose = require('mongoose');

const transcationSchema = new mongoose.Schema({

    amount:{
        type:Number,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String

    }
})
module.exports = mongoose.model('Transcation',transcationSchema);