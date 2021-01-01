import React from 'react'
import './styles.css';
const Message = ({background, message, justifySelf}) => {
  return (
    <div style={{
      background,
      justifySelf
      }} className="message">
      {message}
    </div>
  )
}

export default Message; 
