import React, {useEffect, useState} from 'react'
import {Checkbox} from 'antd'
import PollBar from '../../components/PollBar'
import DeleteIcon from '../../assets/icons/delete.png'
import toast from 'react-hot-toast'
import ToastCustom from '../../components/ToastCustom'
import Vote from '../../dataModels/Vote'


import '../../styles/vote.css'

export default function Poll(props) {
    const [vote, setVote] = useState(new Vote({}))

    useEffect(() => {
        setVote(props.pollElement)
    }, [])
    
    const user = props.activeUser
    // Update poll
    const updatePoll = async (optionID, state) => {
        const res = await vote.pollUpdate(optionID, state)
        if(res) {
            setVote(res)
        }
    }

    // Delete a poll
    const deletePoll = async () => {
        if(window.confirm("Are you sure you want to remove poll")) {
            if(await vote.deletePoll()) {
                // Deletion success
                toast.custom(<ToastCustom type='success' header='Poll removed success'>Poll removed successfully.</ToastCustom>);
                
            } else {
                // Error
                toast.custom(<ToastCustom type='error' header='Poll removed unsuccess'>Something went wrong. Please try again later.</ToastCustom>);
            }
        }
        props.setPollRefresh(preState => !preState)
    }


    // Calculating total participant
    let totalCount = 0
    vote.getChoices().forEach(element => {
        totalCount += element.selectedUsers?.length??0
    });

  return (
    <div className='vote-border'>
        <div className="row space-between">
        <h2>{vote.getTitle()}</h2>
        {
            user.getUserId() === vote.getPublisherID() && <img src={DeleteIcon} alt="" height='10px' className='delete-icon' onClick={deletePoll}/>
        }
        
        </div>
        


        {
            vote.getChoices().map((element, index) => {
                // console.log(element)


                const filterArray = element.selectedUsers?.filter(e => e.userID === user.getUserId())?? []
                const percentage = totalCount !== 0 ? (((element.selectedUsers?.length ?? 0)/totalCount)*100).toFixed(2) : 0
                return (
                    <>
                        <div className="row" key={index}>
                            <h4>{index + 1} {element.answer}</h4>
                            
                        </div>
                        
                        <div className="row">
                            <Checkbox className='selection' 
                            checked={filterArray.length > 0}
                            onClick={(e) => {
                                updatePoll(element.optionID, e.target.checked)
                            }}/>
                            <PollBar height='8px' margin='2px 0 5px 0' process={percentage??0}/>
                        </div>
                        <div className="row details">
                            <h6>votes: {element.selectedUsers?.length ?? 0}</h6>
                            <h6>{percentage}%</h6>
                        </div>
                    
                    </>
                )
            })
        }
        
    </div>
  )
}
