import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, LogOut } from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Roadmap from './pages/Roadmap';
import Home from './pages/Home';

/* ── Inline SVG Squiggle + Pencil Texture filter (global, invisible) ── */
const SketchFilters = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
    <defs>
      <filter id="squiggle" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" seed="2" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="pencil-texture">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
      </filter>
    </defs>
  </svg>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <SketchFilters />
      <div style={{ display: 'flex', minHeight: '100vh' }}>

        {isAuthenticated && (
          <aside style={{
            position: 'fixed', left: 0, top: 0, bottom: 0, width: '248px',
            backgroundColor: 'var(--bg-sidebar)',
            borderRight: '2px solid var(--text-main)',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            padding: '1.5rem 1rem',
            zIndex: 50,
          }}>
            <div>
              {/* Brand */}
              <Link to="/dashboard" style={{ textDecoration: 'none', display: 'block', marginBottom: '2rem', padding: '0.25rem 0.5rem' }}>
                <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1 }}>
                  SkillGraph
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
                  Career Copilot
                </div>
              </Link>

              {/* Tape decoration */}
              <div className="tape" style={{ fontSize: '0.65rem', fontWeight: 700, color: '#92400e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem', display: 'block' }}>
                Navigation
              </div>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                  <LayoutDashboard size={16} /> Dashboard
                </NavLink>
                <NavLink to="/recommendations" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                  <Target size={16} /> Career Paths
                </NavLink>
              </nav>
            </div>

            {/* Bottom */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>

              <button
                onClick={logout}
                style={{ justifyContent: 'flex-start', fontSize: '0.8rem', borderColor: '#ef4444', color: '#ef4444', boxShadow: '2px 2px 0px #ef4444' }}
              >
                <LogOut size={15} /> Sign out
              </button>
            </div>
          </aside>
        )}

        <main style={{ 
          flex: 1, 
          marginLeft: isAuthenticated ? '248px' : 0,
          width: '100%',
          minWidth: 0 // Prevent flex-basis issues
        }}>
          <Routes>
            <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/recommendations" element={isAuthenticated ? <Recommendations /> : <Navigate to="/login" />} />
            <Route path="/roadmap/:careerId" element={isAuthenticated ? <Roadmap /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
