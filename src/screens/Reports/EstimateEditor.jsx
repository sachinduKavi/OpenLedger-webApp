import React from 'react'

import {Input} from 'antd'
import LeftBackIcon from '../../assets/icons/leftback.png'
import PrimaryBorder from '../../components/PrimaryBorder'
import PlusIcon from '../../assets/icons/plus.png'
import PDFicon from '../../assets/icons/pdfDownload.png'

import '../../styles/estimate-editor.css'

const {TextArea} = Input

export default function EstimateEditor() {
  return (
    <div className='estimate-editor-border'>
        <div className="row">
            <img src={LeftBackIcon} alt="back-icon"  width={30} height={30}/>

            <h2>GENERATE ESTIMATION REPORT</h2>
        </div>

        <label>Estimation Report</label>
        
        <PrimaryBorder borderRadius="6px" width='60%'>
         <Input/>
        </PrimaryBorder>
        
        <label>Description</label>
        <PrimaryBorder borderRadius='6px'>
            <TextArea/>
        </PrimaryBorder>

        <label htmlFor="">Expense</label>
        <div className="small-border">
        <label htmlFor="">Item or Work</label>
            <PrimaryBorder borderRadius='6px'>
                <Input/>
            </PrimaryBorder>
            

            <div className="row">
                <div className="column">
                    <label htmlFor="">Quantity</label>
                    <PrimaryBorder borderRadius='6px'>
                        <Input type='number'/>
                    </PrimaryBorder>
                </div>

                <div className="column">
                    <label htmlFor="">Unit</label>
                    <PrimaryBorder borderRadius='6px'>
                        <Input/>
                    </PrimaryBorder>
                </div>

                <div className="column">
                    <label htmlFor="">Rate</label>
                    <PrimaryBorder borderRadius='6px'>
                        <Input type='number'/>
                    </PrimaryBorder>
                </div>

                <button className='expense-add-button'>
                 <img src={PlusIcon} alt="" width={25}/>
                </button>
                    
                
            </div>
            
        </div>


        <div className="editor-control-panel">
            <div className="row">
                <PrimaryBorder width='fit-content' borderRadius='8px'>
                    <button>SAVE</button>
                </PrimaryBorder>

                <PrimaryBorder width='fit-content' borderRadius='8px' margin='0 0 0 10px'>
                    <button style={{backgroundColor: 'red'}}>CANCEL</button>
                </PrimaryBorder>
            </div>

            <div className="row" style={{marginTop: '10px'}}>
                <PrimaryBorder width='fit-content' borderRadius='8px'>
                    <button>ADD SIGNATURE</button>
                </PrimaryBorder>

                <PrimaryBorder width='fit-content' borderRadius='8px' margin='0 0 0 10px'>
                    <button>PUBLISH</button>
                </PrimaryBorder>

                <PrimaryBorder width='fit-content' borderRadius='8px' margin='0 0 0 10px'>
                    <button style={{padding: '2px 5px'}}><img width={25} src={PDFicon} alt="download-icon" /></button>
                </PrimaryBorder>
            </div>
        </div>
        
    </div>
  )
}
