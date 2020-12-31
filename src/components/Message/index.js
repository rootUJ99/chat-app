import React from 'react'
import './styles.css';
const Message = ({background='#fcfc', message}) => {
  return (
    <div style={{
      background: background,
      justifySelf: 'end'
      }} className="message">
      {message}
    </div>
  )
}

export default Message; 
