import React from "react";
import "../Logout/LogoutModal.css";
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from "react-redux";
import { logout as reduxLogout } from "../../Redux/AuthSlice"; // Renaming the redux logout function

const LogoutModal = ({ isOpen, onClose }) => {
    const { logout } = useAuth0();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h2>Logging Out</h2>
                <p>Hey! you are leaving our site.</p>
                <div className="modal-actions">
                    <button className="logout-btn" onClick={() =>{
                        logout({
                            logoutParams: { returnTo: window.location.origin },
                        });
                        dispatch(reduxLogout()); // Using the renamed redux logout function
                    }}>
                        Logout
                    </button>
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
