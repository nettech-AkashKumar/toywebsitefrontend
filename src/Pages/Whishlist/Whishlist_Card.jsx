import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../../Redux/wishlistSlice";
import measurefiltericon from "../../Assets/Image/measurefiltericon.png";
import "../../Pages/Whishlist/Whishlist.css";
import { Link, useNavigate } from 'react-router-dom';
import { CartState } from "../../context/Context";



export default function Whishlist_Card({ _id, imageUrl, title, subtitle, oldPrice, newPrice, levelRange, productId, removeItemFromState }) {

  const wishlist = useSelector((state) => state.wishlist.wishlist)
  console.log('wishlist_card', wishlist)

  const navigate = useNavigate();
  const goToProduct = () => {
    navigate(`/addtocart/${productId}`)
    console.log("Navigating to:", `/addtocart/${productId}`)
  }

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user)
  const userId = user?.id;

  const handleRemoveFromWishlist = () => {
    console.log("Removing item with ID:", _id); // Debugging
    dispatch(removeFromWishlist({ _id, userId, productId }));
    console.log("Dispatching removeFromWishlist with:", {
      _id,
      userId,
      productId
    });
    
    const filteredWishlist = wishlist.filter((item) => item.productId !== productId)
    localStorage.setItem('wishlist', JSON.stringify(filteredWishlist))
    
    removeItemFromState(_id);
  };

  const { state, dispatch: cartDispatch } = CartState(); // Renamed to cartDispatch

  const handleAddToCart = (event) => {
    event.preventDefault(); // Prevent default link behavior
    event.stopPropagation(); // Stop event from triggering goToProduct


    // Add item to cart
    cartDispatch({  // Updated to use cartDispatch
      type: "ADD_TO_CART",
      payload: {
        _id,
        image_url: imageUrl,
        title: title,
        subtitle: subtitle,
        old_price: oldPrice,
        new_price: newPrice,
        level_range: levelRange,
      }
    });

    // Show alert message
    alert("Your Item is Successfully Add in Your Cart!");
  };

  return (
    <div className="">
      <div className="card whishlistcard">
        <img src={imageUrl} alt="" className="cardimage" style={{ cursor: 'pointer' }}
          onClick={goToProduct} />
        <div className="carddescription">
          <div className="pricing">
            <p className="m-0"> <b>{title}</b></p>
            <p className="m-0">
              <del style={{ color: "gray" }}> ₹{oldPrice}</del> <span>
                <b>₹{newPrice}</b>
              </span>
            </p>
            <p className="m-0">{subtitle}</p>
          </div>
          <div className="rating">
            <div className="staricon"><FaRegStar /> <FaRegStar /> <FaRegStar /></div>
            <div className="level">
              <div className="measureicon"><img src={measurefiltericon} alt="" /></div>
              <div className="level_details d-flex flex-column align-items-center justify-content-center">
                <p style={{ color: 'grey' }}>Level</p>
                <p style={{ margin: 0, color: 'blue' }}>{levelRange}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <Link to="/">
            <button onClick={handleAddToCart} className="btn whishlistbtn-buynow">Move To Cart</button>
          </Link>
          <button className="btn" onClick={handleRemoveFromWishlist}>Remove</button>
        </div>

      </div>
    </div>
  );
}



