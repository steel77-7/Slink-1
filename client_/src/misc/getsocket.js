// socket.js
import { io } from 'socket.io-client';

//const SOCKET_URL = process.env.REACT_APP_SERVER_URL; // Replace with your socket server URL
const SOCKET_URL = process.env.REACT_APP_SERVER_URL
let socket;

const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);
    console.log('react server url',process.env.REACT_APP_SERVER_URL)
  }
  return socket;
};

export default getSocket;
