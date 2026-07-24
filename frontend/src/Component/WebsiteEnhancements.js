import React from 'react';
import { useLocation } from 'react-router-dom';
import BackToTop from './BackToTop';

const WebsiteEnhancements = () => {
    const { pathname } = useLocation();
    const isPublicSite = !pathname.startsWith('/admin') && pathname !== '/login';

    if (!isPublicSite) return null;

    return <BackToTop />;
};

export default WebsiteEnhancements;
