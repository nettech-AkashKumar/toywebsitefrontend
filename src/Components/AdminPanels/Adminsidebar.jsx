import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import sidebarlogo from "../../Assets/Image/website-logo.png";
import "../AdminPanels/AdminPanels.css";
import { MdOutlineDashboard } from "react-icons/md";
import { BsBagHeartFill } from "react-icons/bs";
import { RiUserShared2Fill } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { SiSalesforce } from "react-icons/si";
import { RiCustomerService2Line } from "react-icons/ri";
import { BsBarChartFill } from "react-icons/bs";
import { IoNotifications, IoSettings } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import LogoutModal from "../../Components/Logout/LogoutModal";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../../Redux/sidebarSlice";
import { IoClose } from "react-icons/io5";


const StyledButton = styled.button`
  width: 100%;
  background: white;
  color: red;
  font-size: 14px;
  line-height: 20px;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content:center;
  margin-top: 130px;
  transition: 0.5s;
  &:hover {
    color: black;
  }
`;
const Tooltip = styled.div`
  position: absolute;
  left: 50px;
  background: black;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  @media (max-width: 1024px) {
    opacity: 0;
    visibility: hidden;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;


const Adminsidebar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isOpen = useSelector((state) => state.adminsidebar.isOpen);
  console.log("Sidebar Open State:", isOpen)
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Correct useNavigate()



  useEffect(() => {
    const handleClickOutside = (event) => {
      // Agar sidebar open hai aur click sidebar, toggle button ya close button ke bahar ho
      if (
        isOpen &&
        !event.target.closest(".adminsidebar") &&
        !event.target.closest(".adminsidebartoggle") &&
        !event.target.closest(".adminclosetoggle")

      ) {
        dispatch(closeSidebar());
      }
    };

    // Event listener add karna
    document.addEventListener("click", handleClickOutside);

    // Cleanup function jo component unmount hone par listener remove karega
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, dispatch]);


  return (
    <div>

      <div className={`adminsidebar ${isOpen ? "open" : ""}`}>
        <div className="adminclosetoggle" onClick={() => dispatch(closeSidebar())}><IoClose /></div>

        <div className="adminsidebar-logo">
          <img src={sidebarlogo} alt="sidebarlogo" />
         <span>PlayPalooza</span>
        </div>
        <div className="adminnavlink">
          <ul>
            <Link to="/dashboard" style={{ color: "black" }}>
              <li>
                <IconWrapper>
                  <MdOutlineDashboard />
                  <Tooltip>Dashboard</Tooltip>
                </IconWrapper>
                <span>Dashboard</span>
              </li>
            </Link>
            <li>
              <IconWrapper>
                <BsBagHeartFill />
                <Tooltip>Products</Tooltip>
              </IconWrapper>
              <span>Products</span>
            </li>
            <Link to="/users" style={{ color: "black" }}>
              <li>
                <IconWrapper>
                  <RiUserShared2Fill />
                  <Tooltip>Users</Tooltip>
                </IconWrapper>
                <span>Users</span>
              </li>
            </Link>
            <li>
              <IconWrapper>
                <MdOutlineCategory />
                <Tooltip>Categories</Tooltip>
              </IconWrapper>
              <span>Categories</span>
            </li>
            {/* <li>
              <IconWrapper>
                <SiSalesforce />
                <Tooltip>Sales</Tooltip>
              </IconWrapper>
              <span>Sales</span>
            </li> */}
            {/* <li>
              <IconWrapper>
                <RiCustomerService2Line />
                <Tooltip>Customers</Tooltip>
              </IconWrapper>
              <span>Customers</span>
            </li> */}
            <Link to="/adminanalytics" style={{ color: "black" }}>
              <li>
                <IconWrapper>
                  <BsBarChartFill />
                  <Tooltip>Analytics</Tooltip>
                </IconWrapper>
                <span>Analytics</span>
              </li>
            </Link>
            {/* <Link to="/notifications" style={{ color: "black" }}>
              <li>
                <IconWrapper>
                  <IoNotifications />
                  <Tooltip>Notifications</Tooltip>
                </IconWrapper>
                <span>Notifications</span>
              </li>
            </Link> */}
            <li>
              <IconWrapper>
                <IoSettings />
                <Tooltip>Settings</Tooltip>
              </IconWrapper>
              <span>Settings</span>
            </li>

          </ul>
        </div>


        <div className="sidebarnotes-card">
          <p style={{ fontSize: "14px" }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, non!
          </p>
          <button className="sidebarnotifybtn">Notify</button>
        </div>

        <div className='adminsidebar-logoutbtn'>
          <StyledButton onClick={() => (isAuthenticated ? setIsModalOpen(true) : navigate("/login"))}>
            <IoIosLogOut style={{ fontSize: "17px" }} />
            {isAuthenticated ? <span className='adminsidbarlogoutbt'>Logout</span> : <span>Login</span>}
          </StyledButton>
          <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>

      </div>

    </div>
  );
};

export default Adminsidebar;
