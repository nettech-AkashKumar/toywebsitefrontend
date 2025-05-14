import React, { useState } from "react";
import "./myaccordian.css";
import Plus from '../accordian/AccordianImage/aacoridanplus.jpeg'
import Minus from '../accordian/AccordianImage/aacoridanminus.jpeg'

const Myaccordian = ({ question, answer }) => {
  const [show ,setShow] = useState(false);
  return (
    <>
      <div className="faq-ques">
      <div className="faq-box">
        <h3>{question}</h3>
       
         <p onClick = {() => setShow(!show) }>
          {show? (
            <img className="accordianimg"   src = {Minus} alt="Minus" />
          ) : (
            <img src = {Plus} alt="plus" />
          ) }
           </p>
          </div>
      
      { show &&  <p className= "answers">{answer} </p> }
      </div>
    </>
  );
};

export default Myaccordian;
