import React, {useState} from 'react'
import {Button, Input, Checkbox} from 'antd'
import PlusIcon from '../../assets/icons/plus.png'
import PrimaryBorder from '../../components/PrimaryBorder'
import CrossIcon from '../../assets/icons/delete.png'

import '../../styles/create-poll.css'

export default function CreatePoll() {

  const [choiceList, setChoices] = useState([])

  return (
    <div className='form-vote-border'>
        <h2>Create New Poll</h2>
        
        <div className="row">
        <PrimaryBorder borderRadius='6px' flex='1'>
          <Input placeholder='Poll title' className='title'/>
        </PrimaryBorder>

        <h6>Required</h6>
          <Checkbox/>
        </div>


        {
          choiceList.map((element, index) => {
            return (
            <div className="row">
              <p className='place-number'>{(index + 1).toString().padStart(2, '0')}</p>
              <PrimaryBorder borderRadius='6px' flex='1' margin='5px 0 2px 0'>
                <Input />
              </PrimaryBorder>
             
              <Button style={{background: 'transparent', border: 0}} className='delete-btn' onClick={() => {
                // Remove input choice 
                console.log('hello world')
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
    </div>
  )
}
