
import React, { useEffect, useState } from 'react';
import MainNavbar from './MainNavbarComponent';
import Loader from './Loader';
import { useLocation } from 'react-router-dom';

function Layout({ user, onLogout, children }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <MainNavbar user={user} onLogout={onLogout} />
      {loading ? <Loader /> : children}
    </>
  );
}

export default Layout;
