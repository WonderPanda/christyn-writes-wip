import * as React from 'react';
import Navbar from '../components/Navbar';

export default ({ children }) => (
  <div
    className="font-sans min-h-screen"
    style={{ backgroundColor: 'rgb(251, 249, 244)' }}
  >
    <Navbar />
    <div className="container mx-auto">{children}</div>
  </div>
);
