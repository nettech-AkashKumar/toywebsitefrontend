// import React, { useEffect, useState } from "react";
// import "../Carousal/Carousal.css";
// import Truck from "../../Assets/Image/truck.png";
// import Duck from "../../Assets/Image/duck.png";
// import Playful from "../../Assets/Image/playful.png";
// import "bootstrap/dist/css/bootstrap.min.css"; //mention this
// import { TiArrowRight } from "react-icons/ti";
// import { TiArrowLeft } from "react-icons/ti";
// import { Link } from "react-router-dom";
// import hairband from "../../Assets/Image/hairband.png";
// import kidswear from "../../Assets/Image/kidswear (2).png";
// import Stationarymaterial from "../../Assets/Image/stationarymaterial.png";
// import Footwear from "../../Assets/Image/footwear.png";
// import axios from "axios";

// const Carousal = () => {
//   const [viewData, setViewData] = useState([]);
//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const res = await fetch("http://localhost:8081/api/offers");
//         const data = await res.json();
//         setViewData(data);
//         console.log("Fetched Offers", data);
//       } catch (error) {
//         console.error("Error fetching offers:", error);
//       }
//     };

//     fetchOffers();
//   }, []);
//   return (
//     <div className="carousal">
//       <div className="container-fluid ">
//         <div className="row align-items-center">
//           <div className="playful-toys">
//             {/* carousal */}
//             <div
//               id="carouselExampleIndicators"
//               className="carousel slide"
//               data-bs-ride="carousel"
//             >
//               <div className="carousel-inner">
//                { console.log('viewData through carousal',viewData )}
//                 {viewData.map((item, index) => (
//                   <div
//                     key={index}
//                     className={`carousel-item ${index === 0 ? "active" : ""}`}
//                   >
//                     <div
//                       className="carousal-img"
//                       style={{
//                         backgroundImage: `url(http://localhost:8081${item?.image})`,
//                         backgroundSize: "cover",
//                         backgroundRepeat: "no-repeat",
//                         backgroundPosition: "center",
//                         width: "100%",
//                         height: "370px", // changed from 230px to 100%
//                       }}
//                     ></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousal;



import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

const Carousal = () => {
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/offers");
        const data = await res.json();
        setViewData(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="container-fluid py-4">
      <div id="offerCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
        {/* Indicators */}
        <div className="carousel-indicators">
          {viewData.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#offerCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Carousel Inner */}
        <div className="carousel-inner rounded-3">
          {viewData.map((item, index) => {
            let imageUrl = item?.image;
            if (!imageUrl.startsWith("http")) {
              imageUrl = `http://localhost:8081${imageUrl}`;
            }

            return (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                   src={imageUrl}
                   className="d-block mx-auto carousel-image"
                   alt={`Offer ${index}`}
                  style={{
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#offerCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next "
          type="button"
          data-bs-target="#offerCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousal;
