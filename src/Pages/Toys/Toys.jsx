import React from 'react'
import '../../Pages/Toys/Toys.css'

import Toysfilter from "../../Components/Toysfilter/Toysfilter";
import Toyscuratedcarousel from "../../Pages/Toys/Toyscuratedcarousel";
// import {Link} from "react-router-dom";
import Heroallpages from '../../Components/Heroallpages/Heroallpages';
import herotoysimage from "../../Assets/Image/toyspageimg.png";
const Toys = () => {
  return (
    <div >
    <Heroallpages link='/toys' hero_nav="Toys" heroallpageimg={herotoysimage} />
    <div className='section-padding'>
    <Toysfilter/>
    <div className='toyscuratedcarouselmain' style={{paddingBottom:"300px"}}>
    <Toyscuratedcarousel/>
    </div>
    </div>
    <div>
    </div>
     </div>
  )
}

export default Toys