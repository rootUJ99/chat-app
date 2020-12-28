import React from 'react'
import './styles.css';
const Input = ({name,type, onChange, value, placeholder}) => {
  return (
      <input 
        type={type}
        name={name} 
        onChange={onChange} 
        value={value} 
        placeholder={placeholder}
        className='input'
      />
  )
}

export default Input;
