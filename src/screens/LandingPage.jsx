import React from 'react';
import Pattern01 from '../assets/images/Rectangle-671.png'
import Pattern02 from '../assets/images/arrow.png'
import Pattern03 from '../assets/images/winds.png'

import "../styles/landing-page.css"

const LandingPage = () => {
    return (
        <div className='container'>
            {/* <img src={Pattern01} /> */}
            <img src={Pattern02} className='pattern02'/>
            <img src={Pattern03} className='pattern03'/>
        </div>
    );
}

export default LandingPage;
