import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaArrowRight } from 'react-icons/fa';

const CourseCard = ({ course }) => {
    const isTuition = course.category === 'tuition';

    return (
        <div className={`course-card ${isTuition ? 'tuition-card' : ''}`}>
            <div className="course-image">
                <img src={course.image} alt={course.title} />
                {course.badge && <span className="course-badge">{course.badge}</span>}
            </div>
            <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>

                {isTuition && course.subjects?.length > 0 && (
                    <div className="course-tags">
                        {course.subjects.map((subject) => (
                            <span key={subject} className="course-tag">{subject}</span>
                        ))}
                    </div>
                )}

                {!isTuition && (
                    <div className="course-meta">
                        <div className="course-info">
                            <span><FaClock /> {course.duration}</span>
                        </div>
                        <div className="course-price">{course.price}</div>
                    </div>
                )}

                <Link to={`/courses/${course.slug}`} className="course-link">
                    View Details <FaArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;
