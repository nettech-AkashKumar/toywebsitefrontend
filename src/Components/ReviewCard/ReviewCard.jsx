import React, { useEffect, useState } from "react";
import "../ReviewCard/ReviewCard.css";
// import { FaStar } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { IoIosSearch } from 'react-icons/io';
import RatingStar from "../RatingStar/RatingStar";

const ReviewCard = () => {
  const [reviews, setReviews] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  //retrieve data from local storage
  useEffect(() => {
    setInterval(() => {
      const storedReviews = JSON.parse(localStorage.getItem("formDataArray")) || [];
      setReviews(storedReviews);
    }, 1000);
  }, []);
  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', { //'en-GB for DD/MM/YY
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '-');
    setCurrentDate(formattedDate);
  }, []);

  return (
    <>
      <div className="main-reviewcard">
        <p className="reviewsthree d-none d-md-block">Recent Product Reviews <span>({reviews.length})</span></p>
        {/* <p className="recentrated d-block d-md-none" style={{ backgroundColor: '#F3F3F3' }}><IoIosSearch style={{ fontSize: '25px' }} /> Search reviews</p> */}
        <div className="d-flex gap-6 d-block d-md-none" style={{ backgroundColor: '#F3F3F3', padding:'10px 10px' , borderRadius:'10px' }}><IoIosSearch style={{ fontSize: '25px' }} /> <input className="" style={{border:'none' , background:'#80808000', outline:'none'}} type="text" name="" id="" placeholder="Search reviews"/></div>
        <p className="d-flex align-items-center justify-content-center d-block d-md-none" style={{ gap: '10px' }}>
          <span className="recentrated">Most recent</span>
          <span className="recentrated">Top Rated</span>
          <span className="recentrated">Verified Purchase</span>
        </p>
        <div className="review-cards-container">
          {reviews.map((review, index) => (
            <div className="cards" key={index}>
              <div className="card1 d-flex">
                <div>
                  <img src={review.image} alt="Avatar" className="reviewcardimg" />
                </div>
                <div className="d-flex flex-column">
                  <span className="reviewname">{review.name}</span>
                  <div className="d-flex">
                    {/* rating star */}
                    <RatingStar rate={review.rate || 0} readOnly={true} />
                    <span className="review-count">
                      {currentDate}
                    </span>
                  </div>


                </div>
              </div>
              <div className="review-description">
                {review.review}
              </div>
              <div
                className="d-flex gap-4 action-section"
                style={{ padding: "0px 10px" }}
              >
                <span className="like">
                  <AiFillLike style={{ fontSize: "25px", cursor: 'pointer', color: '#000' }} />
                  <span className="count">{ }</span>
                </span>
                <span className="like">
                  <AiFillDislike style={{ fontSize: "25px", cursor: 'pointer', color: 'gray' }} />
                  <span className="count">{ }</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewCard;