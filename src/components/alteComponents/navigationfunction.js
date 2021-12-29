import React from 'react'
import './leftbar.css'
import { NavLink } from "react-router-dom"

function Leftbar(props) {
    return (
        <div class="sidenav">
            <nav className="navbar">
                <NavLink to="/">Home</NavLink>
            </nav >

            <nav className="navbar">
                <NavLink to="/CreateStream">CreateStream</NavLink>
            </nav >
            <nav className="navbar">
                <NavLink to="/About">About</NavLink>
            </nav >
        </div>

    )
}

export default Leftbar