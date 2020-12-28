import { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks';
const Chat = () => {
  const [userList, setUserList] = useState([]);
  const [userData] = useLocalStorage('token');
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
  return (
    <div>
      {/* <pre>{userList}</pre> */}
    </div>
  )
}

export default Chat;
