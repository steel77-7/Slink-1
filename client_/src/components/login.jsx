import React, { useState } from "react";
import { Alert } from "./alerts/alert";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../contexts/ChatContext";
const LoginPage = () => {
  const {setUser} = ChatState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState("");
  const navigate = useNavigate();
  const url = `${process.env.REACT_APP_SERVER_URL}/login`;
  const handleLogin = async (e) => {
    e.preventDefault();
    //basic validation logic
    if (!email || !password) {
      setShowAlert("Please enter all the credentials");
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      /* console.log(authToken) */
      console.log(data)
      if (response.ok) {
        if (data.validated) {
          localStorage.setItem("authToken", data.authtoken);
          console.log(data.validated)
          setUser(data.user)
          setShowAlert('Loggged in successfully');
          navigate('/chat');
        } else {
          setShowAlert(data.message);
          setEmail('');
          setPassword('');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showAlert && <Alert showAlert={showAlert} setShowAlert={setShowAlert} />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className=" flex flex-col justify-center max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login Page
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="username"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex flex-col justify-center items-center gap-4">
          Or
          <button className="flex text-sky-600 hover:underline" onClick={()=>navigate('/')}> Sign up if not a member</button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default LoginPage;
