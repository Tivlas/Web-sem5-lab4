import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navigation.css';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/faq">FAQ</Link>
                </li>
                <li>
                    <Link to="/news">News</Link>
                </li>
                <li>
                    <Link to="/countries">(Countries and api)</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;