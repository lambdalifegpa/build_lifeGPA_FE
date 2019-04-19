import React from 'react';
import {BrowserRouter as Route, Link} from "react-router-dom";
import './navBar1.css'

const NavBar = () => {
    return (
        <div className='navBar1'>
            <h2 className='mainTital1'>LifeGPA</h2>
            <div className='navBarLinks'>
                <Link to="/login" className='Link'>Login</Link>
                <Link to="/signUp" className='Link'>Sign Up</Link>
            </div>
        </div>
    )
}

export default NavBar