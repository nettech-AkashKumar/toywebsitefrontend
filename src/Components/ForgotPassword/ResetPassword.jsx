import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import BASE_URL from '../../config/config';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match")
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/users/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });
            const result = await response.json();
            if (response.ok) {
                toast.success("Password reset successfully")
                setTimeout(() => navigate('/login'), 2000)
            } else {
                toast.error(result.message || "Invalid or expired token")
            }
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
    }
    return (
        <section className="section">
            <div className="container">
                <div className="cardie">
                    <h3>Reset Password</h3>
                    <form onSubmit={handleResetPassword}>
                        <div className="form-groupee w-full mb-3">
                            <TextField
                                type='password'
                                label='New Password'
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-groupee w-full mb-3">
                            <TextField
                                type='password'
                                label='Confirm Password'
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Button type='submit' fullWidth>
                            Reset Password
                        </Button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default ResetPassword
