import React from 'react';
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {
    const { isLoggedIn, userName } = useAppContext();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">GiftLink</a>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/* Task 1: Add links to Home and Gifts below*/}
                    <li className="nav-item">
                        <a className="nav-link" href="/app">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/app/search">Gifts</a>
                    </li>
                    {isLoggedIn ? (
                        <li className="nav-item">
                            <span className="nav-link">Welcome, {userName}</span>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/app/login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/app/register">Register</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
