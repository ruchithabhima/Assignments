import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
const Header = () => {
     const [isOpen, setIsOpen] = useState(false);
    const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light  times" style={{backgroundColor: "#eee7fc",height: "58px"}}>
        <a className="navbar-brand name " href="#" >Ruchitha Bhima</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" 
        aria-label="Toggle navigation" onClick={handleMenuClick}>
            <i className={`bi ${isOpen ? "bi-x" : "bi-list"}`}></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto  gap-2">
            <li className="nav-item active">
                <Link className="nav-link background rounded-3" to="/" >Home </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link background rounded-3" to="/about">About</Link>
            </li>
             <li className="nav-item">
                <Link className="nav-link background rounded-3" to="/stats">Stats</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link background rounded-3"to="/projects">Projects</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link background rounded-3" to="/journey">My Journey</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link background rounded-3" to="/contact">Contact</Link>
            </li>
            </ul>
            
        </div>
    </nav>
    </header>
  )
}

export default Header
