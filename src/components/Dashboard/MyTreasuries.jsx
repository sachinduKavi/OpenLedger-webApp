import React, {useState, useEffect, forwardRef, useImperativeHandle, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {getAllTreasuryParticipantData} from '../../query/treasuryQuery'
import Treasury from '../../dataModels/Treasury'

import '../../styles/my-treasuries.css'
import TreasuryGig from './TreasuryGig'
import {motion} from 'framer-motion'


const MyTreasuries = forwardRef((props, ref) => {
  const navigate = useNavigate() // To change the page 

  // Use create reference to reload the child component
  useImperativeHandle(ref, () => ({
    reloadTreasuries() {
      loadTreasuries()
      console.log('Reload is perform')
    }
  }))


  const [treasuryArray, setTreasuryArray] = useState([])

  // Loading items to the treasury dashboard
  const loadTreasuries = async () => {
    console.log('reloading...')
    let tempResponseArray = []
    // Get response data from the getAllTreasuryParticipantData query
    const response = await getAllTreasuryParticipantData().catch(err => {
      console.log('error', err)
    })
    // Change page to login page if the token is expired 
    if(response.data === 'JsonWebTokenError' || response.data === 'TokenExpiredError') navigate('/login') 

    const responseArray = response.data.content
    
    // Creating new treasury array with instants
    responseArray?.forEach(element => {
          const treasury = new Treasury({
            treasuryID: element.treasury_ID,
            treasuryName: element.treasury_name,
            description: element.description,
            memberLimit: element.member_limit,
            coverImageID: element.cover_image_link,
            createdDate: element.created_date,
            currentBalance: element.current_balance,
            globalVisibility: element.global_visibility,
            publicTreasury: element.public_treasury,
            treasuryLink: element.treasury_link,
            userRole: element.user_role
          })
          
          tempResponseArray.push(treasury)
    })
    setTreasuryArray(tempResponseArray) // Update treasury array
  }

  // Component did mount ?
  useEffect(() => {
    // Loading treasuries
    loadTreasuries()
  }, [])

  return (
    <div className='gigs-container'>
      {(treasuryArray.length > 0)?treasuryArray.map((element, index)=> {
        
        return(
        <TreasuryGig treasuryDetails={element} key={index}  keyValue={index}/>
      )}):<div style={{display:'flex', flexGrow:1, justifyContent:'center', alignItems:'center', flexDirection: 'column'}}>
            <h3>You don't have any currently active treasury groups.</h3>
            <p style={{color: '#FDFDFD'}}> You can utilize the search bar to locate existing treasury groups. Alternatively, you have the option to create a new group to suit your specific needs.</p>
        </div>}
    </div>
  )
})


export default MyTreasuries