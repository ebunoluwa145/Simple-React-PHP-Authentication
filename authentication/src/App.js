// App.js
import React from 'react';
import Routes from './Routes';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div>
        {/* Add any global components or layout here */}
        <Routes />
        {/* Add any global footer or other components here */}
      </div>
    </AuthProvider>
  );
};

export default App;
