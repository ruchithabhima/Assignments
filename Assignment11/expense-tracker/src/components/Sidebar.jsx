import {
  FaHome,
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
  FaChartBar,
  FaUsers,
} from "react-icons/fa";
import React from "react";
import "../styles/DashboardStyles.css";
import { NavLink } from "react-router-dom";
import { MdAccountBalanceWallet } from "react-icons/md";
function Sidebar({ collapsed, isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div
      className={`sidebar ${collapsed ? "collapsed mobile-show" : ""} ${isSidebarOpen ? "mobile-open" : ""}`}
    >
      <div className="d-flex gap-2 align-items-center">
        <MdAccountBalanceWallet className="walleticon ml-5" />
        {!collapsed && <h2 className="h2">Expense Tracker</h2>}
      </div>
      <hr />
      <ul className="listsidebar">
        <div className="sideicons">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <FaHome />
            {!collapsed && <li>Dashboard</li>}
          </NavLink>
        </div>
        <div className="sideicons">
          <NavLink
            to="/income"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <FaArrowAltCircleUp /> {!collapsed && <li>Income</li>}
          </NavLink>
        </div>
        <div className="sideicons">
          <NavLink
            to="/expense"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <FaArrowAltCircleDown /> {!collapsed && <li>Expenses</li>}
          </NavLink>
        </div>
        <div className="sideicons">
          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <FaChartBar /> {!collapsed && <li>Reports</li>}
          </NavLink>
        </div>
        <div className="sideicons">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <FaUsers /> {!collapsed && <li>Users</li>}
          </NavLink>
        </div>
      </ul>
    </div>
  );
}
export default Sidebar;
