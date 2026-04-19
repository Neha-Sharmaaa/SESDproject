import React, { useState, useEffect } from 'react';

// Simplified Components
const MockHome = () => <div style={{ padding: '50px' }}><h1>Home Page</h1><button onClick={() => window.location.href = '/login'}>Login</button></div>;
const MockLogin = () => <div style={{ padding: '50px' }}><h1>Login Page</h1><p>Assume Login success</p></div>;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: 'var(--primary, blue)' }}>SkillGraph System Recovery</h1>
      <p>Simplified view to diagnose rendering failure.</p>
      
      {isAuthenticated ? (
        <div style={{ border: '2px solid green', padding: '20px', borderRadius: '10px' }}>
          <h2>Authorized Access</h2>
          <p>You are logged in.</p>
        </div>
      ) : (
        <div style={{ border: '2px solid red', padding: '20px', borderRadius: '10px' }}>
          <h2>Public Access</h2>
          <p>Please log in.</p>
        </div>
      )}
      
      <div style={{ marginTop: '40px' }}>
        <p>Current Path: {window.location.pathname}</p>
      </div>
    </div>
  );
}

export default App;
