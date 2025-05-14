import React from 'react'
import Heroallpages from '../../Components/Heroallpages/Heroallpages';
import herotoysimage from "../../Assets/Image/stationarypage-img.png";
import FootWearfilter from "../../Components/Footwearfilter/Footwearfilter"
import Toyscuratedcarousel from '../Toys/Toyscuratedcarousel';

const FootWear = () => {
  return (
    <div>
      <Heroallpages link='/stationary' hero_nav="Foot Wear" heroallpageimg={herotoysimage} />
       <div className='section-padding'>
       <FootWearfilter/>
       <div style={{paddingBottom:"300px"}}>
       <Toyscuratedcarousel/>
       </div>
       </div>
    </div>
  )
}

export default FootWear
