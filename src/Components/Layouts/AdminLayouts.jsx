// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import sidebarlogo from "../../Assets/Image/website-logo.png";
// import "../AdminPanels/AdminPanels.css";
// import { MdOutlineDashboard } from "react-icons/md";
// import { BsBagHeartFill, BsBox } from "react-icons/bs";
// import { RiUserShared2Fill } from "react-icons/ri";
// import { MdOutlineCategory } from "react-icons/md";
// import { SiSalesforce } from "react-icons/si";
// import { RiCustomerService2Line } from "react-icons/ri";
// import { BsBarChartFill } from "react-icons/bs";
// import { IoNotifications, IoSettings } from "react-icons/io5";
// import { IoIosLogOut } from "react-icons/io";
// import { NavLink } from "react-router-dom";
// import LogoutModal from "../../Components/Logout/LogoutModal";
// import { TbBrandGoogleAnalytics } from "react-icons/tb";
// import { LiaSalesforce } from "react-icons/lia";

// import { closeSidebar } from "../../Redux/sidebarSlice";

// import { IoClose, IoSearch } from "react-icons/io5";
// import { FaBell } from "react-icons/fa";
// import adminuserimg from "../../Assets/Image/adminuser-img.png";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { LiaToolboxSolid } from "react-icons/lia";
// import { FaBarsStaggered } from "react-icons/fa6";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleSidebar } from "../../Redux/sidebarSlice"; // Redux import
// import DarkMode from "../Darkmode/DarkMode";
// import axios from "axios";
// import { FiBox } from 'react-icons/fi'
// import { BiLeftArrow, BiLogoPlayStore, BiRightArrow, BiUserPlus } from 'react-icons/bi'
// import { CiSettings } from "react-icons/ci";

// const StyledButton = styled.button`
//   width: 100%;
//   background: white;
//   color: red;
//   font-size: 14px;
//   line-height: 20px;
//   border: none;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   justify-content: center;
//   margin-top: 130px;
//   transition: 0.5s;
//   &:hover {
//     color: black;
//   }
// `;
// const Tooltip = styled.div`
//   position: absolute;
//   left: 50px;
//   background: black;
//   color: white;
//   padding: 5px 10px;
//   border-radius: 5px;
//   font-size: 12px;
//   white-space: nowrap;
//   opacity: 0;
//   visibility: hidden;
//   transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
// `;

// const IconWrapper = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   cursor: pointer;

//   @media (max-width: 768px) {
//     &:hover ${Tooltip} {
//       opacity: 1;
//       visibility: visible;
//     }
//   }

//   @media (min-width: 769px) {
//     &:hover ${Tooltip} {
//       opacity: 0 !important;
//       visibility: hidden !important;
//     }
//   }
// `;


// const AdminLayouts = () => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const isOpen = useSelector((state) => state.adminsidebar.isOpen);
//   console.log("Sidebar Open State:", isOpen);
//   const dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [adminProfile, setAdminProfile] = useState(null)
//   const navigate = useNavigate();
//   const isDarkMode = document.body.getAttribute("data-theme") === "dark";

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Agar sidebar open hai aur click sidebar, toggle button ya close button ke bahar ho
//       if (
//         isOpen &&
//         !event.target.closest(".adminsidebar") &&
//         !event.target.closest(".adminsidebartoggle") &&
//         !event.target.closest(".adminclosetoggle")
//       ) {
//         dispatch(closeSidebar());
//       }
//     };

//     // Event listener add karna
//     document.addEventListener("click", handleClickOutside);

//     // Cleanup function jo component unmount hone par listener remove karega
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [isOpen, dispatch]);

//   //fetch profile dynamically
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const userId = localStorage.getItem("userId")
//         const response = await axios.get(`${BASE_URL}/api/users/profile/${userId}`);
//         console.log("Fetch user data from admin layout:", response.data);
//         setAdminProfile({
//           ...adminProfile,
//           name: response.data.name || "",
//           profileImage: response.data.profileImage || ""
//         })
//       } catch (error) {
//         console.error("Error fetching profile image:", error)
//       }
//     }
//     fetchProfile();
//   }, [])

