import React from 'react'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaUsers } from 'react-icons/fa';

const About = () => {
    return (
        <section className="skills-section">
            <div className="container">
                <div className="skills-content">
                    <div className="skills-text">
                        <div className="section-badge">Expert Tuition Services Since 2023</div>
                        <h2>
                            Achieve Your Academic <span className="highlight">Goals with Us</span>
                        </h2>
                        <p>
                            We support learners from Kindergarten to Class 12, along with
                            students preparing for competitive examinations and
                            professional skills development. <br />
                            Through expert guidance, personalised support, and
                            structured practice, we help students build confidence, think
                            critically, solve problems, and achieve their academic and
                            future goals.
                        </p>
                        <div className="skills-features">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <FaUsers />
                                </div>
                                <span>Small Batch Sizes for Personal Attention</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <FaGraduationCap />
                                </div>
                                <span>Board Exam & Entry Test Preparation</span>
                            </div>
                        </div>
                        <Link to="/admission-form" className="btn-primary">
                            Enroll for Tuition Classes
                        </Link>
                    </div>
                    <div className="skills-image">
                        <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Students Learning" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
