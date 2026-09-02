import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn, setUserName } = useAppContext();

    const handleLogin = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);
                setIsLoggedIn(true);
                setUserName(json.userName);
                navigate('/app');
            } else {
                setShowerr(json.error || 'Login failed');
            }
        } catch (e) {
            console.error('Error logging in:', e);
            setShowerr('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-md-center">
                <div className="col-5">
                    <h2>Login</h2>
                    <div className="mb-4">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {showerr && <p className="text-danger">{showerr}</p>}
                    <button className="btn btn-primary w-100 mb-4" onClick={handleLogin}>Login</button>
                    <p>New here? <a href="/app/register">Register</a></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
