import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaPhone, FaEnvelope, FaMapMarkerAlt,
    FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
} from 'react-icons/fa';
import logo from '../assets/images/logo.png';

const WebFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="main-footer text-start">
            <div className="footer-main">
                <div className="footer-glow footer-glow-1" aria-hidden="true" />
                <div className="footer-glow footer-glow-2" aria-hidden="true" />

                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section footer-brand-section">
                            <div className="footer-logo">
                                <img src={logo} alt="The Village Academia" width="42" height="42" loading="lazy" decoding="async" />
                                <div>
                                    <span className="footer-logo-name">Village Academia</span>
                                    <span className="footer-logo-tagline">Alif se Maloom tak</span>
                                </div>
                            </div>
                            <p className="footer-about">
                                Empowering minds and building futures through quality education that combines
                                traditional values with modern learning approaches.
                            </p>
                            <div className="social-links">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                            </div>
                        </div>

                        <div className="footer-section">
                            <h4><span className="footer-heading-dot" /> Get in Touch</h4>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <span className="contact-icon"><FaMapMarkerAlt /></span>
                                    <span>HBL Poultry Farm, GT Road, Manawan, Lahore, Pakistan</span>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon"><FaPhone /></span>
                                    <a href="tel:+923074022559">0307-4022559</a>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon"><FaEnvelope /></span>
                                    <a href="mailto:info@villageacademia.edu.pk">info@villageacademia.edu.pk</a>
                                </div>
                            </div>
                        </div>

                        <div className="footer-section">
                            <h4><span className="footer-heading-dot" /> Quick Links</h4>
                            <ul className="footer-links-list">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/courses">Classes &amp; Courses</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/faq">FAQs</Link></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4><span className="footer-heading-dot" /> Admissions</h4>
                            <ul className="footer-links-list">
                                <li><Link to="/admission-form">Apply for Admission</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/login">Admin Portal</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-inner">
                        <p>&copy; {currentYear} The Village Academia. All rights reserved.</p>
                        <div className="footer-bottom-links">
                            <Link to="/contact">Contact</Link>
                            <Link to="/faq">FAQs</Link>
                            <Link to="/admission-form">Admissions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default WebFooter;
