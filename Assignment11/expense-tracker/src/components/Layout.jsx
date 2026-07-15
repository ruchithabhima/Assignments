import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="app-layout">
        <Sidebar
          collapsed={collapsed}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className={`content ${collapsed ? "collapsed" : ""}`}>
          <Navbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
