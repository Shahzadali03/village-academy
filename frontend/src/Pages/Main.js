import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Component/Header';
import SideBar from '../Component/SideBar';
import { Toaster } from 'react-hot-toast';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MOBILE_BREAKPOINT = 992;

const Main = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= MOBILE_BREAKPOINT
  );
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      setSidebarOpen(mobile ? false : true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('admin-sidebar-open', isMobile && sidebarOpen);
    return () => document.body.classList.remove('admin-sidebar-open');
  }, [isMobile, sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div
      className={`app-container admin-shell ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'} ${
        isMobile ? 'is-mobile' : 'is-desktop'
      }`}
    >
      <Toaster />
      <SideBar
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
        onNavigate={closeSidebar}
        onClose={closeSidebar}
      />

      {isMobile && sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      <div className="admin-main">
        <Header sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
