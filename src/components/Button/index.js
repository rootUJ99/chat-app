import React from 'react'
import './styles.css';

const Button = ({children,...rest}) => {
  return (
    <button {...rest} className="button">
      {children}
    </button>
  )
}

export default Button;
