import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import '../../styles/ledgerChar.css'
import {Input} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import SendIcon from '../../assets/icons/send.png'
import Message from '../../dataModels/Message'
import MessageBlock from './MessageBlock'




export default function LedgerChat() {

  const [messageInput, setMessage] = useState("")

  // New message is send to the backend
  const sendMessage = async () => {
    const message = new Message({message: messageInput})
    if(!await message.createNewMessage()) {
      // Message failed

    }

    setMessage("")
  }

  
  useEffect(() => {
    // Scroll to bottom of the page
    document.getElementById('message-box').scrollTop
  }, [])



  return (
    <motion.div className='panel-outside-border'
      initial={{ x: 1500 }}
      animate={{ x: 0, transition: { duration: 0.3, delay: 0.2 } }}
      exit={{ y: 1000, transition: { delay: 0.1 } }}
    >

      
    <div className="chat-container">
      <div className="chat-heading">
        <h1>LedgerChat</h1>
      </div>

      <div className="messages" id='message-box'>
        <MessageBlock blockNo={0}/>
        <MessageBlock blockNo={1}/>
        <MessageBlock blockNo={1}/>
        <MessageBlock blockNo={1}/>
        <MessageBlock blockNo={1}/>
        <MessageBlock blockNo={1}/>
        <MessageBlock blockNo={1}/>
        
      </div>

      <div className="message-input">
        <Input placeholder='Type your message...' 
        value={messageInput}
        onChange={(e) => {
          setMessage(e.target.value)
        }}/>

        <div className="send-button">
          <PrimaryBorder borderRadius='10px'>
          <button onClick={sendMessage}><img src={SendIcon} alt="send-icon"/></button>
          </PrimaryBorder>
        </div>
      </div>


    </div>

    </motion.div>
  )
}