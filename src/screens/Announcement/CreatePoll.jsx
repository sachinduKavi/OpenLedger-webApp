import React, {useState} from 'react'
import {Button, Input, Checkbox} from 'antd'
import PlusIcon from '../../assets/icons/plus.png'
import PrimaryBorder from '../../components/PrimaryBorder'
import CrossIcon from '../../assets/icons/delete.png'
import { capitalize } from '../../middleware/auth'
import Vote from '../../dataModels/Vote'

import '../../styles/create-poll.css'

export default function CreatePoll() {

  const [choiceList, setChoices] = useState([])
  const [vote, setVote] = useState(new Vote({}))


  // Create new poll submission
  const createPollSubmission = () => {
      vote.setChoices(choiceList)
      setChoices(new Vote(vote.extractJSON())) // Updating choice object

      vote.createPoll()


      resetPollForm()
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

        <h6>Required</h6>
          <Checkbox checked={vote.getMultiple()} onClick={(e) => {
            vote.setMultiple(e.target.checked)
            setVote(new Vote(vote.extractJSON()))
          }}/>
        </div>


        {
          choiceList.map((element, index) => {
            return (
            <div className="row">
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
