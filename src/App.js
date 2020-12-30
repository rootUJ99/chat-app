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
  const socketIO = io();
  setSocket(socketIO);
  return () => socketIO.close();
}, [])
  return (
    <div>
      {userData?.token ? <Chat socket={socket}/> : <Auth/>}
    </div>
  )
}

export default App;
