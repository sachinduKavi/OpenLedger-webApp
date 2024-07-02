import React, {useState, useEffect} from 'react'
import '../../styles/collection-new.css'

import {Input, Checkbox, DatePicker} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import Participants from './Participants'
import CalculateIcon from '../../assets/icons/Calculator.png'
import CollectionModel from '../../dataModels/CollectionDataModel'


export default function CreateCollection(props) {
    const treasury = props.treasury // Treasury instant from parent

    // Collection instant from the parent 
    const collection = props.collection
    const setCollection = props.setCollection

    const [selectedParticipants, setSelectedParticipants] = useState([]) // Selected participants for the collection 

    // Participant array load from the database and update the UI
    const [collectionParticipants, setCollectionParticipants] = useState(props.collectionParticipants??[]) 
    const loadParticipants = async () => {
        const tempArray = await treasury.loadTreasuryParticipant()

        setCollectionParticipants(tempArray)
        CollectionModel.autoAssignCount = tempArray.length // Set initial auto assign value of the class variable


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
                    <Input type='text' value={collection.getCollectionName()} 
                        onChange={(e) => {
                            collection.setCollectionName(e.target.value)
                            setCollection(new CollectionModel(collection.extractJSON()))
                        }}
                    />
                </PrimaryBorder>
                
                </div>

                <div className="column collection-amount">
                    <label htmlFor="">Collection Amount LKR</label>
                    <PrimaryBorder borderRadius='6px'>
                        <Input type='number' 
                            value={collection.getAmount()}
                            onChange={(e) => {
                                collection.setAmount(e.target.value)
                                setCollection(new CollectionModel(collection.extractJSON()))
                            }}
                        />
                    </PrimaryBorder>
                </div>
            </div>


            <div className="row">
                <div className="column same-level">
                    <label htmlFor="">Allocated from treasury</label>
                    <PrimaryBorder borderRadius='6px'>
                        <Input type='number'
                            value={collection.getTreasuryAllocation()}
                            onChange={(e) => {
                                collection.setTreasuryAllocation(e.target.value)
                                setCollection(new CollectionModel(collection.extractJSON()))
                            }}
                        />
                    </PrimaryBorder>
                </div>

                <div className="column same-level">
                    <label htmlFor="">Divide among participants</label>
                    <PrimaryBorder borderRadius='6px'>
                        <Input type='number'
                            disabled
                            value={collection.getDividedAmount()}
                        />
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
                        <TextArea type='text' rows={4}
                            value={collection.getDescription()}
                            onChange={(e) => {
                                collection.setDescription(e.target.value)
                                setCollection(new CollectionModel(collection.extractJSON()))
                            }}
                        />
                        
                    </PrimaryBorder>
                </div>

                <div className="column">
                    <label htmlFor="">published Date</label>
                    <PrimaryBorder borderRadius='6px'>
                        <DatePicker
                            onChange={(e, strDate) => {
                                collection.setPublishedDate(strDate)
                                setCollection(new CollectionModel(collection.extractJSON()))
                            }}
                        />
                    </PrimaryBorder>

                    <label htmlFor="">Deadline</label>
                    <PrimaryBorder borderRadius='6px'>
                        <DatePicker 
                            onChange={(e, strDate) => {
                                collection.setDeadline(strDate)
                                setCollection(new CollectionModel(collection.extractJSON()))
                            }}
                        />
                    </PrimaryBorder>
                </div>

            </div>

            <div className="row">
                <label htmlFor="">Participants {CollectionModel.autoAssignCount}/{collectionParticipants.length}</label>
            </div>

            {/* Participant container */}
            <div className="participant-container">

                {collectionParticipants.map((element, index) => {
                    return (<Participants key={index} user={element} collection={{collection: collection, setCollection: setCollection}}/>)
                })}

                

            </div>

            <div className="control-keys">
                <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 15px 0 0'>
                    <button>SAVE</button>
                </PrimaryBorder>

                <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 15px 0 0'>
                    <button>PUBLISH</button>
                </PrimaryBorder>
                
            </div>
            
     
            

        </div>
    </div>
  )
}
