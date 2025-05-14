import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../../Components/ScrollButton/ScrollButton.css";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 200 && currentScrollY > lastScrollY) {
        setVisible(true); // Scroll down → Show button
      } else if (currentScrollY < lastScrollY) {
        setVisible(false); // Scroll up → Hide button
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`scroll-button ${visible ? "show" : "hide"}`}
      onClick={scrollToTop}
    >
      <div className="pulse">
        <FaArrowUp />
      </div>
    </div>
  );
};

export default ScrollButton;
