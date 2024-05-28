import React from 'react'

export default function PrimaryBorder(props) {
  const styles = {
    padding: '2px',
    background: 'linear-gradient(to right,#B7B5EB,#63609E)',
    width: 'inherit',
    height: 'inherit',
    xFlexGrow: 1,
    borderRadius: props.borderRadius,
  }  

  return (
    <div style={styles}>
      {props.children}
    </div>
  )
}
