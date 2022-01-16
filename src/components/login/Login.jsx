import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

    return (
        <div>
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
