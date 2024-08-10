import React, {useState, useEffect, useContext} from 'react'
import '../../styles/collection-new.css'

import {Input, Checkbox, DatePicker} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import dayjs from 'dayjs'
import Participants from './Participants'
import CalculateIcon from '../../assets/icons/Calculator.png'
import CollectionModel from '../../dataModels/CollectionDataModel'
import toast from 'react-hot-toast'
import ToastCustom from '../../components/ToastCustom'

import {SessionContext} from '../../Session'


export default function CreateCollection(props) {
    const changeSessionData = useContext(SessionContext).changeSessionData
    const activeUser = props.activeUser

    const treasury = props.treasury // Treasury instant from parent

    // Collection instant from the parent 
    const collection = props.collection
    const setCollection = props.setCollection
    
    // Calculating total collected amount 
    let totalCollectedAmount = collection.getTreasuryAllocation()
    collection.participantArray.forEach(element => {
        totalCollectedAmount += element.paidAmount
    });

    const [changeForm, setChangeForm] = useState(false)

    // Save collection on database 
    const saveCollection = async () => {
        changeSessionData({processing: true}) // Processing 
        setChangeForm(false)
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
        changeSessionData({processing: false})
    }


    // Publish the the collection record
    const publishCollection = (state) => {
        collection.setStatus(state)
        saveCollection()
    }

    // Participant array load from the database and update the UI
    const loadParticipants = async () => {
        // Adding all the treasury participants to collection array
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
            setCollection(new CollectionModel(collection.extractJSON()))
        }


    }

    // Delete the collection
    const discardCollection = async () => {
        // IF collection was never created
        if(collection.getCollectionID() === 'AUTO') {
            setCollection(null)
            return
        }

        // Display confirmation alert
        if(window.confirm("Are you sure you want to delete the collection?")) {
            changeSessionData({processing: true})
            const res = await collection.deleteCollection()
            if(res && res.proceed) {
                setCollection(null) // Set collection to null
                props.setLoadState(true)
            } else {
                // Deletion was unsuccessful ** Display error message
            }
            
            changeSessionData({processing: false})
        }
        
    }


    // Withdraw function 
    const withdrawAmount = async () => {
        if(window.confirm(`Are you sure you want to make a withdraw of ${totalCollectedAmount}?`)) {
            // Confirm withdraw
            if(await collection.withdraw(totalCollectedAmount)) {
                // Collection withdraw success
                setCollection(null)
                props.setLoadState(true)
                toast.custom(<ToastCustom type='success' header='Withdraw Success'>You have successfully withdraw LKR {totalCollectedAmount}.</ToastCustom>);
            } else {
                // Collection withdraw error
                toast.custom(<ToastCustom type='error' header='Something went wrong'>You have encountered a error.</ToastCustom>);
            }
        } 
    }
    
    const {TextArea} = Input

    useEffect(() => {
        // if(collectionParticipants.length < 1)
        loadParticipants()
    }, [props.newCollectionState])

  return (
    <div className='collection-border'>

        <div className="collection-container">

            <div className="front-row">
                <div className="column">
                    {activeUser.getUserLevel() <= 2 && <div className="background-blur" style={{opacity: 0}}></div>}
                    <h2>COLLECTION </h2> <h6>{collection.getCollectionID()} {collection.getStatus()}</h6>
                </div>

                {activeUser.getUserLevel() > 3 &&
                    <PrimaryBorder borderRadius='10px'>
                    <button onClick={withdrawAmount}>WITHDRAW</button> 
                </PrimaryBorder>}

            </div>

            
            
            <div className="row">
                <div className="column collection-name">
                <label htmlFor="">Collection Name</label>
                <PrimaryBorder borderRadius='6px'>
                    <Input type='text' value={collection.getCollectionName()} 
                        onChange={(e) => {
                            setChangeForm(true)
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
                            disabled={!(collection.getCollectionID() === 'AUTO')}
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
                            disabled={!(collection.getCollectionID() === 'AUTO')}
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
                                setChangeForm(true)
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
                                setChangeForm(true)
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
                                setChangeForm(true)
                                collection.setDeadline(strDate)
                                setCollection(new CollectionModel(collection.extractJSON()))
                            }}
                        />
                    </PrimaryBorder>
                </div>

            </div>

            <div className="row">
                <label htmlFor="">Participants {collection.calculateAutoAssignCount()}/{collection.participantArray.length}</label>
            </div>

            {/* Participant container */}
            <div className="participant-container">

                {collection.participantArray.map((element, index) => {
                    return (<Participants key={index} user={element} collection={{collection: collection, setCollection: setCollection}}/>)
                })}

                

            </div>

            <div className="control-keys"  style={{display: (activeUser.getUserLevel() > 2) ? 'flex': 'none'}}>
                <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 15px 0 0'>
                    <button onClick={saveCollection} disabled={!changeForm}>SAVE</button>
                </PrimaryBorder>

                <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 15px 0 0'>

                    {
                        (collection.getStatus() === 'PUBLISHED') 
                            ? <button onClick={() => publishCollection('DRAFT')} disabled={changeForm}>UNPUBLISHED</button>
                            : <button onClick={() => publishCollection('PUBLISHED')} disabled={changeForm}>PUBLISH</button>
                    }
                    
                </PrimaryBorder>

                <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 15px 0 0'>
                    <button style={{backgroundColor: 'red'}} onClick={discardCollection}>DISCARD</button>
                </PrimaryBorder>
                
            </div>
            
     
            

        </div>
    </div>
  )
}
