import React, {useState, useContext} from 'react'

import {Input, DatePicker} from 'antd'
import LeftBackIcon from '../../assets/icons/leftback.png'
import PrimaryBorder from '../../components/PrimaryBorder'
import PlusIcon from '../../assets/icons/plus.png'
import PDFicon from '../../assets/icons/pdfDownload.png'
import EstimateReport from '../../dataModels/EstimateModel'
import {capitalize} from '../../middleware/auth'
import Expense from '../../dataModels/Expense'

import dayjs from 'dayjs'
import CreateCollection from './CreateCollection'
import '../../styles/estimate-editor.css'
import { format } from '@cloudinary/url-gen/actions/delivery'
import { SessionContext } from '../../Session'

const {TextArea} = Input

export default function EstimateEditor(props) {
    const sessionData = useContext(SessionContext)
    const changeSessionData = sessionData.changeSessionData

    const estimateValues = props.estimate.estimateValues
    const setEstimate = props.estimate.setEstimateValues
    const treasury = props.treasury
    const activeUser = props.activeUser

    // Expense array of the estimate object 
    const expenseArray = estimateValues.getExpenseArray()

    const [expenseInputs, setExpense] = useState({
        itemOfWork: '',
        quantity: 0,
        unit: '',
        rate: 0
    })

    const updateExpenseArray = () => {
        // Add elements to the expense array
        expenseArray.push(new Expense({
            itemOfWork: expenseInputs.itemOfWork, 
            quantity: expenseInputs.quantity,
            unit: expenseInputs.unit,
            rate: expenseInputs.rate
        }))
        // Update treasury estimate report 
        setEstimate(new EstimateReport(estimateValues.extractJSON()))
        // Reset expense
        setExpense({
            itemOfWork: '',
            quantity: 0,
            unit: '',
            rate: 0
        })
    }


    // User click on save button
    // this will save currently working project on the database
    const saveEstimation = async () => {
        changeSessionData({processing: true})
        const res = await estimateValues.saveEstimate()
        if(res) {
            // Update the estimation data
            setEstimate(new EstimateReport(estimateValues.extractJSON()))
        }
        changeSessionData({processing: false})
    }



  return (
    <div className='estimate-editor-border'>
        <div className="row">
            <img src={LeftBackIcon} alt="back-icon"  width={30} height={30}/>

            <h2>GENERATE ESTIMATION REPORT</h2>
        </div>

        <div className="editors-com">
            <label>Estimation Report</label>
            
            <PrimaryBorder borderRadius="6px" width='60%'>
            <Input 
                value={capitalize(estimateValues.getName())}
                onChange={(e) => {
                estimateValues.setName(e.target.value)
                setEstimate(new EstimateReport(estimateValues.extractJSON()))
            }}/>
            </PrimaryBorder>
            
            <label>Description</label>
            <PrimaryBorder borderRadius='6px'>
                <TextArea 
                value={capitalize(estimateValues.getDescription())}
                onChange={(e) => {
                estimateValues.setDescription(e.target.value)
                setEstimate(new EstimateReport(estimateValues.extractJSON()))
            }}/>
            </PrimaryBorder>

            <label htmlFor="">Expense</label>
            <div className="small-border">
            <label htmlFor="">Item or Work</label>
                <PrimaryBorder borderRadius='6px'>
                    <Input 
                    value={expenseInputs.itemOfWork}
                    onChange={(e)=> {
                        setExpense({...expenseInputs, itemOfWork: capitalize(e.target.value)})
                    }}
                    />
                </PrimaryBorder>
                

                <div className="row">
                    <div className="column">
                        <label htmlFor="">Quantity</label>
                        <PrimaryBorder borderRadius='6px' flex='5'>
                            <Input type='number'
                            value={expenseInputs.quantity}
                            onChange={(e)=> {
                                setExpense({...expenseInputs, quantity: capitalize(e.target.value)})
                            }}
                            />
                        </PrimaryBorder>
                    </div>

                    <div className="column">
                        <label htmlFor="">Unit</label>
                        <PrimaryBorder borderRadius='6px'>
                            <Input 
                            value={expenseInputs.unit}
                            onChange={(e)=> {
                                setExpense({...expenseInputs, unit: capitalize(e.target.value)})
                            }}
                            />
                        </PrimaryBorder>
                    </div>

                    <div className="column">
                        <label htmlFor="">Rate</label>
                        <PrimaryBorder borderRadius='6px'>
                            <Input type='number'
                            value={expenseInputs.rate}
                            onChange={(e)=> {
                                setExpense({...expenseInputs, rate: capitalize(e.target.value)})
                            }}
                            />
                        </PrimaryBorder>
                    </div>

                    <button className='expense-add-button' onClick={updateExpenseArray}>
                    <img src={PlusIcon} alt="" width={25}/>
                    </button>
                        
                    
                </div>
                
            </div>
            
            {/* Overseerages  */}
            <div className="time-over">
                <div className="column">
                    <label htmlFor="">Overseerages</label>
                    <PrimaryBorder borderRadius="6px">
                        <Input 
                            type='number'
                            value={estimateValues.getOverseerages()}
                            onChange={(e) => {
                            estimateValues.setOverseerages(e.target.value)
                            setEstimate(new EstimateReport(estimateValues.extractJSON()))
                        }}/>
                    </PrimaryBorder>
                </div>

                <div className="column">
                    <label htmlFor="">Insurance Date</label>
                    <PrimaryBorder borderRadius='6px'>
                        <DatePicker 
                        format='YYYY-MM-DD'
                        
                        onChange={(date, dateString) => {
                        console.log(dateString)
                        estimateValues.setInsuranceDate(dateString)
                        setEstimate(new EstimateReport(estimateValues.extractJSON()))
                        }}
                        />
                    </PrimaryBorder>
                </div>
                
                {/* Participants can be add here */}
                <div className="column">
                    
                        
                </div>


            </div>


            <div className="editor-control-panel">
                <div className="row">
                    <PrimaryBorder width='fit-content' borderRadius='8px'>
                        <button onClick={saveEstimation}>SAVE</button>
                    </PrimaryBorder>

                    <PrimaryBorder width='fit-content' borderRadius='8px' margin='0 0 0 10px'>
                        <button style={{backgroundColor: 'red'}}>DISCARD</button>
                    </PrimaryBorder>

               
                </div>

                <div className="row" style={{marginTop: '10px'}}>
                    

                    <PrimaryBorder width='fit-content' borderRadius='8px'>
                        <button>PUBLISH</button>
                    </PrimaryBorder>

                    <PrimaryBorder width='fit-content' borderRadius='8px' margin='0 0 0 10px'>
                        <button style={{padding: '2px 5px'}}><img width={25} src={PDFicon} alt="download-icon" /></button>
                    </PrimaryBorder>

                    <PrimaryBorder width='fit-content' borderRadius='8px' margin='0 0 0 10px'>
                        <button onClick={() => {
                            //Check whether the signature already exists
                            if(!estimateValues.getSignatureArray().includes(activeUser.getUserSignature())) {
                                // Add user signature to the estimate document
                            estimateValues.setSignatureArray([...estimateValues.getSignatureArray(), activeUser.getUserSignature()])
                            setEstimate(new EstimateReport(estimateValues.extractJSON()))
                            }
                        }}>ADD SIGNATURE</button>
                    </PrimaryBorder>
                </div>
            </div>

            
        </div>

        
        
    </div>
  )
}
