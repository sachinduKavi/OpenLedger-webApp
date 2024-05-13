import React, {useEffect} from 'react'
import PrimaryBorder from '../PrimaryBorder'

// import '../../styles/treasury-gig.css'

export default function TreasuryGig() {

    // Component did mount
    useEffect(() => {
        console.log('Component did mount...')
        
        console.log('parent Width ')
    }, [])
    let parentWidth = (document.querySelector('.gigs-container').offsetWidth != null)
        ? document.querySelector('.gigs-container').offsetWidth
        : 1000
  return (
    <PrimaryBorder borderRadius='6px'>
        <div className='gig-border' style={{width: (parentWidth/2 -10).toString() + 'px'}}>
        
        </div>
    </PrimaryBorder>
    
  )
}
