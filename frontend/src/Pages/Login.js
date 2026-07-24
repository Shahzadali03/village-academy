import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import logoLogin from '../assets/images/logo-login.png';
import logo from '../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../Redux/action/authAction';
import { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { user, success } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const data = {
                email,
                password
            }
            dispatch(loginRequest(data));
        }
        setValidated(true);
    };

    return (
        <div className='login-page'>
            <Toaster />

            {/* Left Panel - Exact replica */}
            <div className="left-section">
                {/* Decorative dots pattern */}
                <div className="dots-pattern-top"></div>

                {/* Logo and brand */}
                <div className="brand-header">
                    <img src={logo} alt="The Village Academia" className="brand-logo" />
                    <div className="brand-info">
                        <h1>THE VILLAGE <br /> ACADEMIA</h1>
                        <p>Alif se Maloom tak</p>
                    </div>
                </div>

                {/* Main content */}
                <div className="hero-content">
                    <h2 className="hero-title">
                        Empowering Education,<br />
                        <span className="highlight">Inspiring Futures.</span>
                    </h2>
                    <div className="accent-line"></div>

                    <p className="hero-description">
                        A complete academy management
                        solution to simplify <br className='d-none d-sm-inline'/> administration
                        and enhance learning.
                    </p>

                    {/* Features list */}
                    <div className="features-list">
                        <div className="feature-item">
                            <div className="feature-icon smart-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3L1 9L12 15L21 12.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Smart Management</h4>
                                <p>Streamline your academy<br />operations in one place.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon community-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C18.7 14 22 15.3 22 17V20H10V17C10 15.3 13.3 14 16 14M8 4C10.2 4 12 5.8 12 8S10.2 12 8 12 4 10.2 4 8 5.8 4 8 4M8 14C10.7 14 14 15.3 14 17V20H2V17C2 15.3 5.3 14 8 14Z" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Connected Community</h4>
                                <p>Students, teachers & parents<br />all connected.</p>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon decisions-icon">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Better Decisions</h4>
                                <p>Make informed decisions with<br />powerful insights.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Exact replica */}
            <div className="right-section">
                {/* Decorative elements */}
                <div className="orange-blob"></div>
                <div className="dots-pattern-right"></div>

                {/* Login form container */}
                <div className="form-container">
                    <div className="form-header">
                        <img src={logo} alt="The Village Academia" className="form-logo" />
                        <h2>Welcome Back 👋</h2>
                        <p>Sign in to continue to your dashboard</p>
                    </div>

                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                </svg>
                                <input
                                    id="username"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
                                </svg>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="checkbox-custom"></span>
                                Remember me
                            </label>
                        </div>

                        <button type="submit" className="login-button">
                            Sign In
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                            </svg>
                        </button>

                        <div className="security-notice">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                            </svg>
                            Secure login • Your data is protected
                        </div>

                        <Link to="/" className="back-to-site">
                            &larr; Back to Website
                        </Link>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
