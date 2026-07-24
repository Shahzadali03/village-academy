import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaUser, FaPhone, FaEnvelope, FaGraduationCap,
    FaCheckCircle, FaClock, FaWhatsapp, FaPaperPlane
} from 'react-icons/fa';
import WebNav from '../Component/WebNav';
import WebFooter from '../Component/WebFooter';
import PageBanner from '../Component/PageBanner';
import { professionalCourses } from '../data/coursesData';
import publicApi from '../api/publicAxios';

const classOptions = [
    'KG',
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8',
    'Class 9 (SSC Part-I)', 'Class 10 (SSC Part-II)',
    'Class 11 (FSc Pre-Medical)', 'Class 12 (FSc Pre-Medical)',
    'Class 11 (FSc Pre-Engineering)', 'Class 12 (FSc Pre-Engineering)',
];

const batchOptions = ['Morning', 'Afternoon', 'Evening', 'Weekend', 'Flexible / Any'];

const admissionCategories = [
    { value: 'tuition', label: 'Tuition Classes' },
    { value: 'professional', label: 'Professional Courses' },
];

const initialForm = {
    studentName: '',
    fatherName: '',
    phone: '',
    email: '',
    address: '',
    admissionCategory: '',
    classApplying: '',
    courseName: '',
    preferredBatch: '',
    previousSchool: '',
    message: '',
    termsAccepted: false,
};