//   // image change
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("profileImage", file)
//     const userId = localStorage.getItem("userId")
//     try {
//       const response = await axios.put(`${BASE_URL}/api/users/profileImage/${userId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       //update state with new image
//       setAdminProfile((prev) => ({
//         ...prev,
//         profileImage: response.data.profileImage
//       }))
//     } catch (error) {
//       console.error('Error while updating profile image', error)
//     }
//   }
//   return (
//     <>
//       <div>
//         <div className="adminpanelsection d-flex">
//           <div className={`adminsidebar ${isOpen ? "open" : ""} ${isDarkMode ? "dark" : ""}`}>
//             <div
//               className="adminclosetoggle"
//               onClick={() => dispatch(closeSidebar())}
//             >
//               <IoClose />
//             </div>

//             <Link to='/home'>
//               <div className="adminsidebar-logo">
//                 <img src={sidebarlogo} alt="sidebarlogo" />
//                 <span>PlayPalooza</span>
//               </div>
//             </Link>
//             <div className="adminnavlink">
//               <ul>
//                 <NavLink to="dashboard" style={{ color: "black" }}>
//                   {({ isActive }) => (
//                     <li className={isActive ? "active" : "inactive"}>
//                       <IconWrapper>
//                         <MdOutlineDashboard />
//                         <Tooltip>Dashboard</Tooltip>
//                       </IconWrapper>
//                       <span>Dashboard</span>
//                     </li>
//                   )}
//                 </NavLink>

//                 <NavLink to="products" style={{ color: "black" }}>
//                   {({ isActive }) => (
//                     <li className={isActive ? "active" : "inactive"}>
//                       <IconWrapper>
//                         <LiaToolboxSolid />
//                         <Tooltip>Products</Tooltip>
//                       </IconWrapper>
//                       <span>Products</span>
//                     </li>
//                   )}
//                 </NavLink>

//                 <NavLink to="users" style={{ color: "black" }}>
//                   {({ isActive }) => (
//                     <li className={isActive ? "active" : "inactive"}>
//                       <IconWrapper>
//                         <BiUserPlus />
//                         <Tooltip>Users</Tooltip>
//                       </IconWrapper>
//                       <span>Users</span>
//                     </li>
//                   )}
//                 </NavLink>

//                 <NavLink to="categories" style={{ color: "black" }}>
//                   {({ isActive }) => (
//                     <li className={isActive ? "active" : "inactive"}>
//                       <IconWrapper>
//                         <MdOutlineCategory />
//                         <Tooltip>Categories</Tooltip>
//                       </IconWrapper>
//                       <span>Categories</span>
//                     </li>
//                   )}
//                 </NavLink>

//                 <NavLink to="orderspage" style={{ color: "black" }}>
//                   {({ isActive }) => (
//                     <li className={isActive ? "active" : "inactive"}>
//                       <IconWrapper>
//                         <FiBox />
//                         <Tooltip>Orders</Tooltip>
//                       </IconWrapper>
//                       <span>Orders</span>
//                     </li>
//                   )}
//                 </NavLink>

//                 <NavLink to="sales" style={{ color: "black" }}>
//                   {({ isActive }) => (
//                     <li className={isActive ? "active" : "inactive"}>
//                       <IconWrapper>
//                         <LiaSalesforce />
//                         <Tooltip>Sales</Tooltip>
//                       </IconWrapper>
//                       <span>Sales</span>
//                     </li>
//                   )}
//                 </NavLink>

//                 <NavLink to="stocks" style={{ color: "black" }}>
//                   {({ isActive }) => (
//                     <li className={isActive ? "active" : "inactive"}>
//                       <IconWrapper>
//                         <BiRightArrow />
//                         <Tooltip>Stocks</Tooltip>
//                       </IconWrapper>
//                       <span>Stocks</span>
//                     </li>
//                   )}
//                 </NavLink>

//                 {/* <NavLink to="customers" style={{ color: "black" }}>
//                 {({ isActive }) => (
//                   <li className={isActive ? "active" : "inactive"}>
//                     <IconWrapper>
//                       <RiCustomerService2Line />
//                       <Tooltip>Customers</Tooltip>
//                     </IconWrapper>
//                     <span>Customers</span>
//                   </li>
//                 )}
//               </NavLink> */}

