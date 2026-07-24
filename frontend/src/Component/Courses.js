import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import { tuitionClasses, professionalCourses } from '../data/coursesData';
import CourseCard from './CourseCard';

/**
 * Shared courses blocks for Home and Courses pages.
 * @param {'full'|'home'} variant - full shows all cards + enroll CTAs; home can limit counts
 * @param {number} tuitionLimit - max tuition cards (home)
 * @param {number} professionalLimit - max professional cards (home)
 * @param {boolean} showFooters - section CTA footers
 */
const Courses = ({
    variant = 'full',
    tuitionLimit,
    professionalLimit,
    showFooters = true,
}) => {
    const isHome = variant === 'home';
    const tuitionList = typeof tuitionLimit === 'number'
        ? tuitionClasses.slice(0, tuitionLimit)
        : tuitionClasses;
    const professionalList = typeof professionalLimit === 'number'
        ? professionalCourses.slice(0, professionalLimit)
        : professionalCourses;

    return (
        <div className="all-courses">
            <section className="courses-section" id="tuition-classes">
                <div className="container">
                    <div className="section-header">
                        {!isHome && <span className="section-badge">Academic Tuition</span>}
                        <h2>TUITION CLASSES</h2>
                        <p>
                            {isHome
                                ? 'Expert Tuition for All Age Groups - KG to Class 12'
                                : 'Expert Tuition for All Age Groups — KG to Class 12'}
                        </p>
                    </div>
                    <div className="courses-grid">
                        {tuitionList.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                    {showFooters && (
                        <div className="courses-footer">
                            {isHome ? (
                                <Link to="/courses" className="btn-primary">
                                    View All Classes &amp; Courses
                                </Link>
                            ) : (
                                <Link to="/admission-form" className="btn-primary">
                                    <FaGraduationCap /> Apply for Tuition Classes
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="professional-courses-section" id="professional-courses">
                <div className="container">
                    <div className="section-header">
                        {!isHome && <span className="section-badge">Skill Development</span>}
                        <h2>PROFESSIONAL COURSES</h2>
                        <p>Enhance Your Skills with Industry-Relevant Training</p>
                    </div>
                    <div className="courses-grid">
                        {professionalList.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                    {showFooters && (
                        <div className="courses-footer">
                            {isHome ? (
                                <Link to="/courses#professional-courses" className="btn-primary">
                                    View All Professional Courses
                                </Link>
                            ) : (
                                <Link to="/contact" className="btn-primary">
                                    Contact Us for Professional Courses
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Courses;
