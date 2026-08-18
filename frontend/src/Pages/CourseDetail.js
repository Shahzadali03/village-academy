import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
    FaClock, FaTag, FaGraduationCap, FaCheckCircle,
    FaQuestionCircle, FaArrowRight, FaLayerGroup, FaUsers,
    FaBookOpen, FaClipboardList, FaChalkboardTeacher, FaUserGraduate,
    FaCalendarAlt, FaLanguage, FaChevronDown
} from 'react-icons/fa';
import { getCourseBySlug, getRelatedCourses } from '../data/coursesData';
import WebNav from '../Component/WebNav';
import WebFooter from '../Component/WebFooter';
import PageBanner from '../Component/PageBanner';
import CourseCard from '../Component/CourseCard';

const CourseDetail = () => {
    const { slug } = useParams();
    const course = getCourseBySlug(slug);
    const [openFaq, setOpenFaq] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setOpenFaq(0);
    }, [slug]);

    if (!course) {
        return <Navigate to="/courses" replace />;
    }

    const related = getRelatedCourses(course, 3);
    const isTuition = course.category === 'tuition';
    const ctaPath = isTuition ? '/admission-form' : '/contact';
    const ctaLabel = isTuition ? 'Apply for Admission' : 'Contact Us';

    return (
        <div className="course-detail-page edubuzz-exact">
            <WebNav />

            <PageBanner
                badge={isTuition ? 'Tuition Class' : 'Professional Course'}
                title={course.title}
                subtitle={course.description}
                breadcrumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Classes & Courses', to: '/courses' },
                    { label: course.title },
                ]}
            />

            <section className="course-detail-intro">
                <div className="container">
                    <div className="banner-grid">
                        <div className="banner-copy">
                            <div className="banner-meta">
                                {course.badge && <span><FaTag /> {course.badge}</span>}
                                <span><FaClock /> {course.duration}</span>
                                {course.level && <span><FaLayerGroup /> {course.level}</span>}
                                {course.schedule && <span><FaCalendarAlt /> {course.schedule}</span>}
                                {course.price && <span className="price-pill">{course.price}</span>}
                            </div>
                            <div className="banner-actions">
                                <Link to={ctaPath} className="btn-primary">
                                    <FaGraduationCap /> {ctaLabel}
                                </Link>
                                <Link to="/contact" className="btn-outline">
                                    <FaQuestionCircle /> Ask a Question
                                </Link>
                            </div>
                        </div>
                        <div className="banner-visual">
                            <img src={course.image} alt={course.title} />
                        </div>
                    </div>
                </div>
            </section>

            {course.highlights?.length > 0 && (
                <section className="course-highlights-bar">
                    <div className="container">
                        <div className="highlights-row">
                            {course.highlights.map((item) => (
                                <div key={item.label} className="highlight-item">
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="course-detail-main">
                <div className="container">
                    <div className="course-detail-layout">
                        <div className="course-detail-content">
                            <div className="detail-block">
                                <div className="block-heading">
                                    <FaBookOpen />
                                    <h2>About This Program</h2>
                                </div>
                                <div
                                    className="detail-richtext"
                                    dangerouslySetInnerHTML={{ __html: course.overview || course.content }}
                                />
                            </div>

                            {course.whoFor?.length > 0 && (
                                <div className="detail-block">
                                    <div className="block-heading">
                                        <FaUserGraduate />
                                        <h2>Who Is This Programme For? </h2>
                                    </div>
                                    <div className="who-for-grid">
                                        {course.whoFor.map((item) => (
                                            <div key={item} className="who-for-card">
                                                <FaCheckCircle />
                                                <p>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {course.modules?.length > 0 && (
                                <div className="detail-block">
                                    <div className="block-heading">
                                        <FaClipboardList />
                                        <h2>Detailed Curriculum</h2>
                                    </div>
                                    <p className="block-intro">
                                        A developmentally appropriate learning journey that builds strong
                                        foundations through exploration, understanding, application,
                                        reasoning, and innovation.
                                    </p>
                                    <div className="modules-list">
                                        {course.modules.map((module, index) => (
                                            <div key={module.title} className="module-card">
                                                <div className="module-index">{String(index + 1).padStart(2, '0')}</div>
                                                <div>
                                                    <h3>{module.title}</h3>
                                                    <p>{module.detail}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {course.features?.length > 0 && (
                                <div className="detail-block">
                                    <div className="block-heading">
                                        <FaCheckCircle />
                                        <h2>What You Will Get</h2>
                                    </div>
                                    <ul className="feature-check-list two-col">
                                        {course.features.map((item) => (
                                            <li key={item}>
                                                <FaCheckCircle />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {course.methodology?.length > 0 && (
                                <div className="detail-block">
                                    <div className="block-heading">
                                        <FaChalkboardTeacher />
                                        <h2>Teaching Methodology</h2>
                                    </div>
                                    <div className="method-grid">
                                        {course.methodology.map((item, index) => (
                                            <div key={item} className="method-card">
                                                <span>{index + 1}</span>
                                                <p>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {course.subjects?.length > 0 && (
                                <div className="detail-block">
                                    <div className="block-heading">
                                        <FaTag />
                                        <h2>Subjects & Focus Areas</h2>
                                    </div>
                                    <div className="course-tags large">
                                        {course.subjects.map((subject) => (
                                            <span key={subject} className="course-tag">{subject}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {course.outcomes?.length > 0 && (
                                <div className="detail-block">
                                    <div className="block-heading">
                                        <FaGraduationCap />
                                        <h2>Learning Outcomes</h2>
                                    </div>
                                    <p className="block-intro">
                                        By the end of the programme, learners develop:
                                    </p>
                                    <ul className="feature-check-list">
                                        {course.outcomes.map((item) => (
                                            <li key={item}>
                                                <FaCheckCircle />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {course.requirements?.length > 0 && (
                                <div className="detail-block">
                                    <div className="block-heading">
                                        <FaClipboardList />
                                        <h2>Requirements</h2>
                                    </div>
                                    <ul className="feature-check-list">
                                        {course.requirements.map((item) => (
                                            <li key={item}>
                                                <FaCheckCircle />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {course.faqs?.length > 0 && (
                                <div className="detail-block">
                                    <div className="block-heading">
                                        <FaQuestionCircle />
                                        <h2>Frequently Asked Questions</h2>
                                    </div>
                                    <div className="faq-accordion">
                                        {course.faqs.map((item, index) => {
                                            const isOpen = openFaq === index;
                                            return (
                                                <div key={item.q} className={`faq-item ${isOpen ? 'open' : ''}`}>
                                                    <button
                                                        type="button"
                                                        className="faq-question"
                                                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                                    >
                                                        <span>{item.q}</span>
                                                        <FaChevronDown />
                                                    </button>
                                                    {isOpen && (
                                                        <div className="faq-answer">
                                                            <p>{item.a}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="detail-cta-banner">
                                <div>
                                    <h3>Ready to join {course.title}?</h3>
                                    <p>
                                        {isTuition
                                            ? 'Apply now for admission and secure your preferred batch timing.'
                                            : 'Contact us and our team will guide you on batches, fees, and starting dates.'}
                                    </p>
                                </div>
                                <div className="detail-cta-actions">
                                    <Link to={ctaPath} className="btn-primary">
                                        <FaGraduationCap /> {ctaLabel}
                                    </Link>
                                    <Link to="/contact" className="btn-outline">
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <aside className="course-detail-sidebar">
                            <div className="sidebar-card">
                                <h3>Program Snapshot</h3>
                                <div className="snapshot-row">
                                    <span>Category</span>
                                    <strong>{isTuition ? 'Tuition' : 'Professional'}</strong>
                                </div>
                                <div className="snapshot-row">
                                    <span>Duration</span>
                                    <strong>{course.duration}</strong>
                                </div>
                                {course.schedule && (
                                    <div className="snapshot-row">
                                        <span>Schedule</span>
                                        <strong>{course.schedule}</strong>
                                    </div>
                                )}
                                {course.level && (
                                    <div className="snapshot-row">
                                        <span>Level</span>
                                        <strong>{course.level}</strong>
                                    </div>
                                )}
                                {course.classSize && (
                                    <div className="snapshot-row">
                                        <span>Class Size</span>
                                        <strong>{course.classSize}</strong>
                                    </div>
                                )}
                                {course.language && (
                                    <div className="snapshot-row">
                                        <span>Language</span>
                                        <strong>{course.language}</strong>
                                    </div>
                                )}
                                <div className="snapshot-row">
                                    <span>Fee</span>
                                    <strong className="accent">{course.price}</strong>
                                </div>

                                <Link to={ctaPath} className="btn-primary sidebar-cta">
                                    <FaGraduationCap /> {ctaLabel}
                                </Link>
                                <Link to="/contact" className="btn-outline sidebar-secondary">
                                    <FaQuestionCircle /> Ask a Question
                                </Link>
                            </div>

                            <div className="sidebar-card info-strip">
                                <div className="info-row"><FaUsers /> Small, focused batches</div>
                                <div className="info-row"><FaChalkboardTeacher /> Experienced teachers</div>
                                <div className="info-row"><FaLanguage /> Supportive instruction</div>
                                <div className="info-row"><FaCalendarAlt /> Flexible timings available</div>
                            </div>

                            <div className="sidebar-card tip-card">
                                <h4>Need Help Choosing?</h4>
                                <p>Not sure if this program fits your goals? Our counselors can recommend the best batch and pathway for you.</p>
                                <Link to="/contact">
                                    Contact Us <FaArrowRight />
                                </Link>
                            </div>
                        </aside>
                    </div>

                    {related.length > 0 && (
                        <div className="related-courses">
                            <div className="section-header">
                                <span className="section-badge">Explore More</span>
                                <h2>Related Programs</h2>
                                <p>Similar options students often explore next</p>
                            </div>
                            <div className="courses-grid">
                                {related.map((item) => (
                                    <CourseCard key={item.id} course={item} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <WebFooter />
        </div>
    );
};

export default CourseDetail;
