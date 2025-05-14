import React from "react";
import "./faq.css";
import subscribe from "../../Assets/Image/faq-baby-pic.png";
import Accordian from "../../Components/accordian/Accordian";
import { Link } from "react-router-dom";
const Faq = () => {
  return (
    <>

    <div className=" section-padding faq-section">
    <div className="faq-hero-bg">
          
          </div>
      <div className="">
    
        <div className="">
        
       
           {/* faq top-section  */}
          <div className="faq-top-section ">
          
            <div className="Faq-top-detail">
              <h4 className="faq-detail-title">FAQs</h4>
              <p className="faq-detail-para">
                Want to cleared up? Here are our most frequently asked
                questions.
              </p>
            </div>
          </div>
          <Accordian />
        
          </div>
          </div>
           {/* signup section */}
   <div className="signup-container">
           <div className="news-signup">
                <div className='news-container'>
                  <div className="news-content">
                <h1 className='news-h1'>Sign up for our newsletter</h1>
               
               <p className='news-p'>  Be the first to know about latest toys and products releases.</p>
               <form className="faq-form-newsletter" action="">
                 <input type="text" placeholder="Enter your email"/>
                 <button className='faq-newsletter-subscribe-btn'>Subscribe</button>
                
               </form>
               <p className="p-des">We care about your data in our <u>
                <Link to="/Policy" className="policylink" style={{margin:"0",textDecoration:" none"}} >privacy policy</Link></u></p>
                </div >
                </div>
               
                <div className='pic-news'> 
                <img className="pic-news-image" src={subscribe} alt="Subscribe" />
              
                </div>
              </div>
              </div>

              
        
      
     </div>
     </>
    
  );
};

export default Faq;
