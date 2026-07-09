import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    const [collapsed,setCollapsed]=useState(false);
  return (
    <>
    <div className="app-layout">
        <Sidebar collapsed={collapsed}/>
        <div className={`content ${collapsed ? "collapsed" : ""}`}>
            <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default Layout
