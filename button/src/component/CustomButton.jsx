import React from 'react'
import "./CustomButton.css"

const CustomButton = ({ buttonText, onclick, rounded = 0 }) => {
  return (
    <div className='btn' onClick={onclick} style={{ borderRadius: rounded }}>
      <span className='btn-txt'>{buttonText}</span>
    </div>
  )
}

export default CustomButton