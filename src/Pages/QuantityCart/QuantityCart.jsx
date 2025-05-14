import React, { useState, useEffect } from 'react'
import './QuantityCart.css'
// import Flower from '../CheckOut/CheckOutImages/flower.png'
import { AiOutlineDelete } from 'react-icons/ai'
import { CartState } from '../../context/Context'

const QuantityCart = () => {
    const { state, dispatch } = CartState();
    console.log('cartState via quantityCart', state)
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState()

    useEffect(() => {
        const calculatedSubTotal = state.cart.reduce(
            (acc, curr) => acc + Number(curr.new_price) * curr.quantity, 0
        );
        const discount = 100;
        const packagingFee = 118;
        const finalTotal = calculatedSubTotal - discount + packagingFee;
        setSubTotal(calculatedSubTotal)
        setTotal(finalTotal)
    }, [state.cart])

    const handleIncrement = (item) => {
        const updatedQty = item.quantity + 1;
        dispatch({
            type: 'CHANGE_CART_QUANTITY',
            payload: {
                _id: item._id,
                quantity: updatedQty
            }
        })
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            const updatedQty = item.quantity - 1;
            dispatch({
                type: 'CHANGE_CART_QUANTITY',
                payload: {
                    _id: item._id,
                    quantity: updatedQty
                }
            })
        }
    }
    return (
        <div>
            {state.cart.length > 0 ? (
                state.cart.map((item, index) => (
                    <div className="checkoutcart" style={{ marginBottom: '20px' }}>
                        {/* {console.log('state.cart in quantityCart', state.cart)} */}
                        <div className="d-flex checkoutcartdiv" style={{ gap: '20px' }}>
                            <div key={index} className='d-flex checkoutcartdiv' style={{ gap: '20px', marginBottom: '20px' }}>
                                {/* 1st img */}
                                <span style={{ display: 'flex', backgroundColor: '#ffff', padding: '10px', height: '70px', marginRight: '5px' }}>
                                    <img
                                        className="checkoutcart-image"
                                        src={Array.isArray(item.image) ? `http://localhost:8081${item.image[0]?.url}` : item.image_url}
                                        alt={item.title}
                                    />
                                </span>

                                {/* Item Info */}
                                <div className="d-flex flex-column" style={{ gap: '20px' }}>
                                    <span className="skiphoppara">{item.title}</span>
                                    <div className='multicolorproductdiv'>
                                        <p className="multicolorp d-flex" style={{ gap: '10px' }}>
                                            {item.color}<span className="qtyp">₹{item.total}</span>
                                        </p>
                                        <p className="multicolorp d-flex" style={{ gap: '55px' }}>
                                            QTY <span className="qtyp">{item.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex cartquantity" style={{ gap: '20px', alignItems: 'center' }}>
                            <span className="pluscart" onClick={() => handleIncrement(item)
                            }>+</span>
                            <span className="minuscart" onClick={() => handleDecrement(item)}>-</span>
                            <span className="deletecart"><AiOutlineDelete onClick={() =>
                                dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: {
                                        _id: item._id,
                                        userId: item.userId,
                                        productId: item.productId
                                    }
                                })
                            } /></span>
                        </div>
                    </div>
                ))
            ) : (
                <p>Not Found CheckOut Item</p>
            )}

        </div>
    )
}

export default QuantityCart;


