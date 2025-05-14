
import React from "react";
import "../Card/Card.css";
// import cardimage from "../../Assets/Image/cardimage.jpg"
import { TbRulerMeasure2 } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { LuHeart } from "react-icons/lu";
import measurefiltericon from "../../Assets/Image/measurefiltericon.png"
import { CartState } from "../../context/Context";

export default function StationaryCard({ id, imageUrl, title, subtitle, oldPrice, newPrice, levelRange }) {
    const { state, dispatch } = CartState();
    console.log(state.cart);

    return (
        <div className="">
            <div className="card">
                <div className="position-relative">
                    <LuHeart className='position-absolute' style={{ margin: "5px 10px", fontSize: "20px" }} />
                    <img src={imageUrl} alt="" className="cardimage" />
                </div>

                <div className="carddescription">
                    <div className="pricing">
                        <p className="m-0"> <b>{title}</b></p>
                        <p className="m-0">
                            <del style={{ color: "gray" }}> ₹{oldPrice}</del> <span>

                                <b>₹{newPrice}</b></span>
                        </p>
                        <p className="m-0">{subtitle}</p>
                    </div>
                    <div className="rating">
                        <div className="staricon"><FaRegStar /> <FaRegStar /> <FaRegStar /></div>
                        <div className="level">

                            <div className="measureicon"><img src={measurefiltericon} alt="measurefiltericon" /></div>
                            <div className="level_details d-flex flex-column align-items-center justify-content-center">
                                <p style={{ color: 'grey' }}>Level</p>
                                <p style={{ margin: 0, color: 'blue' }}>{levelRange}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button
                        onClick={() => {
                            dispatch({
                                type: 'ADD_TO_CART',
                                payload: {
                                    id,
                                    title,
                                    subtitle,
                                    imageUrl,
                                    oldPrice,
                                    newPrice,
                                    levelRange,
                                }
                            })
                        }}
                        className="btn"><CiShoppingCart className="shoppingicon" />Add to card
                    </button>
                </div>
            </div>
        </div>
    );
}

