import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem' }}>SkillGraph Restoration</h1>
        <nav style={{ margin: '30px 0', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link to="/" className="btn-primary" style={{ padding: '10px 20px', textDecoration: 'none' }}>Home Test</Link>
          <Link to="/test" className="btn-secondary" style={{ padding: '10px 20px', textDecoration: 'none' }}>Route Test</Link>
        </nav>
        
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={
              <div>
                <h2 className="text-green-600">Sub-Route Active</h2>
                <p className="text-gray">Routing logic is functional.</p>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
