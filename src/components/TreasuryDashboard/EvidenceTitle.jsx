
import { background } from '@cloudinary/url-gen/qualifiers/focusOn'
import React, {useState, useRef} from 'react'
import PrimaryBorder from '../PrimaryBorder'
import {Input,Button} from 'antd'
import {motion} from 'framer-motion'
import Evidence from '../../dataModels/Evidence'

export default function EvidenceTitle(props) {
    const [imageFile, changeImageFile] = useState(null) // State of the evidence image
    const [description, changeDescription] = useState('') // Store the description
    const evidenceImageRef = useRef() // Reference hook for the image to be selected 
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
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    }


  return (
    <motion.div className='small-prompt' style={styles}
    initial={{scale: 0}}
    animate={{scale: 1}}
    exit={{scale: 0}}
    >
        <div style={contentStyles}>
            <h2>ADD EVIDENCE</h2>
            <label>Description</label>
            <PrimaryBorder borderRadius='6px'>
                <Input onChange={(e) => {changeDescription(e.target.value)}}/>
            </PrimaryBorder>
            <input type="file" ref={evidenceImageRef} accept='image/*' onChange={(e) => {changeImageFile(e.target.files[0])}}/>
            
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <button style={{flexGrow:1, border: '1px solid #A2A0D7', margin: '10px'}}
                onClick={() => {
                    // Creating new evidence to the record & passing Evidence instant 
                    props.createNew(new Evidence({imageFile: imageFile, description: description}))
                }}
                >Add</button>
                <button style={{flexGrow:1, border: '1px solid red', margin: '10px'}}
                onClick={() => props.toggleClose(false)}
                >Cancel</button>
            </div>
            
        </div>
        
    </motion.div>
  )
}
