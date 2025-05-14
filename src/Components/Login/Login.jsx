import React, { useState } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Redux/AuthSlice";
import { CartState } from "../../context/Context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";



const Login = ({ handleShowRegisterModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dispatch: cartDispatch } = CartState();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (response.ok) {
        // alert(`Welcome ${result.name}! Login Successfully`)
        toast.success(`Welcome ${result.name}! Login Successfully`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        //save token in localstorage
        localStorage.setItem("token", result.token)
        //save userId separately in localstorage
        localStorage.setItem("userId", result.id)
        localStorage.setItem("loggedInUser", JSON.stringify(result));
        //save user data in redux
        dispatch(login(result));
        //save user data in localstorage
        localStorage.setItem("loggedInUser", JSON.stringify(result));

        //load user's cart from backend if implemented or localstorage
        const userCart = JSON.parse(localStorage.getItem(`cart_${result.email}`)) || [];
        cartDispatch({ type: "SET_CART", payload: userCart })

        //redirect based on role
        if (result.role === "admin") {
          navigate("/dashboard")
        } else {
          navigate("/home");
        }
      } else {
        // alert(result.message || "Invalid email or password")
        toast.error(`Invalid email or password`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Login Error:", error)
      // alert("Something went wrong. Please try again")
      toast.error(`Something went wrong. Please try again`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

    }
  };
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <section className="section">
      <div className="container">
        <div className="cardie">
          <h3 className="logintxt">Login with an account</h3>
          <form onSubmit={handleLogin}>
            <div className="form-groupee w-full mb-3">
              <TextField
                type="email"
                id="email"
                label="Email Id *"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
            </div>
            <div className="form-groupee w-full mb-3 password-field">
              <TextField
                type={isShowPassword ? "text" : "password"}
                id="password"
                label="Password *"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
              <Button
                className="eye-button eye"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </Button>
            </div>
            <div className="form-groupee w-full mb-3">
              <Button type="submit" className="register-btn" fullWidth>
                Login
              </Button>
            </div>
            <p className="text-centerr">
              Not Registered? <Link to="/register" onClick={handleShowRegisterModal}>SignUp</Link>
            </p>
            <p className="text-centerr">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer position="top" />
    </section>
  );
};

export default Login;

