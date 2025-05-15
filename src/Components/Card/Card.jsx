// import React from "react";
// import "../Card/Card.css";
// import { FaRegStar } from "react-icons/fa";
// import { CiShoppingCart } from "react-icons/ci";
// import measurefiltericon from "../../Assets/Image/measurefiltericon.png";
// import { CartState } from "../../context/Context";
// import { LuHeart } from "react-icons/lu";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToWishlist, removeFromWishlist } from "../../Redux/wishlistSlice";
// import { FaHeart } from "react-icons/fa";

// export default function Card({ id, image_url, title, subtitle, old_price, new_price, level_range }) {

//   const navigate = useNavigate();
//   const goToProduct = () => {
//     navigate(`/addtocart/${id}`)
//     console.log("Navigating to:", `/addtocart/${id}`);
//   }

//   const { state, dispatch: cartDispatch } = CartState(); // Renamed to cartDispatch
//   const reduxDispatch = useDispatch(); // Renamed to reduxDispatch

//   const wishlist = useSelector((state) => state.wishlist.wishlist);
//   const isWishlisted = wishlist.some((item) => item.id === id);

//   const handleWishlist = (event) => {
//     event.preventDefault(); // Prevent default link behavior
//     event.stopPropagation(); // Stop event from triggering goToProduct

//     if (isWishlisted) {
//       reduxDispatch(removeFromWishlist(id));
//     } else {
//       reduxDispatch(addToWishlist({ id, image_url, title, subtitle, old_price, new_price, level_range }));
//     }
//   };


//   const handleAddToCart = (event) => {
//     event.preventDefault(); // Prevent default link behavior
//     event.stopPropagation(); // Stop event from triggering goToProduct


//     // Add item to cart
//     cartDispatch({  // Updated to use cartDispatch
//       type: "ADD_TO_CART",
//       payload: {
//         id,
//         image_url,
//         title,
//         subtitle,
//         old_price,
//         new_price,
//         level_range
//       }
//     });

//     // Show alert message
//     alert("Your Item is Successfully Add in Your Cart!");
//   };

//   return (
//     <div className="" style={{ cursor: 'pointer' }} onClick={goToProduct}>
//       <div className="card">


//         <img src={image_url[0]} alt="" className="cardimage" />
//         <div className="carddescription">
//           <div className="pricing">
//             <p className="m-0"><b>{title}</b></p>
//             <p className="m-0">
//               <del style={{ color: "gray" }}>₹{old_price}</del> <span><b>₹{new_price}</b></span>
//             </p>
//             <p className="m-0">{subtitle}</p>
//           </div>
//           <div className="rating">
//             <div className="staricon"><FaRegStar /> <FaRegStar /> <FaRegStar /></div>
//             <div className="level">
//               <div className="measureicon"><img src={measurefiltericon} alt="" /></div>
//               <div className="level_details d-flex flex-column align-items-center justify-content-center">
//                 <p style={{ color: 'grey' }}>Level</p>
//                 <p style={{ margin: 0, color: 'blue' }}>{level_range}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="d-flex justify-content-between">
//         <button className="btn" onClick={handleWishlist} style={{  }}>

//             <FaHeart
//               className=" wishlist-icon"

//               style={{
//                 fontSize: "20px",
//                 color: isWishlisted ? "red" : "", // Change icon color
//               }}
//             />
//             Whishlist
//            </button>
//           <button className="btn"
//             onClick={handleAddToCart}  // Trigger the alert when clicked
//           >
//             <CiShoppingCart className="shoppingicon" />Cart Items
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useMemo } from "react";
import "../Card/Card.css";
import { FaRegStar } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import measurefiltericon from "../../Assets/Image/measurefiltericon.png";
import { CartState } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../Redux/wishlistSlice";
import { FaHeart } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../config/config";



