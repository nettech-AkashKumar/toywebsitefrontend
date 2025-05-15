import React, { useEffect, useState } from "react";
import "../DeliveryAddress/DeliveryAddress.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BASE_URL from "../../config/config";

const DeliveryAddress = ({ onAddressSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      const token = localStorage.getItem("token")?.trim();
      let userId = null;

      if (token) {
        try {
          const decoded = jwtDecode(token);
          userId = decoded.id;
        } catch (err) {
          console.error("Token decode error:", err);
        }
      }

      if (userId) {
        try {
          const res = await axios.get(
            `${BASE_URL}/address/${userId}`
          );
          if (
            res.data &&
            Array.isArray(res.data.data) &&
            res.data.data.length > 0
          ) {
            setAddresses(res.data.data);
            setSelectedAddress(res.data.data[0]);
          }
        } catch (err) {
          console.error("Error fetching address:", err);
        }
      }
    };

    fetchAddress();
  }, []);

  //   const handleSelect = (address) => {
  //     setSelectedAddress(address);
  //     setShowOptions(false);
  //   };

  const handleSelect = (address) => {
    setSelectedAddress(address);
    setShowOptions(false);

    // Notify parent component (CheckOut)
    if (onAddressSelect) {
      onAddressSelect(address); // <-- This will now call handleAddressSelect from Checkout
    }
  };

  const displayAddresses = addresses.slice(0, 3);

  const handleAddAddress = () => {
    navigate("/address_book");
  };

  return (
    <div className="delivery-container">
      <div className="step-header">
        <span className="step-number">1</span>
        <span className="step-title">DELIVERY ADDRESS</span>
        <span className="step-check">✔</span>
      </div>

      {selectedAddress ? (
        <div className="address-details">
          <strong>{selectedAddress.tag}</strong>{" "}
          <span className="address">{`${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.zip}`}</span>
        </div>
      ) : (
        <p>Loading address...</p>
      )}

      {/* Button Row */}
      <div className="button-row">
        <Link to="/address_book">
          {" "}
          <button className="add-address-btn" onClick={handleAddAddress}>
            + Add New Address
          </button>
        </Link>

        <button type="button" className="change-btn" onClick={() => setShowOptions(!showOptions)}>
          {showOptions ? "CANCEL" : "CHANGE"}
        </button>

      </div>

      {showOptions && (
        <div className="address-options">
          {displayAddresses.map((addr) => (
            <div
              key={addr._id}
              className={`faq-address-item ${
                addr._id === selectedAddress?._id ? "selected" : ""
              }`}
              onClick={() => handleSelect(addr)}
            >
              <strong>{addr.tag}</strong>{" "}
              <span className="address">{`${addr.street}, ${addr.city}, ${addr.state} - ${addr.zip}`}</span>
            </div>
          ))}

          {addresses.length > 3 && (
            <p className="more-address-msg">
              Showing only 3 of {addresses.length} addresses.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
