import { Link } from 'react-router-dom';

const PageBanner = ({ title, badge, subtitle, breadcrumbs = [] }) => (
  <section className="page-banner">
    <div className="page-banner-overlay" aria-hidden="true" />
    <div className="banner-shape banner-shape-1" aria-hidden="true" />
    <div className="banner-shape banner-shape-2" aria-hidden="true" />
    <div className="container">
      <div className="page-banner-content">
        {badge && <span className="page-banner-badge">{badge}</span>}
        <h1>{title}</h1>
        {breadcrumbs.length > 0 && (
          <nav className="breadcrumb justify-content-center" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`}>
                {index > 0 && ' / '}
                {crumb.to ? (
                  <Link to={crumb.to}>{crumb.label}</Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  </section>
);

export default PageBanner;
