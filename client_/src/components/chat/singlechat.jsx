import React, { useEffect } from "react";
import { ChatState } from "../../contexts/ChatContext";
import { io } from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_SERVER_URL);


export const SingleChat = ({ chat }) => {
  const { currentChat, setCurrentChat ,user,isGroupChat,setRoom} = ChatState();



  const handleClick = () => {
    console.log("single chat", chat);
    console.log("chat members", chat.members);
    setCurrentChat(chat);
    setRoom(chat._id)
  };



  return (
    <>
      <button onClick={handleClick}>
        <div className="flex flex-row gap-4 bg-slate-400 p-4  relative rounded-md  w-56">
          <img
            src="../../assets/AW2_artstation_article_1280x400.webp"
            alt="well"
            className="rounded-full bg-red-500 h-10 w-10  p-4 "
          />
          <div className="flex flex-col max-w-fit">
            {/* {chat && chat.name===user.name? chat.members.map((member,index)=>{
              return <h6>{member}</h6>
            }) : null} */}
            
            {chat && chat.members.length>2?<h6>{chat.name}</h6> :  chat.members.map((member,index)=>{
              if(member._id!==user._id )
                
              return (<div key = {index}><h6>{member.name}</h6></div>)
            })
            }
           {/*  <h6>{chat.name}</h6> */}
            
            
          </div>
        </div>
      </button>
    </>
  );
};
