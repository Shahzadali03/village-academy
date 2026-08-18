import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaCheckCircle, FaQuoteLeft, FaQuestionCircle } from 'react-icons/fa';
import Stats from '../Component/Stats';
import About from '../Component/About';
import WebFooter from '../Component/WebFooter';
import WebNav from '../Component/WebNav';
import AllCourses from '../Component/Courses';
import { blogPostsList } from '../data/blogPosts';

const Home = () => {
    const latestPosts = blogPostsList.slice(0, 3);
    return (
        <div className="edubuzz-exact">
            <WebNav />

            <section className="hero-section" id="home">
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>
                                Quality Tuition Needs<br />
                                <span className="highlight">Expert Teachers</span>
                            </h1>
                            <p>
                                At The Village Academia, we provide modified learning
                                support from <b>Kindergarten to Class 12</b>, along with specialized
                                preparation for <b>One-Paper MCQs, CSS, PMS, English
                                Grammar & Composition,</b> and <b>Essay Writing</b>.<br />
                                We also offer practical professional courses in <b>Spoken
                                English, Computer Skills, Web Development, and Digital
                                Marketing.</b>
                            </p>
                            <div className="hero-buttons">
                                <Link to="/admission-form" className="btn-primary">
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <About />

            <AllCourses variant="home" />

            <Stats />

            <section className="news-section">
                <div className="container">
                    <div className="section-header">
                        <h2>LATEST NEWS</h2>
                        <p>Get The Latest News & Updates</p>
                    </div>
                    <div className="news-grid">
                        <div className="news-card">
                            <div className="news-image">
                                <img src="https://media.istockphoto.com/id/1331609164/photo/portrait-of-a-attractive-young-business-women-using-laptop-sitting-isolated-over-white.jpg?s=612x612&w=0&k=20&c=sGY7x8n3ZQpdDwqFb3wNjBEHnndBUkP_e4yOvZ2-flc=" alt="Science Fair" />
                            </div>
                            <div className="news-content">
                                <div className="news-date">Jun 25 • 3 min read</div>
                                <h3>Outstanding Board Results 2026 - 95% Success Rate</h3>
                                <p>Our tuition students achieved remarkable results in SSC and HSSC board exams with 95% success rate. Many students scored above 85% marks in their respective subjects.</p>
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-image">
                                <img src="https://cdn.sanity.io/images/893w42od/production/66258abda54c58d336a72bb725342edff89a4f33-1024x1024.webp" alt="MDCAT Success" />
                            </div>
                            <div className="news-content">
                                <div className="news-date">Jun 20 • 4 min read</div>
                                <h3>MDCAT & ECAT Success Stories</h3>
                                <p>15 students from our tuition center successfully cleared MDCAT and ECAT entrance tests, securing admission in top medical and engineering universities across Pakistan.</p>
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-image">
                                <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="New Batches" />
                            </div>
                            <div className="news-content">
                                <div className="news-date">Jun 15 • 2 min read</div>
                                <h3>New Evening Batches Starting July 2026</h3>
                                <p>Due to popular demand, we are starting new evening batches for classes 9th-12th. Flexible timing options now available to accommodate working students and busy schedules.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="gallery-section">
                <div className="container">
                    <div className="section-header">
                        <h2>OUR GALLERY</h2>
                        <p>Check Our Photo Gallery</p>
                    </div>
                    <div className="gallery-grid">
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Classroom Activities" />
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Library & Study Area" />
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Science Laboratory" />
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Sports & Recreation" />
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Classroom Activities" />
                        </div>
                        <div className="gallery-item">
                            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Library & Study Area" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonial-section">
                <div className="container">
                    <div className="testimonial-content">
                        <div className="testimonial-image text-center text-lg-end">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80" alt="Student Testimonial" />
                        </div>
                        <div className="testimonial-text">
                            <FaQuoteLeft className="quote-icon" />
                            <p>
                                "I joined Village Academia for my FSc Pre-Medical preparation. The teachers explained complex Physics and Chemistry concepts so clearly that I improved from 60% to 85% in just 6 months. Thanks to their guidance, I cleared MDCAT and got admission in medical college!"
                            </p>
                            <div className="testimonial-author">
                                <h4>Rashid Khan</h4>
                                <span>FSc Pre-Medical Graduate - Now studying MBBS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="blog-section" id="blog">
                <div className="container">
                    <div className="section-header">
                        <h2>OUR BLOGS</h2>
                        <p>Latest News & Updates</p>
                    </div>
                    <div className="blog-grid">
                        {latestPosts.map((post) => (
                            <div key={post.id} className="blog-card">
                                <div className="blog-image">
                                    <img src={post.image} alt={post.title} loading="lazy" decoding="async" />
                                </div>
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <span>{post.category}</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <Link to={`/blog/${post.id}`} className="read-more">Read More</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="courses-footer">
                        <Link to="/blog" className="btn-primary">View All Posts</Link>
                    </div>
                </div>
            </section>

            <section className="quick-admission-section">
                <div className="container">
                    <div className="admission-content">
                        <div className="admission-text">
                            <h2>Ready to Excel in Your Studies?</h2>
                            <p>Join our tuition academy and see your grades improve with expert teaching and personalized attention for classes 9th to 12th.</p>
                            <div className="admission-features">
                                <div className="admission-feature">
                                    <FaCheckCircle />
                                    <span>Free Trial Classes Available</span>
                                </div>
                                <div className="admission-feature">
                                    <FaCheckCircle />
                                    <span>Flexible Timing Options</span>
                                </div>
                                <div className="admission-feature">
                                    <FaCheckCircle />
                                    <span>Monthly Fee Payment</span>
                                </div>
                            </div>
                            <div className="admission-buttons">
                                <Link to="/admission-form" className="btn-primary">
                                    <FaGraduationCap />
                                    Join Tuition Classes
                                </Link>
                                <Link to="/contact" className="btn-secondary">
                                    <FaQuestionCircle />
                                    Have Questions?
                                </Link>
                            </div>
                        </div>
                        <div className="admission-image">
                            <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Happy Students" />
                        </div>
                    </div>
                </div>
            </section>

            <WebFooter />
        </div>
    );
};

export default Home;
