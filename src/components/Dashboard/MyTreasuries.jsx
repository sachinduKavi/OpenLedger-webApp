import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react'

import {getAllTreasuryParticipantData} from '../../query/treasuryQuery'
import Treasury from '../../dataModels/Treasury'

import '../../styles/my-treasuries.css'
import TreasuryGig from './TreasuryGig'



const MyTreasuries = forwardRef((props, ref) => {
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
    const response = await getAllTreasuryParticipantData(props.userID).catch(err => {
      console.log('error', err)
    })

    const responseArray = response.data.content
    
    // Creating new treasury array with instants
    responseArray.forEach(element => {
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
      {treasuryArray.map((element, index)=> {
        return(
        <TreasuryGig treasuryDetails={element} key={index}/>
      )})}
    </div>
  )
})


export default MyTreasuries