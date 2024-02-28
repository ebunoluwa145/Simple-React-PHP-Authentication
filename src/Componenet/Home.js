// Home.js

import React from 'react';
import { useAuth } from '../AuthContext';

const Home = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
      // Call the logout function to log the user out
      logout();
    };
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>This is a simple home page for your application.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>

  );
};

export default Home;
