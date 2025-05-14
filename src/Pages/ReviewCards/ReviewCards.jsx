// import React, {useState, useEffect} from 'react';
// import Avatar from "../../Assets/Image/Avatar.png";
// import { FaRegStar } from "react-icons/fa";
// import { BiLike } from "react-icons/bi";
// import { BiDislike } from "react-icons/bi";
// import spider from "../../Assets/Image/spider.png";
// import "./reviewcards.css";
// import RatingStar from "../../RatingStar/RatingStar";


// const ReviewCards = ({review}) => {
//   const [reviews, setReviews] = useState([]);
//    const [currentDate, setCurrentDate] = useState('');
 
//    //retrieve data from local storage
//    useEffect(() => {
//     const interval = setInterval(() => {
//       const storedReviews = JSON.parse(localStorage.getItem("formDataArray")) || [];
//       setReviews(storedReviews);
//     }, 1000);
  
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);
  

//    useEffect(() => {
//      const date = new Date();
//      const formattedDate = date.toLocaleDateString('en-GB', { //'en-GB for DD/MM/YY
//        day: '2-digit',
//        month: '2-digit',
//        year: 'numeric',
//      }).replace(/\//g, '-');
//      setCurrentDate(formattedDate);
//    }, []);
 
//   return (
//     <div className="reviewscard">
//     {reviews.map((review, index) => (
//       <div key={index}>
//         {/* card-top-sec */}
//         <div className="card-top-sec">
//           <div className="profile-rating-section">
//             <div className="profile-img-container">
//               <img className="profile-pic" src={Avatar} alt="profile-pic" />
//             </div>
//             <span className="profile-detail">
//               <h3 className="customername">{review.name}</h3>
//               <p className="rating-detail">
//                 <span className="rating-stars"> {/* rating star */}
//                 <RatingStar rate={review.rate || 0} readOnly={true} /></span>
//                 <span>{review.date}</span>
//               </p>
//             </span>
//           </div>
//           <p className="customer-review">{review.review}</p>
//           <div className="like-dislike-sec">
//             <div className="like-sec">
//               <BiLike />
//               <span>{review.likes}</span>
//             </div>
//             <div className="dislike-sec">
//               <BiDislike />
//               <span>{review.dislikes}</span>
//             </div>
//           </div>
//         </div>
//         {/* card-top-sec */}
  
//         {/* card-bottom-sec */}
//         <div className="card-botton-sec">
//           <div className="product-img-container">
//             <img className="product-pic" src={spider} alt="product-image" />
//           </div>
//           <div className="product-detail">
//             <h4 className="product-title">Spider-Man</h4>
//             <div className="product-overall-rating">
//               <p className="overall-rate">
//                 {review.overallRating}
//                 <span>
//                   <FaRegStar style={{ color: "gold" }} />
//                 </span>
//               </p>
//               <span className="number_customers">{review.totalReviewed}</span>
//             </div>
//             <p>{review.price}</p>
//           </div>
//           <button className="buyagainbtn">Buy again</button>
//         </div>
//         {/* card-bottom-sec */}
//       </div>
//     ))}
//   </div>
  
//   )
// }

// export default ReviewCards;


import React, { useState, useEffect } from 'react';
import Avatar from "../../Assets/Image/Avatar.png";
import { FaRegStar } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import spider from "../../Assets/Image/spider.png";
import "./reviewcards.css";
import RatingStar from "../../Components/RatingStar/RatingStar";


const ReviewCards = () => {
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
    <div className='reviewmaincard'>
      {reviews.map((review, index) => (
    <div className="reviewscard">
        <div key={index}>
          {/* card-top-sec */}
          <div className="card-top-sec">
            <div className="profile-rating-section">
              <div className="profile-img-container">
                <img className="profile-pic" src={review.image} alt="profile-pic" />
              </div>
              <span className="profile-detail">
                <h3 className="customername">{review.name}</h3>
                <p className="rating-detail">
                  <span className="rating-stars"> {/* rating star */}
                    <RatingStar rate={review.rate || 0} readOnly={true} /></span>
                  <span>{currentDate}</span>
                </p>
              </span>
            </div>
            <p className="customer-review">{review.review}</p>
            <div className="like-dislike-sec">
              <div className="like-sec">
                <BiLike />
                <span>{review.likes}</span>
              </div>
              <div className="dislike-sec">
                <BiDislike />
                <span>{review.dislikes}</span>
              </div>
            </div>
          </div>
          {/* card-top-sec */}
        </div>
      </div>
      ))}
      </div>

  )
}

export default ReviewCards;