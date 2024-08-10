import React, {useEffect, useState} from 'react'
import Message from '../../dataModels/Message'
import toast from 'react-hot-toast'
import ToastCustom from '../../components/ToastCustom'

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
      toast.custom(<ToastCustom type='warnning' header='Ledger Update Failed'>Something went wrong with ledger chat update please try again later.</ToastCustom>);
    }
  }


  useEffect(() => {
    loadMessageBlock(blockNo)
  }, [props.update])


  return (
    <div className='message-block-border'>
        {
            messageList.map((element, index) => {
                const thisUser = element.getSenderID() !== props.activeUser.getUserId()
                return(
                <div className={`row ${thisUser ? 'receiver-row' : 'sender-row'}`} key={index}>
                    <div className={`message-bubble ${thisUser ? 'receiver' : 'sender'}`}>
                        <h5>{thisUser ? element.getSenderName() : 'YOU'}</h5>
                        <h4>{element.getMessage()}</h4>
                    </div>
                </div>)
            })
        }
        
    </div>
  )
}
