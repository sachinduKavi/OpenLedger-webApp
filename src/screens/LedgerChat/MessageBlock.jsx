import React, {useEffect, useState} from 'react'
import Message from '../../dataModels/Message'

import '../../styles/message-block.css'

export default function MessageBlock(props) {
    const blockNo = props.blockNo

    const [messageList, setMessageList] = useState([])


    // Load recent 50 Message block from the backend
  const loadMessageBlock = async (n) => {
    const res = await Message.messageBlock(n)
    if(res) {
      setMessageList(res.messages)
    } else {
      // Loading error
    }
  }


  useEffect(() => {
    loadMessageBlock(blockNo)
  }, [])


  return (
    <div className='message-block-border'>
        {
            messageList.map((element) => {
                return(
                <div className="receiver-row row">
                    <div className="message-bubble receiver">
                        <h5>{element.getSenderName()} {blockNo}</h5>
                        <h4>{element.getMessage()}</h4>
                    </div>
                </div>)
            })
        }
        
    </div>
  )
}
