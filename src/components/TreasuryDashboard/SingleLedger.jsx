import React from 'react'

export default function SingleLedger() {
  return (
    <div className='single-ledger-border'>
        <div className="background"></div>
        <div className="content">
            <div className="row">
                <div className="column">
                    <h2>Bill Payment</h2>
                    <p>This is the para description I love  </p>
                </div>

                <div className="column">
                  <p className="amount">LKR 54, 4052</p>
                  <p className="date-time">11.56PM 2024/05/26</p>
                </div>
            </div>
        </div>
    </div>
  )
}
