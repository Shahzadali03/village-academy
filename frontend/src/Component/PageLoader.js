import React from 'react';
import logo from '../assets/images/logo.png';

const PageLoader = () => {
    return (
        <div className="website-loader" role="status" aria-live="polite" aria-label="Loading Village Academia">
            <div className="website-loader-bg" aria-hidden="true">
                <span className="loader-orb loader-orb-1" />
                <span className="loader-orb loader-orb-2" />
            </div>

            <div className="website-loader-inner">
                <div className="website-loader-logo-wrap">
                    <span className="loader-ring loader-ring-outer" />
                    <span className="loader-ring loader-ring-inner" />
                    <img
                        src={logo}
                        alt="Village Academia"
                        className="website-loader-logo"
                        width={88}
                        height={88}
                        decoding="async"
                        fetchPriority="high"
                    />
                </div>

                <div className="website-loader-brand">
                    <span className="website-loader-text">Village Academia</span>
                    <span className="website-loader-tagline">Alif se Maloom tak</span>
                </div>

                <div className="website-loader-progress" aria-hidden="true">
                    <span className="progress-dot" />
                    <span className="progress-dot" />
                    <span className="progress-dot" />
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
