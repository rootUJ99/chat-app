import React from 'react'
import './styles.css';
const Message = ({background, message, alignSelf}) => {
  return (
    <div style={{
      background,
      alignSelf
      }} className="message">
      {message}
    </div>
  )
}

export default Message; 
