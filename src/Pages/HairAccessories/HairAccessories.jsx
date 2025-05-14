import React from 'react';
import Hairfilter from '../../Components/Hairfilter/Hairfilter';
import Heroallpages from '../../Components/Heroallpages/Heroallpages';
import herotoysimage from "../../Assets/Image/hairpage-heroimg.png";
import Toyscuratedcarousel from '../Toys/Toyscuratedcarousel';
import "../../Pages/HairAccessories/HairAccessories.css"


const HairAccessories = () => {
  return (
    <div>
     <Heroallpages hero_nav="Hair Accessories" heroallpageimg={herotoysimage}/>
    <div link='/hairpage' className='section-padding'>
    <Hairfilter/>
    <div style={{paddingBottom:"300px"}}>
    <Toyscuratedcarousel/>
    </div>
    </div>
   
     <div>

     </div>
    </div>
  );
}

export default HairAccessories;




