import React from "react";
import "../Card/Card.css";
import { FaRegStar } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { LuHeart } from "react-icons/lu";
import measurefiltericon from "../../Assets/Image/measurefiltericon.png";
import { CartState } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../Redux/wishlistSlice";

export default function StationaryCard({ id, image_url, title, subtitle, old_price, new_price, level_range }) 
{
  console.log("Received Props:", { id, image_url, title, subtitle, old_price, new_price, level_range });


  const navigate = useNavigate();
  const goToProduct = () => {
    navigate(`/addtocart/${id}`);
    console.log("Navigating to:", `/addtocart/${id}`);
    console.log("id:", id);
  };
  const { state, dispatch } = CartState();
  console.log("State Cart:", state.cart);

  const reduxDispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const isWishlisted = wishlist.some((item) => item.id === id);

  const handleWishlist = (event) => {
    event.preventDefault(); // Prevent default link behavior
    event.stopPropagation(); // Stop event from triggering goToProduct

    if (isWishlisted) {
      reduxDispatch(removeFromWishlist(id));
    } else {
      reduxDispatch(
        addToWishlist({
          id,
          image_url,
          title,
          subtitle,
          old_price,
          new_price,
          level_range,
        })
      );
    }
  };

  return (
    <div className="">
      <div className="card">
        <div className="position-relative">
          <Link to="" onClick={handleWishlist}>
            <LuHeart
              className="position-absolute wishlist-icon"
              style={{
                margin: "5px 10px",
                fontSize: "30px",
                color: isWishlisted ? "white" : "black", // Change icon color
                backgroundColor: isWishlisted ? "black" : "transparent", // Change background
                padding: "5px",
                borderRadius: "50%",
              }}
            />
          </Link>
          <Link to="">
            <img
              src={image_url}
              alt=""
              className="cardimage"
              style={{ cursor: "pointer" }}
              onClick={() => {
                goToProduct();
              }}
            />
          </Link>
        </div>

        <div className="carddescription">
          <div className="pricing">
            <p className="m-0">
              {" "}
              <b>{title}</b>
            </p>
            <p className="m-0">
              <del style={{ color: "gray" }}> ₹{old_price}</del>{" "}
              <span>
                <b>₹{new_price}</b>
              </span>
            </p>
            <p className="m-0">{subtitle}</p>
          </div>
          <div className="rating">
            <div className="staricon">
              <FaRegStar /> <FaRegStar /> <FaRegStar />
            </div>
            <div className="level">
              <div className="measureicon">
                <img src={measurefiltericon} alt="measurefiltericon" />
              </div>
              <div className="level_details d-flex flex-column align-items-center justify-content-center">
                <p style={{ color: "grey" }}>Level</p>
                <p style={{ margin: 0, color: "blue" }}>{level_range}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn"
            onClick={() => {
              dispatch({
                type: "ADD_TO_CART",
                payload: {
                  id,
                  image_url,
                  title,
                  subtitle,
                  old_price,
                  new_price,
                  level_range,
                },
              });
              alert("Your Item is Successfully Add in Your Cart!");
            }}
          >
            <CiShoppingCart className="shoppingicon" />
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
}
