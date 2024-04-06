import React, {useState} from 'react'

import {motion} from 'framer-motion'
import CropImage from '../assets/icons/Crop.png'
import UpImage from '../assets/icons/up.png'
import LeftImage from '../assets/icons/left.png'
import RightImage from '../assets/icons/right.png'
import DownImage from '../assets/icons/down.png'
import ZoomIn from '../assets/icons/ZoomIn.png'
import ZoomOut from '../assets/icons/ZoomOut.png'

import '../styles/dp.css'

export default function DisplayPicture(props) {
    const [controlPanel, setControlPanel] = useState(false)

    let [x, changeX] = useState(1)
    let [y, changeY] = useState(1)
    let [scale, changeZoom] = useState(1)

    // Update parent parameters 
    const updateParent = () => {
        props.parentContext.state.pictureScale = {
            x: x,
            y: y,
            scale: scale
        }

        console.log(props.parentContext.state.pictureScale)
    }

    // Function to change X & Y position of the picture
    const changePosition = (e) => {
        console.log('Inside the function')
        switch(e.target.id) {
            case 'right':
                x = x - 5
                changeX(x)
                break
            case 'left':
                x = x + 5
                changeX(x)
                break
            case 'down':
                y = y - 5
                changeY(y)
                break
            case 'up':
                y = y + 5
                changeY(y)
                break
        }
        updateParent()
    } 
    
    const changeScale = (e) => {
        switch(e.target.id) {
            case 'in':
                scale += 0.1
                changeZoom(scale)
                break
            case 'out':
                scale -= 0.1
                changeZoom(scale)
                break
        }
        updateParent()
    }

  return (
    <div className='pic-container'>
        <div className="profile-pic" onClick={()=> {props.imageRef.current.click()}} style={{width:props.width}}>
              {(props.imageFile != null) && <motion.img src={URL.createObjectURL(props.imageFile)}
                animate={{x: x, y: y, scale: scale}}
              />}
        </div>

        {(props.imageFile != null) &&
        <div className="edit">
            <img src={CropImage} alt="crop image" onClick={() => {setControlPanel(!controlPanel)}}/>
        </div>}

        <div className="control-panel" style={controlPanel?{visibility:'visible'}:{visibility:'hidden'}}>
            <div className="movers">
                <div className="rows">
                    <img src={UpImage} alt="" id='up'  onClick={changePosition}/>
                </div>
                <div className="rows">
                    <img src={LeftImage} alt=""  id='left' onClick={changePosition}/>
                    <img src={RightImage} alt=""  id='right' onClick={changePosition}/>
                </div>
                <div className="rows">
                    <img src={DownImage} alt=""  id='down' onClick={changePosition}/>
                </div>
            </div>

            <div className="zoom-panel">
                <div><img src={ZoomIn} alt="" onClick={changeScale} id='in'/></div>
                <div><img src={ZoomOut} alt="" onClick={changeScale} id='out'/></div>
            </div>
            
        </div>
        
        

    </div>
  )
}
