// import React, { useState } from "react";
// import '../../Components/NewArrivalsCarousel.css'
// import Card from "../../Components/Card/Card";
// import '../../Components/Card/Card.css';
// import { TiArrowLeft } from "react-icons/ti";
// import { TiArrowRight } from "react-icons/ti";
// import Data from "../../../src/newproductdetails.json";
// import "../../Pages/Toys/Toys.css"

// const Toyscuratedcarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Sample data for cards, you can replace this with dynamic data
//   const cards = Data.products.map((product, index) => (
//     <Card className="toyscurated-card"
//       key={index} // Unique key for React
//       id={product.id}
//       title={product.title}
//       subtitle={product.subtitle}
//       old_price={product.old_price}
//       new_price={product.new_price}
//       level_range={product.level_range}
//       image_url={product.image_url}
//     />
//   ))

//   // Define the number of cards visible at a time
//   const visibleCardsCount = 4;

//   // Calculate the range of cards to display
//   const visibleCards = cards.slice(
//     currentIndex,
//     currentIndex + visibleCardsCount
//   );

//   // Handle left arrow click
//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   // Handle right arrow click
//   const handleNext = () => {
//     if (currentIndex + visibleCardsCount < cards.length) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   return (
//     <>
//     <div className="toyspaddingcuratedcard" >
//        <div className="d-flex align-items-center justify-content-between pb-5">
//         <h3>Curated for you</h3>
//         <div className="newarrivaltopbtn d-flex">
//           <div
//             className={`arrivalTiArrowLeft ${
//               currentIndex === 0 ? "disabled" : ""
//             }`}
//             onClick={handlePrev}
//           >
//             <TiArrowLeft />
//           </div>
//           <div
//             className={`arrivalTiArrowRight ${
//               currentIndex + visibleCardsCount >= cards.length ? "disabled" : ""
//             }`}
//             onClick={handleNext}
//           >
//             <TiArrowRight />
//           </div>
//         </div>
//       </div>
//       <div className="d-flex justify-content-between flex-wrap productcard">{visibleCards}</div> 
//     </div>
//     </>
//   );
// };

// export default Toyscuratedcarousel;
