// import React, { useState } from "react";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { IoClose } from "react-icons/io5";

// const QuantitySelector = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedQty, setSelectedQty] = useState(0);

//   const handleSelect = (qty) => {
//     setSelectedQty(qty);
//   };

//   return (
//     <div>
//       <span
//         onClick={() => setShowModal(true)}
//         style={{ backgroundColor: "#6941c6", color: "white", borderRadius: "5px", padding: "5px 5px", cursor: "pointer" }}
//       >
//         Qty: {selectedQty} <IoMdArrowDropdown />
//       </span>

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-container">
//             <div className="modal-header justify-content-between align-items-center">
//               <h3>Select Quantity</h3>
//               <IoClose className="close-icon fs-2" onClick={() => setShowModal(false)} />
//             </div>
//             <div className="modal-content" style={{padding:"15px 0",display:"grid", gridTemplateColumns:"repeat(4,1fr)" , gap:"15px"}}>
//               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
//                 <button
//                   key={qty}
//                   className={`qty-button ${selectedQty === qty ? "selected" : ""}`}
//                   onClick={() => handleSelect(qty)}
//                   style={{width:"40px", height:"40px", borderRadius:"50%", backgroundColor:"rgb(95, 95, 144)", color:"white"}}
//                 >
//                   {qty}
//                 </button>
//               ))}
//             </div>
//             <button className="done-button"  onClick={() => setShowModal(false)} style={{backgroundColor:"#6941c6", color:"white", padding:"10px 20px", borderRadius:"50px"}}>Done</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuantitySelector;

import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const QuantitySelector = ({ value, onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedQty, setSelectedQty] = useState(value || 1); // Default to 1

  // On mount, set initial quantity
  useEffect(() => {
    setSelectedQty(value || 1);
  }, [value]);

  // Handle selection and notify parent
  const handleSelect = (qty) => {
    setSelectedQty(qty);
    onChange(qty); // Notify parent (Cart)
  };

  return (
    <div style={{ margin: 0 }}>
      <span
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: "#6941c6",
          color: "white",
          borderRadius: "5px",
          padding: "5px 5px",
          cursor: "pointer",
        }}
      >
        Qty: {selectedQty} <IoMdArrowDropdown />
      </span>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header-qty justify-content-between align-items-center" style={{ display: "flex", padding: "5px 5px", color: "white", backgroundColor: "#6941c6", borderRadius: "5px" }}>
              <h3 style={{ margin: 0 }}>Select Quantity</h3>
              <IoClose style={{cursor: 'pointer'}}
                className="close-icon fs-2"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div
              className="modal-content-qty"
              style={{
                padding: "15px 0",
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "15px",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                <div>
                  <button
                    key={qty}
                    className={`qty-button ${
                      selectedQty === qty ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(qty)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "rgb(105 65 198)",
                      color: "white",
                    }}
                  >
                    {qty}
                  </button>
                </div>
              ))}
            </div>
            <button
              className="done-button"
              onClick={() => setShowModal(false)}
              style={{
                backgroundColor: "#6941c6",
                color: "white",
                padding: "10px 20px",
                borderRadius: "50px",
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantitySelector;
