import React from "react";
import "../styles/DashboardStyles.css";
import { FaRegUser, FaCog, FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = ({ collapsed, setCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-light  times"
        style={{ backgroundColor: "#f4f4f4", height: "58px" }}
      >
        <div className="nav-left d-flex gap-2 align-items-center">
          <FaBars
            className="hamburger"
            onClick={() => setCollapsed(!collapsed)}
          />
          <a className="navbar-brand name brand" href="#">
            Dashboard
          </a>
        </div>
        <div className="nav-right">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleMenuClick}
          >
            <i className={`bi ${isOpen ? "bi-x" : "bi-list"}`}></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto  gap-2">
              <li className="nav-item">
                <Link
                  className="nav-link  transaction-icon2 rounded-3"
                  to="/profile"
                >
                  <FaRegUser />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link transaction-icon2 rounded-3"
                  to="/settings"
                >
                  <FaCog />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
