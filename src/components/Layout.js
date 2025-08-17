import React from 'react';
import MainNavbar from '../components/MainNavbar';

function Layout({ children }) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}

  // export default Layout; // Commenting out the export to indicate removal
