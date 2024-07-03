const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  /* members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userdata",
    },
  ], */
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'userdata'
  },

  

  chat :{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Chat'
  },

  message: String,
  
},

{
  
  timestamps: true,
}
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;