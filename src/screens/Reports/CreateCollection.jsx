import React, {useState} from 'react'
import '../../styles/collection-new.css'

import {Input, Checkbox} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import Participants from './Participants'

export default function CreateCollection(props) {
    // Collection participants are the members who have signed for the collection 
    const [collectionParticipants, setCollectionParticipants] = useState(props.collectionParticipants??[]) 

    // Participant array load from the database and update the UI
    const [participantArray, setParticipantsArray] = useState([])
    const loadParticipants = async () => {
        const tempArray = await treasury.loadTreasuryParticipant()
        setParticipantsArray(tempArray)
    }

    useEffect(() => {
        loadParticipants()
    }, [])

  return (
    <div className='collection-border'>
        <div className="background-blur" style={{borderRadius: '20px', zIndex: 20}}></div>

        <div className="collection-container">
            <h2>COLLECTION</h2>
            
            <div className="row">
                <div className="column">
                <label htmlFor="">From Treasury</label>
                <PrimaryBorder borderRadius='6px'>
                    <Input type='number'/>
                </PrimaryBorder>
                
                </div>

                <div className="column">
                    <label htmlFor="">Distribute</label>
                    <PrimaryBorder borderRadius='6px'>
                        <Input type='number'/>
                    </PrimaryBorder>
                </div>
            </div>


            {/* Participant container */}
            <div className="participant-container">

                {participantArray.map((element, index) => {
                    return (<Participants key={index} user={element}/>)
                })}
                

            </div>
            
            <PrimaryBorder borderRadius='6px' margin='5px 0 0 0'>
                <button style={{width: '100%'}}>PROCEED</button>
            </PrimaryBorder>

            <PrimaryBorder borderRadius='6px' margin='5px 0 0 0'>
                <button style={{width: '100%', backgroundColor: 'red'}} onClick={() => {props.close(false)}}>CANCEL</button>
            </PrimaryBorder>
            

        </div>
    </div>
  )
}
