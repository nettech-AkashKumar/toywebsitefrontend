import React, { useState } from "react";
import "./NewArrivalsCarousel.css";
import Card from "./Card/Card";
import "./Card/Card.css";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";


const NewArrivalsCarousel = ({ arrivaltitle, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure data is an array
  const productsArray = Array.isArray(data) ? data : [];
  // console.log('productsArray', productsArray);


  if (productsArray.length === 0) {
    return <p>No new arrivals available</p>;
  }

  const cards = productsArray.map((product, index) => (
    <Card
      key={product.id || index} // Prefer using a unique ID if available
      _id={product._id}
      title={product.title}
      subtitle={product.subtitle}
      old_price={product.old_price}
      new_price={product.new_price}
      level_range={product.level_range}
      image={product.image}
    />
  ));

  // Define the number of cards visible at a time
  const visibleCardsCount = 4;

  // Calculate the range of cards to display
  const visibleCards = cards.slice(currentIndex, currentIndex + visibleCardsCount);

  // Handle left arrow click
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle right arrow click
  const handleNext = () => {
    if (currentIndex + visibleCardsCount < cards.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between pb-5">
        <h3>{arrivaltitle}</h3>
        <div className="newarrivaltopbtn d-flex">
          <div
            className={`arrivalTiArrowLeft ${currentIndex === 0 ? "disabled" : ""}`}
            onClick={handlePrev}
          >
            <TiArrowLeft />
          </div>
          <div
            className={`arrivalTiArrowRight ${currentIndex + visibleCardsCount >= cards.length ? "disabled" : ""}`}
            onClick={handleNext}
          >
            <TiArrowRight />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-4 flex-wrap productcard">
        {visibleCards}
      </div>
    </div>
  );
};


export default NewArrivalsCarousel;


