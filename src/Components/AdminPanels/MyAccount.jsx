import React, { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import "./MyAccount.css";
// import smartwatchImg from "../../Assets/Image/Avatar.png";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState({});
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token")?.trim();
      if(!token) return;
      try {
        const decoded = jwtDecode(token);
        const id = decoded.id || decoded._id;
        const email =  decoded.email

        //fetch user info name, profileImage
        const userResponse = await axios.get(`/api/users/profile/${id}`)
        setUserInfo(userResponse.data);
        console.log('profile shows', userResponse.data)

        //fetch order history
        const transactionsResponse  = await axios.get('/api/transactions/all')
        console.log('transaction response line 29', transactionsResponse.data)
        const formattedTransactions  = transactionsResponse.data.map((transaction) => ({
          id:transaction._id,
          amount:`₹${(transaction.amount).toFixed(2)}`,
          time: new Date(transaction.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          date: new Date(transaction.createdAt).toLocaleDateString(),
          item:transaction.item,
          user: transaction.users
        }))
        setTransactions(formattedTransactions.reverse()); //latest orders first 
      }catch(error) {
        console.error('Error fetching user Data', error)
      }
    }
    fetchUserData();
  }, []);

  return (
    <div className="my-account-container">
      <h2 className="account-title">My Account</h2>
      <div className="balance-section">
        <div className="user-info">
          {console.log('user info via My Account', userInfo)}
          {userInfo.profileImage && (
            <img style={{height:'30px', width:'30px', borderRadius:'10px'}}
            // src={userInfo?.profileImage} 
            src={userInfo?.profileImage ? `http://localhost:8081/profileImage/${userInfo.profileImage}` : "https://i.pinimg.com/originals/78/71/71/78717192789208dfbf61261f4625da35.jpg"}
            alt="profile" className="profile-image" />
          )}
          <p className="user-name">{userInfo.name}</p>
          <p className="balance-text">Total Balance</p>
        {/* very important  */}
          <h3 className="balance-amount">₹{transactions.reduce((total, txn) => total + parseFloat(txn.amount.replace("₹", " ")), 0).toLocaleString("en-IN", {minimumFractionDigits: 2})}</h3>
        </div>
        <FaEyeSlash className="eye-icon" />
      </div>
      <button className="withdraw-button">Withdraw</button>
      <div className="transactions-section">
        <div className="transactions-header">
          <h3 className="transactions-title">Recent Transactions</h3>
          <Link to="/order-history" className="view-all">View all</Link>
        </div>
        <ul className="transactions-list">
          {console.log('transactions via myaccount', transactions)}
          {transactions.length === 0 ? (
            <p>No transaction found</p>
          ) : (
            transactions.map((transaction, index) => (
            <li key={transaction.id} className="transaction-item">
              <div className="transaction-info">
                <img
                  src={transaction.user?.profileImage ? `http://localhost:8081/profileImage/${transaction.user.profileImage}` :  ""}
                  alt="Item"
                  className="transaction-image"
                />
                <div>
                  <p className="transaction-name">{transaction.users?.name}</p>
                  <p className="transaction-item">{transaction.item}</p>
                </div>
              </div>
              <div className="transaction-amount-section">
                <p className="transaction-amount">{transaction.amount}</p>
                <p className="transaction-time">{transaction.time}</p>
                <p className="transaction-sales">{transaction.length}</p>
              </div>
            </li>
            ))
        )}
        </ul>
      </div>
    </div>
  );
};

export default MyAccount;
