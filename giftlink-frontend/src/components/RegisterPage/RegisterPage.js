import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn, setUserName } = useAppContext();

    const handleRegister = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                setIsLoggedIn(true);
                setUserName(firstName);
                navigate('/app');
            } else {
                setShowerr(json.error || 'Registration failed');
            }
        } catch (e) {
            console.error('Error registering user:', e);
            setShowerr('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-md-center">
                <div className="col-5">
                    <h2>Register</h2>
                    <div className="mb-4">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {showerr && <p className="text-danger">{showerr}</p>}
                    <button className="btn btn-primary w-100 mb-4" onClick={handleRegister}>Register</button>
                    <p>Already a member? <a href="/app/login">Login</a></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
