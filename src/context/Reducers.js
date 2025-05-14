// export const cartReducer = (state, action) => {
//   let updatedCart;

//   switch (action.type) {
//     case "ADD_TO_CART": {
//       const existingProduct = state.cart.find(
//         (item) => item.id === action.payload.id
//       );
//       if (existingProduct) {
//         updatedCart = state.cart.map((item) =>
//           item.id === action.payload.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
//       }
//       break;
//     }
//     case "REMOVE_FROM_CART":
//       updatedCart = state.cart.filter((item) => item.id !== action.payload.id);
//       break;

//     case "CHANGE_CART_QUANTITY":
//       updatedCart = state.cart.map((item) =>
//         item.id === action.payload.id
//           ? { ...item, quantity: action.payload.quantity }
//           : item
//       );
//       break;

//     default:
//       return state;
//   }
//   localStorage.setItem("cart", JSON.stringify(updatedCart));
//   return { ...state, cart: updatedCart };
// };

import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const cartReducer = (state, action) => {
  let updatedCart;

  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload || [] };

    case "ADD_TO_CART": {
      const existingProduct = state.cart.find(
        (item) => item._id === action.payload._id
      );
      console.log("existinnng", existingProduct);

      if (existingProduct) {
        updatedCart = state.cart.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) *  item.price}
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1, subtotal: action.payload.price }];
      }
      // break;
      return {...state, cart:updatedCart}
    };

    // case "REMOVE_FROM_CART":
    //   updatedCart = state.cart.filter(
    //     (item) => item._id !== action.payload._id
    //   );
    //   // break;
    //   return {...state, cart: updatedCart}

    case "REMOVE_FROM_CART":
      const {_id: removeId, userId, productId} = action.payload;
      //call API to delete item from DB
      axios.delete(`http://localhost:8081/api/cart/delete-cart-item`, {
        data: {_id: removeId, userId, productId}})
        .then(response => console.log("Item removed:", response.data))
        .catch(error => console.error("Error removing item:", error));

        updatedCart = state.cart.filter((item) => item._id !== removeId)
        return {...state, cart: updatedCart}


    // case "CHANGE_CART_QUANTITY":
    //   updatedCart = state.cart.map((item) =>
    //     item._id === action.payload._id
    //       ? { ...item, quantity: action.payload.quantity, subtotal: action.paylaod.quantity * item.price }
    //       : item
    //   );
    //   // break;
    //   return {...state, cart: updatedCart}


    case "CHANGE_CART_QUANTITY":
      const { _id, quantity } = action.payload;
      console.log('_id, quantity', action.payload)

      if(!_id  || quantity === undefined) {
        console.error("Missing required field in CHANGE_CART_QUANTITY", action.payload)
        return state;
      }
    axios.put(`http://localhost:8081/api/cart/update-qty`, 
      {_id, quantity })
      .then(response => console.log("Qunatity updated", response.data))
      .catch(error => console.error("Error updating quantity", error) )

      updatedCart = state.cart.map((item) => 
        item._id === _id ?  {...item, quantity, subtotal: quantity * item.new_price} : item
      )
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log('updatedCart', updatedCart)
      return {...state, cart: updatedCart}

    case "CLEAR_CART":
      updatedCart = [];
      break;

    default:
      return state;
  }
};
