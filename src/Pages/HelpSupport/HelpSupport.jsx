import React, { useEffect, useState } from "react";
import "../HelpSupport/HelpSupport.css";
import Heroallpages2 from "../../Components/Heroallpages2/Heroallpages2";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import SidebarAllpages from "../../Components/SidebarAllpages/SidebarAllpages";


const HelpSupport = () => {
  const initialContact = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  }

  const [formData, setFormData] = useState(initialContact);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    function saveContactFormData(formData) {
      const existingContactFormData = JSON.parse(localStorage.getItem("contactFormDataArray")) || [];
      existingContactFormData.push(formData);

      localStorage.setItem("contactFormDataArray", JSON.stringify(existingContactFormData));
      console.log('Updated Contact Data in local storage', existingContactFormData);
    }
    saveContactFormData(formData);
    alert('Form data saved successfully');
    //form reset to its initial state
    setFormData(initialContact);
  }
  //to scroll page up
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (

    <div>
      <Heroallpages2 profile_nav="Help and Support" />
      <div className="whishlit-sidebar section-padding pt-0">
        <div className='whishlit-sidebar-container bg-white d-flex justify-content-evenly ' style={{ padding: "20px 30px" }}>
          <div className="leftwhishlist-sideb mt-5">
            <SidebarAllpages />
          </div>
          <div className="righttwhishlist-product-card helpsupport-bx d-flex gap-5">
            <div className="contactformdiv">
              <p
                className=""
                style={{
                  color: "#121212",
                  fontWeight: 400,
                  fontSize: "32px",
                  lineHeight: "32px",
                  paddingBottom: '20px'
                }}
              >
                Contact Us
              </p>
              <form action="" onSubmit={handleSubmit}>
                <div className="form-group checkout-group position-relative">
                  <label htmlFor="name" className="labelname">
                    Full Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Name"
                    className="form-inputs"
                    style={{
                      paddingLeft: "30px",
                      color: "#1E1E1E",
                      lineHeight: "16px",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
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
                <div className="form-group checkout-group position-relative">
                  <label htmlFor="email" className="labelname">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="kishore@gmail.com"
                    className="form-inputs"
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
                <div className="form-group checkout-group position-relative">
                  <label htmlFor="phone" className="labelname">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Phone Number"
                    className="form-inputs"
                    style={{
                      paddingLeft: "30px",
                      color: "#1E1E1E",
                      lineHeight: "16px",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  />
                  <FiPhone
                    style={{
                      position: "absolute",
                      color: "#667085",
                      top: "70%",
                      left: "10px",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>
                <div className="form-group checkout-group position-relative">
                  <label htmlFor="subject" className="labelname">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description"
                    className="form-inputs"
                    style={{
                      paddingLeft: "30px",
                      color: "#1E1E1E",
                      lineHeight: "16px",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  />
                </div>
                <div className="form-group checkout-group position-relative">
                  <label htmlFor="message" className="labelname">
                    Message
                  </label>
                  <textarea
                    type="text"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Please describe your issue in details."
                    className="form-inputs"
                    style={{
                      paddingLeft: "30px",
                      color: "#1E1E1E",
                      lineHeight: "16px",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  />
                </div>
                <div className="checkoutbtndiv">
                  <button className="contactsupportbtn" type="submit">
                    Submit
                  </button>
                  <p style={{ color: '#667085', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>Thank you! Your query has been submitted. We will get back to you soon.</p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default HelpSupport;