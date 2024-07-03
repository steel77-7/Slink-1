import React, { useContext, useState, useEffect } from "react";
import { ChatState } from "../../contexts/ChatContext";
import { SingleChat } from "./singlechat";

import { io } from "socket.io-client";
let url = process.env.REACT_APP_SERVER_URL;
const socket = io(url, {});

export const Contactlist = () => {
  const { addContactPress, setAddContactPress, setUser, user } = ChatState();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
    console.log("this is user ", user);
  }, []);


  const fetchContacts = async () => {
    try {
      const response = await fetch(url+'/chat/contactList', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      setContacts(data.contacts);
      setUser(data.user);
      console.log("this is data ", data);
      console.log("this is contacts", contacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  return (
    <div className="  w-64 bg-gray-200 p-4 ">
      {user &&<h2 className="text-xl font-bold mb-4">Hello! {user.name}</h2>}
      <h2 className="text-xl font-bold mb-4">Contacts</h2>
      <div className="flex justify-between my-2 bg-slate-400 p-2 rounded-md" >
        <span>Add new </span>
        <button
          className="flex justify-center items-center bg-red-500 rounded-md h-5 w-5 "
          onClick={() => {
            setAddContactPress(!addContactPress);
          }}
        >
          +
        </button>
      </div>
      <ul className="flex flex-col overflow-auto">
        
        {contacts &&
          contacts.map((contact) => {
            // Filter members to exclude the user
            const filteredMembers = contact.members.filter(
              (member) => member !== user
            );

            // Check if there are any members left after filtering
            if (filteredMembers.length > 0) {
              return (
                <li key={contact._id} className="text-gray-700 mb-2">
                  <SingleChat chat={contact} />
                </li>
              );
            } else {
              return null;
            }
          })}

      </ul>
    </div>
  );
};
