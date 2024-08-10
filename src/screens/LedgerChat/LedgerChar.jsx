import React, {useState} from 'react'
import { motion } from 'framer-motion'
import '../../styles/ledgerChar.css'
import {Input} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import SendIcon from '../../assets/icons/send.png'
import Message from '../../dataModels/Message'


export default function LedgerChat() {

  const [messageInput, setMessage] = useState("")

  // New message is send to the backend
  const sendMessage = async () => {
    const message = new Message({message: messageInput})
  }

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

      <div className="messages">

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