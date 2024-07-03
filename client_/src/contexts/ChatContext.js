import { useContext, useState, useEffect, createContext } from "react";
import Chat from "../components/chat/chat";
import { Contactlist } from "../components/chat/contactlist";

export const ChatContext = createContext();

const ChatProvider = (props) => {
  const [addContactPress, setAddContactPress] = useState(false);
  const [room, setRoom] = useState();
  const [user, setUser] = useState(); 
  const [name, setName] = useState(''); 
  const [members, setMembers] = useState();
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [message, setMessage] = useState();
  const [currentChat , setCurrentChat] = useState([{}]);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [toDelete, setToDelete] = useState({});
  return (
    <ChatContext.Provider
      value={{
        addContactPress,
        setAddContactPress,
        room,
        setRoom,
        user,
        setUser,
        message,
        setMessage,
        isGroupChat,
        setIsGroupChat,
        members,
        setMembers,
        name, setName,
        currentChat , setCurrentChat,
        showChatInfo, setShowChatInfo,
        toDelete, setToDelete
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
export default ChatProvider;
