import React, { useState } from "react";
import { questions } from "./api";
import "../accordian/accordian.css";
import Myaccordian from "./Myaccordian";

const Accordian = () => {
  const [data, setData] = useState(questions);

  return (
    <>
      <div className="accoridanmain d-none d-md-block">
        <section className="main-div-faq">
          <h4 className="faq-title">Frequently asked questions</h4>
          <p className="readmore">
            Read here to know about the product and shipping.
          </p>
        </section>
        <section className="faqs">
          {data.map((curElem) => {
            const { id } = curElem;
            return <Myaccordian key={id} {...curElem} />;
          })}
        </section>
        <div className="faq-bottom-section">
          <div className="faq-more-questions">
            <h4>Still have questions?</h4>
            <p>
              Can’t find the answer you’re looking for? Please chat to our
              friendly team.
            </p>
            <button className="contacts">Contact us</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordian;
