import React, { useState, useEffect } from "react";
import "../Cart/Cart.css";
import { CartState } from "../../../src/context/Context";
import { ListGroup } from "react-bootstrap";
import Carts from "../../Assets/Image/cart.png";
import { Link } from "react-router-dom";
import { AiFillSafetyCertificate } from "react-icons/ai";
// import Deliverypincodemodal from "../Deliverypincodemodal/Deliverypincodemodal";
import QuantitySelector from "../../Components/QuantitySelector/QuantitySelector";
import axios from "axios";
import BASE_URL from "../../config/config";

const Cart = () => {
  const { state, dispatch } = CartState();
  console.log("Cart state:", state.cart);

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState();
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const calculatedSubTotal = state.cart.reduce(
      //this reduce method is for finding sum, minus, divde and multiply
      (acc, curr) => acc + Number(curr.new_price) * curr.quantity,
      0
    );

    const discount = 100;
    const packagingFee = 118;
    const finalTotal = calculatedSubTotal - discount + packagingFee;

    setSubTotal(calculatedSubTotal);
    setTotal(finalTotal);
  }, [state.cart]);

  return (
    <div className=" ">
      <div className=" align-items-center">
        <div className="addcart"></div>
        <div className="addedProduct section-padding">
          <div className="cart-container">
             {/* <div
              className="delivery-details"
              style={{
                display: "flex",
                backgroundColor: "rgb(131 78 243)",
                borderRadius: "6px",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
                padding: "10px 20px",
              }}
            >
              <div
                className="savedaddress"
                style={{ color: "var(--text-color)" }}
              >
                <p className="mb-0" style={{color:'white'}}>From Saved Addresses</p>
              </div>
              <div className="deliverypincode">
                <button
                  onClick={() => setShowPincodeModal(true)}
                  style={{
                    color: "#834ef3",
                    padding: "5px 5px",
                    borderRadius: "4px",
                    border: "1px solid grey",
                    
                  }}
                >
                  Enter Delivery Pincode
                </button>
              </div>
            </div> */}

            {/* Delivery Pincode Modal */}
            {/* <Deliverypincodemodal
              show={showPincodeModal}
              handleClose={() => setShowPincodeModal(false)}
            /> */}
          </div>

        <h2
            className="carttxt"
            style={{
              textAlign: "center",
              backgroundColor: "rgb(131 78 243)",
              color: "white",
              borderRadius: "6px",
            }}
          >
            Cart Items
          </h2>
          <div className="d-flex gap-5 cartcontainer">
            <ListGroup className="list-group" style={{ width: "100%" }}>
              {console.log("stateq", state.cart)}
              {state.cart.length > 0 ? (
                state.cart.map(
                  (item) => (
                    console.log("iteqam", item.image),
                    (
                      <ListGroup.Item
                        key={item.id}
                        className="d-flex justify-content-around align-items-center"
                        style={{
                          background: "var(--section-color",
                          color: "var(--text-color)",
                        }}
                      >
                        <img
                          src={
                            Array.isArray(item.image)
                              ? `${BASE_URL}${item.image[0]?.url}`
                              : item.image_url
                          }
                          alt={item.title}
                          className="cart-item-image"
                          style={{
                            width: "120px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />

                        <div
                          style={{ alignItems: "center" }}
                          className="cart-item-details  d-flex gap-5"
                        >
                          <p style={{ margin: 0 }}>
                            <b>
                              {item.title.length > 15
                                ? item.title.substring(0, 10) + "..."
                                : item.title}
                            </b>
                          </p>
                          <p style={{ margin: 0 }}>
                            {item.subtitle.length > 15
                              ? item.subtitle.substring(0, 10) + "..."
                              : item.subtitle}
                          </p>
                          <p style={{ margin: 0 }}>Price: ₹{item.new_price}</p>
                          <p
                            style={{ margin: 0 }}
                            className="d-flex align-items-center gap-3"
                          >
                            <QuantitySelector
                              value={item.quantity} // Pass current quantity
                              onChange={(newQuantity) => {
                                dispatch({
                                  type: "CHANGE_CART_QUANTITY",
                                  payload: {
                                    _id: item._id,
                                    quantity: newQuantity,
                                  },
                                });
                                // Now update the backend
                                // fetch(
                                //   `${BASE_URL}/api/cart/update-qty`,
                                //   {
                                //     method: "PUT",
                                //     headers: {
                                //       "Content-Type": "application/json",
                                //     },
                                //     body: JSON.stringify({
                                //       qty: newQuantity,
                                //     }),
                                //   }
                                // )
                                    axios.put(`${BASE_URL}/api/cart/update-qty`, 
                                      {_id: item._id, qty: newQuantity, userId: item.userId })
                                      .then(response => console.log("Qunatity updated", response.data))
                                      .catch(error => console.error("Error updating quantity", error) )
                                  // .then((res) => res.json())
                                  // .then((data) =>
                                  //   console.log("Updated in DB:", data)
                                  // )
                                  // .catch((err) =>
                                  //   console.error("Error updating cart:", err)
                                  // );
                              }}
                            />
                          </p>
                        </div>
                        <button
                          className="removebtn"
                          style={{
                            backgroundColor: "#793cfa",
                            color: "white",
                            padding: "7px 14px",
                            borderRadius: "50px",
                            fontSize: "14px",
                          }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: {
                                _id: item._id,
                                userId: item.userId,
                                productId: item.productId,
                              },
                            })
                          }
                        >
                          Remove
                        </button>
                      </ListGroup.Item>
                    )
                  )
                )
              ) : (
                <div
                  className="emptycartcontainer d-flex flex-column align-items-center justify-content-center"
                  style={{ width: "100%" }}
                >
                  <p>
                    <img className="img-fluid" src={Carts} alt="" />
                  </p>
                  <p className="" style={{ fontWeight: "700" }}>
                    Your cart is empty !!
                  </p>
                  <p>Add items to it now.</p>
                  <button className="shopnowbtn">
                    <Link to="/productshowcase" style={{ color: "white" }}>
                      Shop Now
                    </Link>
                  </button>
                </div>
              )}
            </ListGroup>

            <div className="filtersdiv">
              {state.cart.length > 0 && (
                <div className="filters-summary">
                  <p className="pricedetails">Price Details</p>
                  <div className=" flexitems">
                    <p className="title">Price ({state.cart.length}) items</p>
                    <p className="total">₹{subTotal}</p>
                  </div>
                  <div className="flexitems">
                    <p className="discount">Discount</p>
                    <p className="totaldiscount">- ₹100</p>
                  </div>
                  <div className="flexitems">
                    <p className="delivery">Delivery Charges</p>
                    <p className="deliverycharges">
                      <del style={{ color: "#bfbfbf" }}>-₹80</del> Free
                    </p>
                  </div>
                  <div className="flexitems">
                    <p className="secured">Secured Packaging Fee</p>
                    <p className="securedfee">₹118</p>
                  </div>
                  <span
                    style={{
                      borderStyle: "dashed",
                      borderWidth: 1,
                      borderRadius: 1,
                      color: "#e3e3e3",
                    }}
                  ></span>

                  <div className="flexitems">
                    <p className="totalamount">Total Amount</p>
                    <p className="totalamountmoney">₹{total}</p>
                  </div>
                  <span
                    style={{
                      borderStyle: "dashed",
                      borderWidth: 1,
                      borderRadius: 1,
                      color: "#e3e3e3",
                    }}
                  ></span>
                  <p className="saveupto">You will save ₹100 on this order</p>
                </div>
              )}
              {state.cart.length > 0 && (
                <div className="d-flex align-items-center">
                  <span>
                    {" "}
                    <AiFillSafetyCertificate
                      style={{ color: "#898989", fontSize: "25px" }}
                    />
                  </span>
                  <span className="safesecure">
                    Safe and Secure Payments.Easy returns.100% Authentic
                    products.
                  </span>
                </div>
              )}

              {state.cart.length > 0 && (
                <div className="d-flex align-items-center placeorderdiv ">
                  <span className="placeorder button-hover-color">
                    <Link style={{ color: "white" }} to="/quickcheckout">
                      Place Order
                    </Link>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
