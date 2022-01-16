import React from 'react'
import logo from './UswapLogoTrans.png'
import './home.css'
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

    return (
        <div className='main'>
            <img alt="logo" src={logo}></img>
            <div className='logDiv'>
                {
                //if user is not logged in then display the login btn
                //otherwise display the logout button
                !isAuthenticated
                ?
                    (<button className="logBtn" onClick={() => loginWithRedirect()}>
                        Log in
                    </button>)
                :
                    (<button className="logBtn" onClick={() => logout()}>
                        Log out
                    </button>)
                }
            </div>
            <h3>Swap your university classes with other students</h3>
            <h6>Developed by: Maxym Wojnowskyj, Evan Maloney, Sheldon Roberts, and Shea Mccormack</h6>
        </div>
    )
}

export default Home
