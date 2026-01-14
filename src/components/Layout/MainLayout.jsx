import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from 'src/components/Layout/Header';
import Footer from 'src/components/Layout/Footer';
import { useSession } from 'src/context/SessionContext';

const MainLayout = () => {
  const location = useLocation();
  const { isActive, startSession } = useSession();

  // Auto-start session if not active
  useEffect(() => {
    if (!isActive) {
      startSession();
    }
  }, [isActive, startSession]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Check if current route should hide header/footer (e.g., capture page)
  const isFullscreenRoute = ['/capture', '/edit'].some(route => 
    location.pathname.startsWith(route)
  );

  if (isFullscreenRoute) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;