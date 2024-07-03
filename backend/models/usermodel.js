const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        
    },
    email:{
        required:true,
        type:String,
        unique:true,
        index:true
    },
    password:{
        required:true,
        type:String
    },
    createdAt:{
        type:Date,
        Date:Date.now
    }
    
});

const User = mongoose.model('userdata',userSchema);

module.exports = User;