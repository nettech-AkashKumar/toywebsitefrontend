import React from 'react'
import Heroallpages from '../../Components/Heroallpages/Heroallpages';
import herotoysimage from "../../Assets/Image/stationarypage-img.png";
import Stationaryfilter from "../../Components/Stationaryfilter/Stationaryfilter"
import Toyscuratedcarousel from '../Toys/Toyscuratedcarousel';
import "../../Pages/Stationary/Stationary.css"

const Stationary = () => {
  return (
    <div>
      <Heroallpages link='/stationary' hero_nav="Stationary" heroallpageimg={herotoysimage} />
       <div className='section-padding'>
       <Stationaryfilter/>
       <div style={{paddingBottom:"300px"}}>
       <Toyscuratedcarousel/>
       </div>
       </div>
    </div>
  )
}

export default Stationary
