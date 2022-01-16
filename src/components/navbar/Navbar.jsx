import React from 'react';


import { Link } from 'react-router-dom';
import logo from './UswapLogoTrans.png';
import Login from '../login/Login'

//const NavLink = styled.ul

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'white'
}

const logoStyle = {
  width: 130,
  height: 36,
  position: "absolute",
  left: 15,
  top: 15
}

const Navbar = () => {
    return (
        <>
            <img src={logo} style={logoStyle}/>
            <Login />
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
