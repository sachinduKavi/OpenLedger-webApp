import React, {useEffect} from 'react'
import {motion} from 'framer-motion'

import {getNews} from '../../query/newsQuery'

import '../../styles/news.css'
import NewLogo from '../../assets/icons/battle.png'

export default function News() {

  const loadNews = async () => {
    await getNews()
  }


  // Component did mount ?
  useEffect(() => {
    loadNews() // Loading news from the API
  }, [])

  return (
    <motion.div className='news-section' 
    initial={{x: 300}}
    animate={{x: 0}}
    transition={{duration: 0.3, stiffness: 5}}
      >
      <div className="topic">
          <img src={NewLogo} alt="news-image" width='40px'/>

          <h2>Ledger News</h2>
      </div>
        
    </motion.div>
  )
}
