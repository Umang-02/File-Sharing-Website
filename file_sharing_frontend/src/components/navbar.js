import React from 'react';
import "../components/navbar.css";
import { Link } from "react-router-dom"
const navbar = () => {
  return (
    <>
        <nav className="main-nav-bar">
            <div className="logo_name">
                <h2 data-text="Ultra Share">
                Ultra Share
                </h2>
            </div>
            <div className="menu_link">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/startsharing">FileShare</Link>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                </ul>
            </div>
            <div className="login-signup">
                <ul>
                    <li>
                        <a href="#">Login</a>
                    </li>
                    <li>
                        <a href="#">Sign Up</a>
                    </li>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default navbar
