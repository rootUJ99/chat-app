import './App.css';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import {useState, useEffect} from 'react';
import {useLocalStorage} from './hooks';
import io from 'socket.io-client';
const App = () => {
  const [userData] = useLocalStorage('token');
  const [socket, setSocket] = useState(null);
  useEffect(() => {
  if (userData?.token) {
    const socketIO = io('',{
      multiplex: false,
      transports: ['polling', 'xhr-polling', 'jsonp-polling']
    });
    setSocket(socketIO);
  }
  return () => { 
    console.log('closing socket connection');
    socket?.close();
   }
}, [setSocket])
  return (
    <div className="app">
      {userData?.token ? <Chat socket={socket}/> : <Auth/>}
    </div>
  )
}

export default App;
