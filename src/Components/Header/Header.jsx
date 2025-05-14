import React from "react";
import "../Header/Header.css";
import { FiPhoneCall } from "react-icons/fi";
import { FaCarSide } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css"; //mention this
// import { RiGlobalLine } from 'react-icons/ri'  //icon
import { BsArrowRight } from "react-icons/bs"; //icon
import { GiDuck } from "react-icons/gi";
import { BiBookAlt } from 'react-icons/bi'
import { BiShoppingBag } from "react-icons/bi";
import { GiComb } from "react-icons/gi";
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <div className="container-fluid header">
      <div className="row align-items-center">
        <div className="mobile">
          {/* 1st div */}
          <div className="" style={{ display: "flex", gap: "10px" }}>
            <p>
              <FiPhoneCall style={{fontSize: "22px"}}/>
            </p>
            <p>+91 8888 4444 20</p>
          </div>
          {/* 2nd div */}
          <div className="" style={{ display: "flex", gap: "10px" }}>
            <p>
              <FaCarSide style={{ color: "#f9c542", fontSize: "30px" }} />
            </p>
            <p className="">Free shipping on orders above 799</p>
            <p className="px-2">
              English
              <BiChevronDown />
            </p>
          </div>
        </div>
        {/* Navbar */}
        <Navbar expand="lg" className="p-4 text-black navbar-custom">
          <Container fluid>
            <Navbar.Brand href="#" className="logo">
              PlayPalooza
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#action2">Home</Nav.Link>
                <NavDropdown title="Categories" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action1" className="toydropdown">
                    <span className="d-flex align-items-center justify-content-around px-3 w-75">
                    <GiDuck style={{ color: "#8565d1", fontSize:'25px' }} />
                    Toys{" "}
                    <span
                      style={{ color: "#4ba37d", backgroundColor: "#ecfdf3" }}
                    >
                      New
                    </span>
                    </span>
                    {/* <span>  
                    <p
                      style={{
                        textAlign: "center",
                        color: "#8565d1",
                        fontWeight: "600",
                        borderRadius: "10px",
                      }}
                    >
                     <a href={<Toys.jsx/>}> See more <BsArrowRight /></a>
                    </p>
                    </span> */}
                    <span>
                      <Link
                        to="/toys" // Use the path defined in your routes
                        style={{
                          textAlign: "center",
                          color: "#8565d1",
                          fontWeight: "600",
                          borderRadius: "10px",
                          textDecoration: 'none',
                          display: 'block',
                          padding: '10px'
                        }}
                      >
                        <p style={{ margin: 0 }}>
                          See more <BsArrowRight />
                        </p>
                      </Link>
                    </span>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action2" className="toydropdown">
                  <span className="d-flex align-items-center justify-content-around px-3 w-75">
                    <BiBookAlt
                      style={{ color: "#8565d1", fontSize:'25px'}}
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
                    
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action3" className="toydropdown">
                  <span className="d-flex align-items-center justify-content-around px-3 w-80">
                    <GiComb className="mx-2" style={{ color: "#8565d1", fontSize:'25px' }} /> Hair Access{" "}
                    <span className="mx-2"
                      style={{ color: "#4ba37d", backgroundColor: "#ecfdf3" }}
                    >
                      New
                    </span>{" "}
                    </span>
                    <span>
                    <Link
                        to="/hairpage" // Use the path defined in your routes
                        style={{
                          textAlign: "center",
                          color: "#8565d1",
                          fontWeight: "600",
                          borderRadius: "10px",
                          textDecoration: 'none',
                          display: 'block',
                          padding: '10px'
                        }}
                      >
                        <p style={{ margin: 0 }}>
                          See more <BsArrowRight />
                        </p>
                      </Link>
                    </span>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4" className="toydropdown">
                  <span className="d-flex align-items-center justify-content-around px-3  w-75">
                    <BiShoppingBag style={{ color: "#8565d1", fontSize:'25px' }} /> Bag Access
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
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Boy" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Girl" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#action2">Stationary</Nav.Link>
              </Nav>
              <Form className="d-flex" id="Nav-Form">
                <Nav
                  className="me-auto my-2 my-lg-0 navbarScroll"
                  style={{ maxHeight: "100px" }}
                >
                  <Nav.Link href="#action2">Log In</Nav.Link>
                </Nav>
                <Button variant="" className="text-white btn-signup">
                  Shop
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* below row div close */}
      </div>
    </div>
  );
};

export default Header;
