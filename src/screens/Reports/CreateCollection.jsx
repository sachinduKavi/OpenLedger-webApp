import React, {useState, useEffect} from 'react'
import '../../styles/collection-new.css'

import {Input, Checkbox, DatePicker} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import Participants from './Participants'
import CalculateIcon from '../../assets/icons/Calculator.png'

export default function CreateCollection(props) {
    // Collection participants are the members who have signed for the collection 
    const [collectionParticipants, setCollectionParticipants] = useState(props.collectionParticipants??[]) 
    const treasury = props.treasury

    // Participant array load from the database and update the UI
    const [participantArray, setParticipantsArray] = useState([])
    const loadParticipants = async () => {
        const tempArray = await treasury.loadTreasuryParticipant()
        setCollectionParticipants(tempArray)
    }

    const {TextArea} = Input

    useEffect(() => {
        loadParticipants()
    }, [])

  return (
    <div className='collection-border'>

        <div className="collection-container">
            <h2>COLLECTION</h2>
            
            <div className="row">
                <div className="column collection-name">
                <label htmlFor="">Collection Name</label>
                <PrimaryBorder borderRadius='6px'>
                    <Input type='text'/>
                </PrimaryBorder>
                
                </div>

                <div className="column collection-amount">
                    <label htmlFor="">Collection Amount LKR</label>
                    <PrimaryBorder borderRadius='6px'>
                        <Input type='number'/>
                    </PrimaryBorder>
                </div>
            </div>


            <div className="row">
                <div className="column same-level">
                    <label htmlFor="">Allocated from treasury</label>
                    <PrimaryBorder borderRadius='6px'>
                        <Input type='number'/>
                    </PrimaryBorder>
                </div>

                <div className="column same-level">
                    <label htmlFor="">Divide among participants</label>
                    <PrimaryBorder borderRadius='6px'>
                        <Input type='number'/>
                    </PrimaryBorder>
                </div>

                <div className="column same-level">
                    <div className="row" style={{justifyContent:'center', padding: '0 5px', width: '50%', alignItems: 'center'}} >
                        
                        <img src={CalculateIcon} alt="calculator-icon" />
                        <p className='auto-assign'>AUTO ASSIGN</p>
                      
                        
                    </div>
                </div>


            </div>

            <div className="row">
                <div className="column description">
                    <label htmlFor="">Description</label>
                    <PrimaryBorder borderRadius='6px'>
                        <TextArea type='text' rows={4}/>
                        
                    </PrimaryBorder>
                </div>

                <div className="column">
                    <label htmlFor="">published Date</label>
                    <PrimaryBorder borderRadius='6px'>
                        <DatePicker/>
                    </PrimaryBorder>

                    <label htmlFor="">Deadline</label>
                    <PrimaryBorder borderRadius='6px'>
                        <DatePicker />
                    </PrimaryBorder>
                </div>

            </div>

            {/* Participant container */}
            <div className="participant-container">

                {collectionParticipants.map((element, index) => {
                    return (<Participants key={index} user={element}/>)
                })}
                

            </div>
            
     
            

        </div>
    </div>
  )
}
