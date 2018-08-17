import * as React from 'react';
import Navbar from '../components/Navbar';

export default ({ children }) => (
  <div>
    <Navbar />
    <div className="container mx-auto">{children}</div>
  </div>
);
