import React, { useState } from "react";
import "./SizeSelector.css";
import Sizeselectors from "../../../src/Assets/Image/sizeselector.png";

const SizeSelector = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState("XL");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="size-selector-container">
      <h3 className="title">
        Select Size{" "}
        <span className="size-chart" onClick={() => setShowModal(true)}>
          Size Chart &gt;
        </span>
      </h3>
      <div className="size-options">
        {sizes.map((size) => (
          <button
            key={size}
            className={`size-option ${selectedSize === size ? "selected" : ""}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
      {/* size Chart Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2 style={{ color: "#793cfa" }}>Size Chart</h2>
            <table>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest (in)</th>
                  <th>Waist (in)</th>
                  <th>Hips (in)</th>
                  <th>Across Shoulder (in)</th>
                  <th>Sleeve Length (in)</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size, index) => (
                  <tr key={size}>
                    <td>
                      <input
                        type="radio"
                        name="size-modal"
                        value={size}
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(size)}
                      />
                    </td>
                    <td>{size}</td>
                    <td>{40 + index * 2}</td>
                    <td>{40 + index * 2}</td>
                    <td>{38 + index * 2}</td>
                    <td>{42 + index * 2}</td>
                    <td>{17 + index * 0.5}</td>
                    <td>{23.5 + index * 0.5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 style={{ color: "#793cfa", marginTop: "20px" }}>
              How to Measure
            </h3>
            <div className="d-flex justify-content-center">
              <img
                src="https://www.yuis.com.my/fashion/image/catalog/home_page/size_measurement/2.gif"
                style={{ width: "500px" }}
                alt="How to measure"
                className="measurement-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SizeSelector;
