import React,{useEffect, useState} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import { getTreasuryDetails } from '../query/treasuryQuery'
import {Input} from 'antd'



import '../styles/request.css'

export default function RequestPage() {

  const {treasuryID} = useParams()

  const [treasury, setTreasury] = useState(null)
  const [credentials, setCredentials] = useState({})

  // Load treasury details from the backend
  const loadTreasuryDetails = async () => {
    const response = await getTreasuryDetails(atob(treasuryID))
    console.log(response)
    if(response.status === 200 & response.data.process) {
      setTreasury(response.data.content)
    }
  }


  // Submit request to join the treasury group 
  const requestSubmission = async () => {

  }

  useEffect(() => {
    loadTreasuryDetails()
  }, [])



  return (
    <div className='request-page-border' 
    style={{background: `url('${treasury?.coverImageID?? ''}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>


      <div className="content">
        <div className="column">
          <div className="no-blur" 
           style={{background: `url('${treasury?.coverImageID?? ''}')`,
           backgroundPosition: 'center',
           backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat'
         }}>

          </div>
        </div>



          <div className="column">
          <form className="form__content" >
            <h1 className="form__title" style={{ marginBottom: 0 }}>Join Treasury</h1>
            <p>Enter your account email and password to join the treasury.</p>
            <h2 style={{ color: "#12192C" }}>{treasury?.treasuryName}</h2>
            <h3 style={{ marginBottom: "20px",color: "#8590AD" }}>{treasury?.treasuryID}</h3>


            <div className="real-form">
              <Input placeholder='Email' className='email input' type='text' value={credentials.email} onChange={(e) => {
                setCredentials({...credentials, email: e.target.value})
              }}/>
              <Input placeholder='Password' className='password input' type='password' onChange={(e) => {
                setCredentials({...credentials, password: e.target.value})
              }}/>
            </div>
            

      

            <button className="form__button" type='button' onClick={requestSubmission}>Request to join</button>

            
          </form>
          </div>
      </div>
    </div>

  )
}

