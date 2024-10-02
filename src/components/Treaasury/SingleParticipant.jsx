import React, {useContext} from 'react'

import SimpleDP from '../SimpleDP'
import { SessionContext } from '../../Session'
import CardIcon from '../../assets/icons/card.png'

export default function SingleParticipant(props) {
  const user = props.user
  const setUserCard = useContext(SessionContext).setUserCardState

  return (
    <div className='single-participant-border'>

        <div className="counter">
          <h2>{(props.indexNumber + 1).toString().padStart(2, '0')}</h2>
          <div className='user-image'>
          <SimpleDP imageLink={user.getDisplayPictureId()}
              imageScale={user.getPictureScale()} size={50}
          />
          </div>
          
        </div>

        

        <div className="user-details">
            <h4>{user.getUserName()}</h4>
            <p>{user.getUserId()}</p>
        </div>

        <div className="email">
            <h4>{user.getUserEmail()}</h4>
        </div>

        <div className="mobile-num">
          <h4>{user.getUserMobile()}</h4>
        </div>
        

        <div className="position">
          <h3>{user.getPosition()}</h3>
        </div>

        
        <div style={{cursor: 'pointer'}} onClick={() => {
          setUserCard({
            userCardState: true,
            userID: user.getUserId(),
            refreshFunction: props.refresh
          })
        }}>
          <img src={CardIcon} alt="card-icon"/>
        </div>
        
    </div>
  )
}
