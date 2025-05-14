import React from 'react'
import axios from 'axios'

const CART_URL = "http://localhost:8081/api/cart"

//add product in cart
const addToCart = async(userId, productId) => {
    try {
        const response = await axios.post(`${CART_URL}/add`, {userId, productId})
        console.log('cartresponse', response)
        return response.data;
    }catch(error) {
        console.error("Error adding product to cart:", error)
    }
}

//Get cart items
const getCartItems = async(userId) => {
    try {
        const response = await axios.get(`${CART_URL}/get`, {params: {userId}})
        console.log('responseget', response)
        return response.data;
    } catch(error) {
        console.error("Error fetching cart items", error)
    }
}

//update  cart items
const updateCartitem = async(_id, userId, qty) => {
    try {
        const response = await axios.put(`${CART_URL}/update-qty`, {_id, userId, qty})
        return response.data;
    }catch(error) {
        console.error("Error updating cart item quantity", error)
    }
}


//remove item from cart
const removeCartItem = async(userId, _id, productId) => {
    try{
        const response = await axios.delete(`${CART_URL}/delete-cart-item`, {
            data: {userId, _id, productId}
        })
        return response.data;
    }catch(error){
        console.error("Error deleting cart item:", error)
    }
}




const PostCart = () => {
  return (
    <div>
      
    </div>
  )
}

export default PostCart
