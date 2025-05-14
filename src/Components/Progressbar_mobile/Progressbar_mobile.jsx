import React from 'react';
import { GiCubeforce } from "react-icons/gi";
import { GrStorage } from "react-icons/gr";
import { BsTruck } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import "./Progressbar_mobile.css";
import { CiLocationOn } from "react-icons/ci";

const Progressbar_mobile = () => {
  return (
    <div className='progressbar_mobileview'>
        <div className="deliverystatus_mob">
           <div className="orderplaced-container">
           <h4 className='deliverystatus-ongoing placed'><GiCubeforce className='ordericon'/>Order Placed</h4>
           <div className='dashed dotone'><span> <p className='deliverystatustext'    >Your order has been placed successfully</p></span></div>
           </div> 
           <div className="processing_mob">
            <h4 className='deliverystatus-ongoing process'> <GrStorage className='ordericon'/>Processing</h4>
            <div className='dashed dottwo'><span> <p className='deliverystatustext'   >Your package is being processed</p></span></div>
           </div>
           <div className="shipped_mob">
            <h4 className='deliverystatus-ongoing shipped'><BsTruck className='ordericon'/>shipped</h4>
            <div className='dashed dotthree'><span> <p className='deliverystatustext'  >Your package is in transit</p></span></div>
           </div>
           <div className="delivered_mob">
            <h4 className='deliverystatus-ongoing deliver'><IoHomeOutline className='ordericon'/>Delivered</h4>
            <div ><span> <p className='deliverystatustext'   >Your package is delivered</p></span></div>
           </div>
           <button  className='tracknowbtn' ><CiLocationOn className='trackicon'/>Track now</button>
        </div>
       
       
        
        
      





    </div>
  
  )
}

export default Progressbar_mobile