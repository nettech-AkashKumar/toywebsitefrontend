import React from "react";
import "./Address_bookModel.css";
import Modal from "react-modal";

const Address_bookModel = ({
  isModalOpen,
  setIsModalOpen,
  formData,
  handleInputChange,
  handleSubmit,
  editMode
}) => {
  return (
    <div>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}
        style={{ content: { background: 'transparent', border: 'none', padding: 0 } }}
      >
        <div className="abm-modal-container">
          <h2 className="abm-modal-title">
            {editMode ? "Edit Address" : "Add New Address"}
          </h2>
          <form className="abm-form" onSubmit={handleSubmit}>
            <input
              name="tag"
              className="abm-input"
              value={formData.tag}
              onChange={handleInputChange}
              placeholder="Country"
              required
            />
            <input
              name="street"
              className="abm-input"
              value={formData.street}
              onChange={handleInputChange}
              placeholder="Street"
              required
            />
            <input
              name="city"
              className="abm-input"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              required
            />
            <input
              name="state"
              className="abm-input"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              required
            />
            <input
              name="phone"
              type="tel"
              className="abm-input"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              required
              pattern="\d{10}"
              maxLength={10}
              color="black"
            />
            <input
              name="zip"
              className="abm-input"
              value={formData.zip}
              onChange={handleInputChange}
              placeholder="ZIP Code"
              required
            />
            <div className="abm-btn-group">
              <button type="submit" className="abm-btn-submit">
                {editMode ? "Update" : "Add"}
              </button>
              <button
                type="button"
                className="abm-btn-cancel"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Address_bookModel;
