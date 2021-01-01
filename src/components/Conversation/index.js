import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid'
import Button from "../Button";
import Input from "../Input";
import Message from "../Message";
import "./styles.css";

const Conversation = ({contact, socket,conversation, setConversation, userDetails }) => {
  
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(null);
  const [pendingMessages, setPendingMessages] = useState([]);

  useEffect(()=> {
    socket?.on('recived-message', (messageObject)=>{
      const filterdPendingMessages = pendingMessages?.filter(it=>it.pendingId !== messageObject?.pendingId);
      setPendingMessages(filterdPendingMessages);
      setConversation([...conversation, messageObject]);
      setMessage('');
    });
    return () => socket?.off('recived-message');
  },[setConversation, socket, conversation, setPendingMessages, pendingMessages]);

  useEffect(()=>{
    socket?.on('typing', (value)=> {
      console.log(value, userDetails?.id);
      if (value !== userDetails?.id)
        setIsTyping(value);
    });
    return () => socket?.off('typing');
  },[setIsTyping, isTyping, socket]);

  const handleChange = (e) => {
    setMessage(
      [e.target.name]= e.target.value,
    );
    if (e.target.value)
      socket?.emit('typing', userDetails?.id);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      message,
      sender: userDetails?.id,
      pendingId: uuid(),
    };
    setPendingMessages([...pendingMessages, newMessage])
    socket?.emit('send-message', newMessage);
  }

  const checkIdWithCurrentUser = (id) => id === userDetails?.id;

  return (
    <div className='conversation'>
      {
        contact ?
       <>
      <div className='header'>{contact?.username} {isTyping && 'typing'}</div>
      <div className='messages'>
        {conversation?.map((it, index) => (
          <Message
            isSentByUser={checkIdWithCurrentUser(it?.sender)} 
            recived
            message={it?.message} 
            key={`${index}`}/>
        ))}
        {pendingMessages?.map((it, index) => (
          <Message
            isSentByUser={checkIdWithCurrentUser(it?.sender)} 
            recived={false}
            message={it?.message} 
            key={`${index}`}/>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='message-form'>
          <Input
            type='text'
            placeholder='Type message'
            value={message}
            onChange={handleChange}
          />
          <Button type='submit' style={{background: '#58735E'}}>Send</Button>
        </div>
      </form>
      </> : 
      <div className="preview-screen">
        <img src="/chat.svg" className="chat-preview-image"/>
        <p>Select contact and start the conversation</p>
      </div>
      }
    </div>
  );
};

export default Conversation;
