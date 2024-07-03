import React from "react";
import { ChatState } from "../../contexts/ChatContext";

export const ChatInfo = () => {
  const { setShowChatInfo, showChatInfo, currentChat, user,setCurrentChat } = ChatState();

  return (
    <>
      <div className="  items-center max-w-3xl w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex  flex-row-reverse p-2 ">
          <button
            className="border-2 border-slate-400    rounded-md h-6 w-6  hover:bg-slate-400 hover:border-slate-200 hover:text-white"
            onClick={() => setShowChatInfo(!showChatInfo)}
          >
            X
          </button>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            src={/* member.avatar ||  */ "https://via.placeholder.com/50"}
            alt=/* {member.name} */ "someone"
            className="w-64  h-64 rounded-full mr-3"
          />
          <h2 className="text-3xl font-bold mb-6 text-center">
            {currentChat.name}
          </h2>

          <div className="mb-6 flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold mb-2">Members</h3>
            <div className="flex gap-4 ">
              {currentChat.members.map((member, index) => {
                if (!member._id !== user._id) {
                  return (
                  
                      <div
                        key={index}
                        className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                      >
                        {member.name}
                      </div>
                    
                  );
                }
                /* else return(<div
                  key={index}
                  className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  You
                </div>) */
              })}
            </div>
          </div>

          <div className="mb-6">
            <div className="space-y-4">
              {/* {chatInfo.messages.map((message, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <img src={message.sender.avatar || 'https://via.placeholder.com/50'} alt={message.sender.name} className="w-8 h-8 rounded-full mr-2"/>
                <span className="font-bold">{message.sender.name}</span>
              </div>
              <p>{message.content}</p>
              <span className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
            </div>
          ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
