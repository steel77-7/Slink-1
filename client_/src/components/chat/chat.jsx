import { AddContact } from "./addContact";
import ChatProvider, {
  ChatState,
  ChatContext,
} from "../../contexts/ChatContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Contactlist } from "./contactlist";
import { Chatarea } from "./chatarea";
import { ChatInfo } from "./chatinfo";
import openingPic from '../../assets/openningpic2.webp';

const Chat = () => {
  const { addContactPress, setAddContactPress, setUser ,showChatInfo,currentChat} = ChatState();
  console.log(addContactPress);
  const url = `${process.env.REACT_APP_SERVER_URL}/protected`;
  const navigate = useNavigate();
  const authtoken = localStorage.getItem("authToken");

  useEffect(() => {
    checkUser(navigate);
  }, []);

  const checkUser = async (navigate) => {
    console.log('check user initiated')
    try {
      const authtoken = localStorage.getItem("authToken")
      //const authtoken = localStorage.getItem("authToken");
      console.log('this is auth token' ,authtoken);
      if (authtoken===null) {
        console.log("returning to the login");
        navigate("/login");
        return;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${authtoken} `,
        },
      }); 

      const data = await response.json();
      console.log("data in the checkuser", data);
      if (response.ok)
        if (!data.validation) {
          console.log("returning to the login",data);
          navigate("/login");
          throw new Error("Response not ok");
          return;
        } else {
          setUser(data.user);
          console.log('user in chat', data.user)
          return data.user;
        }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <div className="flex h-screen ">
        <Contactlist />
       
        {currentChat._id?showChatInfo?<ChatInfo/>:<Chatarea />:(<img src={openingPic} alt="Opening"  className="h-full w-fit relative  align-middle"/>)} 
        {addContactPress && <AddContact />}
      </div>
    </>
  );
};

export default Chat;



