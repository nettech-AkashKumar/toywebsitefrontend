import React, { useState } from 'react'
import '../Login/Login.css'
import Doll from '../Register/RegisterImage/registerimg.webp'
import { Link, useNavigate } from 'react-router-dom';


const Login = ({ handleShowRegisterModal }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //handle login form submission
    const handleLogin = (e) => {
        e.preventDefault();
        //retrieve user data from local storage
        const existingData = JSON.parse(localStorage.getItem('formData')) || [];

        //find user with matching credentials
        const loggedInUser = existingData.find(
            (user) => user.email === email && user.password === password);
        if (loggedInUser) {
            alert('Login Successfully!!');
            navigate('/stationary');
        }
        else {
            alert('Invalid email or password!!')
        }
    };

    return (
        <div className='container-fluid register'>
            <div className="row align-items-center">
                <div className='registerpage'>
                    {/* left div */}
                    <div className='col-md-6 img-container'>
                        <img src={Doll} alt="regis-img" className='regis-img' />
                    </div>
                    {/* right div */}
                    <div className='col-md-6 registerform'>
                        <p className='registerheading'>Login Now</p>
                        <form onSubmit={handleLogin}>
                            <div className='form-group'>
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className='form-group registerbutton'>
                                <button type='submit' className='registerbtn'>Login</button>
                                <Link to='' className='registerlinkbtn' onClick={handleShowRegisterModal}>Create a new Account?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
