import React, { useEffect, useState } from "react";
import { ChatState } from "../../contexts/ChatContext";
import getSocket from "../../misc/getsocket";
import { MessageComponent } from "./messagecomponent";
var socket;
let url = process.env.REACT_APP_SERVER_URL;
export const Chatarea = () => {
  const { room, currentChat, setcurrentChat, user, setUser,toDelete,setShowChatInfo,showChatInfo } = ChatState();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [editMessage, setEditMessage] = useState(false);
  const [toEditMessage, setToEditMessage] = useState();
 
  const urlfetch = "";

  useEffect(() => {
    socket = getSocket();
    socket.on("connection ", (data) => {
      console.log("connetced", data);
    });

    socket.on("recieved-message", (data) => {
      console.log("recieved message", data);
      setMessages((previous) => [...previous, data]);
    },[socket]);

    return () => {
      socket.off("connect");
      socket.off("recieved-message");
      socket.emit("leave-room", room);
    };
  }, [room]);

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    socket.emit("join-room", room);
  }, [room]);

  //*********fetch the messages************
  const fetchMessages = async () => {
    try {
      console.log("curretn chat in fetch messages", currentChat);
      const response = await fetch(url+'/chat/fetchMessage', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          Chat: `${JSON.stringify(currentChat)}`,
        },
      });

      //console.log("Messages fetched");
      const data = await response.json();
      console.log("data.messages", data.messages);

      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  //*********save messages***********
  const saveMessages = async () => {
    try {
      const response = await fetch(url+'/chat/saveMessage', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          message: newMessage,
          sender: user,
          chat: currentChat,
        }),
      });
      //console.log("chat in save message",currentChat);
      if (!response.ok) throw new Error("Error encounterd");
      else {
        const data =await response.json();
        console.log('data is:',data)
        console.log('data id:',data.message._id)
        return data.message._id;
        //return data.; 
    } 
  }
      catch (error) {
      console.error(error);
    }
  };

  //*************send messages****************
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    socket.emit("message", {
      message: newMessage,
      room: currentChat._id,
      sender: user,
    });

    let id = await saveMessages();
    //console.log('id: ',id)
    setMessages([...messages, { _id:id,message: newMessage, sender: user }]);
    setNewMessage("");
  };

  //***************editing messages****************** */
  const handleEditMessage = async () => {
    let temp = toEditMessage;
    temp.message = newMessage;
    setToEditMessage(temp);
    console.log("temp", temp);
    console.log("to edit message in edit message", toEditMessage);
    try {
      const request = await fetch(url
        +'/chat/editMessage', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ message: toEditMessage }),
      });
      
      

      console.log("to edit message", toEditMessage);
      setNewMessage("");
      setEditMessage(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteMessage = async (messageid)=>{
    try {
      console.log('to delete', toDelete)
      const request = await fetch(url+'/chat/deleteMessage', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ messageId: messageid}),
        });
    } catch (error) {
        console.error(error);
    }
        
  }

  //****************display messages******************

  return (
    <div className="flex flex-col h-screen w-full ">
      {currentChat._id && (
        <div className="flex bg-slate-200 p-3 justify-between">
          {<p>Contact info:{currentChat.name}</p>}
          <button className="border-1 border-black h-5 w-5 " onClick={()=>setShowChatInfo(!showChatInfo)}>...</button>
        </div>
      )}
      <div className="flex-1 p-4 overflow-auto">
        {currentChat &&
          messages.map((message) => (
            <MessageComponent
              message={message}
              setEditMessage={setEditMessage}
              user={user}
              setToEditMessage={setToEditMessage}
              setNewMessage={setNewMessage}
              
              handleDeleteMessage={handleDeleteMessage}
            />
          ))}
      </div>
      {currentChat._id&&<div className="p-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        {editMessage ? (
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleEditMessage}
          >
            Done
          </button>
        ) : (
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        )}
      </div>}
    </div>
  );
};
