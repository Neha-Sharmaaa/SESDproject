import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, NavLink } from 'react-router-dom';
import { Layout, User, Award, BookOpen, LogOut, Target, Sun, Moon } from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Roadmap from './pages/Roadmap';
import Home from './pages/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="w-full flex" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
        {isAuthenticated && (
          <aside className={`flex flex-col justify-between py-8 px-6 glass-effect ${isScrolled ? 'sidebar-scrolled' : ''}`} style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '260px', borderRight: '1px solid var(--card-border)', zIndex: 1000 }}>
            <div>
              <Link to="/dashboard" className="text-2xl font-bold flex items-center gap-3 mb-10" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
                <Award size={32} className="text-indigo-500" /> <span style={{ letterSpacing: '-0.03em' }}>SkillGraph</span>
              </Link>
              <div className="flex flex-col gap-3">
                <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                  <Layout size={20} /> My Dashboard
                </NavLink>
                <NavLink to="/recommendations" className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                  <Target size={20} /> Career Paths
                </NavLink>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
                className="flex justify-between items-center p-3 rounded-xl w-full transition glass-effect"
                style={{ color: 'var(--text-main)', border: '1px solid var(--card-border)', cursor: 'pointer' }}
              >
                <div className="flex items-center gap-3">
                  {theme === 'light' ? <Moon size={20} className="text-indigo-500" /> : <Sun size={20} className="text-orange-400" />} 
                  <span className="font-semibold">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
              </button>

              <button 
                onClick={logout} 
                className="flex items-center gap-3 p-3 rounded-xl w-full transition"
                style={{ color: 'var(--danger)', backgroundColor: 'var(--danger-bg)', border: '1px solid rgba(239, 68, 68, 0.1)', cursor: 'pointer', fontWeight: 600 }}
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </aside>
        )}

        <main className="flex-1" style={{ marginLeft: isAuthenticated ? '260px' : '0', display: 'flex', flexDirection: 'column' }}>
          <div className="flex-1" style={{ maxWidth: isAuthenticated ? '1440px' : '100%', margin: '0 auto', width: '100%', padding: isAuthenticated ? '2.5rem' : '0' }}>
            <Routes>
              <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />} />
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/recommendations" element={isAuthenticated ? <Recommendations /> : <Navigate to="/login" />} />
              <Route path="/roadmap/:careerId" element={isAuthenticated ? <Roadmap /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
