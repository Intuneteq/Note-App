import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar className='fixed' />
      {children}
      <Footer className='fixed' />
    </>
  )
}

export default Layout;