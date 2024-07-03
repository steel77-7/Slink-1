import React, { useState , useEffect} from "react";
import { ChatState } from "../../contexts/ChatContext";

export const MessageComponent = ({
  message,
  setEditMessage,
  user,
  setToEditMessage,
  setNewMessage,
  handleDeleteMessage,
}) => {
  const { toDelete, setToDelete } = ChatState();
  const [optionPress, setOptionPress] = useState(false);
  const [isDeleted, setIsDeleted] = useState(true);
  
  const handleClick = (e) => {
    setOptionPress(!optionPress);
  };
  const handleEdit = () => {
    setEditMessage(true);
    setNewMessage(message.message);
    setToEditMessage(message);
    setOptionPress(false);
  };
  const handleDelete = async () => {
    console.log("handledelete engaged");
    console.log("to be deleted message: ", message);
    
     setToDelete(message);
    console.log('messaeg in to delete : ',toDelete)
    
    await handleDeleteMessage(message._id);
    setIsDeleted(false);
  };
  return (
    <>
      {isDeleted && (
        <div
          key={message._id}
          className={`mb-2 flex flex-col ${
            message.sender._id === user._id ? "flex-end" : "flex-start"
          }`}
        >
          {message.sender.name}
          <div
            className={` flex  max-w-fit px-4  py-2 rounded-lg shadow ${
              message.sender._id === user._id
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {message.message}
            <button
              className="flex flex-col items-center justify-center"
              onClick={handleClick}
            >
              {message.sender._id === user._id && (
                <div className="flex relative left-11   bg-slate-200 rounded-full h-5 w-5 justify-center items-center text-black  ">
                  ...
                </div>
              )}
            </button>
            <div className={`relative ${optionPress ? "scale-1" : "scale-0"} left-14 bottom-4`}>
              <OptionsMenu
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const OptionsMenu = ({ handleEdit, handleDelete }) => {
  return (
    <>
      <div className="flex flex-col absolute p-2 bg-slate-300 text-black rounded-md ">
        <div className="flex ">
          <button onClick={handleEdit}>edit</button>
        </div>
        <hr className="  border-t-2 border-slate-500" />
        <div className="flex ">
          <button onClick={handleDelete}>delete</button>
        </div>
      </div>
    </>
  );
};
