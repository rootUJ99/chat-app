import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Message from "../Message";
import "./styles.css";

const Conversation = ({contact, socket,conversation, setConversation, userDetails }) => {
  
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(null);

  useEffect(()=> {
    socket?.on('recived-message', (msg)=>{
      console.log(msg);
      setConversation([...conversation, msg]);
      setMessage('');
    });
    return () => socket?.off('recived-message');
  },[setConversation, socket, conversation]);

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
    socket?.emit('typing', userDetails?.id);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    socket?.emit('send-message', {message, sender: userDetails?.id});
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
            background={checkIdWithCurrentUser(it?.sender) ? `var(--sender-message)`: `var(--reciver-message)`} 
            justifySelf={checkIdWithCurrentUser(it?.sender) ? 'end': 'start'} 
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
