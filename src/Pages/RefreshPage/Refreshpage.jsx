import React from 'react';
import './refreshpage.css';
import Featuredicon from "../../Assets/Image/Featured icon.png";
import { Link } from 'react-router-dom';

const Refreshpage = () => {
  return (
    <>
    <div className="refresh-hero-section"></div>
    <div className="refresh">
        <div className="refreshcontainer">
            <img src={Featuredicon} alt="" />
            <h4 className='refreshtitle'   >Something went wrong...</h4>
            <p className='refresh-para'   >We had some trouble loading this page. Please <br />refresh the page to try again or get in touch if the <br /> problem come again!</p>
           
           
            <span className="refresh-page-btn">
                <button className="contactbtn">Contact Support</button>
         <Link to='/'>   <button className="refreshbtn">Refresh Page</button></Link>
            </span>
        </div>
        </div>
        </>
   
  )
}

export default Refreshpage
