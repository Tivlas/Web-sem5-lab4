// AuthButtons.js

import React from 'react';
import { Link } from 'react-router-dom';
import GoogleButton from './googleButton';
import './styles/timeZone.css';
// { isAuthenticated, onLogout, onParentLogout }
const AuthButtons = (props) => {
    const handleLogout = () => {
        console.log('Logout clicked');
        props.onLogout();
        props.onParentLogout();
    };

    return (
        <div className="right-panel">
            <ul className="auth-buttons">
                {!props.isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
                        </li>

                        <li>
                            <Link to="/register">
                                <button>Register</button>
                            </Link>
                        </li>
                        <li>
                            <GoogleButton />
                        </li>
                    </>
                ) : (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default AuthButtons;