import { justify } from '@cloudinary/url-gen/qualifiers/textAlignment'
import React from 'react'

export default function PrimaryBorder(props) {
  const styles = {
    padding: '2px',
    background: 'linear-gradient(to right,#B7B5EB,#63609E)',
    // width: 'inherit',
    height: 'fit-content',
    xFlexGrow: 1,
    flexGrow: props.flex,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: props.width,
    borderRadius: props.borderRadius,
    margin: props.margin
  }  

  return (
    <div style={styles}>
      {props.children}
    </div>
  )
}
