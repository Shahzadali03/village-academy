import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTag, FaClock, FaEye, FaGraduationCap, FaNewspaper } from 'react-icons/fa';
import { blogPosts } from '../data/blogPosts';
import WebNav from '../Component/WebNav';
import WebFooter from '../Component/WebFooter';
import PageBanner from '../Component/PageBanner';

const BlogDetail = () => {
    const { id } = useParams();
    const currentPost = blogPosts[id] || blogPosts[1];

    return (
        <div className="blog-detail-page edubuzz-exact">
            <WebNav />

            <PageBanner
                title="BLOG ARTICLE"
                breadcrumbs={[
                    { label: 'Home', to: '/' },
                    { label: 'Blog', to: '/blog' },
                    { label: 'Article' },
                ]}
            />

            <main className="blog-main">
                <div className="container">
                    <article className="blog-article">
                        <header className="article-header">
                            <div className="article-category">
                                <FaTag />
                                {currentPost.category}
                            </div>
                            <h1 className="article-title">{currentPost.title}</h1>
                            <p className="article-excerpt">{currentPost.excerpt}</p>

                            <div className="article-meta">
                                <div className="meta-item">
                                    <FaUser />
                                    <span>{currentPost.author}</span>
                                </div>
                                <div className="meta-item">
                                    <FaCalendarAlt />
                                    <span>{currentPost.date}</span>
                                </div>
                                <div className="meta-item">
                                    <FaClock />
                                    <span>{currentPost.readTime}</span>
                                </div>
                                <div className="meta-item">
                                    <FaEye />
                                    <span>{currentPost.views} views</span>
                                </div>
                            </div>
                        </header>

                        <div className="article-image">
                            <img
                                src={currentPost.image}
                                alt={currentPost.title}
                                width={960}
                                height={640}
                                fetchPriority="high"
                                decoding="async"
                            />
                        </div>

                        <div className="article-content">
                            <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
                        </div>
                    </article>

                    <section className="blog-cta">
                        <div className="blog-cta-box">
                            <div className="cta-text">
                                <h2>Ready to Join The Village Academia?</h2>
                                <p>Experience our quality education and holistic approach to learning. Enroll today for classes KG to 12th.</p>
                            </div>
                            <div className="cta-actions">
                                <Link to="/admission-form" className="btn-primary">
                                    <FaGraduationCap aria-hidden="true" /> Enroll Now
                                </Link>
                                <Link to="/blog" className="btn-secondary">
                                    <FaNewspaper aria-hidden="true" /> More Articles
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <WebFooter />
        </div>
    );
};

export default BlogDetail;
