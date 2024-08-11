import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import '../../styles/ledgerChar.css'
import {Input} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import SendIcon from '../../assets/icons/send.png'
import Message from '../../dataModels/Message'
import MessageBlock from './MessageBlock'
import { capitalize } from '../../middleware/auth'
import toast from 'react-hot-toast'
import ToastCustom from '../../components/ToastCustom'



export default function LedgerChat(props) {

  const [messageInput, setMessage] = useState("")
  const [update, setUpdate] = useState(false)

  // New message is send to the backend
  const sendMessage = async () => {
    if(messageInput.length > 0) {
      const message = new Message({message: messageInput})
      if(!await message.createNewMessage()) {
        // Message failed
        toast.custom(<ToastCustom type='error' header='Message error'>Your message could not reach to the server.</ToastCustom>);
      }

      setUpdate(!update)
      setMessage("")
    }
    
  }


  const pressEnter = (e) =>{
    if(e.key === "Enter") sendMessage()
  }
  
  useEffect(() => {
    // Scroll to bottom of the page
    document.getElementById('message-box').scrollTop
    const refresh = setInterval(async () => {
      setUpdate(!update)
    }, 500)

    document.addEventListener("keypress", pressEnter)


    return(() => {
      clearInterval(refresh)

      document.removeEventListener("keypress", pressEnter)
    })
  })



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
        <MessageBlock blockNo={0} activeUser={props.activeUser} update={update}/>
      </div>

      <div className="message-input">
        <Input placeholder='Type your message...' 
        value={messageInput}
        onChange={(e) => {
          setMessage(capitalize(e.target.value))
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