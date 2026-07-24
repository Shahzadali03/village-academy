import { Link, useLocation } from 'react-router-dom';
import AdminLogo from './AdminLogo';

const SideBar = ({ sidebarOpen, isMobile, onNavigate, onClose }) => {
  const location = useLocation();

  const checkActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`)
      ? 'active'
      : '';

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'speedometer2' },
    { path: '/admin/students', label: 'Students', icon: 'people' },
    { path: '/admin/enquiries', label: 'Enquiries', icon: 'question-circle' },
    { path: '/admin/web-admissions', label: 'Web Admissions', icon: 'globe2' },
    { path: '/admin/admissions', label: 'Admissions', icon: 'clipboard-data' },
    { path: '/admin/fee', label: 'Fee Management', icon: 'currency-dollar' },
  ];

  const handleNavigate = () => {
    if (isMobile) {
      onNavigate();
    }
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`} aria-hidden={!sidebarOpen}>
      <div className="sidebar-top">
        <AdminLogo variant="sidebar" />
        {isMobile && (
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        )}
      </div>

      <nav>
        <span className="sidebar-section-label">Main Menu</span>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${checkActive(item.path)}`}
            onClick={handleNavigate}
          >
            <i className={`bi bi-${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
