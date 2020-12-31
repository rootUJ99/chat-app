import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks';
import List from '../../components/List';
import Conversation from '../../components/Conversation';
import Button from '../../components/Button';
import './styles.css';
const Chat = ({socket}) => {
  const [userList, setUserList] = useState([]);
  const [userData] = useLocalStorage('token');
  const [contact, setContact] = useState('');
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
  
  const handleItemClick = (listItem) => {
    console.log(listItem);
    setContact(listItem);
  }

  return (
    <div className="chat">
      <List 
        list={userList?.users} 
        propToShow="username" 
        onItemClick={handleItemClick}
      />
      <Conversation 
        contact={contact} 
        socket={socket}
      />
    </div>
  )
}

export default Chat;
