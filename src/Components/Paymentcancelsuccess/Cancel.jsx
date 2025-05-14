import React from 'react'
import './PaymentStatus.css'
import { Link } from 'react-router-dom';

const Cancel = () => {
    return (
        <div className="payment-card">
            <div className="icon-circle">
                <span className="dollar-sign">$</span>
            </div>
            <div className="payment-card">
                <div className="icon-circle">
                    <span className="dollar-sign">$</span>
                </div>
                <h2 className="status-heading">Payment Cancelled</h2>
                <p className='pone'>It seems the payment was cancelled. You can try again later</p>
            </div>
            <Link to='/checkout'  ><button className="continue-button">Try Again </button></Link>
        </div>
    )
}
export default Cancel;
