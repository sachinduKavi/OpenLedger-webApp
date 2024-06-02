import React from 'react'
import CloseIcon from '../assets/icons/delete.png'

export default function RedCloseBtn(props) {
  return (
    <div className='cross-btn'>
        <img src={CloseIcon} alt="close-icon" width={props.size}  height={props.size} onClick={props.onClick}/>
    </div>
  )
}
