import React from 'react';
import { Link } from 'react-router-dom';
import logo from './UswapLogoTrans.png';
import Login from '../login/Login'
import { useAuth0 } from '@auth0/auth0-react';
import './navbar.css';


const Navbar = () => {
    const { isAuthenticated, user } = useAuth0()

    return (
        <>
            <img alt="logo" src={logo} className="navLogo"/>
            <Link className="linkStyle" to='/'>
                Home
            </Link>
            {
            isAuthenticated
            &&
            (<>
                <Link className="linkStyle" to='/notif'>
                    Notifications
                </Link>
                <Link className="linkStyle" to='/schedule'>
                    Schedule
                </Link>
                <Link className="linkStyle" to='/lists'>
                    Lists
                </Link>
            </>)
            }
        {
        !isAuthenticated
        ?
          <Login/>
        :
        <>
          <div className="nameStyle"> {user.name}</div>
          <Login/>
          <div className="userStyle">
              <img alt="icon" className="iconStyle" src={user.picture}/>
          </div>
        </>
        }
        </>
    );
};

export default Navbar;
