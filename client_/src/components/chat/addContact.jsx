
import React, { useRef, useState,useEffect } from "react";
import { ChatState } from "../../contexts/ChatContext";
let url = process.env.REACT_APP_SERVER_URL;
export const AddContact = () => {
  const {
    setAddContactPress,
    setRoom,
    name,
    setName,
    members,
    setMembers,
    isGroupChat,
    setIsGroupChat,
    message,
    setMessage,
  } = ChatState();
  let membersArray;
  let textref = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (members) {
      membersArray = members.split(",").map((member) => member.trim());
    }
    try {
      const response = await fetch(url+'/chat/createContact', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          name: name,
          members: membersArray,
          isGroupChat: isGroupChat,
        }),
      });
      console.log("req sent");
      setAddContactPress(false);
    } catch (error) {
      console.log("error is", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg w-96 ">
        <h2 className="text-2xl font-bold mb-4">Create Chat</h2>
        <form /* onSubmit={handleSubmit} */>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
              
            />
          </div>
          {isGroupChat && (
            <div className="mb-4">
              <label className="block text-gray-700">
                Members (comma separated user IDs):
              </label>
              <input
                type="text"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isGroupChat}
                onChange={(e) => setIsGroupChat(e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Is Group Chat</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
           onClick={handleSubmit}>
            Create Chat
          </button>
        </form>
        <div className="flex  relative   h-3/5 w-full ">
          <Searchcomponent
          name={name}
            setName={setName}
            setMembers={setMembers}
            setIsGroupChat={setIsGroupChat}
            isGroupChat={isGroupChat}
            members={members}
          />
        </div>
        {message && (
          <p className="mt-4 text-center text-green-500">{message}</p>
        )}
      </div>
    </>
  );
};


const Searchcomponent = ({ setName, setMembers, setIsGroupChat,isGroupChat,members ,name}) => {
  const [memberArray,setMemberArray] = useState([])
  console.log("search members initiated");

useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(url +'/chat/searchContact', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMemberArray(data.contacts);
        } else {
          console.log("Response not ok");
        }
      } catch (error) {
        console.log("Error is", error);
      }
    };
    fetchMembers();
  }, []);
 

  return (
    <>
      <div className=" searchcomponent flex flex-col overflow-auto  relative  max-h-fit w-full rounded-md border border-slate-200 my-4 ">
        <div className="flex flex-col w-3/4 relative   items-center m-2 h-fit gap-3   left-3.5">
          {memberArray.map((chat,index)=> {
           
            if(chat.name.toUpperCase().indexOf(name.toUpperCase())>-1)
            return (<SingleSearchComponent
            chat = {chat}
            setName={setName}
            setMembers={setMembers}
            setIsGroupChat={setIsGroupChat}
            isGroupChat={isGroupChat}
            members={members}
          />)
          })
          }
        </div>
      </div>
    </>
  );
  
  
};


const SingleSearchComponent = ({ setName, setMembers, setIsGroupChat,chat ,isGroupChat,members}) => {
  console.log('ingroupchat',isGroupChat)
  const handleClick = () => { 
    if(!isGroupChat) {
      setName(chat.name);
      
    }
    else if(isGroupChat){
      
      setMembers(members? `${members},${chat.name}`:chat.name);

    }
    
   };
  console.log('chat in single serach comonent',chat)

  return (
    <>
      <button onClick={handleClick}>
        <div className="flex flex-row gap-5 bg-slate-400 p-4  relative rounded-md   ">
          <img
            src="../../assets/AW2_artstation_article_1280x400.webp"
            alt="well"
            className="rounded-full bg-red-500 h-10 w-10  p-4 "
          />
          <div className="flex flex-col max-w-fit"></div>
          {chat.name}
        </div>
      </button>
    </>
  );
};
