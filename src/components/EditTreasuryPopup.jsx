import React, {useState} from 'react'
import {Input, Button} from 'antd'
import PrimaryBorder from './PrimaryBorder'
import {capitalize} from '../middleware/auth'

import '../styles/edit-component.css'

export default function EditTreasuryPopup(props) {
    const [inputValue, changeValue] = useState('')

    let columnName
    switch (props.heading) {
        case 'Description':
            columnName = 'description'
            break
        case 'Treasury Name':
            columnName = 'treasury_name'
            break
        case 'Member Limit':
            columnName = 'member_limit'
            break
    }

  return (
    <div className='edit-container'>
        <div className="background-blur" style={{zIndex: 20}}></div>

        <div className="outer-border">
            <h2>EDIT TREASURY DETAILS</h2>

            <label htmlFor="">{props.heading}</label>

            <PrimaryBorder borderRadius='6px' width='100%'>
                <Input placeholder='Enter new value' type={props.type} onChange={(e) => changeValue(capitalize(e.target.value))}/>
            </PrimaryBorder>

            <div className="button-action">
                    <button onClick={() => {props.submit(columnName, inputValue)}}>Change</button>

                    <button style={{border: '2px solid red'}}
                        onClick={() => {props.close()}}
                    >Cancel</button>
            </div>
            
        </div>
    </div>
  )
}
