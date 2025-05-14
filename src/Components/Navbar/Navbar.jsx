import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import "./Navbarr.css";
import { BiChevronDown } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import Website from "../../Assets/Image/website-logo.png";
import { GiDuck } from "react-icons/gi";
import { BsArrowRight } from "react-icons/bs"; //icon
import { BiBookAlt } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi";
import { GiComb } from "react-icons/gi";
import { RiArrowDropDownLine, RiDashboardLine } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css"; //mention this
import { Link, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import Flag from "../../Assets/Image/indianflag.png";
import Model from "../Profile/Model";
import { CartState } from "../../context/Context";
import { CiHeart } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { RiTShirtAirLine } from "react-icons/ri";
import { GiSonicShoes } from "react-icons/gi";
import { MdOutlineSportsHandball } from "react-icons/md";
import DarkMode from "../Darkmode/DarkMode";

const Navbars = ({ user }) => {
  const [showChoice, setShowChoice] = useState(false)
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  // const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
  //   useAuth0();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleIconClick = () => {
    setShowModal(!showModal);
  };
  const { state } = CartState();  //to access cart items

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };
  useEffect(() => {
    if (showModal) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showModal]);

  const handleRedirect = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  };


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"))
    if (userData?.role?.toLowerCase() === "admin") {
      setShowChoice(true)
    } else {
      setShowChoice(false)
    }
  }, [user]);


  return (
    <>
      <div>
        <div className="mobile bg-body-tertiary">
          {/* 1st div */}
          <div className="" style={{ display: "flex", gap: "10px" }}>
            <span>
              <FiPhoneCall style={{ fontSize: "22px", color: "var(--svg-color)" }} />
            </span>
            <span className="topheader2num">+91 8888 4444 20</span>
          </div>
          {/* 2nd div */}
          <div className="" style={{ display: "flex", gap: "10px" }}>
            <span>
              <FaCarSide style={{ color: "#f9c542", fontSize: "30px" }} />
            </span>
            <span className="topheader2txt">
              Free shipping on orders above 799
            </span>
            <span className="px-2" style={{ color: "var(--text-color)" }}>
              English
              <BiChevronDown />
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center bg-body-tertiary login d-none d-sm-block d-md-none d-lg-flex">
          <Link
            to="/"
            className="logo d-flex align-items-center "
            style={{ color: "#353535" }}
          >
            <img src={Website} alt="" />
            <span className="navbar-brand p-0">PlayPaloozo</span>
          </Link>
          <div className="d-flex align-items-center gap-3">
            <DarkMode />
            <div className="d-flex align-items-center gap-3 searchdiv">
              <span
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "var(--nav-textcolor)",
                  padding: "6px",
                  borderRadius: "10px",
                  fontSize: "20px",
                  width: "35px",
                  height: "35px",
                  color: "var(--text-color)"
                }}
              >
                <CiSearch />
              </span>
              {showChoice && (
                <span
                  onClick={() => navigate("/admin/dashboard")}
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "var(--nav-textcolor)",
                    padding: "6px",
                    borderRadius: "10px",
                    fontSize: "20px",
                    width: "35px",
                    height: "35px",
                    color: "var(--text-color)",
                    cursor: "pointer"
                  }}
                >
                  <RiDashboardLine />
                </span>
              )}

              {/* {showChoice && user?.role === "admin" && (
                <span
                  onClick={() => navigate("/admin/dashboard")}
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "var(--nav-textcolor)",
                    padding: "6px",
                    borderRadius: "10px",
                    fontSize: "20px",
                    width: "35px",
                    height: "35px",
                    color: "var(--text-color)",
                    cursor: "pointer",
                  }}
                >
                  <RiDashboardLine />
                </span>
              )} */}
              <span
                className="d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "var(--nav-textcolor)",
                  padding: "2px",
                  borderRadius: "10px",
                  fontSize: "20px",
                  width: "50px",
                  height: "35px",
                  color: "var(--text-color)"
                }}
              >
                {" "}
                <img src={Flag} alt="" className="" style={{ width: "20px" }} />
                <RiArrowDropDownLine style={{ fontSize: "30px" }} />
              </span>
              <div
                style={{ position: "relative", display: "inline-block" }}
                ref={modalRef}
              >
                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "var(--nav-textcolor)",
                    padding: "6px",
                    borderRadius: "10px",
                    fontSize: "20px",
                    width: "35px",
                    height: "35px",
                    cursor: "pointer",
                    color: "var(--text-color)"
                  }}
                  onClick={handleIconClick}
                >
                  <CiUser />
                </span>
                {showModal && (
                  <div
                    style={{
                      position: "absolute",
                      top: "80%",
                      left: "0",
                      marginTop: "8px",
                      backgroundColor: "#fffff",
                      zIndex: "1000",
                      padding: "10px",
                      opacity: "50px",
                    }}
                  >
                    <Model />
                  </div>
                )}
              </div>
              <div
                onClick={() => handleRedirect("/whislist")}
                className="d-flex align-items-center justify-content-center position-relative"
                style={{
                  backgroundColor: "var(--nav-textcolor)",
                  padding: "6px",
                  borderRadius: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "var(--text-color)"
                }}
              >
                <CiHeart
                  className=""
                  style={{ fontSize: "22px", textAlign: "center" }}
                />
                <span
                  className="absolute text-white rounded-full d-flex justify-content-center align-items-center"
                  style={{
                    backgroundColor: "red",
                    marginTop: "-19px",
                    right: "1/2",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    fontSize: "14px",
                    marginLeft: "-5px",
                  }}
                >
                  {wishlist?.length > 0 ? wishlist.length : 0}

                </span>
              </div>

              <div
                onClick={() => handleRedirect("/cart")}
                className="d-flex align-items-center justify-content-center position-relative"
                style={{
                  backgroundColor: "var(--nav-textcolor)",
                  padding: "6px",
                  borderRadius: "10px",
                  fontSize: "20px",
                  width: "50px",
                  height: "35px",
                  cursor: "pointer",
                  color: "var(--text-color)"
                }}
              >
                <CiShoppingCart className="" style={{ fontSize: "22px" }} />
                <Link to="" className="p-0 m-0">
                  <span
                    className="absolute  text-white  rounded-full d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: "red",
                      marginTop: "-19px",
                      right: "1/2",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      fontSize: "14px",
                      marginLeft: "-5px",
                    }}
                  >
                    {state.cart.length || 0}
                    {/* {console.log('state.cart', state.cart)} */}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid navbarrtwobottom">
              <div className="logos d-flex align-items-center d-lg-none">
                <img src={Website} alt="" />
                <a className="navbar-brand p-0 web_title" href="/">
                  PlayPaloozo
                </a>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0 navbar_ul">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      <Link
                        to={"/"}
                        style={{ fontSize: "20px", color: "#333946" }}
                      >
                        <span> Home</span>
                      </Link>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span> Categories</span>
                    </a>
                    <ul className="dropdown-menu">
                      <span className="d-flex align-items-center justify-content-around px-3 w-75">
                        <GiDuck
                          style={{ color: "#8565d1", fontSize: "25px" }}
                        />
                        Toys{" "}
                        <span
                          style={{
                            color: "#4ba37d",
                            backgroundColor: "#ecfdf3",
                          }}
                        >
                          New
                        </span>
                      </span>

                      <span>
                        <Link
                          to="/product/toy" // Use the path defined in your routes
                          style={{
                            textAlign: "center",
                            color: "#8565d1",
                            fontWeight: "600",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "block",
                            fontSize: "16px",

                            // marginBottom: "1rem",
                          }}
                        >
                          <p style={{ padding: "10px 40px" }}>
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>
                      <span className="d-flex align-items-center justify-content-around px-3 w-75">
                        <BiBookAlt
                          style={{ color: "#8565d1", fontSize: "25px" }}
                        />
                        Stationary{" "}
                      </span>
                      <span>
                        <Link to="/product/stationary">
                          <p
                            style={{
                              textAlign: "center",
                              color: "#8565d1",
                              fontWeight: "600",
                              borderRadius: "10px",
                              padding: "10px 40px",
                            }}
                          >
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>

                      <span className="d-flex align-items-center justify-content-around px-3 w-80">
                        <GiComb
                          className="mx-2"
                          style={{ color: "#8565d1", fontSize: "25px" }}
                        />{" "}
                        Hair Access{" "}
                        <span
                          className="mx-2"
                          style={{
                            color: "#4ba37d",
                            backgroundColor: "#ecfdf3",
                          }}
                        >
                          New
                        </span>{" "}
                      </span>
                      <span>
                        <span>
                          <Link to="/product/Hairaccess">
                            <p
                              style={{
                                textAlign: "center",
                                color: "#8565d1",
                                fontWeight: "600",
                                borderRadius: "10px",
                                padding: "10px 40px",
                              }}
                            >
                              See more <BsArrowRight />
                            </p>
                          </Link>
                        </span>
                      </span>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span> Boys</span>
                    </a>
                    <ul className="dropdown-menu">
                      <span className="boy-category ">
                        <RiTShirtAirLine
                          style={{ color: "#8565d1", fontSize: "25px" }}
                        />
                        Topwear{" "}
                        <span
                          style={{
                            color: "#4ba37d",
                            backgroundColor: "#ecfdf3",
                          }}
                        >
                          New
                        </span>
                      </span>
                      <span>
                        <Link
                          to="/product/Boys/Topwear" // Use the path defined in your routes
                          style={{
                            textAlign: "center",
                            color: "#8565d1",
                            fontWeight: "600",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "block",
                            fontSize: "16px",

                            // marginBottom: "1rem",
                          }}
                        >
                          <p style={{}}>
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>

                      <span className="boy-category">
                        <MdOutlineSportsHandball
                          style={{
                            color: "#8565d1",
                            fontSize: "25px",
                            margin: "0px",
                          }}
                        />
                        Sportswear{" "}
                        <span
                          style={{
                            color: "#4ba37d",
                            backgroundColor: "#ecfdf3",
                          }}
                        >
                          New
                        </span>
                      </span>

                      <span>
                        <Link
                          to="/product/Boys/sportswear" // Use the path defined in your routes
                          style={{
                            textAlign: "center",
                            color: "#8565d1",
                            fontWeight: "600",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "block",
                            fontSize: "16px",
                            padding: "1px 40px",
                            // marginBottom: "1rem",
                          }}
                        >
                          <p style={{}}>
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>

                      <span className="shoes-category">
                        <GiSonicShoes
                          className="mx-2"
                          style={{ color: "#8565d1", fontSize: "25px" }}
                        />{" "}
                        Footwear{" "}
                        <span
                          className="mx-2"
                          style={{
                            color: "#4ba37d",
                            backgroundColor: "#ecfdf3",
                          }}
                        >
                          New
                        </span>{" "}
                      </span>

                      <span>
                        <Link
                          to="/product/Boys/Footwear" // Use the path defined in your routes
                          style={{
                            textAlign: "center",
                            color: "#8565d1",
                            fontWeight: "600",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "block",
                            fontSize: "16px",
                            padding: "0px 40px",
                            // marginBottom: "1rem",
                          }}
                        >
                          <p style={{}}>
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span> Girls</span>
                    </a>
                    <ul className="dropdown-menu">
                      <span className="girls-category">
                        <RiTShirtAirLine
                          style={{ color: "#8565d1", fontSize: "25px" }}
                        />
                        Topwear{" "}
                        <span
                          style={{
                            color: "#4ba37d",
                            backgroundColor: "#ecfdf3",
                          }}
                        >
                          New
                        </span>
                      </span>
                      <span>
                        <Link
                          to="/product/Girls/Topwear" // Use the path defined in your routes
                          style={{
                            textAlign: "center",
                            color: "#8565d1",
                            fontWeight: "600",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "block",
                            fontSize: "16px",
                            padding: "1px 40px",
                            // marginBottom: "1rem",
                          }}
                        >
                          <p style={{}}>
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>

                      <span className="girls-category">
                        <MdOutlineSportsHandball
                          style={{
                            color: "#8565d1",
                            fontSize: "25px",
                            margin: "0px",
                          }}
                        />
                        Sportswear{" "}
                      </span>
                      <span>
                        <Link
                          to="/product/Girls/SportsWear" // Use the path defined in your routes
                          style={{
                            textAlign: "center",
                            color: "#8565d1",
                            fontWeight: "600",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "block",
                            fontSize: "16px",
                            padding: "0px 40px",
                            // marginBottom: "1rem",
                          }}
                        >
                          <p style={{}}>
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>
                      <span className="shoes-category">
                        <GiSonicShoes
                          className="mx-2"
                          style={{ color: "#8565d1", fontSize: "25px" }}
                        />{" "}
                        Footwear{" "}
                        <span
                          className="mx-2"
                          style={{
                            color: "#4ba37d",
                            backgroundColor: "#ecfdf3",
                          }}
                        >
                          New
                        </span>{" "}
                      </span>
                      <span>
                        <Link
                          to="/product/Girls/Footwear" // Use the path defined in your routes
                          style={{
                            textAlign: "center",
                            color: "#8565d1",
                            fontWeight: "600",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "block",
                            fontSize: "16px",
                            padding: "5px 40px",
                            // marginBottom: "1rem",
                          }}
                        >
                          <p style={{}}>
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span> kids</span>
                    </a>
                    <ul className="dropdown-menu">
                      <span className="kids-category">
                        <RiTShirtAirLine
                          style={{ color: "#8565d1", fontSize: "25px" }}
                        />
                        Topwear{" "}
                        <span
                          style={{
                            color: "#4ba37d",
                            backgroundColor: "#ecfdf3",
                          }}
                        >
                          New
                        </span>
                      </span>
                      <span>
                        <Link
                          to="/product/kids/Topwear" // Use the path defined in your routes
                          style={{
                            textAlign: "center",
                            color: "#8565d1",
                            fontWeight: "600",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "block",
                            fontSize: "16px",
                            padding: "1px 40px",
                            // marginBottom: "1rem",
                          }}
                        >
                          <p style={{}}>
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>

                      <span className="kids-category">
                        <MdOutlineSportsHandball
                          style={{
                            color: "#8565d1",
                            fontSize: "25px",
                            margin: "0px",
                          }}
                        />
                        Toys{" "}
                      </span>
                      <span>
                        <Link
                          to="/product/kids/toy" // Use the path defined in your routes
                          style={{
                            textAlign: "center",
                            color: "#8565d1",
                            fontWeight: "600",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "block",
                            fontSize: "16px",
                            padding: "0px 40px",
                            // marginBottom: "1rem",
                          }}
                        >
                          <p style={{}}>
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>

                      <span className="shoes-category">
                        <GiSonicShoes
                          className="mx-2"
                          style={{ color: "#8565d1", fontSize: "25px" }}
                        />{" "}
                        Footwear{" "}
                        <span
                          className="mx-2"
                          style={{
                            color: "#4ba37d",
                            backgroundColor: "#ecfdf3",
                          }}
                        >
                          New
                        </span>{" "}
                      </span>
                      <span>
                        <Link
                          to="/product/kids/Footwear" // Use the path defined in your routes
                          style={{
                            textAlign: "center",
                            color: "#8565d1",
                            fontWeight: "600",
                            borderRadius: "10px",
                            textDecoration: "none",
                            display: "block",
                            fontSize: "16px",
                            padding: "5px 40px",
                            // marginBottom: "1rem",
                          }}
                        >
                          <p style={{}}>
                            See more <BsArrowRight />
                          </p>
                        </Link>
                      </span>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#">
                      <Link
                        to="/product/stationary"
                        style={{ color: "#000000A6" }}
                      >
                        <span> Stationary</span>
                      </Link>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbars;
