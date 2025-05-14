

import React, { useState } from "react";
import styled from "styled-components";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../../Components/Logout/LogoutModal";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/AuthSlice";
import { TbListDetails } from "react-icons/tb";
import { RiListUnordered } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";
import { BsActivity } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdOutlineSpatialTracking } from "react-icons/md";
import { TbRating21Plus } from "react-icons/tb";

const Modal = styled.div`
  width: 245px;
  background-color: var(--modal);
  color: var(--text-color);
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  gap: 10px;
`;

const StyledButton = styled.button`
  width: 100%;
 background: var(--modal);
  color:var(--modal-text); 
  font-size: 14px;
  line-height: 20px;
  border: 10px;
  border-radius: 5px;
  padding: 4px 0px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: 0.5s;
  &:hover {
    color: white;
  }
     &:hover {
    background: #8565d1;
  }
`;

const Model = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user); // Get user details from Redux
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsModalOpen(false);
  };

  const handleRedirect = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  };

  return (
    <div >
      <div style={{backgroundColor:"var(--background!important)"}}>
      <Modal >
        {/* Show logged-in user's name */}
        <p className="usernameshow">
          Welcome, <span style={{ fontWeight: "300",color:"var(--text-color)"}}> {user ? user.name : "PlayPalooza"} {/* Show user name if logged in */}</span>
        </p>

        {/* <StyledButton onClick={() => handleRedirect("/account_details")}>
          <CiUser />
          <span>View Profile</span>
        </StyledButton> */}
        <StyledButton onClick={() => handleRedirect("/account_details")}>
          <TbListDetails />
          <span>Account Details</span>
        </StyledButton>

        <hr style={{ margin: "0px" }} />

        <StyledButton onClick={() => (isAuthenticated ? setIsModalOpen(true) : navigate("/login"))}>
          <IoIosLogOut />
          {isAuthenticated ? <span>Logout</span> : <span>Login</span>}
        </StyledButton>
        <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <hr style={{ margin: "0px" }} />

        <StyledButton onClick={() => handleRedirect("/order_history")}>
          <RiListUnordered />
          <span>Order History</span>
        </StyledButton>

        <hr style={{ margin: "0px" }} />

        <StyledButton onClick={() => handleRedirect("/whislist")}>
          <CiHeart />
          <span>Wishlist</span>
        </StyledButton>

        <hr style={{ margin: "0px" }} />

        <StyledButton onClick={() => handleRedirect("/address_book")}>
          <CiLocationArrow1 />
          <span>Address Book</span>
        </StyledButton>

        <hr style={{ margin: "0px" }} />

        <StyledButton onClick={() => handleRedirect("/recentactivtiy")}>
          <BsActivity />
          <span>Recent Activity</span>
        </StyledButton>

        <hr style={{ margin: "0px" }} />

        <StyledButton onClick={() => handleRedirect("/help_support")}>
          <MdOutlineSupportAgent />
          <span>Support & Help</span>
        </StyledButton>

        <hr style={{ margin: "0px" }} />

        <StyledButton onClick={() => handleRedirect("/ordertracking")}>
          <MdOutlineSpatialTracking />
          <span>Order Tracking</span>
        </StyledButton>

        <hr style={{ margin: "0px" }} />

        <StyledButton onClick={() => handleRedirect("/reviewrating")}>
          <TbRating21Plus />
          <span>Reviews & Ratings</span>
        </StyledButton>
      </Modal>
    </div>
    </div>
  );
};

export default Model;
