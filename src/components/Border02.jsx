import React from 'react'

export default function Border02(props) {
  const styles = {
    padding: '2px',
    background: 'linear-gradient(to right,#B7B5EB,#63609E)',
    width: 'fit-content',
    height: 'fit-content',
    borderRadius: props.borderRadius,
  }  

  return (
    <div style={styles}>
      {props.children}
    </div>
  )
}
