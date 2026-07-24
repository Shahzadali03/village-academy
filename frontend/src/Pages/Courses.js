import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaGraduationCap, FaCheckCircle, FaBook, FaLaptop,
    FaChalkboardTeacher, FaUsers, FaQuestionCircle
} from 'react-icons/fa';
import WebNav from '../Component/WebNav';
import WebFooter from '../Component/WebFooter';
import PageBanner from '../Component/PageBanner';
import  AllCourses from '../Component/Courses'

const courseFeatures = [
    { icon: FaChalkboardTeacher, title: 'Expert Faculty', text: 'Qualified teachers with years of experience' },
    { icon: FaUsers, title: 'Small Batches', text: 'Maximum 15 students for personal attention' },
    { icon: FaBook, title: 'Complete Syllabus', text: 'Full coverage from basics to advanced topics' },
    { icon: FaLaptop, title: 'Modern Methods', text: 'Traditional teaching blended with technology' },
];

const Courses = () => {
    return (
        <div className="courses-page edubuzz-exact">
            <WebNav />

            <PageBanner
                title="CLASSES & COURSES"
                badge="Academic & Professional Programs"
                subtitle="From KG to Class 12th tuition and industry-ready professional courses — find the right program to achieve your academic and career goals."
                breadcrumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Classes & Courses' },
                ]}
            />

            <section className="courses-intro-section">
                <div className="container">
                    <div className="courses-intro-grid">
                        {courseFeatures.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="intro-feature">
                                    <div className="intro-icon">
                                        <Icon />
                                    </div>
                                    <div>
                                        <h4>{item.title}</h4>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <AllCourses />

            <section className="courses-highlights-section">
                <div className="container">
                    <div className="highlights-box">
                        <div className="highlights-text">
                            <span className="section-badge">Why Choose Us</span>
                            <h2>Quality Education at Every Level</h2>
                            <ul className="highlights-list">
                                <li><FaCheckCircle /> Free trial classes available for new students</li>
                                <li><FaCheckCircle /> Flexible morning, afternoon & evening batches</li>
                                <li><FaCheckCircle /> Monthly fee payment options</li>
                                <li><FaCheckCircle /> 95% success rate in board exams</li>
                                <li><FaCheckCircle /> Separate batches for Pre-Medical & Pre-Engineering</li>
                            </ul>
                        </div>
                        <div className="highlights-actions">
                            <Link to="/admission-form" className="btn-primary">
                                <FaGraduationCap /> Join Tuition Classes
                            </Link>
                            <Link to="/faq" className="btn-secondary">
                                <FaQuestionCircle /> Have Questions?
                            </Link>
                            <Link to="/contact" className="btn-outline">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <WebFooter />
        </div>
    );
};

export default Courses;
