import React, {useState, useEffect} from 'react'
import '../../styles/collection-new.css'

import {Input, Checkbox, DatePicker} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import dayjs from 'dayjs'
import Participants from './Participants'
import CalculateIcon from '../../assets/icons/Calculator.png'
import CollectionModel from '../../dataModels/CollectionDataModel'
import { generateCurrentDate } from '../../middleware/GenerateCurrentDateTime'


export default function CreateCollection(props) {
    const treasury = props.treasury // Treasury instant from parent

    // Collection instant from the parent 
    const collection = props.collection
    const setCollection = props.setCollection

    // useEffect(() => {
    //     setCollection(props.collection)
    // }, [])


    // Save collection on database 
    const saveCollection = async () => {
        const res = await collection.saveCollection()
        if(res) {
            if(res.process) {
                // Response successful
                setCollection(new CollectionModel(res.collection.extractJSON())) // Update parent collection 
                props.setLoadState(true)
            } else {
                // Server Error **Display error message
            }
        } else {
            // Network error ocurred **Display error message
        }
    }


    // Participant array load from the database and update the UI
    const [collectionParticipants, setCollectionParticipants] = useState(props.collection.participantArray) 
    const loadParticipants = async () => {
        // Adding all the treasury participants to collection array
        console.log('load from database**')
        if(collection.getCollectionID() === 'AUTO') {
            // New collection   
            const tempArray = await treasury.loadTreasuryParticipant()
            collection.participantArray = []
            tempArray.forEach(element => {
                collection.participantArray.push({
                    userID: element.getUserId(),
                    dpLink: element.getDisplayPictureId(),
                    userName: element.getUserName(),
                    amount: 0,
                    paidAmount: 0,
                    autoAssigned: true,
                    lastUpdate: '2024-10-25'
                })
            });
            collection.autoAssignCount = collection.participantArray.length
           
        } else { 
            collection.autoAssignCount = 25
        }

        setCollectionParticipants(collection.participantArray)
    }

    const {TextArea} = Input

    useEffect(() => {
        if(collectionParticipants.length < 1)
            loadParticipants()
    }, [])

  return (
    <div className='collection-border'>

        <div className="collection-container">
            <h2>COLLECTION </h2> <h6>{collection.getCollectionID()} {collection.getStatus()}</h6>
            
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
                            value={dayjs(collection.getPublishedDate())}
                            onChange={(e, strDate) => {
                                collection.setPublishedDate(strDate)
                                setCollection(new CollectionModel(collection.extractJSON()))
                            }}
                        />
                    </PrimaryBorder>

                    <label htmlFor="">Deadline</label>
                    <PrimaryBorder borderRadius='6px'>
                        <DatePicker 
                            value={dayjs(collection.getDeadline())}
                            onChange={(e, strDate) => {
                                collection.setDeadline(strDate)
                                setCollection(new CollectionModel(collection.extractJSON()))
                            }}
                        />
                    </PrimaryBorder>
                </div>

            </div>

            <div className="row">
                <label htmlFor="">Participants {collection.calculateAutoAssignCount()}/{collectionParticipants.length}</label>
            </div>

            {/* Participant container */}
            <div className="participant-container">

                {collectionParticipants.map((element, index) => {
                    return (<Participants key={index} user={element} collection={{collection: collection, setCollection: setCollection}}/>)
                })}

                

            </div>

            <div className="control-keys">
                <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 15px 0 0'>
                    <button onClick={saveCollection}>SAVE</button>
                </PrimaryBorder>

                <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 15px 0 0'>
                    <button>PUBLISH</button>
                </PrimaryBorder>

                <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 15px 0 0'>
                    <button style={{backgroundColor: 'red'}}>DISCARD</button>
                </PrimaryBorder>
                
            </div>
            
     
            

        </div>
    </div>
  )
}
