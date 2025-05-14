
// // import React from "react";
// // import "../Card/Card.css";
// // import  "../Cardhomefilter/Cardhome.css"
// // import { FaRegStar } from "react-icons/fa";
// // import { CiShoppingCart } from "react-icons/ci";
// // import measurefiltericon from "../../Assets/Image/measurefiltericon.png"
// // import { CartState } from "../../context/Context"
// // import { Link } from "react-router-dom";

// // export default function Cardhome({id, imageUrl,   title, subtitle, oldPrice, newPrice, levelRange}) {
// //   const { state, dispatch } = CartState();
// //   console.log(state.cart);
// //   return (
// //     <div className="">
// //       <div className="card cardhome">
// //           <Link to='/addtocart'>
// //           <img src={imageUrl} alt="" className="cardimage" />
// //           </Link>

// //         <div className="carddescription">
// //           <div className="pricing">
// //             <p  className="m-0"> <b>{title}</b></p>
// //             <p className="m-0">
// //             <del style={{color:"gray"}}> ₹{oldPrice}</del> <span>

// //               <b>₹{newPrice}</b></span>
// //             </p>
// //             <p className="m-0">{subtitle}</p>
// //           </div>
// //           <div className="rating">
// //           <div className="staricon"><FaRegStar /> <FaRegStar /> <FaRegStar /></div>
// //             <div className="level">

// //                 <div className="measureicon"><img src={measurefiltericon} alt="" /></div>
// //               <div className="level_details d-flex flex-column align-items-center justify-content-center">
// //                 <p style={{color:'grey'}}>Level</p>
// //                 <p style={{margin:0, color:'blue'}}>{levelRange}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="d-flex justify-content-center">
// //           <button className="btn"
// //             onClick={() => {
// //               dispatch({
// //                 type: "ADD_TO_CART",
// //                 payload: {
// //                   id,
// //                   imageUrl,
// //                   title,
// //                   subtitle,
// //                   oldPrice,
// //                   newPrice,
// //                   levelRange,
// //                 }
// //             })
// //           }}
// //           >
// //             <CiShoppingCart className="shoppingicon" />Add to card
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// import React from "react";
// import "../Card/Card.css";
// import "../Cardhomefilter/Cardhome.css";
// import { TbRulerMeasure2 } from "react-icons/tb";
// import { FaRegStar } from "react-icons/fa";
// import { CiShoppingCart } from "react-icons/ci";
// import measurefiltericon from "../../Assets/Image/measurefiltericon.png";
// import { Link, useNavigate } from "react-router-dom";
// import { CartState } from "../../context/Context";
// import { LuHeart } from "react-icons/lu";
// import { useDispatch, useSelector } from "react-redux";
// import { addToWishlist, removeFromWishlist } from "../../Redux/wishlistSlice";

// export default function Cardhome(product) {
//   const { id, image_url, new_price, title, old_price, subtitle, level_range } =
//     product;
//   const navigate = useNavigate();
//   const goToProduct = () => {
//     navigate(`/addtocart/${id}`)
//     console.log("iddd:", id)
//   }
//   const { state, dispatch } = CartState();
//   const reduxDispatch = useDispatch();
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
//   return (

//     <div className="" style={{ cursor: 'pointer' }} onClick={() => {
//       goToProduct();
//     }}>
//       <div className="card cardhome">
//         <Link to="" onClick={handleWishlist}>
//                   <LuHeart
//                     className="position-absolute wishlist-icon"
//                     style={{
//                       margin: "5px 10px",
//                       fontSize: "30px",
//                       color: isWishlisted ? "white" : "black", // Change icon color
//                       backgroundColor: isWishlisted ? "black" : "transparent", // Change background
//                       padding: "5px",
//                       borderRadius: "50%"
//                     }}
//                   />
//                 </Link>
//         <img src={image_url[0]} alt="" className="cardimage" />{" "}
//         <div className="carddescription">
//           <div className="pricing">
//             <p className="m-0">
//               {" "}
//               <b>{title}</b>
//             </p>
//             <p className="m-0">
//               <del style={{ color: "gray" }}> ₹{old_price}</del>{" "}
//               <span>
//                 <b>₹{new_price}</b>
//               </span>
//             </p>
//             <p className="m-0">{subtitle}</p>
//           </div>
//           <div className="rating">
//             <div className="staricon">
//               <FaRegStar /> <FaRegStar /> <FaRegStar />
//             </div>
//             <div className="level">
//               <div className="measureicon">
//                 <img src={measurefiltericon} alt="" />
//               </div>
//               <div className="level_details d-flex flex-column align-items-center justify-content-center">
//                 <p style={{ color: "grey" }}>Level</p>
//                 <p style={{ margin: 0, color: "blue" }}>{level_range}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="d-flex justify-content-center">
//           <button
//             onClick={(event) => {
//               event.stopPropagation();
//               dispatch({
//                 type: "ADD_TO_CART",
//                 payload: {
//                   id,
//                   title,
//                   subtitle,
//                   image_url,
//                   old_price,
//                   new_price,
//                   level_range,
//                 },
//               });
//               alert("Your Item is Successfully Add in Your Cart!");
//             }}
//             className="btn"
//           >
//             <CiShoppingCart className="shoppingicon" />
//             Add to card
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
