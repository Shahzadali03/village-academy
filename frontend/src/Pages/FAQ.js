import React, { useState, useMemo, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import {
    FaChevronDown, FaGraduationCap, FaQuestionCircle, FaSearch,
    FaPhone, FaWhatsapp
} from 'react-icons/fa';
import WebNav from '../Component/WebNav';
import WebFooter from '../Component/WebFooter';
import PageBanner from '../Component/PageBanner';

const faqCategories = [
    {
        id: 'general',
        title: 'General Questions',
        faqs: [
            {
                question: 'Where is The Village Academia located?',
                answer: 'We are located at HBL Poultry Farm, GT Road, Manawan, Lahore, Punjab, Pakistan. You can visit us during operating hours or use the map on our Contact page for directions.',
            },
            {
                question: 'What are your operating hours?',
                answer: 'We are open Monday to Friday (8:00 AM – 8:00 PM), Saturday (9:00 AM – 6:00 PM), and Sunday (10:00 AM – 4:00 PM). Morning, afternoon, and evening academic sessions are available.',
            },
            {
                question: 'How can I contact the academy?',
                answer: 'You can call us at 0307-4022559 or 0325-4303959, message us on WhatsApp, or email info@villageacademia.edu.pk. Visit our Contact page for full details.',
            },
            {
                question: 'Do you offer trial classes?',
                answer: 'Yes! We offer free trial classes so students and parents can experience our teaching quality before enrolling. Contact us to schedule a trial session.',
            },
        ],
    },
    {
        id: 'admissions',
        title: 'Admissions & Fees',
        faqs: [
            {
                question: 'How do I apply for admission?',
                answer: 'You can apply online through our Admission Form on the website, visit our campus in person, or call us to get guidance. Our team will help you with the complete enrollment process.',
            },
            {
                question: 'When are admissions open?',
                answer: 'Admissions are open year-round. New batches start regularly for tuition classes and professional courses. Contact us to check seat availability in your preferred batch.',
            },
            {
                question: 'What is the fee payment schedule?',
                answer: 'We offer flexible monthly fee payment options for tuition classes. Professional course fees vary by program and can be discussed at the time of enrollment.',
            },
            {
                question: 'What documents are required for admission?',
                answer: 'Generally, you need the student\'s recent photograph, previous school report card (if applicable), CNIC/B-Form copy, and parent/guardian contact details. Our team will confirm the exact requirements during registration.',
            },
        ],
    },
    {
        id: 'tuition',
        title: 'Tuition Classes',
        faqs: [
            {
                question: 'Which classes do you offer tuition for?',
                answer: 'We provide tuition from KG to Class 12th, covering Primary (KG–5th), Middle (6th–8th), and Secondary (9th–12th) levels with separate batches for Pre-Medical and Pre-Engineering.',
            },
            {
                question: 'What is the maximum batch size?',
                answer: 'We maintain small batch sizes with a maximum of 15 students per class. This ensures every student receives personalized attention and support from our teachers.',
            },
            {
                question: 'Do you prepare students for board exams and entry tests?',
                answer: 'Yes. Our secondary classes include complete SSC and HSSC board exam preparation, along with dedicated coaching for MDCAT and ECAT entrance tests.',
            },
            {
                question: 'Are evening batches available?',
                answer: 'Yes, we offer flexible timing with morning, afternoon, and evening sessions to accommodate different schedules, including working students and busy families.',
            },
        ],
    },
    {
        id: 'professional',
        title: 'Professional Courses',
        faqs: [
            {
                question: 'What professional courses do you offer?',
                answer: 'We offer Spoken English, Computer Courses, Web Development, Advanced MS Office, Graphic Design Basics, and Digital Marketing. Each course is designed with practical, industry-relevant skills.',
            },
            {
                question: 'How long are the professional courses?',
                answer: 'Course duration varies: Computer Courses (2 months), Spoken English & Digital Marketing (3 months), Graphic Design (2 months), Advanced MS Office (1.5 months), and Web Development (6 months).',
            },
            {
                question: 'Do I need prior experience to join?',
                answer: 'No prior experience is required for most courses. Our programs start from basics and gradually build up to advanced topics, making them suitable for beginners and intermediate learners.',
            },
            {
                question: 'Will I receive a certificate after completion?',
                answer: 'Yes, students who successfully complete their professional course receive a certificate from The Village Academia, recognizing their achievement and skills acquired.',
            },
        ],
    },
];

const FaqItem = memo(({ question, answer, isOpen, onToggle }) => (
    <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
        <button
            type="button"
            className="faq-question-btn"
            onClick={onToggle}
            aria-expanded={isOpen}
        >
            <span className="faq-question">{question}</span>
            <FaChevronDown className="faq-chevron" aria-hidden="true" />
        </button>
        {isOpen && (
            <div className="faq-answer">
                <p>{answer}</p>
            </div>
        )}
    </div>
));

FaqItem.displayName = 'FaqItem';

const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openItems, setOpenItems] = useState({ 'general-Where is The Village Academia located?': true });

    const toggleItem = useCallback((key) => {
        setOpenItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    }, []);

    const filteredCategories = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return faqCategories;

        return faqCategories
            .map((category) => ({
                ...category,
                faqs: category.faqs.filter(
                    (faq) =>
                        faq.question.toLowerCase().includes(query) ||
                        faq.answer.toLowerCase().includes(query)
                ),
            }))
            .filter((category) => category.faqs.length > 0);
    }, [searchQuery]);

    const scrollToSection = useCallback((sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <div className="faq-page edubuzz-exact">
            <WebNav />

            <PageBanner
                title="FAQs"
                subtitle="Quick answers about admissions, classes, fees, and courses."
                breadcrumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'FAQs' },
                ]}
            />

            <section className="faq-main-section">
                <div className="container">
                    <div className="faq-search-wrap">
                        <FaSearch className="search-icon" aria-hidden="true" />
                        <input
                            type="search"
                            className="faq-search"
                            placeholder="Search a question... e.g. admission, fees, timing"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search FAQs"
                        />
                    </div>

                    {!searchQuery && (
                        <div className="faq-jump-links">
                            {faqCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    className="jump-link"
                                    onClick={() => scrollToSection(`faq-${cat.id}`)}
                                >
                                    {cat.title}
                                </button>
                            ))}
                        </div>
                    )}

                    {filteredCategories.length === 0 ? (
                        <div className="faq-no-results">
                            <FaQuestionCircle aria-hidden="true" />
                            <h3>No results found</h3>
                            <p>Try different keywords or contact us directly for help.</p>
                            <Link to="/contact" className="btn-help">Contact Us</Link>
                        </div>
                    ) : (
                        <div className="faq-sections">
                            {filteredCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="faq-section"
                                    id={`faq-${category.id}`}
                                >
                                    <h2 className="faq-section-title">{category.title}</h2>
                                    <div className="faq-list">
                                        {category.faqs.map((faq) => {
                                            const key = `${category.id}-${faq.question}`;
                                            return (
                                                <FaqItem
                                                    key={key}
                                                    question={faq.question}
                                                    answer={faq.answer}
                                                    isOpen={!!openItems[key]}
                                                    onToggle={() => toggleItem(key)}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="faq-help-box">
                        <h3>Didn&apos;t find your answer?</h3>
                        <p>Our team is happy to help. Reach out anytime.</p>
                        <div className="help-actions">
                            <a href="tel:+923074022559" className="help-btn call">
                                <FaPhone aria-hidden="true" /> Call 0307-4022559
                            </a>
                            <a
                                href="https://wa.me/923074022559"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="help-btn whatsapp"
                            >
                                <FaWhatsapp aria-hidden="true" /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="faq-cta-section">
                <div className="container">
                    <div className="faq-cta-box">
                        <div className="cta-text">
                            <h2>Ready to Join Us?</h2>
                            <p>Apply for tuition or explore our professional courses.</p>
                        </div>
                        <div className="cta-actions">
                            <Link to="/admission-form" className="btn-primary">
                                <FaGraduationCap aria-hidden="true" /> Apply Now
                            </Link>
                            <Link to="/courses" className="btn-secondary">
                                View Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <WebFooter />
        </div>
    );
};

export default FAQ;
