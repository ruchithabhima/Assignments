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
import { useLocation } from "react-router-dom";

function Sidebar({ collapsed, isSidebarOpen, setIsSidebarOpen }) {
  const role = localStorage.getItem("role");
  const isDesktop = window.innerWidth <= 768;
  const location = useLocation();
  const reportFilters = JSON.parse(sessionStorage.getItem("reportFilters"));
  return (
    <div
      className={`sidebar ${
        isSidebarOpen ? "mobile-open" : ""
      } ${collapsed ? "collapsed" : ""}`}
    >
      <div className="d-flex gap-2 align-items-center">
        <MdAccountBalanceWallet className="walleticon ml-5" />
        {!collapsed && !isDesktop && <h2 className="h2">Expense Tracker</h2>}
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
            {!collapsed && !isDesktop && <li>Dashboard</li>}
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
            <FaArrowAltCircleUp /> {!collapsed && !isDesktop && <li>Income</li>}
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
            <FaArrowAltCircleDown />{" "}
            {!collapsed && !isDesktop && <li>Expenses</li>}
          </NavLink>
        </div>
        <div className="sideicons">
          <NavLink
            to={
              reportFilters?.from || reportFilters?.to
                ? `/report?from=${reportFilters.from}&to=${reportFilters.to}`
                : "/report"
            }
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
            onClick={() => {
              if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
              }
            }}
          >
            <FaChartBar /> {!collapsed && !isDesktop && <li>Reports</li>}
          </NavLink>
        </div>
        {role === "admin" && (
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
              <FaUsers /> {!collapsed && !isDesktop && <li>Users</li>}
            </NavLink>
          </div>
        )}
      </ul>
    </div>
  );
}
export default Sidebar;
