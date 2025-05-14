import React, { useEffect, useState } from "react";
import Heroallpages2 from "../../Components/Heroallpages2/Heroallpages2";
import { FaCheck } from "react-icons/fa6";
import "../../Pages/Address_book/Address_book.css";
import SidebarAllpages from "../../Components/SidebarAllpages/SidebarAllpages";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Address_bookModel from "./Address_bookModel"
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const Address_book = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({tag: '', street: '', city: '', state:'', zip:''});
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState(null)
   
  const token = localStorage.getItem("token")?.trim();
  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (error) {
      console.log("Error decoding token", error);
    }
  }
  console.log("userId from addressbook", userId);

  //handle get
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/address/${userId}`
        );
        if(Array.isArray(res.data.data)) {
        setAddresses(res.data.data);
        }
        else {
            setAddresses([])
        }
      } catch (error) {
        console.error("Error fetching addresses", error);
      }
    };
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);
  
  //handle input change
  const handleInputChange = (e) => {
    setFormData((preve) =>({...preve, [e.target.name]: e.target.value}))
  }
  const openAddModal = () => {
    setFormData({tag: '', street:'', city: '', state:'', zip:''})
    setEditMode(false)
    setIsModalOpen(true)
  }

  const openEditModal = (address) => {
    setFormData(address);
    setEditId(address._id)
    setEditMode(true)
    setIsModalOpen(true)
  };

  //handle submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(editMode) {
      const response =   await axios.put(`/address/${editId}`, formData)
      //update the edited address in your local storaqge
      setAddresses((prev) => prev.map(addr => addr._id === editId ? response.data.data : addr))
    } else {
      const response =   await axios.post('/address', {...formData, userId})
      //Add the new address to your local state
      setAddresses((prev) => [...prev, response.data.data])
    }
    // fetchAddresses();
    setIsModalOpen(false)
  }



  const handleDelete = async (addressId) => {
    try {
      await axios.delete(`http://localhost:8081/address/${addressId}`);
      setAddresses((prev) => prev.filter((addres) => addres._id !== addressId));
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  return (
    <div>
      <Heroallpages2 profile_nav="Address Book" />
      <div className="whishlit-sidebar section-padding pt-0">
        <div
          className="whishlit-sidebar-container bg-white d-flex justify-content-evenly align-items-center"
          style={{ padding: "20px 30px" }}
        >
          <div className="leftwhishlist-sideb" style={{marginRight:'50px'}}>
            <SidebarAllpages />
          </div>
          <div className="righttwhishlist-product-card  gap-5">
            <div style={{width:'100%'}}>
              <div className=" mb-4" style={{display:'flex', justifyContent:'space-between'}}>
              <button
                    style={{
                      backgroundColor: "#8565d1",
                      color: "white",
                      border: "none",
                      borderRadius: "2px",
                      padding: "4px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    <FaCheck /> Home
                  </button>
                <button
                onClick={openAddModal}
                  className="addnewlocation_btn"
                  style={{
                    backgroundColor: "#8565d1",
                    color: "white",
                    border: "none",
                    padding: "10px 50px",
                    borderRadius: "10px",
                  }}
                >
                  + Add new location
                </button>
              </div>
              <div>
                <div className="d-flex flex-column gap-4">
                  <div
                    className="addressbook_Card"
                    style={{display:"grid",gridTemplateColumns: 'repeat(3, 1fr)', gap: "3rem" }}
                  >
                    {addresses.map((address, index) => (
                      <div
                        key={address._id}
                        style={{
                          backgroundColor: "var(--address-card)",
                          maxWidth: "371px",
                          borderRadius: "10px",
                          padding: "20px 10px",
                          color: "var(--text-color)!important",
                        }}
                      >
                        <div className="text-center">
                          <input type="radio" name="address" />
                        </div>
                        <div>
                          <p>{address.tag}</p>
                          <p>{`${address.street}, ${address.city}, ${address.state}, ${address.zip}`}</p>
                          <p>{`${address.phone}`}</p>
                          <div className="text-end d-flex flex-row justify-content-end gap-2">
                            <button
                            onClick={() => openEditModal(address)}
                              style={{
                                color: "#6941C6",
                                backgroundColor: "var(--edit-button)",
                                border: "none",
                                padding: "6px 6px",
                                borderRadius: "5px",
                              }}
                            >
                              <FiEdit/>
                            </button>
                            <button
                              onClick={() => handleDelete(address._id)}
                              style={{
                                color: "#B42318",
                                backgroundColor: "var(--delete-button)",
                                border: "none",
                                padding: "6px 6px",
                                borderRadius: "5px",
                              }}
                            >
                              <RiDeleteBinLine/>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/checkout" style={{color:"black"}}><div className="d-flex"><IoIosArrowRoundBack/><h5 style={{fontSize:'15px'}}>Checkout</h5></div></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Address_bookModel
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      editMode={editMode}
      />
    </div>
  );
};

export default Address_book;
