import React, {useState} from 'react'
import {motion} from 'framer-motion'
import MiniNavigation from '../../components/MiniNavigation'

export default function Reports() {
    const [navigation, setNavigation] = useState({
        estimation: true,
        cashflow: false,
      })

      const resetNavigation = () => {
        setNavigation({
            estimation: true,
            cashflow: false,
          })
      }



  return (
    <motion.div className='panel-outside-border'
      initial={{x: 1500}}
      animate={{x: 0, transition: {duration: 0.3, delay: 0.2}}}
      exit={{y: 1000, transition: {delay: 0.1}}}
    >

        <MiniNavigation>
            <li className={navigation.estimation ? 'active': null} onClick={() => {
                resetNavigation()
                setNavigation({estimation: true})
            }}>Estimate</li>
            <li className={navigation.cashflow ? 'active': null} onClick={() => {
                resetNavigation()
                setNavigation({cashflow: true})
            }}>Cash Flow Statement</li>

        </MiniNavigation>



    </motion.div>
  )
}
