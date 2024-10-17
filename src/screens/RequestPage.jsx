import React,{useEffect, useState} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import { getTreasuryDetails } from '../query/treasuryQuery'
import {Input} from 'antd'
import toast, {Toaster} from 'react-hot-toast'
import ToastCustom from '../components/ToastCustom'
import TreasuryDetailsCard from './TreasuryDetailsCard'



import '../styles/request.css'
import { joinRequestQuery } from '../query/userQuery'

export default function RequestPage() {

  const {treasuryID} = useParams()

  const [treasury, setTreasury] = useState(null)
  const [cardStatus, setCard] = useState(false)
  const [credentials, setCredentials] = useState({})
  const [error, setError] = useState([])

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
    const response = await joinRequestQuery(credentials, atob(treasuryID))
    console.log(response)
    if(response.status === 200) {
      if(response.data.proceed) {
        // Credentials match
        setError([])
        setCredentials({})
        toast.custom(<ToastCustom type='success' header='Request sent successfully'>Once treasurer accepts your request your'll join the group.</ToastCustom>);
      } else {
        // Invalid username or password
        if(error.length < 6)
        setError([...error, response.data.errorMessage])
        
      }
    } else {
      // Network error
      toast.custom(<ToastCustom type='warnning' header='Network Error'>Please try again later.</ToastCustom>);
    }

  }


  useEffect(() => {
    loadTreasuryDetails()
  }, [])


  return (
    


    <div className='request-page-border' 
    style={{backgroundImage: `url('${treasury?.coverImageID?? ''}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>

    


      <div className="content">
        <div className="column">
          <div className="no-blur" 
           style={{backgroundImage: `url('${treasury?.coverImageID?? ''}')`,
           backgroundPosition: 'center',
           backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat'
         }}>

          

          </div>
          {(Boolean(treasury?.publicTreasury??false)) && <button style={{margin: '20px'}} onClick={() => setCard(true)}>View Details</button>}
        </div>

        <Toaster position='top-right'
            toastOptions={{
              duration: 15000
            }}
          />

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
              <Input placeholder='Password' className='password input' type='password' 
              value={credentials.password}
              onChange={(e) => {
                setCredentials({...credentials, password: e.target.value})
              }}/>
            </div>
            
            
            {
              error.map((element, index) => {
                return (<p className="error" key={index}>**{element}</p>)
              })
            }
            
            

      

            <button className="form__button" type='button' onClick={requestSubmission}>Request to join</button>

            
          </form>
          </div>

            {
              cardStatus && Boolean(treasury?.publicTreasury??false) && <TreasuryDetailsCard treasury={treasury} visibility={setCard}/>
            }

      </div>
    </div>

  )
}

