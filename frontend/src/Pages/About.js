import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaGraduationCap, FaUsers, FaChalkboardTeacher,
    FaQuoteLeft, FaCheckCircle
} from 'react-icons/fa';
import ownerRehan from '../assets/images/owner-rehan.png';
import WebFooter from '../Component/WebFooter';
import WebNav from '../Component/WebNav';
import PageBanner from '../Component/PageBanner';
import Stats from '../Component/Stats';
import OurJournetImg from '../assets/images/about/about-banner.avif';
import whychooseImg from '../assets/images/about/why-choose.avif';

const About = () => {
    return (
        <div className="about-page edubuzz-exact">

            {/* Header Section */}
            <WebNav />

            <PageBanner
                title="ABOUT US"
                breadcrumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'About Us' },
                ]}
            />

            {/* Our Story Section */}
            <section className="our-story-section">
                <div className="container">
                    <div className="story-content">
                        <div className="story-text">
                            <div className="section-badge">Our Journey Since 2023</div>
                            <h2>
                                Building Excellence in Education <span className="highlight">Since 2023</span>
                            </h2>
                            <p>
                               Founded in 2023, The Village Academia is committed to providing quality education that fosters academic excellence and strong character. We offer tuition from KG to Class 12, along with spoken English, computer skills, web development, and digital marketing courses. Our goal is to empower students with the knowledge, skills, and confidence to succeed in life.
                            </p>
                            <div className="story-features">
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <FaGraduationCap />
                                    </div>
                                    <div className="feature-content">
                                        <h4>Academic Excellence</h4>
                                        <p>95% success rate in board exams with many students achieving distinction</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <FaUsers />
                                    </div>
                                    <div className="feature-content">
                                        <h4>Personal Attention</h4>
                                        <p>Small batch sizes ensuring individual focus on each student's progress</p>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <FaChalkboardTeacher />
                                    </div>
                                    <div className="feature-content">
                                        <h4>Expert Faculty</h4>
                                        <p>Experienced teachers with subject expertise and passion for education</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="story-image">
                            <img src={OurJournetImg} alt="Students in classroom" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-section">
                <div className="container">
                    <div className="choose-content">
                        <div className="choose-image">
                            <img src={whychooseImg} alt="Happy students" />
                        </div>
                        <div className="choose-text">
                            <h2>Why Choose The Village Academia?</h2>
                            <div className="choose-reasons">
                                <div className="reason-item">
                                    <FaCheckCircle className="check-icon" />
                                    <div className="reason-content">
                                        <h4>Proven Track Record</h4>
                                        <p>Growing strong since 2023 with 95% success rate in board exams</p>
                                    </div>
                                </div>
                                <div className="reason-item">
                                    <FaCheckCircle className="check-icon" />
                                    <div className="reason-content">
                                        <h4>Small Batch Sizes</h4>
                                        <p>Maximum 15 students per batch for personalized attention</p>
                                    </div>
                                </div>
                                <div className="reason-item">
                                    <FaCheckCircle className="check-icon" />
                                    <div className="reason-content">
                                        <h4>Flexible Timings</h4>
                                        <p>Morning, afternoon, and evening batches to suit your schedule</p>
                                    </div>
                                </div>
                                <div className="reason-item">
                                    <FaCheckCircle className="check-icon" />
                                    <div className="reason-content">
                                        <h4>Modern Facilities</h4>
                                        <p>Well-equipped classrooms with latest teaching aids and technology</p>
                                    </div>
                                </div>
                                <div className="reason-item">
                                    <FaCheckCircle className="check-icon" />
                                    <div className="reason-content">
                                        <h4>Affordable Fees</h4>
                                        <p>Quality education at reasonable rates with flexible payment options</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <Stats />

            {/* Owner Message Section */}
            <section className="owner-message-section">
                <div className="container">
                    <div className="owner-content">
                        <div className="owner-image-section">
                            <div className="owner-image">
                                {/* Using the professional owner image */}
                                <img
                                    src={ownerRehan}
                                    alt="M Rehan Basra - Founder & Educator"
                                    className="owner-photo img-fluid mb-4"
                                />
                            </div>
                            <div className="owner-credentials">
                                <h3>M. Rehan Basra</h3>
                                <span className="designation">Founder & Educator</span>
                                <p className="tagline">Dedicated to Building Top Performers</p>
                            </div>
                        </div>
                        <div className="owner-message">
                            <div className="quote-icon">
                                <FaQuoteLeft />
                            </div>
                            <h2>A Message from Our Founder</h2>
                            <div className="message-content">
                                <p>
                                    <strong>"Alif se Maloom tak"</strong> - From the beginning to complete knowledge. This philosophy
                                    has guided The Village Academia since we began in 2023. When I started this journey,
                                    my vision was simple yet profound: to create an educational environment where every student,
                                    regardless of their starting point, could achieve excellence.
                                </p>
                                <p>
                                    Education is not just about academic scores; it's about building character, instilling confidence,
                                    and preparing young minds for the challenges of tomorrow. At The Village Academia, we don't just
                                    teach subjects – we nurture dreams, build foundations, and create pathways to success.
                                </p>
                                <p>
                                    Our success stories speak for themselves. From students who struggled with basic concepts to those
                                    who topped their board exams, from young learners taking their first steps in education to
                                    professionals mastering new skills – each achievement fills me with immense pride and reinforces
                                    my commitment to quality education.
                                </p>
                                <p>
                                    I invite you to join our family and experience the difference that personalized attention,
                                    expert teaching, and genuine care can make in your educational journey. Together, let's build
                                    a brighter future, one student at a time.
                                </p>
                            </div>
                            <div className="message-signature">
                                <div className="signature-line">
                                    <strong>M. Rehan Basra</strong>
                                </div>
                                <div className="signature-title">
                                    Founder & Educator, The Village Academia
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <WebFooter />
        </div>
    );
};

export default About;