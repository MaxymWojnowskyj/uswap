import React from 'react';


import { Link } from 'react-router-dom';

//const NavLink = styled.ul

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'white'
}

const Navbar = () => {
    return (
        <>
            <Link style={linkStyle} to='/'>
                Home
            </Link>
            <Link style={linkStyle} to='/notif'>
                Notifications
            </Link>
            <Link style={linkStyle} to='/schedule'>
                Schedule
            </Link>
            <Link style={linkStyle} to='/lists'>
                Lists
            </Link>
            <Link style={linkStyle} to='/account'>
                Account
            </Link> 
        </>	
    );
};

export default Navbar;
