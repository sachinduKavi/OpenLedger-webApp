import React,{useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import { getTreasuryDetails } from '../query/treasuryQuery'


import '../styles/request.css'

export default function RequestPage() {

  const [searchParams] = useSearchParams()
  const treasuryID = searchParams.get('treasuryID')

  const [treasury, setTreasury] = useState(null)

  // Load treasury details from the backend
  const loadTreasuryDetails = async () => {
    const response = await getTreasuryDetails(atob(treasuryID))
    console.log(response)
    if(response.status === 200 & response.data.process) {
      setTreasury(response.data.content)
    }
  }

  useEffect(() => {
    loadTreasuryDetails()
  }, [])


  console.log(`url('${treasury?.coverImageID}')`)

  return (
    <div className='request-page-border' 
    style={{background: `url('${treasury?.coverImageID?? ''}')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>


      <div className="content">
        <div className="column">

        </div>



          <div className="column">
          <form className="form__content" >
            <h1 className="form__title" style={{ marginBottom: 0 }}>Join Treasury</h1>
            <p>Enter your account email and password to join the treasury.</p>
            <h3 style={{ color: "#8590AD" }}></h3>
            <h2 style={{ marginBottom: "40px", color: "#12192C" }}></h2>

            <div className="form__div form__div-one">
              <div className="form__icon">
                <i className="bx bx-user-circle"></i>
              </div>

              <div className="form__div-input">
                <label htmlFor="user-email" className="form__label">User Email</label>
                <input
                  type="email"
                  className="form__input"
                  id="user-email"
                  name="user_email"
                  // value={email}
                  onChange={(e) => {}}
                />
              </div>
            </div>

            <div className="form__div">
              <div className="form__icon">
                <i className="bx bx-lock"></i>
              </div>

              <div className="form__div-input">
                <label htmlFor="user-pass" className="form__label">Password</label>
                <input
                  type="password"
                  className="form__input"
                  name="user_pass"
                  id="user-pass"
                  // value={password}
                  onChange={(e) => {}}
                />
                {/* Hidden input for Treasury ID */}
                <input
                  type="text"
                  name="treasury_ID"
                  style={{ visibility: "hidden" }}
                  // value={treasuryID}
                  readOnly
                />
              </div>
            </div>

            <button className="form__button" type="submit">Request to join</button>

            
          </form>
          </div>
      </div>
    </div>

  )
}

