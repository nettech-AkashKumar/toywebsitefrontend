import React, { useState, useEffect } from 'react';
import '../OrderHistory/OrderHistory.css';
import Heroallpages2 from '../../Components/Heroallpages2/Heroallpages2';
import SidebarAllpages from '../../Components/SidebarAllpages/SidebarAllpages';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token")?.trim();
            let email = null;
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    // console.log('decoded email', decoded)
                    email = decoded.email
                } catch (error) {
                    console.error('Error decoding token', error)
                }
            }
            console.log('Email from token', email)
            try {
                const response = await axios.get(`/api/orders?email=${email}`)
                setOrders(response.data)
                console.log("Fetched orders:", response.data)

            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
        fetchOrders();
    }, [])

    return (
        <div>
            <Heroallpages2 profile_nav="Order History" />
            <div className="whishlit-sidebar section-padding pt-0">
                <div className='whishlit-sidebar-container bg-white d-flex justify-content-evenly ' style={{ padding: "20px 30px" }}>
                    <div className="leftwhishlist-sideb">
                        <SidebarAllpages />
                    </div>
                    <div className="righttwhishlist-product-card  orderhistory-bx d-flex gap-5">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className='sidebarorderdiv'>

                                    <div className='orderdetaildiv'>
                                        <table className='ordertable'>
                                            <thead>
                                                <tr>
                                                    <th>S.no</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Order no.</th>
                                                    <th>Tracking Id</th>
                                                    <th>Order Total</th>
                                                    <th>Item</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* {console.log('orders', orders)} */}
                                                {orders.map((order, index) => (
                                                    <tr key={order._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                        <td><span className='status-badge actionstatusprocess'>{order.status}</span></td>
                                                        <td>{order._id.slice(0, 10).toUpperCase()}</td>
                                                        <td>{order.trackingId}</td>
                                                        <td>₹{order.amount_Total }</td>
                                                        <td>{order.cartItems.length}</td>
                                                        <td className='actionview'>
                                                            <Link to={`/delivery-progress/${order._id}`} style={{ textDecoration: 'none', color: '#007bff' }}>View</Link>
                                                        </td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistory;
