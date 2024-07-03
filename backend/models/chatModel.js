const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdata",
  }],

  isGourpChat:{
    type:Boolean
  },
  name:{
    type:String
  }
},
{
  
  timestamps: true,
}
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;

