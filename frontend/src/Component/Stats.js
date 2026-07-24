import React from 'react'

const Stats = () => {
    return (
        <section className="stats-section">
            <div className="stats-overlay"></div>
            <div className="container">
                <div className="stats-grid">
                    <div className="stat-item">
                        <div className="stat-number">3+</div>
                        <div className="stat-label">YEARS EXPERIENCE</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">10+</div>
                        <div className="stat-label">COURSES OFFERED</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">100+</div>
                        <div className="stat-label">STUDENTS</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">95%</div>
                        <div className="stat-label">SUCCESS RATE</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stats
