import React, { useEffect, useState } from "react";
import "../AccountsDetails/AccountsDetails.css";
import { BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import Heroallpages2 from "../../Components/Heroallpages2/Heroallpages2";
import SidebarAllpages from "../../Components/SidebarAllpages/SidebarAllpages";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AccountsDetails = () => {
  const initialAccountDetails = {
    name: "",
    email: "",
    password: "",
    currentpassword: "",
    newpassword: "",
    confirmpassword: "",
  };
  const [formData, setFormData] = useState(initialAccountDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:8081/api/users/profile/${userId}`
        );
        console.log("Fetched user data:", response.data);
        setFormData({
          ...formData,
          name: response.data.name || "",
          email: response.data.email || "",
          password: response.data.password || "", //leave blank space for security
        });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  //this approach is for saving form data in local storage
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   function saveAccountFormData(formData) {
  //     const existingAccountFormData = JSON.parse(localStorage.getItem("accountFormDataArray")) || [];
  //     existingAccountFormData.push(formData)
  //     localStorage.setItem("accountFormDataArray", JSON.stringify(existingAccountFormData));
  //     console.log("Updated data in local storage", existingAccountFormData);
  //   }
  //   saveAccountFormData(formData);
  //   alert("Form data saved successfully");
  //   setFormData(initialAccountDetails);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    console.log("userId from account details", userId);

    //validation check for password confirmation
    if (formData.newpassword !== formData.confirmpassword) {
      toast.error("New password and confirm password do not match", {
        position: 'top-center',
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: false
      })
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8081/api/users/profile/${userId}`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        currentpassword: formData.currentpassword,
        newpassword: formData.newpassword,
        confirmpassword: formData.confirmpassword,
      });
      toast.success("Account updated successfully", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: true,
      });
      //optional clear the password field after successful updates
      setFormData((prev) => ({
        ...prev,
        currentpassword: "",
        newpassword: "",
        confirmpassword: ""
      }))
    } catch (error) {
      console.error("Error updating account", error);
      toast.error(error.response?.data?.message || "Failed Error while updating account", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: true,
      });
    }
  };

  //for eye toggle
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    current: false,
    new: false,
    confirm:false
  })

  return (
    <div>
      <div>
        <Heroallpages2 profile_nav="Account Details" />
        <div className="whishlit-sidebar section-padding pt-0">
          <div
            className="whishlit-sidebar-container bg-white d-flex justify-content-evenly align-items-center"
            style={{ padding: "20px 30px" }}
          >
            <div className="leftwhishlist-sideb">
              <SidebarAllpages />
            </div>
            <div className="righttwhishlist-product-card accountdetailscard d-flex gap-5">
              <div className="generalformdiv">
                <form action="" onSubmit={handleSubmit}>
                  {/* main div for form */}
                  <div
                    className="d-flex gap-5 mainformdiv"
                    style={{ padding: "20px 0px" }}
                  >
                    {/* first div of form */}
                    <div className="w-50 firstformdiv">
                      <p
                        className=""
                        style={{
                          color: "var(--user-data)",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "24px",
                          paddingBottom: "20px",
                        }}
                      >
                        General
                      </p>
                      <div className="form-group checkout-group position-relative">
                        <label htmlFor="name" className="labelname">
                          Name
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
                          Email
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
                        <label htmlFor="password" className="labelname">
                          Password
                        </label>
                        <input
                          type={showPasswords.password ? "text" : "password"}
                          name="password"
                          id="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          placeholder="Password"
                          className="form-inputs"
                          style={{
                            paddingLeft: "30px",
                            color: "#1E1E1E",
                            lineHeight: "16px",
                            fontSize: "16px",
                            fontWeight: 400,
                          }}
                        />
                        <AiOutlineEye
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
                    {/* 2nd div for form */}
                    <div className="w-50 secondformdiv">
                      <p
                        className=""
                        style={{
                          color: "var(--user-data)",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "24px",
                          paddingBottom: "20px",
                        }}
                      >
                        Change Password
                      </p>
                      <div className="form-group checkout-group position-relative">
                        <label htmlFor="currentpassword" className="labelname">
                          Current
                        </label>
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          name="currentpassword"
                          id="currentpassword"
                          value={formData.currentpassword}
                          onChange={handleInputChange}
                          required
                          placeholder="Current Password"
                          className="form-inputs"
                          style={{
                            paddingLeft: "30px",
                            color: "#1E1E1E",
                            lineHeight: "16px",
                            fontSize: "16px",
                            fontWeight: 400,
                          }}
                        />
                        <AiOutlineEye
                          style={{
                            position: "absolute",
                            color: "#667085",
                            top: "70%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            cursor:'pointer'
                          }}
                          onClick={() => {
                            setShowPasswords((prev) => ({
                              ...prev,
                              current: !prev.current
                            }))
                          }}
                        />
                      </div>
                      <div className="form-group checkout-group position-relative">
                        <label htmlFor="newpassword" className="labelname">
                          New
                        </label>
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          name="newpassword"
                          id="newpassword"
                          value={formData.newpassword}
                          onChange={handleInputChange}
                          required
                          placeholder="New Password"
                          className="form-inputs"
                          style={{
                            paddingLeft: "30px",
                            color: "#1E1E1E",
                            lineHeight: "16px",
                            fontSize: "16px",
                            fontWeight: 400,
                          }}
                        />
                        <AiOutlineEye
                          style={{
                            position: "absolute",
                            color: "#667085",
                            top: "70%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            cursor:'pointer'
                          }}
                          onClick={() => {
                            setShowPasswords((prev) => ({
                              ...prev,
                              new: !prev.new
                            }))
                          }}
                        />
                      </div>
                      <div className="form-group checkout-group position-relative">
                        <label htmlFor="confirmpassword" className="labelname">
                          Confirm New
                        </label>
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          name="confirmpassword"
                          id="confirmpassword"
                          value={formData.confirmpassword}
                          onChange={handleInputChange}
                          required
                          placeholder="Confirm Password"
                          className="form-inputs"
                          style={{
                            paddingLeft: "30px",
                            color: "#1E1E1E",
                            lineHeight: "16px",
                            fontSize: "16px",
                            fontWeight: 400,
                          }}
                        />
                        <AiOutlineEye
                          style={{
                            position: "absolute",
                            color: "#667085",
                            top: "70%",
                            left: "10px",
                            transform: "translateY(-50%)",
                            cursor:'pointer'
                          }}
                          onClick={() => {
                            setShowPasswords((prev) => ({
                              ...prev,
                              confirm: !prev.confirm
                            }))
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="checkoutbtndiv">
                    <button className="accountbtn" type="submit">
                      Update
                    </button>
                    <p
                      style={{
                        color: "#667085",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                      }}
                    ></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default AccountsDetails;