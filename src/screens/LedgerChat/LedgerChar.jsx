import React from 'react'
import { motion } from 'framer-motion'
import '../../styles/ledgerChar.css'
import man from '../../assets/images/man.jpg';
import send from '../../assets/icons/Telegram1.jpg'

export default function LedgerChat() {
  return (
    <motion.div className='panel-outside-border'
      initial={{ x: 1500 }}
      animate={{ x: 0, transition: { duration: 0.3, delay: 0.2 } }}
      exit={{ y: 1000, transition: { delay: 0.1 } }}
    >

      <div className="wrapper-chat">
        <header>
          <div className="details">
            <h1>LedgerChat</h1>
          </div>
        </header>


        <div className="chat-box">



       
            <div className="chat outgoing">
              <div className="details">
                <p className="text-message">Morning, Blake! Have you checked the stock market today? Seems like tech is rallying. </p>
              </div>
            </div>
          



          <div className="chat incoming">
            <img src={man} alt="" />
            <div className="details">
              <p className="user-name">Shehan Chathuranga</p>
              <p className="text-message">Good morning! Yes, I saw that. I'm thinking of buying some shares in Apple. They've been performing well. </p>
            </div>
          </div>

          <div className="chat outgoing">
            <div className="details">
              <p className="text-message">Apple is a solid choice. I'm also looking at some growth stocks in the AI sector. </p>
            </div>
          </div>
  
          <div className="chat incoming">
            <img src={man} alt="" />
            <div className="details">
              <p className="user-name">Shehan Chathuranga</p>
              <p className="text-message">Considering investing in Nvidia and OpenAI. Both have shown strong potential.</p>
            </div>
          </div>

          <div className="chat outgoing">
            <div className="details">
              <p className="text-message">Nvidia has been on my radar too. Their GPUs are essential for AI development. </p>
            </div>
          </div>

          <div className="chat incoming">
            <img src={man} alt="" />
            <div className="details">
              <p className="user-name">Shehan Chathuranga</p>
              <p className="text-message">Exactly. By the way, did you look into the latest inflation report? </p>
            </div>
          </div>

          <div className="chat outgoing">
            <div className="details">
              <p className="text-message">Not yet. Any key takeaways?</p>
            </div>
          </div>

          <div className="chat incoming">
            <img src={man} alt="" />
            <div className="details">
              <p className="user-name">Shehan Chathuranga</p>
              <p className="text-message">Inflation is slightly higher than expected. Might affect interest rates soon. </p>
            </div>
          </div>

          <div className="chat incoming">
            <img src={man} alt="" />
            <div className="details">
              <p className="user-name">Shehan Chathuranga</p>
              <p className="text-message">That could impact bond yields. Thinking about adjusting my bond investments. </p>
            </div>
          </div>

          <div className="chat outgoing">
            <div className="details">
              <p className="text-message">Agreed. I'm adding some consumer staples to my portfolio for stability. </p>
            </div>
          </div>

          <div className="chat incoming">
            <img src={man} alt="" />
            <div className="details">
              <p className="user-name">Shehan Chathuranga</p>
              <p className="text-message">Smart move. Diversification is key. I'm balancing my portfolio with some defensive stocks. </p>
            </div>
          </div>
        </div>

        

        {/* <!-- typing area  --> */}
        <div className="typing-area">
          <input type="text" name="message" placeholder="Type a message here..." />
          <button><img src={send} alt="" /></button>
        </div>


      </div>


    </motion.div>
  )
}