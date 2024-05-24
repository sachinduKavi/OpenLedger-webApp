import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'

import {getNews} from '../../query/newsQuery'
import NewsData from '../../dataModels/News'
import NewsGig from './NewsGig'

import '../../styles/news.css'
import NewLogo from '../../assets/icons/battle.png'

export default function News() {

  const [newsArray, setNewsArray] = useState([])

  const loadNews = async () => {
    const results = await getNews()
    const resultArray = results.data.results

    let tempNewArray = [] // Creating temporary new instant array
    resultArray.forEach(element => {
      tempNewArray.push(new NewsData({
        title: element.title,
        content: element.description,
        imageURL: element.image_url,
        publishAt: element.pubDate
      }))
    })
    setNewsArray(tempNewArray)    
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
          <img src={NewLogo} alt="news-image" width='40px' height={'40px'}/>

          <h2>Ledger News</h2>
      </div>

      {newsArray.map(element => (
        <NewsGig data={element}/>
      ))}
      
        
    </motion.div>
  )
}