//                 <NavLink to="analytics" style={{ color: "black" }}>
//                   {({ isActive }) => (
//                     <li className={isActive ? "active" : "inactive"}>
//                       <IconWrapper>
//                         <TbBrandGoogleAnalytics  />
//                         <Tooltip>Analytics</Tooltip>
//                       </IconWrapper>
//                       <span>Analytics</span>
//                     </li>
//                   )}
//                 </NavLink>

//                 {/* <NavLink to="notifications" style={{ color: "black" }}>
//                 {({ isActive }) => (
//                   <li className={isActive ? "active" : "inactive"}>
//                     <IconWrapper>
//                       <IoNotifications />
//                       <Tooltip>Notifications</Tooltip>
//                     </IconWrapper>
//                     <span>Notifications</span>
//                   </li>
//                 )}
//               </NavLink> */}

//                 <NavLink to="newofferprouct" style={{ color: "black" }}>
//                   {({ isActive }) => (
//                     <li className={isActive ? "active" : "inactive"}>
//                       <IconWrapper>
//                         <CiSettings />
//                         <Tooltip>Settings</Tooltip>
//                       </IconWrapper>
//                       <span>Settings</span>
//                     </li>
//                   )}
//                 </NavLink>
//               </ul>
//             </div>

//             <div className="sidebarnotes-card">
//               <p style={{ fontSize: "14px" }}>
//                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
//                 non!
//               </p>
//               <button className="sidebarnotifybtn">Notify</button>
//             </div>

//             <div className="adminsidebar-logoutbtn" style={{ backgroundColor: 'transparent' }}>
//               <StyledButton style={{ backgroundColor: 'transparent', color: 'black' }}
//                 onClick={() =>
//                   isAuthenticated ? setIsModalOpen(true) : navigate("/login")
//                 }
//               >
//                 <IoIosLogOut style={{ fontSize: "17px" }} />
//                 {isAuthenticated ? (
//                   <span className="adminsidbarlogoutbt">Logout</span>
//                 ) : (
//                   <span>Login</span>
//                 )}
//               </StyledButton>
//               <LogoutModal
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//               />
//             </div>
//           </div>

//           <div className="admin-main-content w-100" style={{ padding: '' }}>
//             <div className="adminheader">
//               {!isOpen && (
//                 <div
//                   className="adminsidebartoggle"
//                   onClick={() => dispatch(toggleSidebar())}
//                 >
//                   <FaBarsStaggered />
//                 </div>
//               )}
//               <div className="admintitle fs-3">Overview</div>

//               <div className="adminsearchbx">
//                 <IoSearch />
//                 <input type="text" placeholder="Search here..." />
//               </div>
//               <div className="adminuserid">
//                 {/* <div className="adminmode">
//               <MdModeNight/>
//               </div> */}
//                 <DarkMode />
//                 <div className="adminimg" onClick={() => document.getElementById("uploadInput").click()} style={{ cursor: 'pointer' }}>
//                   <input type="file" id="uploadInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
//                   <img className="img-fluid" style={{ width: '35px', height: '35px', objectFit: 'cover' }} src={adminProfile?.profileImage ? `${BASE_URL}/profileImage/${adminProfile.profileImage}` : "https://i.pinimg.com/originals/78/71/71/78717192789208dfbf61261f4625da35.jpg"} alt="admin" />
//                 </div>
//                 <label htmlFor="">
//                   {adminProfile?.name} <RiArrowDropDownLine />
//                 </label>
//                 <FaBell style={{ color: "#dece91" }} />
//               </div>
//             </div>
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminLayouts;




import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import sidebarlogo from "../../Assets/Image/website-logo.png";
import "../AdminPanels/AdminPanels.css";
import { MdOutlineDashboard } from "react-icons/md";
import { LiaToolboxSolid } from "react-icons/lia";
import { RiUserShared2Fill } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { LiaSalesforce } from "react-icons/lia";
import { RiCustomerService2Line } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import LogoutModal from "../../Components/Logout/LogoutModal";

