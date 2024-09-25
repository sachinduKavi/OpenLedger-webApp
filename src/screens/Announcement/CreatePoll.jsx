import React, {useState, useContext} from 'react'
import {Button, Input, Checkbox} from 'antd'
import PlusIcon from '../../assets/icons/plus.png'
import PrimaryBorder from '../../components/PrimaryBorder'
import CrossIcon from '../../assets/icons/delete.png'
import { capitalize } from '../../middleware/auth'
import Vote from '../../dataModels/Vote'
import toast from 'react-hot-toast'
import ToastCustom from '../../components/ToastCustom'
import { SessionContext } from '../../Session'

import '../../styles/create-poll.css'

export default function CreatePoll(props) {
  const changeSession = useContext(SessionContext).changeSessionData
  const [choiceList, setChoices] = useState([])
  const [vote, setVote] = useState(new Vote({}))


  // Create new poll submission
  const createPollSubmission = async () => {
      changeSession({processing: true})

      if(choiceList.length > 0) {
        vote.setChoices(choiceList)
        setVote(new Vote(vote.extractJSON())) // Updating choice object

        if(await vote.createPoll()) {
          // Poll created success
          toast.custom(<ToastCustom type='success' header='Poll created'>Your poll created successfully.</ToastCustom>);
          props.setPollRefresh(preState => !preState)
        }


        
      } else {
        toast.custom(<ToastCustom type='error' header='Missing values'>Some fields are missing. Please enter valid values before submitting.</ToastCustom>);
      }

      resetPollForm()
      changeSession({processing: false})
      
  }

  // Reset poll form 
  const resetPollForm = () => {
    setChoices([])
    setVote(new Vote({}))
  }

  return (
    <div className='form-vote-border'>
        <h2>Create New Poll</h2>
        
        <div className="row">
        <PrimaryBorder borderRadius='6px' flex='1'>
          <Input placeholder='Poll title' className='title' value={vote.getTitle()} onChange={(e) => {
            vote.setTitle(capitalize(e.target.value))
            setVote(new Vote(vote.extractJSON()))
          }}/>
        </PrimaryBorder>

        <h6>Multiple</h6>
          <Checkbox checked={vote.getMultiple()} onClick={(e) => {
            vote.setMultiple(e.target.checked)
            setVote(new Vote(vote.extractJSON()))
          }}/>
        </div>


        {
          choiceList.map((element, index) => {
            return (
            <div className="row" key={index}>
              <p className='place-number'>{(index + 1).toString().padStart(2, '0')}</p>
              <PrimaryBorder borderRadius='6px' flex='1' margin='5px 0 2px 0'>
                <Input value={element.answer} onChange={(e) => {
                  const updateChoiceList = [...choiceList]
                  updateChoiceList[index] = {
                    answer: capitalize(e.target.value),
                    selected: false
                  }

                  setChoices(updateChoiceList)
                }}/>
              </PrimaryBorder>
             
              <Button style={{background: 'transparent', border: 0}} className='delete-btn' onClick={() => {
                // Remove input choice 
                const updateChoice = [...choiceList]
                updateChoice.splice(index, 1)
                setChoices(updateChoice)
              }}>
                <img src={CrossIcon} height='10px'/>
              </Button>
             
            </div>)
          })
        }
        

        


        <Button className="add-btn square-btn" onClick={() => {
          // Adding new choice 
          const updateChoice = [...choiceList, {
            answer: "",
            selected: false
          }]

          setChoices(updateChoice)

        }}>
          <img src={PlusIcon} height='100%' />
        </Button>


        <div className='submission-btn'>
          <button type='reset' onClick={resetPollForm}>Reset</button>
          <button type="button" onClick={createPollSubmission}>Submit</button>
        
        </div>
    </div>
  )
}
