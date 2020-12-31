import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Message from "../Message";
import "./styles.css";
const messageList = new Array(100).fill().map((_, index) => `${index}`);

const Conversation = ({contact, socket}) => {
  
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [submitMessage, setSubmitMessage] = useState([])

  useEffect(()=> {
    socket?.on('recived-message', (msg)=>{
      console.log(msg);
      setSubmitMessage([...submitMessage, msg]);
      setMessage('');
    });
    return () => socket?.off('recived-message');
  },[setSubmitMessage, socket, submitMessage]);

  useEffect(()=>{
    socket?.on('typing', (value)=> {
      setIsTyping(value);
    });
    return () => socket?.off('typing');
  },[setIsTyping, isTyping, socket]);

  const handleChange = (e) => {
    setMessage(
      [e.target.name]= e.target.value,
    );
    socket?.emit('typing');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    socket?.emit('send-message', message);
  }

  return (
    <div className='conversation'>
      <div className='header'>{contact?.username} {isTyping && 'typing'}</div>
      <div className='messages'>
        {submitMessage?.map((it, index) => (
          <Message message={it} key={`${index}`}/>
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
          <Button type='submit'>Send</Button>
        </div>
      </form>
    </div>
  );
};

export default Conversation;