import { closeSidebar } from "../../Redux/sidebarSlice";

import { IoClose, IoSearch } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import adminuserimg from "../../Assets/Image/adminuser-img.png";
import { RiArrowDropDownLine } from "react-icons/ri";

import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../Redux/sidebarSlice"; // Redux import
import DarkMode from "../Darkmode/DarkMode";
import axios from "axios";
import { FiBox } from "react-icons/fi";
import { BiUserPlus } from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import BASE_URL from "../../config/config";

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
  justify-content: center;
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
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    &:hover ${Tooltip} {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (min-width: 769px) {
    &:hover ${Tooltip} {
      opacity: 0 !important;
      visibility: hidden !important;
    }
  }
`;

const AdminLayouts = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isOpen = useSelector((state) => state.adminsidebar.isOpen);
  console.log("Sidebar Open State:", isOpen);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);
  const navigate = useNavigate();
  const isDarkMode = document.body.getAttribute("data-theme") === "dark";

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

  //fetch profile dynamically
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`
          ${BASE_URL}/api/users/profile/${userId}`
        );
        console.log("Fetch user data from admin layout:", response.data);
        setAdminProfile({
          ...adminProfile,
          name: response.data.name || "",
          profileImage: response.data.profileImage || "",
        });
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    fetchProfile();
  }, []);

  // image change
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profileImage", file);
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.put(`
        ${BASE_URL}/api/users/profileImage/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //update state with new image
      setAdminProfile((prev) => ({
        ...prev,
        profileImage: response.data.profileImage,
      }));
    } catch (error) {
      console.error("Error while updating profile image", error);
    }
  };
  return (
    <>
      <div>
        <div className="adminpanelsection d-flex">
          <div
            className={`adminsidebar ${isOpen ? "open" : ""} ${
              isDarkMode ? "dark" : ""
            }`}
          >
            <div
              className="adminclosetoggle"
              onClick={() => dispatch(closeSidebar())}
            >
              <IoClose />
            </div>

            <Link to="/home">
              <div className="adminsidebar-logo">
                <img src={sidebarlogo} alt="sidebarlogo" />
                <span>PlayPalooza</span>
              </div>
            </Link>
            <div className="adminnavlink">
              <ul>
                <NavLink to="dashboard" style={{ color: "black" }}>
                  {({ isActive }) => (
                    <li className={isActive ? "active" : "inactive"}>
                      <IconWrapper>
                        <MdOutlineDashboard />
                        <Tooltip>Dashboard</Tooltip>
                      </IconWrapper>
                      <span>Dashboard</span>
                    </li>
                  )}
                </NavLink>

                <NavLink to="products" style={{ color: "black" }}>
                  {({ isActive }) => (
                    <li className={isActive ? "active" : "inactive"}>
                      <IconWrapper>
                      <LiaToolboxSolid />
                        <Tooltip>Products</Tooltip>
                      </IconWrapper>
                      <span>Products</span>
                    </li>
                  )}
                </NavLink>

                <NavLink to="users" style={{ color: "black" }}>
                  {({ isActive }) => (
                    <li className={isActive ? "active" : "inactive"}>
                      <IconWrapper>
                        <BiUserPlus />
                        <Tooltip>Users</Tooltip>
                      </IconWrapper>
                      <span>Users</span>
                    </li>
                  )}
                </NavLink>

                <NavLink to="categories" style={{ color: "black" }}>
                  {({ isActive }) => (
                    <li className={isActive ? "active" : "inactive"}>
                      <IconWrapper>
                        <MdOutlineCategory />
                        <Tooltip>Categories</Tooltip>
                      </IconWrapper>
                      <span>Categories</span>
                    </li>
                  )}
                </NavLink>

                <NavLink to="orderspage" style={{ color: "black" }}>
                  {({ isActive }) => (
                    <li className={isActive ? "active" : "inactive"}>
                      <IconWrapper>
                        <FiBox />
                        <Tooltip>Orders</Tooltip>
                      </IconWrapper>
                      <span>Orders</span>
                    </li>
                  )}
                </NavLink>

                <NavLink to="sales" style={{ color: "black" }}>
                  {({ isActive }) => (
                    <li className={isActive ? "active" : "inactive"}>
                      <IconWrapper>
                      <LiaSalesforce />
                        <Tooltip>Sales</Tooltip>
                      </IconWrapper>
                      <span>Sales</span>
                    </li>
                  )}
                </NavLink>

                <NavLink to="stocks" style={{ color: "black" }}>
                  {({ isActive }) => (
                    <li className={isActive ? "active" : "inactive"}>
                      <IconWrapper>
                        <BsBox />
                        <Tooltip>Sales</Tooltip>
                      </IconWrapper>
                      <span>Stocks</span>
                    </li>
                  )}
                </NavLink>

                {/* <NavLink to="customers" style={{ color: "black" }}>
                {({ isActive }) => (
                  <li className={isActive ? "active" : "inactive"}>
                    <IconWrapper>
                      <RiCustomerService2Line />
                      <Tooltip>Customers</Tooltip>
                    </IconWrapper>
                    <span>Customers</span>
                  </li>
                )}
              </NavLink> */}

                <NavLink to="analytics" style={{ color: "black" }}>
                  {({ isActive }) => (
                    <li className={isActive ? "active" : "inactive"}>
                      <IconWrapper>
                      <TbBrandGoogleAnalytics />
                        <Tooltip>Analytics</Tooltip>
                      </IconWrapper>
                      <span>Analytics</span>
                    </li>
                  )}
                </NavLink>

                {/* <NavLink to="notifications" style={{ color: "black" }}>
                {({ isActive }) => (
                  <li className={isActive ? "active" : "inactive"}>
                    <IconWrapper>
                      <IoNotifications />
                      <Tooltip>Notifications</Tooltip>
                    </IconWrapper>
                    <span>Notifications</span>
                  </li>
                )}
              </NavLink> */}

                <NavLink to="newofferprouct" style={{ color: "black" }}>
                  {({ isActive }) => (
                    <li className={isActive ? "active" : "inactive"}>
                      <IconWrapper>
                      <CiSettings />
                        <Tooltip>Settings</Tooltip>
                      </IconWrapper>
                      <span>Settings</span>
                    </li>
                  )}
                </NavLink>
              </ul>
            </div>

            <div className="sidebarnotes-card">
              <p style={{ fontSize: "14px" }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                non!
              </p>
              <button className="sidebarnotifybtn">Notify</button>
            </div>

            <div
              className="adminsidebar-logoutbtn"
              style={{ backgroundColor: "transparent" }}
            >
              <StyledButton
                style={{ backgroundColor: "transparent", color: "black" }}
                onClick={() =>
                  isAuthenticated ? setIsModalOpen(true) : navigate("/login")
                }
              >
                <IoIosLogOut style={{ fontSize: "17px" }} />
                {isAuthenticated ? (
                  <span className="adminsidbarlogoutbt">Logout</span>
                ) : (
                  <span>Login</span>
                )}
              </StyledButton>
              <LogoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          </div>

          <div className="admin-main-content w-100" style={{ padding:" " }}>
            <div className="adminheader">
              {!isOpen && (
                <div
                  className="adminsidebartoggle"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  <FaBarsStaggered />
                </div>
              )}
              <div className="admintitle fs-3">Overview</div>

              <div className="adminsearchbx">
                <IoSearch />
                <input type="text" placeholder="Search here..." />
              </div>
              <div className="adminuserid">
                {/* <div className="adminmode">
              <MdModeNight/>
              </div> */}
                <DarkMode />
                <div
                  className="adminimg"
                  onClick={() => document.getElementById("uploadInput").click()}
                  style={{ cursor: "pointer" }}
                >
                  <input
                    type="file"
                    id="uploadInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <img
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={
                      adminProfile?.profileImage
                        ? `${BASE_URL}/profileImage/${adminProfile.profileImage}`
                        : "https://i.pinimg.com/originals/78/71/71/78717192789208dfbf61261f4625da35.jpg"
                    }
                    alt="admin"
                  />
                </div>
                <label htmlFor="">
                  {adminProfile?.name} <RiArrowDropDownLine />
                </label>
                <FaBell style={{ color: "#dece91" }} />
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayouts;
