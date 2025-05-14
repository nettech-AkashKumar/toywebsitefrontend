import React, { useState, useEffect } from "react";
import "./CheckOut.css";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
// import { BiChevronDown } from "react-icons/bi";
// import Indianflag from "../../Assets/Image/indianflag.png";
import { BiUser } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TiLocationArrowOutline } from "react-icons/ti";
// import { FiCheck } from "react-icons/fi";
// import { AiOutlineQuestionCircle } from "react-icons/ai";
import UPI from "../CheckOut/CheckOutImages/UPI.png";
import Paypal from "../CheckOut/CheckOutImages/paypal.png";
import MasterCard from "../CheckOut/CheckOutImages/mastercard.png";
import { FiLock } from "react-icons/fi";
import QuantityCart from "../QuantityCart/QuantityCart";
import Gift from "../CheckOut/CheckOutImages/Group.png";
import Happy from "../CheckOut/CheckOutImages/happy.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Link } from "react-router-dom";
import { CartState } from "../../context/Context";
import { loadStripe } from "@stripe/stripe-js"
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import DeliveryAddress from "../../Components/DeliveryAddress/DeliveryAddress"

const CheckOut = () => {
  const [address, setAddresses] = useState([])

  //fetch user id from token
  const token = localStorage.getItem("token")?.trim();
  let email = null;
  if (token) {
    try {
      const decoded = jwtDecode(token)
      email = decoded.email
      console.log('decoded  from checkout', email);
    } catch (error) {
      console.error("Error decoding token", error)
    }
  }

  const initialCheckoutFormState = {
    email: "",
    phone1: "",
    phone2: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
     zip: "",
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    csv: "",
    paymentOption: "",
  }
  const [formData, setFormData] = useState(initialCheckoutFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handlePhoneoneChange = (phone1) => {
    setFormData((prev) => ({ ...prev, phone1 }));
  }
  const handlePhonetwoChange = (phone2) => {
    setFormData((prev) => ({ ...prev, phone2 }));
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   function saveCheckoutFormData(formData) {
  //     const existingCheckoutFromData = JSON.parse(localStorage.getItem("checkoutFormDataArray")) || [];
  //     existingCheckoutFromData.push(formData);

  //     localStorage.setItem("checkoutFormDataArray", JSON.stringify(existingCheckoutFromData));
  //     console.log('Updated Data in local storage', existingCheckoutFromData);
  //   };
  //   saveCheckoutFormData(formData);
  //   alert('Form data saved successfully');

  //   setFormData(initialCheckoutFormState);
  // };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //save to local storage
      const existingCheckoutFromData = JSON.parse(localStorage.getItem("checkoutFormDataArray")) || [];
      existingCheckoutFromData.push(formData)
      localStorage.setItem("checkoutFormDataArray", JSON.stringify(existingCheckoutFromData))
      //save to backend
      const response = await fetch('http://localhost:8081/api/checkoutform/post', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if(!response.ok) {
        throw new Error('Failed to save to serer')
      }
      const result = await response.json();
      console.log('Saved to server:', result);
      alert('Form data saved successfully!')
      setFormData(initialCheckoutFormState)
    }catch(error) {
      console.error('Error during form submission', error)
      alert('Something went wrong while saving the data')
    }
  } 
  const { state, dispatch } = CartState();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState()

  useEffect(() => {
    const calculatedSubTotal = state.cart.reduce(
      (acc, curr) => acc + Number(curr.new_price) * curr.quantity, 0
    );
    const discount = 100;
    const packagingFee = 118;
    const finalTotal = calculatedSubTotal - discount + packagingFee;
    setSubTotal(calculatedSubTotal)
    setTotal(finalTotal)
  }, [state.cart])


  //payment integration
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51RD7BhFVJDXAcY8e0pNGhcMSa6KP7sW5NOgawOPZc0nwMAhs8SmK0S5gfsB2l5lJnPD41lz0zGGq7DLwuy9xNEYL00iuOPAteM");
    if (!stripe) {
      console.error("Stripe failed to initialize.");
      return;
    }
    // const state = CartState((state) => state);
    const cartItems = state.cart
    console.log('cart product via checkout', cartItems)
    if (!cartItems || cartItems.length === 0) {
      console.warn('Cart is empty')
    }

    const response = await fetch(`http://localhost:8081/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ products: cartItems, email: formData.email, formData })
    })

    const session = await response.json();

    if (!response.ok) {
      console.error("Payment session creation failed", session.message || session);
    }
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })
    if (result.error) {
      console.log('Stripe checkout error', result.error.message)
    }
  }

  const normalizePhone = (inputPhone) => {
    //remove all non digit character
    const digitsOnly = inputPhone.replace(/\D/g, '')

    //if it already starts with 91 and it longer than 1o digits assume it country code
    if (digitsOnly.startsWith('91') && digitsOnly.length > 10) {
      return `+${digitsOnly}`  //already has country code
    }
    //other wise it's a 10 digits number
    return `+91${digitsOnly}`
  }
  const handleGenerateShipping = async () => {
    const normalizedPhone = normalizePhone(formData.phone1.trim())
    try {
      const res = await axios.get("http://localhost:8081/shipping-details", {
        params: {
          email: formData.email.trim(),
          phone: normalizedPhone,
        }
      })

      const { name, address } = res.data;
      console.log('resfde', res.data)

      if (!name || !address) {
        alert("No matching user found")
        return
      }
      //split name into first and last
      const [firstName, ...rest] = name.split(" ");
      const lastName = rest.join(" ")

      setFormData((prev) => ({
        ...prev,
        firstName,
        lastName,
        address1: address.tag,
        address2: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        phone2: normalizedPhone
      }))
    } catch (error) {
      console.error("Error fetching shipping details:", error)
      alert('Failed tp fetch shipping details. Please check email and phone')
    }
  }

  const handleAddressSelect = (selectedAddress) => {
    if (!selectedAddress) return;
  
    setFormData((prev) => ({
      ...prev,
      
      city: selectedAddress.city || "",
      state: selectedAddress.state || "",
      zip: selectedAddress.zip || "",
      // DO NOT touch email or phone1
    }));
  };

  return (
    <>
      <div>
        <div className=" CheckOut">
          <div className=" align-items-center">
            <div className="checkout"></div>{" "}
            {/* back to cart and checkout div */}
            <div className="checkoutheadingdiv section-padding">
              <Link to='/quickcheckout' style={{ color: 'none' }} className="backtocart">
                <p>
                  <span>
                    <FiArrowLeft />
                  </span>
                  <span>Back to cart</span>
                </p>
              </Link>
              <p className="checkoutheading">Checkout</p>
            </div>
            <div className="checkoutpage section-padding">
              <div>

              </div>
              {/* left div */}
              <div className=" col-md-7 col-sm-12 leftdiv">
                <div className="contactcartdiv">
                  <p className="contactcartheading">Contact Information</p>
                  <form action="" onSubmit={handleSubmit}>
                    {/* contact */}
                    <div className="contact">
                      <div className="form-group form-payment checkout-group">
                        <label htmlFor="email" className="labelname">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="staravinash25@gmail.com"
                          className="form-input"
                          style={{
                            paddingLeft: "30px",
                            color: "#1E1E1E",
                            lineHeight: "16px",
                            fontSize: "16px",
                            fontWeight: 400,
                          }}
                        />
                        <HiOutlineMail
                          style={{
                            position: "absolute",
                            color: "#667085",
                            top: "70%",
                            left: "10px",
                            transform: "translateY(-50%)",
                          }}
                        />
                      </div>
                      <div>
                      </div>
                      <div className="form-group form-payment checkout-group">
                        <label htmlFor="number" className="labelname">
                          Phone Number
                        </label>
                        <PhoneInput
                          className="form-input checkout-group"
                          country={"in"}
                          enableSearch={true}
                          value={formData.phone1}
                          onChange={handlePhoneoneChange}
                          inputStyle={{
                            width: "100%",
                            padding: "8px 50px",

                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <button className="checkoutbttnnms" style={{ padding: '8px 5px', backgroundColor: '#9c6ff9', marginBottom: '10px', color: 'white' }} onClick={handleGenerateShipping} disabled={!formData.email || !formData.phone1}>Generate Shipping</button>
                    </div>
                     {/* delivery-adress-section?? */}
                     <DeliveryAddress onAddressSelect={handleAddressSelect}/>
                    {/* delivery-adress-section?? */}

                    {/* shipping information */}
                    <p className="contactcartheading">Shipping Information</p>
                    <div className="contact">
                      <div className="form-group form-payment checkout-group">
                        <label htmlFor="firstName" className="labelname">
                          First Name
                        </label>
                        <input
                          type="firstName"
                          name="firstName"
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Kishore"
                          className="form-input"
                          style={{ paddingLeft: "30px" }}
                        />
                        <BiUser
                          style={{
                            position: "absolute",
                            color: "#667085",
                            top: "70%",
                            left: "10px",
                            transform: "translateY(-50%)",
                          }}
                        />
                      </div>
                      <div className="form-group form-payment checkout-group">
                        <label htmlFor="lastName" className="labelname">
                          Last Name
                        </label>
                        <input
                          type="lastName"
                          name="lastName"
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Jha"
                          style={{ paddingLeft: "30px" }}
                        />
                        <BiUser
                          style={{
                            position: "absolute",
                            color: "#667085",
                            top: "70%",
                            left: "10px",
                            transform: "translateY(-50%)",
                          }}
                        />
                      </div>
                    </div>
                    {/* address 1 */}
                    <div className="form-group form-payment address checkout-group">
                      <label htmlFor="address1" className="labelname">
                        Full Address
                      </label>
                      <input
                        type="address1"
                        name="address1"
                        id="address1"
                        value={formData.address1}
                        onChange={handleInputChange}
                        required
                        placeholder="78, Rosewood Apartment, Sector 15, Plot 9"
                        className="form-input"
                        style={{ paddingLeft: "30px" }}
                      />
                      <HiOutlineLocationMarker
                        style={{
                          position: "absolute",
                          color: "#667085",
                          top: "70%",
                          left: "10px",
                          transform: "translateY(-50%)",
                        }}
                      />
                    </div>
                    {/* address 2 */}
                    <div className="form-group form-payment address checkout-group">
                      <label htmlFor="address2" className="labelname">
                        Street Address
                      </label>
                      <input
                        type="address2"
                        name="address2"
                        id="address2"
                        required
                        value={formData.address2}
                        onChange={handleInputChange}
                        placeholder="Noida Uttar Pradesh, 201301"
                        className="form-input"
                        style={{ paddingLeft: "30px" }}
                      />
                      <HiOutlineLocationMarker
                        style={{
                          position: "absolute",
                          color: "#667085",
                          top: "70%",
                          left: "10px",
                          transform: "translateY(-50%)",
                        }}
                      />
                    </div>
                    {/* country */}
                    <div className="contact">
                      <div className="form-group form-payment checkout-group">
                        <label htmlFor="email" className="labelname">
                          Phone Number
                        </label>
                        <PhoneInput
                          className="form-input checkout-group"
                          country={"in"}
                          enableSearch={true}
                          value={formData.phone2}
                          onChange={handlePhonetwoChange}
                          inputStyle={{
                            width: "100%",
                            padding: "8px 50px",
                          }}
                        />
                      </div>
                      <div className="form-group form-payment checkout-group">
                        <label htmlFor="city" className="labelname">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          placeholder="Noida"
                          style={{ paddingLeft: "30px" }}
                        />
                        <TiLocationArrowOutline
                          style={{
                            position: "absolute",
                            color: "#667085",
                            top: "70%",
                            left: "10px",
                            transform: "translateY(-50%)",
                          }}
                        />
                      </div>
                    </div>
                    {/* State */}
                    <div className="contact">
                      <div className="form-group form-payment checkout-group">
                        <label htmlFor="state" className="labelname">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          id="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          placeholder="Uttar Pradesh"
                          className="form-input"
                          style={{ paddingLeft: "40px" }}
                        />
                        <TiLocationArrowOutline
                          style={{
                            position: "absolute",
                            color: "#667085",
                            top: "70%",
                            left: "10px",
                            transform: "translateY(-50%)",
                          }}
                        />
                      </div>
                      <div className="form-group form-payment checkout-group">
                        <label htmlFor="zip" className="labelname">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          name="zip"
                          id="zip"
                          required
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder="201301"
                          style={{ paddingLeft: "30px" }}
                        />
                        <TiLocationArrowOutline
                          style={{
                            position: "absolute",
                            color: "#667085",
                            top: "70%",
                            left: "10px",
                            transform: "translateY(-50%)",
                          }}
                        />
                      </div>
                    </div>
                    {/* credit/debit card */}

                    {/* paypal, mastercard, upi */}
                    <div className="paymentcard">
                      {/* paypal div */}
                      <div className="paypaldiv">
                        <p className="d-flex align-items-center gap-3">
                          <input
                            type="radio"
                            id="paypalOption"
                            name="paymentOption"
                            value="paypal"
                            checked={formData.paymentOption === "paypal"}
                            onChange={handleInputChange}
                            color="#49454F"
                          />
                          {/* heading, para */}
                          <p className="d-flex flex-column">
                            <span className="cardname">Paypal</span>
                            <span className="paysecure">Pay securely</span>
                          </p>
                        </p>
                        <p>
                          <img src={Paypal} alt="paypal" />
                        </p>
                      </div>
                      {/* mastercard div */}
                      <div className="mastercard">
                        <p className="d-flex align-items-center gap-3">
                          <input
                            type="radio"
                            id="mastercardOption"
                            name="paymentOption"
                            value="mastercard"
                            checked={formData.paymentOption === "mastercard"}
                            onChange={handleInputChange}
                            color="#49454F"
                          />
                          {/* heading, para */}
                          <p className="d-flex flex-column">
                            <span className="cardname">Mastercard</span>
                            <span className="paysecure">
                              For everything else, there's Mastercard
                            </span>
                          </p>
                        </p>
                        <p>
                          <img src={MasterCard} alt="mastercard" />
                        </p>
                      </div>
                      {/* upi div */}
                      <div className="upi">
                        <p className="d-flex align-items-center gap-3">
                          <input
                            type="radio"
                            id="upiOption"
                            name="paymentOption"
                            value="upi"
                            checked={formData.paymentOption === "upi"}
                            onChange={handleInputChange}
                            color="#49454F"
                          />
                          {/* heading, para */}
                          <p className="d-flex flex-column">
                            <span className="cardname">UPI</span>
                            <span className="paysecure">
                              Har Payment Digital
                            </span>
                          </p>
                        </p>
                        <p>
                          <img src={UPI} alt="upi" />
                        </p>
                      </div>
                    </div>
                    {/* secure checkout */}
                    <div className="checkoutbtndiv">
                      <button onClick={makePayment} className="checkoutbtn button-hover-color" type="submit">
                        <FiLock style={{ fontSize: "15px" }} />
                        Secure Checkout
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* right div */}
              <div className=" col-md-5 col-sm-12 rightcontainer">
                {/* 1st div */}
                <div
                  className="d-flex flex-column"
                  style={{
                    gap: "20px",
                    backgroundColor: "var(--section-color)", color: "var(--label-color)",
                    padding: "20px"
                  }}
                >
                  <QuantityCart />
                  {/* next div */}
                  <div className="subtotal">
                    <p
                      className="d-flex justify-content-between"
                      style={{ borderBottom: "1px solid #DADADA" }}
                    >
                      <span>Total</span>
                      <span>₹{subTotal}</span>
                    </p>
                    <p
                      className="d-flex justify-content-between"
                      style={{ borderBottom: "1px solid #DADADA" }}
                    >
                      <span>Shipping bill</span>
                      <span>₹18</span>
                    </p>
                    <p
                      className="d-flex justify-content-between"
                      style={{ borderBottom: "1px solid #DADADA" }}
                    >
                      <span>Subtotal</span>
                      <span>₹{total}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* happy buying */}
            <div className="happingbuying">
              <span>
                <img src={Happy} alt="happy-img" width='100%' />
              </span>
              <span>
                <img src={Gift} alt="gift-img" width='100%' />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
