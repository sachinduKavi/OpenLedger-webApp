import React, {useRef} from 'react'
import RedCloseBtn from '../RedCloseBtn'
import {Input} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import PlusIcon from '../../assets/icons/plus.png'
import {motion} from 'framer-motion'


export default function NewLegerForm() {
  const clickOnClose = () => {
    console.log('User click on close')
  }

  const evidenceImageRef = useRef()

  return (
    <div className='ledger-form-overlay'>
      <div className="background-blur"></div>

      <div className="form-content">
          <div className="new-form-ledger">

            <div className='title-row'>
              <h2>CREATE NEW LEDGER RECORD</h2>

              <RedCloseBtn size={18} onClick={clickOnClose}/>
            </div>


            <div className="ledger-content-new">
              <label>Title: </label>
              <PrimaryBorder borderRadius='6px' width='50%'>
                <Input/>
              </PrimaryBorder>
              
            </div>

            <div className="ledger-content-new">
              <label>Description: </label>
              <PrimaryBorder borderRadius='6px' width='100%'>
                <Input/>
              </PrimaryBorder>
              
            </div>

            <div className="ledger-content-new">
              <label>Amount: </label>
              <PrimaryBorder borderRadius='6px' width='140px'>
                <Input/>
              </PrimaryBorder>
              
            </div>

            {/* Add evidence to the ledger record */}
            <label>Add Evidence:</label>
            <input type="file" style={{visibility:'hidden'}} ref={evidenceImageRef} accept='image/*'/>
            <div className="evidence-container">
      
                <motion.div className="add-btn"
                  whileTap={{scale: 0.8, transition: {duration: 0.1}}}
                  onClick={() => {evidenceImageRef.current.click()}}
                >
                  <img src={PlusIcon} alt="plus-icon" width='70%'/>
                </motion.div>
           
              
            </div>
            
          </div>
      </div>
    </div>
  )
}
