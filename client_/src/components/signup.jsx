import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "./alerts/alert";
const SignupPage = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert,setShowAlert] = useState('')
  const url = `${process.env.REACT_APP_SERVER_URL}/register`;
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if(!username || !email || !password || !confirmPassword){
      setShowAlert('Please enter all the credentials');
    }


    if(!username || !email || !password || !confirmPassword){
      setShowAlert('Please enter all the credentials');
    }




    try {
        
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email, password, username}),
        });
        const data= await response.json();
        console.log(data)
        if (response.ok) {
          if (data.validated) {
            localStorage.setItem("authToken", data.authtoken);
            setShowAlert('Signed up successfully');
            navigate('/chat');
          } else {
            console.log('inside')
            setShowAlert(data.message);
            setEmail('');
            setPassword('');
            setUsername('');
            setConfirmPassword('');
          }
        }else{
          console.log('inside')
          setShowAlert(data.message);
          setEmail('');
          setPassword('');
          setUsername('');
          setConfirmPassword('');
        }

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
    {showAlert && <Alert showAlert={showAlert} setShowAlert={setShowAlert}/>}
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <input type="hidden" name="remember" value="true" required />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                required
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"  
                placeholder="Username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
              required
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
              required
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
              required
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit" onClick={handleSignup}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center gap-4">

        or
        <button className="flex  text-sky-700 hover:underline" onClick={()=>navigate('/login')}>login if an existing member</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignupPage;
