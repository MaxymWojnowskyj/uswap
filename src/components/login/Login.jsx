import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const logStyle = {
    position: "absolute",
    right: 65,
    top: 30,
    display:"inline-block",
    color: "white",
}

const Login = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

    return (
        <div style={logStyle}>
            {
            //if user is not logged in then display the login btn
            //otherwise display the logout button
            !isAuthenticated
            ?
                (<button onClick={() => loginWithRedirect()}>
                    Log in
                </button>)
            :
                (<button onClick={() => logout()}>
                    Log out
                </button>)
            }
        </div>
    )
}

export default Login
