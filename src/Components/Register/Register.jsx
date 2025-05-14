import React, { useState } from 'react';
import '../Register/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import MenuItem from "@mui/material/MenuItem";
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const Register = ({ handleShowModal, handleCloseRegisterModal }) => {
    const [image, setImage] = useState(null)
    const registerForm = {
        name: "",
        email: "",
        password: "",
        role: "user"  // Default role 'user'
    };

    const [Data, setData] = useState(registerForm);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await fetch('http://localhost:8081/api/users/register', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(Data),
    //         });
    //         const result = await response.json();
    //         if (response.ok) {
    //             // alert('Registered Successfully!')
    //             toast.success("Registered Successfully!", {
    //                 position: 'top-center',
    //                 // autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 theme: "colored",
    //             });
    //             setTimeout(() => {
    //                 setData(registerForm);
    //                 navigate('/login');
    //             }, 2000)
    //         } else {
    //             // alert(result.message || 'Registeration failed')
    //             toast.error("Registeration failed", {
    //                 position: 'top-center',
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error', error)
    //         // alert('Something went wrong')
    //         toast.success("Something went wrong", {
    //             position: 'top-center',
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             theme: "colored",
    //         });
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", Data.name);
        formData.append("email", Data.email)
        formData.append("password", Data.password)
        formData.append("role", Data.role)
        if (image) formData.append("profileImage", image)
        try {
            const response = await fetch("http://localhost:8081/api/users/register", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                toast.success("Registered Successfully!", { position: 'top-center' });
                setTimeout(() => {
                    setData(registerForm);
                    navigate("/login");
                }, 2000)
            } else {
                toast.error(result.message || "Registration failed", { position: 'top-center' })
            }
        } catch (error) {
            console.error("Failed to register go into catch block", error)
            toast.error("Something went wrong", { position: 'top-center' })
        }
    }
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [role, setRole] = useState("");

    return (
        <section className="section">
            <div className="container">
                <div className="cardie">
                    <h3 className='logintxt'>Register with a new account</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-groupee w-full mb-3">
                            <TextField
                                type="text"
                                id="name"
                                label="Name *"
                                variant="outlined"
                                fullWidth
                                name='name'
                                value={Data.name}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                                    }
                                }}
                            />
                        </div>
                        <div className="form-groupee w-full mb-3">
                            <TextField
                                type="email"
                                id="email"
                                label="Email Id *"
                                variant="outlined"
                                fullWidth
                                name='email'

                                value={Data.email}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                                    }
                                }}
                            />
                        </div>
                        <div className="form-groupee w-full mb-3 password-field">
                            <TextField
                                type={isShowPassword ? "text" : "password"}
                                id="password"
                                label="Password *"
                                variant="outlined"
                                fullWidth
                                name='password'

                                value={Data.password}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                                    }
                                }}
                            />
                            <Button
                                className="eye-button eye"
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                            </Button>
                        </div>
                        {/* image uploads */}
                        <div className="form-groupee w-full mb-3">
                            <input
                                type="file"
                                name="profileImage"
                                label="Image "
                                accept='image/*'
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                                id='image'
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="image" >
                                <Button style={{ backgroundColor: '#793cfa' }} variant="contained" component="span">
                                    Upload Profile
                                </Button>
                            </label>

                        </div>
                        <div className="form-groupee w-full mb-3">
                            <Button type='submit' className="register-btn" fullWidth>
                                Register
                            </Button>
                        </div>
                        <p className="text-centerr">
                            Already Registered? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer position='top-center' />
        </section>
    );
};

export default Register;
