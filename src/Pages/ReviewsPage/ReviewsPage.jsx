// import React, { useState, useEffect } from "react";
// import "./reviewpage.css";
// import ReviewCards from "../../Pages/ReviewCards/ReviewCards";
// import Heroallpages2 from "../../Components/Heroallpages2/Heroallpages2";
// import api from "../../Pages/api/db.json"
// import SidebarAllpages from "../../Components/SidebarAllpages/SidebarAllpages";

// const ReviewsPage = () => {
//   const [reviews, setReviews] = useState([]);
//   const [visibleReviews, setVisibleReviews] = useState(4);

//   // Show more reviews
//   const showMoreReviews = () => {
//     setVisibleReviews((prev) => prev + 4);
//   };

//   return (
//     <div>
//       <Heroallpages2 profile_nav="Review & Ratings" />
//       <div className="whishlit-sidebar section-padding pt-0">
//         <div
//           className="whishlit-sidebar-container bg-white d-flex justify-content-evenly "
//           style={{ padding: "20px 30px" }}
//         >
//           <div className="leftwhishlist-sideb" style={{marginTop:"61px"}}>
//             <SidebarAllpages/>
//           </div>
//           <div className="righttwhishlist-product-card d-flex gap-5 w-auto">
//            <div className="review-page ">

//    <div className="review-des">

//     <div className="reviews-container">
//       <p className="card-sec-title">Your Reviews </p>

//       <div className="cardsCont">
//         {api.reviews.slice(0, visibleReviews).map((review, index) => (
//           <ReviewCards key={review.id} review={review} />
//         ))}
//       </div>
//     </div>

//            </div>
//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewsPage;



import React, { useState, useEffect } from "react";
import "./reviewpage.css";
import ReviewCards from "../../Pages/ReviewCards/ReviewCards";
import Heroallpages2 from "../../Components/Heroallpages2/Heroallpages2";
import api from "../../Pages/api/db.json"
import SidebarAllpages from "../../Components/SidebarAllpages/SidebarAllpages";

const ReviewsPage = () => {
  // const [reviews, setReviews] = useState([]);
  // const [visibleReviews, setVisibleReviews] = useState(4);

  // // Show more reviews
  // const showMoreReviews = () => {
  //   setVisibleReviews((prev) => prev + 4);
  // };

  return (
    <div>
      <Heroallpages2 profile_nav="Review & Ratings" />
      <div className="whishlit-sidebar section-padding pt-0">
        <div
          className="whishlit-sidebar-container bg-white d-flex justify-content-evenly "
          style={{ padding: "20px 30px" }}
        >
          <div className="leftwhishlist-sideb" style={{ marginTop: "61px" }}>
            <SidebarAllpages />
          </div>
          <div className="righttwhishlist-product-card d-flex gap-5">
            <div className="review-page ">

              <div className="review-des">

                <div className="reviews-container">
                  <p className="card-sec-title">Your Reviews </p>

                  <div className="cardsCont">
                    <ReviewCards />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
