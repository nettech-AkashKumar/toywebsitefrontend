import React, { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "./Reducers";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Cart = createContext();

const Context = ({ children }) => {
  // const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  // const userId = loggedInUser?._id || null;

  const token = localStorage.getItem("token")?.trim();
  let userId = null;
  if (token) {
    try {
      // console.log('context token', token);
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (error) {
      console.log("Error decoding token", error);
    }
  }

  // console.log("USer Id", userId)

  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(state.cart));
    }
  }, [state.cart, userId]);

  //save cart state in local storage
  useEffect(() => {
    if (userId) {
      const savedCart =
        JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      dispatch({ type: "SET_CART", payload: savedCart });
    }
  }, [userId]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) {
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8081/api/cart/get`, {
          params: { userId },
        });
        // console.log("responseii", response.data);
        const data = response.data.data;
        localStorage.setItem("cart", JSON.stringify(data));
        // console.log("data12", response.data);

        if (response.status === 200) {
          dispatch({ type: "SET_CART", payload: data });
        } else {
          dispatch({ type: "SET_CART", payload: [] });
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [userId]);

  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};

// import React, { createContext, useContext, useReducer, useEffect } from "react";
// import { cartReducer } from "./Reducers";

// const Cart = createContext();

// const Context = ({ children }) => {
//   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//   const userEmail = loggedInUser?.email || null;

//   const [state, dispatch] = useReducer(cartReducer, {
//     cart: [],
//   });

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (userEmail) {
//         try {
//           const response =
//             (await fetch(`http://localhost:8081/api/cart${userEmail}`)) || [];
//           if (response.ok) {
//             const data = await response.json();
//             dispatch({ type: "SET_CART", payload: data.cart });
//           } else {
//             console.error("Failed to fetch cart from backend");
//           }
//         } catch (error) {
//           console.error("Error fetching cart:", error);
//         }
//       }
//     };
//     fetchCart();
//   }, [userEmail]);

//   return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
// };

// export default Context;

// export const CartState = () => {
//   return useContext(Cart);
// };
