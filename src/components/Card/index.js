import React, { Children } from 'react'
import './styles.css';

const Card = ({title, children, onClick}) => {
  return (
    <div className="card" onClick={onClick}>
      <h4>{title}</h4>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Card
