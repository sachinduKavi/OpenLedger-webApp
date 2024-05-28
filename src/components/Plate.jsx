import React, {useState} from 'react'

import PrimaryBorder from '../components/PrimaryBorder'
import '../styles/plate.css'

export default function Plate(props) {
    const [extension, changeExtension] = useState('')
  return (
    <div className="margin">
        <PrimaryBorder borderRadius='0 10px 10px 0'>
        <div className='plate'>
            <img src={`https://firebasestorage.googleapis.com/v0/b/open-ledger-1d594.appspot.com/o/dashboardIcons%2F${props.imageName}${extension}.png?alt=media&token=ff371eea-8d88-4ce6-b0ad-bd3cb93d030`} alt="icon" width='38' height='38'/>
            <h2>{props.name}</h2>
        </div>
        </PrimaryBorder>
    </div>
    
    
  )
}
