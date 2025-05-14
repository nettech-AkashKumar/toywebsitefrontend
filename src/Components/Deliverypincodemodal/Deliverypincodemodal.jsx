import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { BiCurrentLocation } from "react-icons/bi";


const Deliverypincodemodal = ({ show, handleClose }) => {
  const [pincode, setPincode] = useState("");

  const handlePincodeSubmit = () => {
    alert(`Delivery Pincode: ${pincode}`);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Delivery Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b>Use pincode to check delivery info</b></p>
        <Form.Control
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <div className="d-flex justify-content-between align-items-center mt-3 flex-column gap-3">
          <Button variant="primary" onClick={handlePincodeSubmit}>
            Submit
          </Button>
          <div>
            <p style={{color:"blue", display:"flex", alignItems:"center",gap:"5px"}}>
            <BiCurrentLocation /> Use my current location
            </p>
            </div>
            
         
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Deliverypincodemodal;
