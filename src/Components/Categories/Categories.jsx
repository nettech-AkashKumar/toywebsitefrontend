import React from "react";
import "../Categories/Categories.css";
import Copy from "../../Assets/Image/copy.png";
import Clip from "../../Assets/Image/clip.png";
import Golu from "../../Assets/Image/golu.png";
import Jutta from "../../Assets/Image/jutta.png";

import Purse from "../../Assets/Image/purse.png";
import Truck from "../../Assets/Image/truck.png";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="section-padding categories">
      <div className="row align-items-center">
        <div className="categories-area">
          <h1 className="categories-heading">Categories</h1>
          <div className="d-flex categoriescard-space">
            {/* 1st card */}
            <Link to="/product/stationary">
              <div className="categories-card">
                <div className="copy-div">
                  <img src={Copy} alt="copy" className="categories-img" />
                </div>
                <div
                  class="overlay"
                  style={{
                    color: "#295eac",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Stationary
                </div>
              </div>
            </Link>
            {/* 2nd card */}
            <Link to="/product/hairaccess">
              <div className="categories-card ">
                <div className="copy-div">
                  <img src={Clip} alt="copy" className="categories-img" />
                </div>
                <div
                  class="overlay"
                  style={{
                    color: "#295eac",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Hair Accessories
                </div>
              </div>
            </Link>
            {/* 3rd card */}
            <Link to="/product/kidswear">
              <div className="categories-card school">
                <div className="copy-div">
                  <img
                    src={Golu}
                    alt="copy"
                    style={{ width: "95px", marginBottom: "40px" }}
                    className="categories-img"
                  />
                </div>
                <div
                  class="overlay"
                  style={{
                    color: "#295eac",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Kids Wear
                </div>
              </div>
            </Link>
            {/* 4th card */}
            <Link to="/product/Footwear">
              <div className="categories-card school">
                <div className="copy-div">
                  <img
                    style={{ width: "130px" }}
                    src={Jutta}
                    alt="copy"
                    className="categories-img"
                  />
                </div>
                <div
                  class="overlay"
                  style={{
                    color: "#295eac",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Footwear
                </div>
              </div>
            </Link>
            {/* 5th card */}
            <Link to="/product/toy">
              <div className="categories-card school">
                <div className="copy-div">
                  <img
                    src={Truck}
                    alt="copy"
                    className="categories-img  hover-zoom"
                  />
                </div>
                <div
                  class="overlay"
                  style={{
                    color: "#295eac",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Toys
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
