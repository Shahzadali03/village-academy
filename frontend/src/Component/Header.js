import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import profileImg from '../assets/images/profile.png';

const Header = ({ sidebarOpen, onToggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const displayName = user?.name || user?.username || 'Admin';
  const displayUsername = user?.email || 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header className="header d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="header-toggle"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          aria-expanded={sidebarOpen}
        >
          <i className="bi bi-list fs-5" aria-hidden="true" />
        </button>
        <div className="header-brand d-none d-md-block">
          <div className="header-brand-title">Admin Panel</div>
          <small className="header-brand-subtitle">The Village Academia Management System</small>
        </div>
      </div>

      <div className="d-flex align-items-center profile gap-3">
        <div className="d-none d-sm-block text-end">
          <p>{displayName}</p>
          <p>Administrator</p>
        </div>
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            className="p-0 rounded-circle profile-img"
          >
            <img src={profileImg} alt="Profile" className="rounded-circle img-fluid" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="profile-dropdown">
            <Dropdown.ItemText>
              <div className="fw-semibold">{displayName}</div>
              <small className="text-muted">{displayUsername}</small>
            </Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to="/">
              <i className="bi bi-house me-2" />
              Visit Website
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
