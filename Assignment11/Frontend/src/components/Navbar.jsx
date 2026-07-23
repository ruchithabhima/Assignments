import React from "react";
import "../styles/DashboardStyles.css";
import { FaRegUser, FaCog, FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = ({
  collapsed,
  setCollapsed,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };
  const loaction = useLocation();
  const pageTitle =
    loaction.pathname === "/dashboard"
      ? "Dashboard"
      : loaction.pathname === "/profile"
        ? "Profile"
        : loaction.pathname === "/settings"
          ? "Settings"
          : location.pathname === "/income"
            ? "Income Management"
            : location.pathname === "/expense"
              ? "Expense Management"
              : location.pathname === "/report"
                ? "Reports"
                : location.pathname === "/users"
                  ? "Users"
                  : "Dashboard";
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/signin");
  };
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-light  times"
        style={{ backgroundColor: "#f4f4f4", height: "65px" }}
      >
        <div className="nav-left d-flex gap-2 align-items-center">
          <FaBars
            className="hamburger"
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsSidebarOpen(!isSidebarOpen);
              } else {
                setCollapsed(!collapsed);
              }
            }}
          />
          <a className="navbar-brand name brand" href="#">
            {pageTitle}
          </a>
        </div>
        <div className="nav-right">
          <Link
            className="nav-link  transaction-icon2 rounded-3"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaRegUser />
          </Link>

          {showMenu && (
            <div className="profile-dropdown">
              <button
                onClick={() => {
                  navigate("/profile");
                  setShowMenu(false);
                }}
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  navigate("/settings");
                  setShowMenu(false);
                }}
              >
                change password
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setShowMenu(false);
                }}
                className="logout"
              >
                Logout{" "}
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
