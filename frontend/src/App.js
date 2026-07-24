import React, { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import WebsiteEnhancements from './Component/WebsiteEnhancements';
import ThemeToggle from './Component/ThemeToggle';
import PageLoader from './Component/PageLoader';
import { ThemeProvider } from './context/ThemeContext';
// import ProtectedRoute from './components/ProtectedRoute';

const LOADER_FIRST_MS = 700;
const LOADER_ROUTE_MS = 450;

const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));
const Courses = lazy(() => import('./Pages/Courses'));
const CourseDetail = lazy(() => import('./Pages/CourseDetail'));
const FAQ = lazy(() => import('./Pages/FAQ'));
const Blog = lazy(() => import('./Pages/Blog'));
const BlogDetail = lazy(() => import('./Pages/BlogDetail'));
const AdmissionForm = lazy(() => import('./Pages/AdmissionForm'));
const Main = lazy(() => import('./Pages/Main'));
const Login = lazy(() => import('./Pages/Login'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Students = lazy(() => import('./Pages/Students'));
const Fee = lazy(() => import('./Pages/Fee'));
const Enquiries = lazy(() => import('./Pages/Enquiries'));
const Admissions = lazy(() => import('./Pages/Admissions'));
const WebAdmissions = lazy(() => import('./Pages/WebAdmissions'));

const removeInitialLoader = () => {
  document.getElementById('root')?.classList.add('app-ready');
  document.getElementById('initial-loader')?.remove();
};

const AppRoutes = () => {
  const location = useLocation();
  const isFirstLoad = useRef(true);
  const activePath = useRef(location.pathname);
  const [showLoader, setShowLoader] = useState(true);

  if (activePath.current !== location.pathname) {
    activePath.current = location.pathname;
    if (!showLoader) {
      setShowLoader(true);
    }
  }

  useLayoutEffect(() => {
    removeInitialLoader();

    const duration = isFirstLoad.current ? LOADER_FIRST_MS : LOADER_ROUTE_MS;
    isFirstLoad.current = false;

    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {showLoader && <PageLoader />}
      <div className={`app-shell${showLoader ? ' is-loading' : ''}`} aria-hidden={showLoader}>
        <ThemeToggle floating />
        <WebsiteEnhancements />
        <Suspense fallback={null}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/admission-form" element={<AdmissionForm />} />
            <Route path="/enquiry-form" element={<Navigate to="/contact" replace />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                // <ProtectedRoute>
                <Main />
                // </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="fee" element={<Fee />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="web-admissions" element={<WebAdmissions />} />
              <Route path="admissions" element={<Admissions />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="app">
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
