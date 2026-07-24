import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const AdminLogo = ({ variant = 'sidebar', className = '', asLink = true }) => {
  const content = (
    <div className={`admin-logo admin-logo--${variant} ${className}`.trim()}>
      <span className="admin-logo-mark" aria-hidden="true">
        <img src={logo} alt="" width="44" height="44" decoding="async" />
      </span>
      <span className="admin-logo-text">
        <span className="admin-logo-name">Village Academia</span>
        <span className="admin-logo-tagline">Alif se Maloom tak</span>
        {/* {variant === 'sidebar' && <span className="admin-logo-badge">Admin Portal</span>} */}
      </span>
    </div>
  );

  if (asLink) {
    return (
      <Link to="/admin/dashboard" className="admin-logo-link" aria-label="Village Academia Admin Dashboard">
        {content}
      </Link>
    );
  }

  return content;
};

export default AdminLogo;
