import React from 'react';


import { Link } from 'react-router-dom';
import logo from './UswapLogoTrans.png';
import Login from '../login/Login'
import { useAuth0 } from '@auth0/auth0-react';
import './navbar.css';

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

const iconStyle = {
  width: 45,
  height: 45,

}

const userStyle = {
    position: "absolute",
    right: 10,
    top: 10,
    display:"inline-block"
}

const nameStyle = {
    position: "absolute",
    right: 65,
    top: 10,
    display:"inline-block",
    color: "white"
}




const Navbar = () => {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

    return (
        <>
            <img src={logo} style={logoStyle}/>
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
        {
        !isAuthenticated
        ?
          <Login/>
        :
        <>
          <div style={nameStyle}> {user.name}</div>
          <Login/>
          <div style={userStyle}>
              <img style={iconStyle} src={user.picture}/>
          </div>
        </>
        }
        </>
    );
};

export default Navbar;
