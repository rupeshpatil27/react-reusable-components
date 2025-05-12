import React from 'react'
import "./CustomButton.css"

const CustomButton = ({ buttonText, onclick }) => {
  return (
    <div className='btn' onClick={onclick}>
      <span className='btn-txt'>{buttonText}</span>
    </div>
  )
}

export default CustomButton