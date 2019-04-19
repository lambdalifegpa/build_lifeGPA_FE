import React from 'react';
import {BrowserRouter as Route, Link} from "react-router-dom";
import './navBar2.css'

const NavBar2 = props => {

    return (
        <div className='navBar2'>
            <h2 className='mainTitle2'>LifeGPA</h2>
            <div className='navBarLinks2'>
                <Link onClick={props.logOut} className='Links'>Logout</Link>
            </div>
        </div>
    )
}

export default NavBar2