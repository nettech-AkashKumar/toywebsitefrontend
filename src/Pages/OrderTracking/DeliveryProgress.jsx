import React, { useState, useEffect } from "react";
import "./deliveryprogress.css";

import customersupport from "../../Assets/Image/customersupport.png";
import deliverystatusicon from "../../Assets/Image/deliverystatusicon.png";
import ProgressBar from "../../Components/progressbar/ProgressBar";
import Progressbar_mobile from "../../Components/Progressbar_mobile/Progressbar_mobile";
import { FaRegCircleQuestion } from "react-icons/fa6";
import Heroallpages2 from "../../Components/Heroallpages2/Heroallpages2";
import SidebarAllpages from "../../Components/SidebarAllpages/SidebarAllpages";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DeliveryProgress = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/order-details/${orderId}`)
        setOrderData(res.data)
      } catch (error) {
        console.error("Error fetching order:", error)
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p>Loading...</p>
  }
  if (!orderData) {
    return <p>Order not found</p>
  }
  return (
    <div>
      <Heroallpages2 profile_nav="Order Tracking" />
      <div className="whishlit-sidebar section-padding pt-0">
        <div className="whishlit-sidebar-container bg-white d-flex justify-content-evenly" style={{ padding: "20px 30px" }}>
          <div className="leftwhishlist-sideb">
            <SidebarAllpages />
          </div>
          <div className="righttwhishlist-product-card helpsupport-bx d-flex gap-5">
            <div className="order-tracking tracking-section-padding">
              <div className="deliverycontainer">
                <div className="delivery_current_status">
                  <div className="deliverystatus">
                    <h5 className="deliverystatus_head">
                      Tracking Order #{orderData?._id?.slice(0, 10).toUpperCase()}
                    </h5>
                    <h6 className="deliverystatus_head">Status: {orderData?.status}</h6>
                    <p className="deliverystatus_text">
                      Ordered on: {new Date(orderData?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="deliverystatus_text">
                      Total Amount: ₹{orderData?.amount_Total / 100}
                    </p>
                  </div>
                  <div className="progressbar">
                    <ProgressBar status={orderData?.status} />
                  </div>
                  {/* Optional: Add cart items or more info below */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* other section */}
        <div className="delivery-help bg-white">
          <div className="play_palooza-address">
            <h4 className="palooza_address_title">Contact for Issues</h4>
            <p className="palooza_address_para">
              If you have any questions or concerns about your order, please
              contact our support team at support@paloozashophelp.com or call us
              at +1-800-555-1234. Our team is available 24/7 to assist you with
              any issues you may have. We strive to provide the best customer
              service and ensure your satisfaction with our products and
              services.
            </p>

            <div className="callsupport">
              <img
                className="callsupporticon"
                src={customersupport}
                alt="Call_customer"
              />
              <span>
                <h4 className="support_call_time">
                  (Mon-Fri) 24/7 Customer Support
                </h4>
                <p className="support_details">
                  Our dedicated support team is here to help you around the
                  clock.
                </p>
              </span>
            </div>
            <Link to='/help_support'><button className="call-supportbtn">
              <FaRegCircleQuestion className="circleicon" />
              <span className="contactusbtn">Contact us</span>
            </button>
            </Link>
          </div>

          {/* map */}
          <div className="play_palooza-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d316120.4887829437!2d77.0185524950724!3d28.908124417762618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5dbb8748335%3A0x3cfcbbd326e7a390!2sKasper%20Infotech%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1737099905679!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProgress;
