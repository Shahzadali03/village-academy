import React, { useMemo, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaClock, FaUser, FaGraduationCap } from 'react-icons/fa';
import WebNav from '../Component/WebNav';
import PageBanner from '../Component/PageBanner';
import { blogPostsList, blogCategories } from '../data/blogPosts';

const WebFooter = lazy(() => import('../Component/WebFooter'));

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = useMemo(() => {
        if (activeCategory === 'All') return blogPostsList;
        return blogPostsList.filter((post) => post.category === activeCategory);
    }, [activeCategory]);

    const featuredPost = filteredPosts[0];
    const remainingPosts = filteredPosts.slice(1);

    return (
        <div className="blog-page edubuzz-exact">
            <WebNav />

            <PageBanner
                title="OUR BLOG"
                subtitle="News, tips, and insights on education, student life, and learning at The Village Academia."
                breadcrumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Blog' },
                ]}
            />

            <section className="blog-listing-section">
                <div className="container">
                    <div className="blog-filters">
                        {blogCategories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {featuredPost && (
                        <article className="featured-post">
                            <div className="featured-image">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    width={960}
                                    height={640}
                                    fetchPriority="high"
                                    decoding="async"
                                />
                                <span className="featured-badge">Latest</span>
                            </div>
                            <div className="featured-content">
                                <span className="post-category">{featuredPost.category}</span>
                                <h2>{featuredPost.title}</h2>
                                <p>{featuredPost.excerpt}</p>
                                <div className="post-meta">
                                    <span><FaUser aria-hidden="true" /> {featuredPost.author}</span>
                                    <span><FaCalendarAlt aria-hidden="true" /> {featuredPost.date}</span>
                                    <span><FaClock aria-hidden="true" /> {featuredPost.readTime}</span>
                                </div>
                                <Link to={`/blog/${featuredPost.id}`} className="read-more-btn">
                                    Read Full Article <FaArrowRight aria-hidden="true" />
                                </Link>
                            </div>
                        </article>
                    )}

                    {remainingPosts.length > 0 && (
                        <div className="blog-grid">
                            {remainingPosts.map((post) => (
                                <article key={post.id} className="blog-card">
                                    <div className="blog-image">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            width={960}
                                            height={640}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <span className="card-category">{post.category}</span>
                                    </div>
                                    <div className="blog-content">
                                        <div className="blog-meta">
                                            <span>{post.date}</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3>{post.title}</h3>
                                        <p>{post.excerpt}</p>
                                        <div className="card-author">
                                            <FaUser aria-hidden="true" /> {post.author}
                                        </div>
                                        <Link to={`/blog/${post.id}`} className="read-more">
                                            Read More <FaArrowRight aria-hidden="true" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {filteredPosts.length === 0 && (
                        <div className="blog-empty">
                            <p>No articles found in this category.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="blog-cta-section">
                <div className="container">
                    <div className="blog-cta-box">
                        <div className="cta-text">
                            <h2>Want to Learn With Us?</h2>
                            <p>Join The Village Academia for quality tuition and professional courses.</p>
                        </div>
                        <Link to="/admission-form" className="btn-primary">
                            <FaGraduationCap aria-hidden="true" /> Apply Now
                        </Link>
                    </div>
                </div>
            </section>

            <Suspense fallback={null}>
                <WebFooter />
            </Suspense>
        </div>
    );
};

export default Blog;
