import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks';
import Button from '../../components/Button';
const Chat = ({socket}) => {
  const [userList, setUserList] = useState([]);
  const [userData] = useLocalStorage('token');
  const [message, setMessage] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  useEffect(()=>{
    (async ()=>{
      try {
        const rawList = await fetch('/api/user/list',{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData?.token}`
          }
        });
        const list = await rawList.json();
        setUserList(list)
      } catch(error) {
        console.log(error);
      }
    })();
  },[]);
  
  useEffect(()=> {
    socket?.on('chat-message', (msg)=>{
      // console.log(msg);
      setSubmitMessage(msg)
    },[submitMessage]);
  },);
  
  const handleChange = (e) => {
    setMessage(
      [e.target.name]= e.target.value,
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    socket?.emit('chat-message', message);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Type message" value={message} onChange={handleChange}/>
        <Button type="submit">Send</Button>
      </form>
      {/* <pre>{userList}</pre> */}
    </div>
  )
}

export default Chat;
