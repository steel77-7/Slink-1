const mongoose = reuqire ('mongoose');

const profilepicSchema = new  mongoose.Schema({
    path:{
        type:String,
        required:true
    },
    originialName:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userdata'
    }

})