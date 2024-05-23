import React, {useEffect} from 'react'
import {motion} from 'framer-motion'

import {getNews} from '../../query/newsQuery'
import NewsData from '../../dataModels/News'

import '../../styles/news.css'
import NewLogo from '../../assets/icons/battle.png'

export default function News() {

  const loadNews = async () => {
    const results = await getNews()

    let tempNewArray = []
    results.data.articles.forEach(element => {
      tempNewArray.push(new NewsData({
        title: element.title,
        content: element.content,
        imageURL: element.urlToImage,
        publishAt: element.publishedAt
      }))
    });
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
