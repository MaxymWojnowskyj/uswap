import React from 'react'
import './account.css'
import { useAuth0 } from '@auth0/auth0-react';

const Account = () => {

    const { user } = useAuth0()

    return (
        <div>
            {JSON.stringify(user, null, 2)}
        </div>
    )
}

export default Account
