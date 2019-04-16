import React from 'react';
import {BrowserRouter as Route, Link} from "react-router-dom";
import './navBar.css'

const NavBar = () => {
    return (
        <div>
            <Link to="/welcomePage" className='mainLink'><h3>LifeGPA</h3></Link>
            <Link to="/login">Login</Link>
            <Link to="/signUp">Sign Up</Link>
        </div>
    )
}

export default NavBar