import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutModal from "../../Components/Logout/LogoutModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout as reduxLogout } from "../../Redux/AuthSlice"; 
import BASE_URL from "../../config/config";

const SidebarAllpages = () => {
  const navigate = useNavigate()
   const { logout } = useAuth0();
      const dispatch = useDispatch();
      const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");

  // const id = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id)
    console.log("id from sidebar", id);
  }, []);

  //delete account
  const handleDeleteUser = async (id) => {
    console.log("id from sidebar", id);
    try {
      await axios.delete(`${BASE_URL}/api/users/${id}`, {
        header: {
          "Content-Type": "application/json",
        },
      });
      dispatch(reduxLogout());
      navigate("/")
      alert("Account deleted successfully");
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <div>
      <ul
        className="list-unstyled"
        style={{ background: "var(--background)", color: "var(--text-color)" }}
      >
        <li>
          {" "}
          <Link
            to="/account_details"
            style={{ color: "var(--text-color)", fontWeight: "bold" }}
          >
            Account details
          </Link>
        </li>

        <li>
          {" "}
          <Link
            to="/order_history"
            style={{ color: "var(--text-color)", fontWeight: "bold" }}
          >
            Orders History{" "}
          </Link>
        </li>

        <li>
          <Link
            to="/whislist"
            style={{ color: "var(--text-color)", fontWeight: "bold" }}
          >
            Wishlist
          </Link>
        </li>

        <li>
          {" "}
          <Link
            to="/address_book"
            style={{ color: "var(--text-color)", fontWeight: "bold" }}
          >
            Address book
          </Link>
        </li>

        <li>
          <Link
            to="/recentactivtiy"
            style={{ color: "var(--text-color)", fontWeight: "bold" }}
          >
            Recent Activity
          </Link>
        </li>

        <li>
          <Link
            to="/help_support"
            style={{ color: "var(--text-color)", fontWeight: "bold" }}
          >
            Support & Help{" "}
          </Link>
        </li>

        <li>
          <Link
            to="/ordertracking"
            style={{ color: "var(--text-color)", fontWeight: "bold" }}
          >
            Order Tracking
          </Link>
        </li>

        <li>
          <Link
            to="/reviewrating"
            style={{ color: "var(--text-color)", fontWeight: "bold" }}
          >
            Reviews & Ratings
          </Link>
        </li>

        <li style={{ color: "var(--text-color)" }}>
          <Link
            style={{
              color: "var(--text-color)",
              fontWeight: "bold",
              background: "none",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Logout
          </Link>
          <LogoutModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </li>
        <li>
          <Link
            to="/"
            onClick={() => handleDeleteUser(userId)}
            style={{ color: "var(--text-color)", fontWeight: "bold" }}
          >
            Delete Account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAllpages;
