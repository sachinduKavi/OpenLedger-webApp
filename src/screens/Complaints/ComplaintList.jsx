import React, {useEffect, useState} from 'react'
import SingleComplaint from './SingleComplaint'
import ComplaintModel from '../../dataModels/ComplaintModel'
import toast from 'react-hot-toast'
import ToastCustom from '../../components/ToastCustom'

import '../../styles/complaint-list.css'

export default function ComplaintList(props) {

    const [complaintList, setComplaintList] = useState([])

    // Load all the complaints
    const loadComplaints = async () => {
        const res = await ComplaintModel.loadAllComplaint()
        if(res) {    
            setComplaintList(res)
        } else {
            // Error occurred
        }
    }

    useEffect(() => {
        loadComplaints()
    }, [props.refresh.value])

  return (
    <div className='complaint-list-border'>
        {
            complaintList.map((element, index) => {
                return (<SingleComplaint complaint={element} key={index} activeUser={props.activeUser}/>)
            })
        }
        
    </div>
  )
}
