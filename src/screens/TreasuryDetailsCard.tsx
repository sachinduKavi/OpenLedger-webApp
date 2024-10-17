import React, {useEffect, useRef} from 'react'


import '../styles/treasury-card.css'

export default function TreasuryDetailsCard(props) {

    const treasury = props.treasury
    const cardRef = useRef(null)


    const checkClose = (e) => {
        if(!(cardRef?.current.contains(e.target)?? true)) {
            props.visibility(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', checkClose)


        return(() => {
            document.removeEventListener('mousedown', checkClose)
        })
    }, [])

  return (
    <div className='treasury-card-details'>
        <div className="background-blur"></div>

        <div className="card" ref={cardRef}>
            <h1>{treasury.treasuryName}</h1>

            <h3>{treasury.treasuryID}</h3>

            <h3>Balance: RS. {treasury.currentBalance}</h3>

            <p>{treasury.description}</p>

            <h3>Published: {`${new Date(treasury.createdDate)}`}</h3>
        </div>
    </div>
  )
}
