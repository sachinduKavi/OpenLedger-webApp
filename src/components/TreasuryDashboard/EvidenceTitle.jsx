
import { background } from '@cloudinary/url-gen/qualifiers/focusOn'
import React from 'react'

export default function EvidenceTitle() {

    // Inline styles I am lazy to create external css
    const styles  = {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
    }

    const contentStyles = {
        minWidth: '500px',
        minHeight: '300px',
        // backgroundColor: 'red',
        borderRadius: '26px',
        border: '3px solid #A2A0D7',
        backdropFilter: 'blur(10px)',
        background: '#00000088',
        padding: '20px'
    }


  return (
    <div className='small-prompt' style={styles}>
        <div style={contentStyles}>
            <h2>ADD EVIDENCE</h2>
        </div>
    </div>
  )
}
