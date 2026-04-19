import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, NavLink } from 'react-router-dom';
import { Layout, User, Award, BookOpen, LogOut, Target, Sun, Moon, FileText } from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Roadmap from './pages/Roadmap';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleAuthChange);
    return () => window.removeEventListener('storage', handleAuthChange);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="w-full flex" style={{ minHeight: '100vh' }}>
        {isAuthenticated && (
          <aside className="flex flex-col justify-between py-8 px-6 bg-white" style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '260px', borderRight: '1px solid #e2e8f0', zIndex: 50 }}>
            <div>
              <Link to="/dashboard" className="text-2xl font-bold flex items-center gap-3 mb-10" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>
                <Award size={28} className="text-indigo-600" /> <span>SkillGraph</span>
              </Link>
              <div className="flex flex-col gap-2">
                <NavLink to="/dashboard" className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                  <Layout size={20} /> My Dashboard
                </NavLink>
                <NavLink to="/recommendations" className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                  <Target size={20} /> Career Paths
                </NavLink>
                <NavLink to="/resume" className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                  <FileText size={20} /> Resume Builder
                </NavLink>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
                className="flex justify-between items-center p-3 rounded-lg w-full transition bg-gray-50 bg-white"
                style={{ color: 'var(--text-main)', border: '1px solid var(--card-border)', cursor: 'pointer' }}
              >
                <div className="flex items-center gap-3">
                  {theme === 'light' ? <Moon size={20} className="text-indigo-600" /> : <Sun size={20} className="text-orange-400" />} 
                  <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
              </button>

              <button 
                onClick={logout} 
                className="flex items-center gap-3 p-3 rounded-lg w-full transition bg-white"
                style={{ color: 'var(--danger)', border: '1px solid var(--danger-bg)', cursor: 'pointer' }}
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </aside>
        )}

        <main className="flex-1" style={{ marginLeft: isAuthenticated ? '260px' : '0', display: 'flex', flexDirection: 'column' }}>
          <div className="flex-1" style={{ maxWidth: isAuthenticated ? '1440px' : '100%', margin: '0 auto', width: '100%', padding: isAuthenticated ? '2rem' : '0' }}>
            <Routes>
              <Route path="/" element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />} />
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/recommendations" element={isAuthenticated ? <Recommendations /> : <Navigate to="/login" />} />
              <Route path="/roadmap/:careerId" element={isAuthenticated ? <Roadmap /> : <Navigate to="/login" />} />
              <Route path="/resume" element={isAuthenticated ? <ResumeBuilder /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
