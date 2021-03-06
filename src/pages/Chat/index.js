import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks';
import { convertToken } from '../../utils';
import List from '../../components/List';
import Conversation from '../../components/Conversation';
import './styles.css';
const Chat = ({socket}) => {
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useLocalStorage('token');
  const [contact, setContact] = useState('');
  const [conversation, setConversation] = useState([]);
  const userDetails = convertToken(userData?.token);
;
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
        console.log(list);
        setUserList(list)
      } catch(error) {
        console.log(error);
      }
    })();
  },[]);
  
  const handleItemClick = async (listItem) => {
    const body = {
     members: [userDetails?.id, listItem?._id] 
    }

    try {
      const rawChat = await fetch('/api/chat/load',{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData?.token}`
        },
        method: 'POST',
        body: JSON.stringify(body),
      });
      const chat = await rawChat.json();
      setContact(listItem);
      setConversation(chat?.chat?.chat);
      socket?.emit('create-room', chat?.chat?._id);
    } catch(error) {
      console.log(error);
    }
  }

  const Logout = () => {
    setUserData('');
    window.location.reload();
  }

  return (
    <div className="chat">
      <div className="contact-list">
        <h3 className="list-title"> Available Contacts </h3>
        <List 
          list={userList?.users} 
          propToShow="username" 
          onItemClick={handleItemClick}
        />
        <div className="logout-section">
          <span>{userDetails?.username}</span> <span className="logout-text" onClick={Logout}>logout</span>
        </div>
      </div>
      <Conversation 
        contact={contact} 
        userDetails={userDetails}
        socket={socket}
        setConversation={setConversation}
        conversation={conversation}
      />
    </div>
  )
}

export default Chat;
