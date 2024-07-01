
import React from 'react'

export default function PollBar(props) {
    const outlineStyle = {
        height: props.height,
        width: props.width?? '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        margin: props.margin,
    }

    const processStyle = {
        borderRadius: 'inherit',
        height: '100%',
        width: props.process + '%',
        zIndex: 5,
        backgroundColor: props.process >= 50 ? '#32AF4E' : '#FF3A3A'
    }

  return (
    <div className='poll-border' style={outlineStyle}>
        <div className="poll" style={processStyle}></div>
    </div>
  )
}
