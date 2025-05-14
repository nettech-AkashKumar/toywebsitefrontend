import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/api/users/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })
            const result = await response.json();
            if (response.ok) {
                toast.success(`Password reset lint sent to ${email}`, {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                //redirect to the login page after notification
                // setTimeout(() => {
                //     navigate("/reset-password")
                // }, 3000);
            } else {
                toast.error(result.message || "Invalid email or user not found", {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        } catch (error) {
            console.error("Forgot Password Error:", error)
            toast.error("Something went wrong. Please try again later", {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                draggable: true,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }
    return (
        <section className="section">
            <div className="container">
                <div className="cardie">
                    <h3>Forgot Password</h3>
                    <form onSubmit={handleForgotPassword}>
                        <div className="form-groupee w-full mb-3">
                            <TextField
                                type='email'
                                id='email'
                                label='Enter your email'
                                variant='outlined'
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-groupee w-full mb-3">
                            <Button type='submit' className='register-btn' fullWidth>
                                Send Reset Link
                            </Button>
                        </div>
                        <p className='text-centerr'>
                            <Link to='/login'>Back to Login</Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer position='top' />
        </section>
    )
}

export default ForgotPassword;
