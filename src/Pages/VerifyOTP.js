// import axios from 'axios';
import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const VerifyOTP = (e) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate();
    // const location = useLocation();
    // const phoneNumber = location.state?.phoneNumber || "";

    const handleVerifyOTP = () => {

        const confirmationResult = window.confirmationResult
        if(!confirmationResult) {
            return toast.error('OTP not sent successfully!')
        }

        confirmationResult.confirm(otp)
        .then((result) => {
            toast.success('Phone number verified!')
            // const user = result.user;
            // console.log('User info:', user)
            navigate("/checkout")
        })
        .catch((error) => {
            console.error(error);
            toast.error('Invalid OTP')
        })
    //     if(!phoneNumber) {
    //         toast.error("Phone Number is missing")
    //     }
    //     axios.post("http://localhost:8081/verify-otp", {phoneNumber, userOTP: otp})
    //     .then((response) => {
    //         if(response.data.success) {
    //             toast.success("OTP Verified Successfully!")
    //         } else {
    //             toast.error("Invalid OTP")
    //         }
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //         toast.error("Error verifying OTP")
    //     })
    };
  return (
    <div>
      <h1>Verify OTP</h1>
      <label>OTP:
        <input type='text' value={otp} onChange={setOtp(e.target.value)} placeholder='Enter OTP'/>
      </label>
      <button onClick={handleVerifyOTP}>Verify OTP</button>
    </div>
  )
}

export default VerifyOTP