export default function Card({ _id, productId, image, title, subtitle, old_price, new_price, level_range }) {

  const [isWishlistedState, setIsWishlistedState] = useState(false)
  // const wishlist = useSelector((state) => state.wishlist.wishlist)
  const [userCart, setUserCart] = useState([]);

  if (image) {
    var imageUrl = image[0]?.url;

  }

  const navigate = useNavigate();
  const goToProduct = () => {
    navigate(`/addtocart/${_id}`)
    console.log("Navigating to:", `/addtocart/${_id}`);
  };

  // Cart Context and Redux Dispatch
  const { state, dispatch: cartDispatch } = CartState();
  const reduxDispatch = useDispatch();


  // Get logged-in user from localStorage
  // const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  // const userEmail = loggedInUser?.email || null;

  // to verify via token for userId

  const token = localStorage.getItem("token")?.trim();
  let userId = null;
  if (token) {
    try {
      // console.log("Token from localStoragea:", token);
      const decoded = jwtDecode(token); //decode token
      userId = decoded.id;  //get email from that token
    } catch (error) {
      console.error("Error decoding token", error)
    }
  }

  // console.log("User Id", userId)

  // Wishlist state 
  const wishlist = useSelector((state) => state.wishlist.wishlist || []);  //wishlist is fetch from the redux store  using useSelector
  console.log('wishlist fetched via useSelector', wishlist);  //this will manage the localstorage when add or delete it update i.e, wishlist

  //this code check wheather the product present in the wishlist or not
  const isWishlisted = useMemo(() => {
    return wishlist.some((item) => {
      console.log("Comparing item:", item, "with _id:", _id);
      return item.productId === productId
    });
  }, [wishlist, productId])
  console.log("Current Product ID (_id):", _id);
  console.log('iswishlisted from card', isWishlisted)



  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setUserCart(storedCart)
    }
  }, []);

  // Cart state (User-specific cart)
  // const userCart = userId
  //   ?JSON.parse(localStorage.getItem(`cart_${userId}`)) || []

  //   : [];

  //for cart
  console.log('Current userCart:', userCart);

  const isInCart = userCart.some((item) => item.productId === _id);
  console.log('productId21:59', productId, _id, isInCart)
  console.log('All Cart Items:', userCart);


  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();


    console.log("Before Click - isWishlisted:", isWishlisted);
    console.log("Wishlist Before Update:", wishlist);

    if (!userId) {
      // alert('Please log in to add items to the wishlist!!')
      toast.error("Please login to add items in the wishlist!", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    console.log('Wishlist00:', wishlist);
    // console.log('Current Product ID (_id)11:', _id);

    const wishlistItem = wishlist.find((item) => item.productId === productId)
    // console.log("Current Product ID (_id):", _id);
    // console.log("Wishlist Product ID:", wishlistItem?.productId);
    // console.log("Wishlist Item (_id):", wishlistItem?._id);
    // console.log('productId51', productId);
    // console.log('wishlistItem', wishlistItem)
    const wishlistItemId = wishlistItem?._id || null;
    console.log('wishlistItemId422', wishlistItemId)

    if (isWishlistedState) {
      reduxDispatch(removeFromWishlist({ _id: wishlistItemId, userId, productId: _id }));
      const filteredWishlist = wishlist.filter((item) => item.productId !== _id)
      localStorage.setItem('wishlist', JSON.stringify(filteredWishlist))
      setIsWishlistedState(false);
      console.log('_id:wishlistItemId, userId, productId:_id from card', _id, userId, _id)
    } else {
      reduxDispatch(addToWishlist({ userId, productId: _id, image, title, subtitle, old_price, new_price, level_range }));
      const updatedWishlist = [...wishlist, { userId, productId: _id, image, title, subtitle, old_price, new_price, level_range }]
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
      setIsWishlistedState(true)
    }
  };

  useEffect(() => {
    const updated = wishlist.some((item) => item.productId === productId)
    setIsWishlistedState(updated)
  }, [wishlist, productId])




  const handleAddToCart = async (event) => {
    const userId = localStorage.getItem("userId")
    event.preventDefault();
    event.stopPropagation();
    if (!userId) {
      // alert("Please login to add items in the cart!")
      toast.error("Please login to add items in the cart!", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return;
    }
    try {
        const response = await fetch(`${BASE_URL}/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId: _id,
            title,
            subtitle,
            image,
            old_price,
            new_price,
            level_range,
            quantity: 1
          })
        });

        const data = await response.json();
        console.log("Cart Response:", data)
        if (response.ok) {
          if (!data.data || !data.data._id) {
            console.log("Invalid cart item received from server", data)
            throw new Error("Invalid cart item received from server")
          }
          // const updatedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
          // updatedCart.push(data.data)
          // setUserCart(updatedCart);
          // localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart))
           // Update localStorage and state only if the server request is successful
      const updatedCart = [...userCart, data.data]; // Add new item to the current cart state
      setUserCart(updatedCart); // Update state with the new cart
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart)); // Persist to localStorage

          
          cartDispatch({
            type: "ADD_TO_CART",
            payload: data.data,
          });


          // alert("Item successfully added to cart!")
          toast.success("Item successfully added to cart!", {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          // alert(data.message || "Failed to add item to cart")
          toast.error(data.message || "Failed to add item to cart", {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    catch (error) {
      console.error('Error adding to product', error);
      // alert('Something went wrong please try again later')
      toast.error("Something went wrong please try again later", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <div className="" style={{ cursor: 'pointer' }} onClick={goToProduct}>
      <div className="card">
        <img src={`${BASE_URL}${imageUrl}`} alt="" className="cardimage" />
        <div className="carddescription">
          <div className="pricing">
            <p className="m-0"><b>{title}</b></p>
            <p className="m-0">
              <del style={{ color: "gray" }}>₹{old_price}</del> <span><b>₹{new_price}</b></span>
            </p>
            <p className="m-0">{subtitle}</p>
          </div>
          <div className="rating">
            <div className="staricon"><FaRegStar /> <FaRegStar /> <FaRegStar /></div>
            <div className="level">
              <div className="measureicon"><img src={measurefiltericon} alt="" /></div>
              <div className="level_details d-flex flex-column align-items-center justify-content-center">
                <p style={{ color: 'darkgrey' }}>Age</p>
                <p style={{ margin: 0, color: 'blue' }}>{level_range}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn" onClick={handleWishlist}>
            <FaHeart
              className="wishlist-icon"
              style={{ fontSize: "20px", color: isWishlistedState ? "red" : "" }}
            />
            Wishlist
          </button>
          <button className="btn" onClick={handleAddToCart}>
            <CiShoppingCart className="shoppingicon" />
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}





