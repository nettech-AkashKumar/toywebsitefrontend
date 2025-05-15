import React, {useEffect} from 'react';
import './PaymentStatus.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import BASE_URL from '../../config/config';

const Success = () => {

     const token = localStorage.getItem("token")?.trim();
        let userId = null;
        if (token) {
            try {
                const decoded = jwtDecode(token);
                userId = decoded.id
            } catch (error) {
                console.error('Error decoding token', error)
            }
        }
        console.log('UserId from token from success page', userId)

    useEffect(() => {
        //token to fetch userid
        

        fetch(`${BASE_URL}/api/cart/clear-cart`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({userId}),
        }).then(response => response.json()).then(data => console.log('cart delete after payment',data.message)).catch(error => console.error("Error clearing cart:", error))
    }, [userId])
    return (
        <div className="payment-card">
            <div className="icon-circle">
                <span className="dollar-sign">$</span>
            </div>
            <h2 className="status-heading">Payment Successful</h2>
            <p className="status-message">Thank you for your payment!</p>
            <Link to='/'><button className="continue-button">Continue Shopping</button></Link>
        </div>
    );
};

export default Success;
