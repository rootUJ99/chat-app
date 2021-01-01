import React from 'react'
import './styles.css';
const Message = ({ message, isSentByUser, recived}) => {
  const background = isSentByUser ? `var(--sender-message)`: `var(--reciver-message)`;
  const alignSelf = isSentByUser ? 'flex-end': 'flex-start';
  const checkImgSrc = recived ? '/double-check.svg': '/check.svg';
  return (
    <div style={{
      background,
      alignSelf
      }} className="message">
      {message}
      { isSentByUser &&
        <img src={checkImgSrc} className="check-img"/>
      }
    </div>
  )
}

export default Message; 
