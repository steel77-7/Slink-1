import React from "react";
import { ChatState } from "../contexts/ChatContext";

const url = process.env.REACT_APP_SERVER_URL;

export const checkUser = async (navigate) => {
   /* const {setUser} = ChatState();  */
  try {
    const authtoken = JSON.parse(localStorage.getItem("authToken"));
    console.log(authtoken);
    if (authtoken) {
      console.log("returning to the login");
      navigate("/login");
      return;
    }
    const response = await fetch(url+"protected", {
      method: "GET",
      header: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authtoken} `,
      },
    });
    const data = response.json();
    console.log("data in the checkuser", data);
    if (response.ok)
      if (!data.validation) {
        console.log("returning to the login");
        navigate("/login");
        /* setUser(data.user) */
        return;
      } else {
        console.log("logged in successfully");
        return data.user;
      }
  } catch (error) {
    console.error(error);
  }

  return <></>;
};
