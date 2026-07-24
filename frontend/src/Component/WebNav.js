import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FaPhone, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const WebNav = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [currentPath]);

    useEffect(() => {
        document.body.classList.toggle('nav-menu-open', isMenuOpen);

        const onKeyDown = (event) => {
            if (event.key === 'Escape') setIsMenuOpen(false);
        };

        if (isMenuOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            document.body.classList.remove('nav-menu-open');
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isMenuOpen]);

    const isActive = (path) => currentPath === path;
    const isBlogActive = currentPath === '/blog' || currentPath.startsWith('/blog/');
    const isCoursesActive = currentPath === '/courses' || currentPath.startsWith('/courses/');

    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <header className={`site-header ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-content">
                        <div className="contact-info">
                            <a href="tel:+923074022559"><FaPhone aria-hidden="true" /> +92 307 4022559</a>
                            <a href="mailto:info@villageacademia.edu.pk" className="top-email">
                                <FaEnvelope aria-hidden="true" /> info@villageacademia.edu.pk
                            </a>
                        </div>
                        {/* <div className="top-links">
                            <Link to="/login">Admin Portal</Link>
                        </div> */}
                    </div>
                </div>
            </div>

            <nav className="main-nav" aria-label="Main navigation">
                <div className="container">
                    <div className="nav-content">
                        <Link to="/" className="logo" onClick={closeMenu}>
                            <span className="logo-mark">
                                <img
                                    src={logo}
                                    alt="The Village Academia"
                                    width="48"
                                    height="48"
                                    decoding="async"
                                />
                            </span>
                            <span className="logo-text">
                                <span className="logo-name">Village Academia</span>
                                <span className="logo-tagline">Alif se Maloom tak</span>
                            </span>
                        </Link>

                        <button
                            type="button"
                            className={`nav-toggle ${isMenuOpen ? 'is-open' : ''}`}
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                            aria-controls="main-nav-menu"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
                        </button>

                        <div
                            id="main-nav-menu"
                            className={`nav-menu ${isMenuOpen ? 'mobile-open' : ''}`}
                        >
                            <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>Home</Link>
                            <Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMenu}>About</Link>
                            <Link to="/courses" className={isCoursesActive ? 'active' : ''} onClick={closeMenu}>Class & Courses</Link>
                            <Link to="/blog" className={isBlogActive ? 'active' : ''} onClick={closeMenu}>Blog</Link>
                            <Link to="/faq" className={isActive('/faq') ? 'active' : ''} onClick={closeMenu}>FAQs</Link>
                            <Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMenu}>Contact</Link>

                            <div className="nav-menu-mobile-extra">
                                <a href="tel:+923074022559" className="nav-mobile-contact">
                                    <FaPhone aria-hidden="true" /> Call Us
                                </a>
                                <Link to="/admission-form" className="nav-mobile-cta" onClick={closeMenu}>
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <button
                    type="button"
                    className="nav-overlay"
                    aria-label="Close menu"
                    onClick={closeMenu}
                />
            )}
        </header>
    );
};

export default WebNav;
