const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/usermodel");

//fetchChat route
router.get("/fetchMessage", authenticateToken, async (req, res) => {
  try {
    
    //console.log('fetch messages initiated');
    const currchat = JSON.parse(req.headers.chat);
    /* const user = await User.findOne({email}) ;
        //console.log('in the fetch message',user)
        //console.log('in the fetch message req',req.body) */
    /* const chat = Chat.findOne({members:[...user]}); */
    //console.log('chat is', currchat);
    const chat = await Chat.findOne({ _id:currchat._id });
    const message = await Message.find({ chat: chat }).populate('sender');
    if (message) {
      //console.log('messages : ',message)
      res.status(200).json({ messages: message });
    } else {
      //console.log('no messages found');
      res.status(401).json({ messages: null });
    }
  } catch (e) {
    //console.log("server error in the fetch chat",e);
    res.send({ message: "an internal server error occured " + e });
  }
});

//saveChat
router.post("/saveMessage", authenticateToken, async (req, res) => {
  try {
    const { message, sender, chat } = req.body;
    
    
    /* const newMessage = new Message({
        sender: sender,
        receiver: reciever,
        chat: chat,
        message: message,
      });
      
      // Save the message to the database
      const savedMessage = await newMessage.save(); */
    const newMessage = await Message.create({
      sender: sender,
      chat: chat,
      message: message,
    });
    if (newMessage) {
      console.log(newMessage)
      res.status(200).json({ message: newMessage});
    } else {
      res.status(200).json({ message: "database error" });
    }
  } catch (error) {
    res.status(500).json({ message: "database error" + error });
  }
});

router.post('/editMessage',authenticateToken, async (req,res)=>{
  try {
    const {message}= req.body;
    console.log(message)
    const result = await Message.findOneAndUpdate({_id:message._id},{$set:{message:message.message}})
    console.log('Message update results :',result)
    res.send({message:'message updated '})
  } catch (error) {
      console.error(error);
      res.status(500).json({message:'message not updated'});
  }
})
router.post('/deleteMessage',authenticateToken, async (req,res)=>{
  try {
    const {messageId}= req.body;
    console.log('message is :',messageId)
    const result = await Message.findByIdAndDelete(messageId);
    console.log('Message deletion results :',result)
    res.send({message:'message deleted '})
  } catch (error) {
      console.error(error);
      res.status(500).json({message:'message not deleted'});
  }
})

//**************add new contacts to the list*****************
router.post("/createContact", authenticateToken, async (req, res) => {
  try {
  console.log("create contact initiated"); 

  console.log("create contact initiated"); 
  console.log("create contact initiated"); 
  console.log("create contact initiated"); 
  console.log("create contact initiated"); 
  console.log("create contact initiated"); 

    const { name, isGroupChat, members } = req.body;
    console.log(isGroupChat);
    let finalMembers = [];
    if (isGroupChat) {
      for (const member of members) {
        console.log(member)
        const user = await User.findOne({ name: member });
        console.log("user in group chats", user);
        if (user) {
          finalMembers.push(user._id
          ); // Store user ID
          finalMembers.push(req.user._id);
        } else {
          //console.log("no user found with name : ", member);
        }
      }
    } else {
      const user = await User.findOne({ name });
      if (user) {
        console.log(user)
        ////console.log("user is", user);
        finalMembers.push(user._id); // Store user ID
        finalMembers.push(req.user._id);
        console.log(finalMembers)
      }
    }
    console.log('final members in  the outer dunction ',finalMembers);
    const chat = await Chat.create({
      members: finalMembers,
      isGroupChat: isGroupChat,
      name:name,
    }).then(res=>{console.log(res)}).catch(e=>console.lgo(e));
    console.log('thsi is chat ',chat)


    res.status(200).json({ message: "contact created" });
  } catch (error) {
    res
      .status(200)
      .json({ message: "error occured in creating contact", error: error });
  }
});
/* router.post("/createContact", authenticateToken, async (req, res) => {
  try {
    console.log("create contact initiated"); 

    const { name, isGroupChat, members } = req.body;
    console.log(isGroupChat);

    let finalMembers = [];
    if (isGroupChat) {
      for (const member of members) {
        console.log(member);
        const user = await User.findOne({ name: member });
        console.log("user in group chats", user);
        if (user) {
          finalMembers.push(user._id); // Store user ID
        } else {
          console.log("no user found with name : ", member);
        }
      }
      // Ensure the requesting user is added to the members array
      if (!finalMembers.includes(req.user._id)) {
        finalMembers.push(req.user._id);
      }
    } else {
      const user = await User.findOne({ name });
      if (user) {
        console.log(user);
        finalMembers.push(user._id); // Store user ID
        finalMembers.push(req.user._id);
      } else {
        console.log("No user found with name:", name);
        return res.status(404).json({ message: "User not found" });
      }
    }
    console.log('final members in the outer function:', finalMembers);

    const chat = await Chat.create({
      members: finalMembers,
      isGroupChat: isGroupChat,
      name: name,
    });
    console.log('Created chat:', chat);

    res.status(200).json({ message: "Contact created", chat });
  } catch (error) {
    console.error("Error occurred in creating contact:", error);
    res.status(500).json({ message: "Error occurred in creating contact", error });
  }
}); */


//fetch the contact list
router.get("/contactList", authenticateToken, async (req, res) => {
  try {

    const  {user}  = req;
   
    const contacts = await Chat.find({  members:  user._id  }).populate('members','-password');

    if (contacts) {
      res.status(200).json({ contacts: contacts ,user:user});
    } else {
      res.status(200).json({ error: "error occured" });
    }
  } catch (error) {
    res.status(500).json({ error: "error occured" + error });
  }
});

router.get("/searchContact", authenticateToken, async (req, res) => {
  try {
   
    const contacts = await User.find();
    if (contacts) {
      res.status(200).json({ contacts });
    } else {
      res.status(200).json({ error: "error occured" });
    }
  } catch (error) {
    res.status(500).json({ error: "error occured" + error });
  }
});


module.exports = router;
