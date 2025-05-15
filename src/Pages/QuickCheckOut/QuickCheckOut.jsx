import React, { useEffect, useState } from 'react';
import '../QuickCheckOut/QuickCheckOut.css';
import { FiArrowLeft } from "react-icons/fi";
import Icon from '../QuickCheckOut/Images/icon.png';
import { Link, useNavigate } from 'react-router-dom';
import Flower from '../QuickCheckOut/Images/flower.png';
import { HiOutlineMail } from "react-icons/hi";
import { CartState } from '../../context/Context';
import PhoneInput from 'react-phone-input-2';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import BASE_URL from '../../config/config';



const QuickCheckOut = () => {

    const token = localStorage.getItem("token")?.trim();
    let emailGet = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            emailGet = decoded.email;
        } catch (error) {
            console.log("Error decoding token", error);
        }
    }
    console.log("email from quickcheckout", emailGet);

    const { state } = CartState();
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState()
    const [email, setEmail] = useState('');
    const [codeSent, setCodeSent] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [inputCode, setInputCode] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();




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

    const handleEmailSubmit = async () => {
        const loggedInEmail = emailGet
        console.log('loggedInEmail', loggedInEmail);

        if (email !== loggedInEmail) {
            setError('Invalid email. Please use the email you logged in with')
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/send-verification`, {
                email
            })
            setCodeSent(true)
            setVerificationCode(response.data.code);
            setError('')
        } catch (error) {
            setError('Failed to send verification email. try again')
        }
    };
    const handleCodeVerification = () => {
        if (inputCode === verificationCode) {
            navigate('/checkout')
        } else {
            setError('Invalid verification code')
        }
    }
    
    return (
        <>
            <div>
                <div className="">
                    <div className=" align-items-center"
                        style={{ background: "var(--section-color)" }}>
                        <div className="quickcheckout"></div>{" "}

                        <div className="section-padding quickcheckoutpage">
                            {/* 1st div */}
                            <div className='quickcheckoutdivfirst'>
                                 <Link to='/' style={{ color: 'none' }} className="backtocart">
                                                <p>
                                                  <span>
                                                    <FiArrowLeft />
                                                  </span>
                                                  <span>Back to Home</span>
                                                </p>
                                              </Link>
                                <p className='quickheading'>Quick Checkout</p>
                                <div className='form-group mobilecheckoutdiv'>
                                    <label htmlFor="Number">Email*</label>
                                    {/* <input type="number" placeholder='+91' name='number' /> */}
                                    <input
                                        type='email'
                                        name='email'
                                        className="form-input checkout-group"
                                        country={"in"}
                                        enableSearch={true}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        inputStyle={{
                                            width: "100%",
                                            padding: "8px 50px",
                                        }}
                                    />
                                    {!codeSent ? (
                                        <button className='quickcheckoutbtn button-hover-color' onClick={handleEmailSubmit}>Continue</button>
                                    ) : (
                                        <>
                                            <input
                                                type='text'
                                                placeholder='Enter verification code'
                                                className='form-inputs mt-2'
                                                value={inputCode}
                                                onChange={(e) => setInputCode(e.target.value)}
                                            />
                                            <button onClick={handleCodeVerification} className='quickcheckoutbtn button-hover-color mt-2'>Verify & Continue</button>
                                        </>
                                    )}
                                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                                </div>
                                {/* <div className="form-group mobilecheckoutdiv emailcheckoutdiv position-relative">
                                    <label htmlFor="email" className="labelname">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"


                                        required
                                        placeholder=""
                                        className="form-inputs"
                                        style={{
                                            paddingLeft: "30px",
                                            color: "#1E1E1E",
                                            lineHeight: "16px",
                                            fontSize: "16px",
                                            fontWeight: 400,
                                        }}
                                    />
                                    <HiOutlineMail
                                        style={{
                                            position: "absolute",
                                            color: "#667085",
                                            top: "50%",
                                            left: "29px",
                                            transform: "translateY(-50%)",
                                            fontSize: "20px"
                                        }}
                                    />
                                    <button onClick={handleCodeVerification} className='quickcheckoutbtn button-hover-color'>Continue</button>
                                </div> */}


                            </div>
                            {/* 2nd div */}
                            <div className='quickcheckoutdivsecond'>
                                <div className='securecheckoutdiv'>
                                    <p className='securecheckout'><img src={Icon} alt="icon" /> Secure Checkout</p>
                                </div>
                                <p className='d-flex justify-content-between' style={{ borderBottom: '1px solid #000000' }}>
                                    <span className='' style={{ fontSize: '18px', fontWeight: 400, lineHeight: '18px' }}>{state.cart.length || 0} <Link style={{ textDecoration: 'Underline', color: '#793CFA', fontSize: '16px', fontWeight: 400, lineHeight: '16px' }}>Items</Link></span>
                                    <span style={{ fontWeight: 600, fontSize: '24px', lineHeight: '24px', color: 'var(--price-total)' }}>₹{subTotal}</span>
                                </p>
                                <p className='d-flex justify-content-between'>
                                    <span className='' style={{ fontSize: '18px', fontWeight: 400, lineHeight: '18px' }}>Item Total</span>
                                    <span style={{ fontWeight: 600, fontSize: '24px', lineHeight: '24px', color: 'var(--price-total)' }}>₹{total}</span>
                                </p>
                                <div className='d-flex flex-column'>
                                    <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '28px', color: '#667085' }}>Terms and conditions apply <Link to='/Policy' style={{ textDecoration: 'underline', margin: '0px', color: 'blue' }}>Read</Link></p>
                                    <div className='d-flex align-items-center  justify-content-between quickcheckoutapplyvouchertxt' style={{ border: '1px solid #000', padding: '5px 10px', borderRadius: '5px' }}>
                                        <div className='d-flex gap-5 voucherdiv' style={{}}>
                                            <span style={{ borderRight: '2px solid #e7e7e7', paddingRight: '15px', lineHeight: '16px', fontSize: '16px', fontWeight: 400, }}>Apply Voucher</span>
                                            <span className='toyfunspan' style={{ lineHeight: '16px', fontSize: '16px', fontWeight: 400 }}>TOYFUN20</span>
                                        </div>
                                        <button className='termsapply'>Apply</button>
                                    </div>
                                    <p className='' style={{ fontSize: '16px', lineHeight: '28px', fontWeight: 400, color: '#ABABAB' }}>Get 20% off your entire purchase!</p>
                                </div>
                                {/* basket div */}
                                <div className='d-flex flex-column gap-4 basketdiv'>
                                    <p style={{ color: 'var(--item-basket)', fontSize: '18px', fontWeight: 400, }}>Item in your basket({state.cart.length || 0})</p>
                                    {state.cart.length > 0 ? (
                                        state.cart.map((item) => {
                                            console.log('item from basket', item, state.cart);
                                            return (
                                                <>
                                                    {/* <p style={{  color: 'var(--item-basket)', fontSize: '18px', fontWeight: 400, }}>Item in your basket({state.cart.length || 0})</p> */}
                                                    <div key={item.id} className='d-flex gap-5 basketfirstdiv' style={{ borderBottom: '1px solid #dedede', paddingBottom: '10px' }}>
                                                        <span className='basketimgspan'><img src={Array.isArray(item.image) ? `${BASE_URL}${item.image[0]?.url}` : item.image_url} alt={item.title} /></span>
                                                        <span className='basketparaspan'>{item.title}</span>
                                                    </div>
                                                </>
                                            )
                                        })
                                    ) : (
                                        <p>Not Found basket Item</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuickCheckOut
