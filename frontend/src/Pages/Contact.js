import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaPhone, FaEnvelope, FaMapMarkerAlt,
    FaGraduationCap, FaWhatsapp, FaDirections,
    FaHeadset, FaCheckCircle, FaArrowRight
} from 'react-icons/fa';
import WebNav from '../Component/WebNav';
import WebFooter from '../Component/WebFooter';
import PageBanner from '../Component/PageBanner';

const MAP_EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.4503120579498!2d74.4761956!3d31.59411849999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391911a44e83b465%3A0x605c634bcb1d0438!2sThe%20Village%20Academia!5e0!3m2!1sen!2s!4v1783056803503!5m2!1sen!2s';

const MAP_DIRECTIONS_URL = 'https://maps.google.com/?q=The+Village+Academia+Manawan+Lahore';

const quickContacts = [
    { icon: FaPhone, label: 'Call Us', value: '0307-4022559', href: 'tel:+923074022559', tone: 'green' },
    { icon: FaWhatsapp, label: 'WhatsApp', value: 'Quick Reply', href: 'https://wa.me/923074022559', tone: 'whatsapp' },
    { icon: FaEnvelope, label: 'Email', value: 'info@villageacademia.edu.pk', href: 'mailto:info@villageacademia.edu.pk', tone: 'blue' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Manawan, Lahore', href: MAP_DIRECTIONS_URL, tone: 'orange' },
];

const ContactMap = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const loadMap = useCallback(() => {
        setIsMapLoaded(true);
    }, []);

    return (
        <div className="map-wrapper">
            {isMapLoaded ? (
                <iframe
                    src={MAP_EMBED_URL}
                    width="600"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="The Village Academia Location on Google Maps"
                />
            ) : (
                <div className="map-placeholder">
                    <div className="map-placeholder-icon" aria-hidden="true">
                        <FaMapMarkerAlt />
                    </div>
                    <h4>Interactive Campus Map</h4>
                    <p>Load the map to explore our location on GT Road, Manawan, Lahore.</p>
                    <button type="button" className="btn-load-map" onClick={loadMap}>
                        <FaMapMarkerAlt aria-hidden="true" /> Load Map
                    </button>
                    <a
                        href={MAP_DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-open-link"
                    >
                        Open in Google Maps
                    </a>
                </div>
            )}
        </div>
    );
};

const Contact = () => {
    return (
        <div className="contact-page edubuzz-exact">
            <WebNav />

            <PageBanner
                title="CONTACT US"
                breadcrumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Contact Us' },
                ]}
            />

            <section className="contact-quick-bar">
                <div className="container">
                    <div className="quick-contact-grid">
                        {quickContacts.map((item) => {
                            const Icon = item.icon;
                            const isExternal = item.href.startsWith('http');

                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={isExternal ? '_blank' : undefined}
                                    rel={isExternal ? 'noopener noreferrer' : undefined}
                                    className={`quick-contact-card tone-${item.tone}`}
                                >
                                    <div className="quick-icon">
                                        <Icon aria-hidden="true" />
                                    </div>
                                    <div className="quick-text">
                                        <span className="quick-label">{item.label}</span>
                                        <span className="quick-value">{item.value}</span>
                                    </div>
                                    <FaArrowRight className="quick-arrow" aria-hidden="true" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="contact-main-section">
                <div className="container">
                    <div className="section-intro">
                        <span className="section-badge">Reach Out</span>
                        <h2>Get In Touch With Us</h2>
                        <p>Visit our campus on GT Road, Manawan, or connect with us through any channel below.</p>
                    </div>

                    <div className="contact-layout">
                        <div className="contact-details-panel">
                            <div className="panel-header">
                                <div className="panel-icon">
                                    <FaHeadset aria-hidden="true" />
                                </div>
                                <div>
                                    <h3>Contact Details</h3>
                                    <p>Our team is ready to assist you</p>
                                </div>
                            </div>

                            <div className="contact-info-list">
                                <div className="contact-info-item">
                                    <div className="info-icon">
                                        <FaMapMarkerAlt aria-hidden="true" />
                                    </div>
                                    <div className="info-content">
                                        <h4>Our Address</h4>
                                        <p>
                                            The Village Academia<br />
                                            HBL Poultry Farm, GT Road<br />
                                            Manawan, Lahore, Punjab, Pakistan
                                        </p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="info-icon phone">
                                        <FaPhone aria-hidden="true" />
                                    </div>
                                    <div className="info-content">
                                        <h4>Phone Numbers</h4>
                                        <div className="phone-links">
                                            <a href="tel:+923074022559">0307-4022559</a>
                                            <a href="tel:+923254303959">0325-4303959</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="info-icon whatsapp">
                                        <FaWhatsapp aria-hidden="true" />
                                    </div>
                                    <div className="info-content">
                                        <h4>WhatsApp</h4>
                                        <a href="https://wa.me/923074022559" target="_blank" rel="noopener noreferrer">
                                            Message us on WhatsApp
                                        </a>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="info-icon email">
                                        <FaEnvelope aria-hidden="true" />
                                    </div>
                                    <div className="info-content">
                                        <h4>Email</h4>
                                        <a href="mailto:info@villageacademia.edu.pk">info@villageacademia.edu.pk</a>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-action-buttons">
                                <a
                                    href={MAP_DIRECTIONS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-directions"
                                >
                                    <FaDirections aria-hidden="true" /> Get Directions
                                </a>
                                <a
                                    href="https://wa.me/923074022559"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-whatsapp"
                                >
                                    <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="contact-map-panel">
                            <div className="map-header">
                                <div className="map-header-icon">
                                    <FaMapMarkerAlt aria-hidden="true" />
                                </div>
                                <div>
                                    <h3>Find Us on Map</h3>
                                    <p>The Village Academia, GT Road, Manawan, Lahore</p>
                                </div>
                            </div>
                            <ContactMap />
                            <div className="map-footer">
                                <FaCheckCircle aria-hidden="true" />
                                <span>Open for visits during operating hours — call ahead for a campus tour</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-cta-section">
                <div className="container">
                    <div className="cta-box">
                        <div className="cta-text">
                            <h2>Ready to Join Our Academy?</h2>
                            <p>Start your journey with expert tuition and professional courses today.</p>
                        </div>
                        <div className="cta-actions">
                            <Link to="/admission-form" className="btn-primary">
                                <FaGraduationCap aria-hidden="true" /> Apply for Admission
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <WebFooter />
        </div>
    );
};

export default Contact;
