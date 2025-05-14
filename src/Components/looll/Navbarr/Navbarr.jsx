import React, { useState } from "react";
import "../../Components/Navbar1/Navbar.css";
import { BiChevronDown } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import Website from "../../Assets/Image/website-logo.png";
import { GiDuck } from "react-icons/gi";
import { BsArrowRight } from "react-icons/bs"; //icon
import { BiBookAlt } from "react-icons/bi";
import { BiShoppingBag } from "react-icons/bi";
import { GiComb } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";
import "bootstrap/dist/css/bootstrap.min.css"; //mention this
import { Link} from "react-router-dom";
import Login from '../Login/Login'


const Navbars = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const handleShowRegisterModal = () => { setShowRegisterModal(true); handleCloseModal(true) };
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  return (
    <>
      <div>
        <div className="mobile bg-body-tertiary">
          {/* 1st div */}
          <div className="topnav" style={{ display: "flex", gap: "10px" }}>
            <span>
              <FiPhoneCall style={{ fontSize: "22px" }} />
            </span>
            <span className="topheadernumber">+91 8888 4444 20</span>
          </div>
          {/* 2nd div */}
          <div className="" style={{ display: "flex", gap: "10px" }}>
            <span>
              <FaCarSide style={{ color: "#f9c542", fontSize: "30px" }} />
            </span>
            <span className="topheadertxt">Free shipping on orders above 799</span>
            <span className="topheadertxt px-2">
              English
              <BiChevronDown />
            </span>
          </div>
        </div>

        <nav className="navbar  navbar-expand-lg  bg-body-tertiary">
          <div className="container-fluid main-nav">
            <div className="logo d-flex align-items-center ">
              <img src={Website} alt="" />
              <a className="navbar-brand p-0" href="/">
                PlayPalooza
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
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                   <span>Home </span> 
                    
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
                    <span>Categories</span>
                  </a>
                  <ul className="dropdown-menu">
                    <span className="d-flex align-items-center justify-content-around px-3 w-75">
                      <GiDuck style={{ color: "#8565d1", fontSize: "25px" }} />
                      Toys{" "}
                      <span
                        style={{ color: "#4ba37d", backgroundColor: "#ecfdf3" }}
                      >
                        New
                      </span>
                    </span>

                    <span>
                      <Link
                        to="/toys" // Use the path defined in your routes
                        style={{
                          // textAlign: "center",
                          textAlign: "center",
                          color: "#8565d1",
                          fontWeight: "600",
                          // fontSize: "15px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          display: "block",
                          padding: "5px 40px",
                          // marginBottom: "16px"
                        }}
                      >
                        <p >
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
                    <p
                      style={{
                       
                        textAlign: "center",
                        color: "#8565d1",
                        fontWeight: "600",
                        borderRadius: "10px",
                      }}
                    >
                      See more <BsArrowRight />
                    </p>

                    <span className="d-flex align-items-center justify-content-around px-3 w-80">
                      <GiComb
                        className="mx-2"
                        style={{ color: "#8565d1", fontSize: "25px" }}
                      />{" "}
                      Hair Access{" "}
                      <span
                        className="mx-2"
                        style={{ color: "#4ba37d", backgroundColor: "#ecfdf3" }}
                      >
                        New
                      </span>{" "}
                    </span>
                    <span>
                      <Link
                        to="/hairpage" // Use the path defined in your routes
                        style={{
                          // textAlign: "center",
                          textAlign: "center",
                          color: "#8565d1",
                          fontWeight: "600",
                          // fontSize:"15px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          display: "block",
                          padding: "5px 40px",
                          // marginBottom: "16px"
                        }}
                      >
                        <p>
                          See more <BsArrowRight />
                        </p>
                      </Link>
                    </span>
                    <span className="d-flex align-items-center justify-content-around px-3  w-75">
                      <BiShoppingBag
                        style={{ color: "#8565d1", fontSize: "25px" }}
                      />{" "}
                      Bag Access
                    </span>
                    <p
                      style={{
                        textAlign: "center",
                        color: "#8565d1",
                        fontWeight: "600",
                        borderRadius: "10px",
                      }}
                    >
                      See more <BsArrowRight />
                    </p>
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
                  <span>  Boys</span>
                  </a>
                  <ul className="dropdown-menu">
                    <span className="d-flex align-items-center justify-content-around px-3 w-75">
                      <GiDuck style={{ color: "#8565d1", fontSize: "25px" }} />
                      Toys{" "}
                      <span
                        style={{ color: "#4ba37d", backgroundColor: "#ecfdf3" }}
                      >
                        New
                      </span>
                    </span>
                    <span>
                      <p
                        style={{
                          textAlign: "center",
                          color: "#8565d1",
                          fontWeight: "600",
                          borderRadius: "10px",
                        }}
                      >
                        See more <BsArrowRight />
                      </p>
                    </span>

                    <span className="d-flex align-items-center justify-content-around px-3 w-75">
                      <BiBookAlt
                        style={{ color: "#8565d1", fontSize: "25px" }}
                      />
                      Stationary{" "}
                    </span>
                    <p
                      style={{
                        textAlign: "center",
                        color: "#8565d1",
                        fontWeight: "600",
                        borderRadius: "10px",
                      }}
                    >
                      See more <BsArrowRight />
                    </p>

                    <span className="d-flex align-items-center justify-content-around px-3 w-80">
                      <GiComb
                        className="mx-2"
                        style={{ color: "#8565d1", fontSize: "25px" }}
                      />{" "}
                      Hair Access{" "}
                      <span
                        className="mx-2"
                        style={{ color: "#4ba37d", backgroundColor: "#ecfdf3" }}
                      >
                        New
                      </span>{" "}
                    </span>
                    <span>
                      <p
                        style={{
                          textAlign: "center",
                          color: "#8565d1",
                          fontWeight: "600",
                          borderRadius: "10px",
                        }}
                      >
                        See more <BsArrowRight />
                      </p>
                    </span>
                    <span className="d-flex align-items-center justify-content-around px-3  w-75">
                      <BiShoppingBag
                        style={{ color: "#8565d1", fontSize: "25px" }}
                      />{" "}
                      Bag Access
                    </span>
                    <p
                      style={{
                        textAlign: "center",
                        color: "#8565d1",
                        fontWeight: "600",
                        borderRadius: "10px",
                      }}
                    >
                      See more <BsArrowRight />
                    </p>
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
                   <span> Girl</span>
                  </a>
                  <ul className="dropdown-menu">
                    <span className="d-flex align-items-center justify-content-around px-3 w-75">
                      <GiDuck style={{ color: "#8565d1", fontSize: "25px" }} />
                      Toys{" "}
                      <span
                        style={{ color: "#4ba37d", backgroundColor: "#ecfdf3" }}
                      >
                        New
                      </span>
                    </span>
                    <span>
                      <p
                        style={{
                          textAlign: "center",
                          color: "#8565d1",
                          fontWeight: "600",
                          borderRadius: "10px",
                        }}
                      >
                        See more <BsArrowRight />
                      </p>
                    </span>

                    <span className="d-flex align-items-center justify-content-around px-3 w-75">
                      <BiBookAlt
                        style={{ color: "#8565d1", fontSize: "25px" }}
                      />
                      Stationary{" "}
                    </span>
                    <p
                      style={{
                        textAlign: "center",
                        color: "#8565d1",
                        fontWeight: "600",
                        borderRadius: "10px",
                      }}
                    >
                      See more <BsArrowRight />
                    </p>

                    <span className="d-flex align-items-center justify-content-around px-3 w-80">
                      <GiComb
                        className="mx-2"
                        style={{ color: "#8565d1", fontSize: "25px" }}
                      />{" "}
                      Hair Access{" "}
                      <span
                        className="mx-2"
                        style={{ color: "#4ba37d", backgroundColor: "#ecfdf3" }}
                      >
                        New
                      </span>{" "}
                    </span>
                    <span>
                      <p
                        style={{
                          textAlign: "center",
                          color: "#8565d1",
                          fontWeight: "600",
                          borderRadius: "10px",
                        }}
                      >
                        See more <BsArrowRight />
                      </p>
                    </span>
                    <span className="d-flex align-items-center justify-content-around px-3  w-75">
                      <BiShoppingBag
                        style={{ color: "#8565d1", fontSize: "25px" }}
                      />{" "}
                      Bag Access
                    </span>
                    <p
                      style={{
                        textAlign: "center",
                        color: "#8565d1",
                        fontWeight: "600",
                        borderRadius: "10px",
                      }}
                    >
                      See more <BsArrowRight />
                    </p>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                   <span> Stationary</span>
                  </a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <div className="d-flex justify-content-around align-items-center">
                  <div className="d-flex gap-4 seemore">
                    <button
                      className="login-btn"
                      style={{
                        backgroundColor: "transparent",
                        color: "#676969",
                      }}
                      onClick={handleShowModal}
                    >
                      Login
                    </button>
                    <button
                      className="login-btn loginshop"
                      style={{ backgroundColor: "#8565d1", color: "white" }}
                    >
                      Shop
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </nav>
        {/* Modal */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5" }}>
            <div className="modal-content" style={{ maxWidth: '695px', marginLeft: '27%', marginTop: '4%' }}>
              <div className="modal-header">
                <button type="button" className="close btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <Login handleCloseModal={handleCloseModal} handleShowRegisterModal={handleShowRegisterModal} />
              </div>
            </div>
          </div>
        )}

        {showRegisterModal && (
          <div className='modal show d-block' tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5" }}>
            <div className="modal-content" style={{ maxWidth: '659px', margin: '4% auto' }}>
              <div className="modal-header">
                <button type='button' className='btn-close' onClick={handleCloseRegisterModal}></button>
              </div>
              <div className="modal-body">
                <Register handleShowModal={handleShowModal} handleCloseRegisterModal={handleCloseRegisterModal} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbars;