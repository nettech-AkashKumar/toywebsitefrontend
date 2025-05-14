import React, { useState } from 'react'
import '../Register/Register.css';
import Doll from '../Register/RegisterImage/registerimg.webp'
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
// import { Navbar } from 'react-bootstrap';
// import Navbarr from '../Navbar/Navbar';

const Register = ({handleShowModal, handleCloseRegisterModal}) => {

    const showLogin = () => {
        handleShowModal(); handleCloseRegisterModal();
    }
    //form data submittion
    const registerForm = {
        name: "",
        email: "",
        password: "",
    };
    const [Data, setData] = useState(registerForm);
    const navigate = useNavigate();

    //handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        saveFormData(Data);
        alert('Registered Successfully!!');
        setData(registerForm);
        showLogin();  //if it register then it render to login page
    };

    //save form data to localstorage
    const saveFormData = (formData) => {
        let existingData = JSON.parse(localStorage.getItem('formData')) || [];
        if (!Array.isArray(existingData)) {
            existingData = [];
        }
        existingData.push(formData);
        localStorage.setItem('formData', JSON.stringify(existingData));
        console.log('Updated data in console', existingData);
    };

    return (
        <>
            <div className='container-fluid register'>
                <div className="row align-items-center">
                    <div className='registerpage'>
                        {/* left div */}
                        <div className='col-md-6 img-container'>
                            <img src={Doll} alt="regis-img" className='regis-img' />
                        </div>
                        {/* right div */}
                        <div className='col-md-6 registerform'>
                            <p className='registerheading'>Register Page</p>
                                <form action="" onSubmit={handleSubmit}>
                                    <div className='form-group'>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name='name' id='name' required value={Data.name} onChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' id='email' required value={Data.email} onChange={handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name='password' id='password' required value={Data.password} onChange={handleChange} />
                                    </div>
                                    <div className='form-group registerbutton'>
                                        <button type='submit' className='registerbtn'>Submit</button>
                                        <Link to='' className='registerlinkbtn' onClick={showLogin}> Already Registered?</Link>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