const AdmissionForm = () => {
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            admissionCategory: value,
            classApplying: '',
            courseName: '',
            preferredBatch: '',
        }));
        setErrors((prev) => ({
            ...prev,
            admissionCategory: '',
            classApplying: '',
            courseName: '',
            preferredBatch: '',
        }));
    };

    const isTuition = formData.admissionCategory === 'tuition';
    const isProfessional = formData.admissionCategory === 'professional';

    const getApplicationSummary = () => {
        if (isTuition) return formData.classApplying;
        if (isProfessional) {
            return `${formData.courseName}${formData.preferredBatch ? ` (${formData.preferredBatch} batch)` : ''}`;
        }
        return 'your selected program';
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
        if (!formData.fatherName.trim()) newErrors.fatherName = 'Father / guardian name is required';
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[\d\s\-+()]{7,15}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Enter a valid phone number';
        }
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }
        if (!formData.admissionCategory) {
            newErrors.admissionCategory = 'Please select an admission category';
        }
        if (isTuition && !formData.classApplying) {
            newErrors.classApplying = 'Please select a class';
        }
        if (isProfessional && !formData.courseName) {
            newErrors.courseName = 'Please select a course';
        }
        if (isProfessional && !formData.preferredBatch) {
            newErrors.preferredBatch = 'Please select a preferred batch';
        }
        if (!formData.termsAccepted) newErrors.termsAccepted = 'Please confirm the information is correct';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setSubmitError('');
        try {
            const payload = {
                student_name: formData.studentName.trim(),
                father_name: formData.fatherName.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim() || null,
                address: formData.address.trim() || null,
                admission_category: formData.admissionCategory,
                class_applying: isTuition ? formData.classApplying : null,
                course_name: isProfessional ? formData.courseName : null,
                preferred_batch: isProfessional ? formData.preferredBatch : null,
                previous_school: formData.previousSchool.trim() || null,
                message: formData.message.trim() || null,
            };

            await publicApi.post('web-admissions/public', payload);
            setIsSubmitted(true);
        } catch (error) {
            const detail = error?.response?.data?.detail;
            setSubmitError(
                typeof detail === 'string'
                    ? detail
                    : 'Unable to submit your application right now. Please try again or contact us directly.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="admission-form-page edubuzz-exact">
                <WebNav />
                <section className="admission-success-section">
                    <div className="container">
                        <div className="admission-success-card">
                            <div className="success-icon">
                                <FaCheckCircle />
                            </div>
                            <h2>Application Received!</h2>
                            <p>
                                Thank you, <strong>{formData.studentName}</strong>. We have received your admission request
                                for <strong>{getApplicationSummary()}</strong>.
                            </p>
                            <p className="success-note">
                                Our team will contact you at <strong>{formData.phone}</strong> within 1–2 working days
                                to confirm your enrollment and batch details.
                            </p>
                            <div className="success-actions">
                                <Link to="/" className="btn-primary">Back to Home</Link>
                                <Link to="/contact" className="btn-outline">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <WebFooter />
            </div>
        );
    }

    return (
        <div className="admission-form-page edubuzz-exact">
            <WebNav />

            <PageBanner
                title="APPLY FOR ADMISSION"
                badge="Join Our Academy"
                subtitle="Fill in the details below — no documents needed. We will call you to complete enrollment."
                breadcrumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Admission' },
                ]}
            />

            <section className="admission-form-section">
                <div className="container">
                    <div className="admission-layout">
                        <aside className="admission-info-panel">
                            <div className="info-card">
                                <h3>Why Apply With Us?</h3>
                                <ul>
                                    <li><FaCheckCircle /> Free trial classes available</li>
                                    <li><FaCheckCircle /> KG to Class 12 tuition</li>
                                    <li><FaCheckCircle /> Professional skill courses</li>
                                    <li><FaCheckCircle /> Small batches (max 15 students)</li>
                                    <li><FaCheckCircle /> Flexible morning, afternoon & evening batches</li>
                                </ul>
                            </div>
                            <div className="info-card highlight">
                                <h3>Need Help?</h3>
                                <p>Call or WhatsApp us anytime during operating hours.</p>
                                <a href="tel:+923074022559" className="info-link">
                                    <FaPhone /> 0307-4022559
                                </a>
                                <a href="https://wa.me/923074022559" target="_blank" rel="noopener noreferrer" className="info-link whatsapp">
                                    <FaWhatsapp /> WhatsApp Us
                                </a>
                                <a href="mailto:info@villageacademia.edu.pk" className="info-link">
                                    <FaEnvelope /> info@villageacademia.edu.pk
                                </a>
                            </div>
                            <div className="info-card timings">
                                <FaClock />
                                <div>
                                    <strong>Operating Hours</strong>
                                    <p>Mon–Fri: 8 AM – 8 PM<br />Sat: 9 AM – 9 PM </p>
                                </div>
                            </div>
                        </aside>

                        <div className="admission-form-card">
                            <div className="form-card-header">
                                <FaGraduationCap />
                                <div>
                                    <h2>Admission Form</h2>
                                    <p>Takes less than 2 minutes to complete</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="admission-form" noValidate>
                                <div className="form-section-title">
                                    <FaUser /> Student Details
                                </div>

                                <div className="form-row two-col">
                                    <div className={`form-field ${errors.studentName ? 'has-error' : ''}`}>
                                        <label htmlFor="studentName">Student Name *</label>
                                        <input
                                            id="studentName"
                                            type="text"
                                            name="studentName"
                                            value={formData.studentName}
                                            onChange={handleChange}
                                            placeholder="Full name of student"
                                        />
                                        {errors.studentName && <span className="field-error">{errors.studentName}</span>}
                                    </div>
                                    <div className={`form-field ${errors.fatherName ? 'has-error' : ''}`}>
                                        <label htmlFor="fatherName">Father / Guardian Name *</label>
                                        <input
                                            id="fatherName"
                                            type="text"
                                            name="fatherName"
                                            value={formData.fatherName}
                                            onChange={handleChange}
                                            placeholder="Parent or guardian name"
                                        />
                                        {errors.fatherName && <span className="field-error">{errors.fatherName}</span>}
                                    </div>
                                </div>

                                <div className="form-section-title">
                                    <FaPhone /> Contact Details
                                </div>

                                <div className="form-row two-col">
                                    <div className={`form-field ${errors.phone ? 'has-error' : ''}`}>
                                        <label htmlFor="phone">Phone / WhatsApp *</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="03XX-XXXXXXX"
                                        />
                                        {errors.phone && <span className="field-error">{errors.phone}</span>}
                                    </div>
                                    <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                                        <label htmlFor="email">Email <span className="optional">(optional)</span></label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && <span className="field-error">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="address">Address <span className="optional">(optional)</span></label>
                                        <input
                                            id="address"
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Area, city (e.g. Manawan, Lahore)"
                                        />
                                    </div>
                                </div>

                                <div className="form-section-title">
                                    <FaGraduationCap /> Course Details
                                </div>

                                <div className="form-row">
                                    <div className={`form-field ${errors.admissionCategory ? 'has-error' : ''}`}>
                                        <label htmlFor="admissionCategory">Admission Category *</label>
                                        <select
                                            id="admissionCategory"
                                            name="admissionCategory"
                                            value={formData.admissionCategory}
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="">Select category</option>
                                            {admissionCategories.map((category) => (
                                                <option key={category.value} value={category.value}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.admissionCategory && (
                                            <span className="field-error">{errors.admissionCategory}</span>
                                        )}
                                    </div>
                                </div>

                                {isTuition && (
                                    <div className="form-row">
                                        <div className={`form-field ${errors.classApplying ? 'has-error' : ''}`}>
                                            <label htmlFor="classApplying">Class Applying For *</label>
                                            <select
                                                id="classApplying"
                                                name="classApplying"
                                                value={formData.classApplying}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select class</option>
                                                {classOptions.map((cls) => (
                                                    <option key={cls} value={cls}>{cls}</option>
                                                ))}
                                            </select>
                                            {errors.classApplying && (
                                                <span className="field-error">{errors.classApplying}</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {isProfessional && (
                                    <div className="form-row two-col">
                                        <div className={`form-field ${errors.courseName ? 'has-error' : ''}`}>
                                            <label htmlFor="courseName">Course Name *</label>
                                            <select
                                                id="courseName"
                                                name="courseName"
                                                value={formData.courseName}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select course</option>
                                                {professionalCourses.map((course) => (
                                                    <option key={course.id} value={course.title}>
                                                        {course.title}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.courseName && (
                                                <span className="field-error">{errors.courseName}</span>
                                            )}
                                        </div>
                                        <div className={`form-field ${errors.preferredBatch ? 'has-error' : ''}`}>
                                            <label htmlFor="preferredBatch">Preferred Batch *</label>
                                            <select
                                                id="preferredBatch"
                                                name="preferredBatch"
                                                value={formData.preferredBatch}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select batch</option>
                                                {batchOptions.map((batch) => (
                                                    <option key={batch} value={batch}>{batch}</option>
                                                ))}
                                            </select>
                                            {errors.preferredBatch && (
                                                <span className="field-error">{errors.preferredBatch}</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {isTuition && (
                                    <div className="form-row">
                                        <div className="form-field">
                                            <label htmlFor="previousSchool">Previous School <span className="optional">(optional)</span></label>
                                            <input
                                                id="previousSchool"
                                                type="text"
                                                name="previousSchool"
                                                value={formData.previousSchool}
                                                onChange={handleChange}
                                                placeholder="Name of current or last school"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="message">Additional Notes <span className="optional">(optional)</span></label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="3"
                                            placeholder="Any questions or special requests..."
                                        />
                                    </div>
                                </div>

                                <div className={`form-agree ${errors.termsAccepted ? 'has-error' : ''}`}>
                                    <label className="agree-label">
                                        <input
                                            type="checkbox"
                                            name="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleChange}
                                        />
                                        <span>
                                            I confirm the information above is correct and agree to be contacted by The Village Academia regarding admission.
                                        </span>
                                    </label>
                                    {errors.termsAccepted && <span className="field-error">{errors.termsAccepted}</span>}
                                </div>

                                {submitError && (
                                    <div className="field-error mb-3">{submitError}</div>
                                )}

                                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>Submitting...</>
                                    ) : (
                                        <>
                                            <FaPaperPlane /> Submit Application
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <WebFooter />
        </div>
    );
};

export default AdmissionForm;
