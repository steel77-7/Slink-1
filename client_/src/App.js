import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './components/login';
import SignupPage from './components/signup';
import  Chat  from './components/chat/chat';
import ChatProvider from './contexts/ChatContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignupPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/chat",
    element: <Chat/>,
  },
]);
function App() {
  return (
    <>
    <ChatProvider>
  <RouterProvider router={router} />
  </ChatProvider>
  </>
  )
}

export default App;
